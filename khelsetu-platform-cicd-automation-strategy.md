# khelsetu-platform — CI/CD Full Automation Strategy

**Goal:** A 24/7, self-running pipeline — dependency updates, testing, merging, deployment, and rollback all happen without manual intervention, except for genuinely high-risk decisions (major version bumps, unresolvable critical CVEs).

**Context:** Deployment is already handled by Vercel's GitHub integration (auto preview + production deploys). This document covers everything _around_ that: safe automatic merging, a fast trustworthy CI gate, and automatic post-deploy verification/rollback.

---

## 1. Current State — What's Actually Running

8 workflows fire today: `CI`, `Security`, `Review Gate`, `Auto-Merge Dependencies`, `Auto Approve Owner PRs`, `AI QA`, `Dependabot`, `Renovate`.

### `ci.yml` — 10 jobs, 7 sequential stages

```
Stage 1: lint, format
Stage 2: typecheck, secrets (gitleaks), circular, structure
Stage 3: build
Stage 4: unit-test (2 shards), coverage
Stage 5: e2e (2 shards), smoke, a11y, visual, lighthouse
Gate:    ci-status
```

### `security.yml` — 4 jobs, runs in parallel on same triggers

```
npm-audit, codeql, dependency-review, sonarcloud
```

### Plus: `review-gate.yml`, `auto-merge-deps.yml`, `auto-approve-owner.yml`, `ai-qa.yml`, `dependabot.yml`, `renovate.yml`

---

## 2. Root Causes Identified (Ranked by Impact)

| #   | Issue                                                                                                                                           | Impact                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | `e2e`, `smoke`, `a11y`, `visual`, `lighthouse` each re-run `npm run build` from source instead of reusing the artifact `build` already uploaded | 5x redundant full builds per run — the single biggest waste            |
| 2   | Playwright browsers installed fresh in 4 separate jobs, no cache                                                                                | Repeated large downloads every run                                     |
| 3   | DAG is stage-gated, not dependency-gated (`build` waits on lint/format/typecheck/secrets/circular/structure even though it doesn't need them)   | Long serial critical path despite short individual jobs                |
| 4   | `security.yml` duplicates `ci.yml`'s checkout + install using a different cache key scheme (raw `setup-node` cache vs. composite action)        | Two cold-ish installs instead of one shared warm cache                 |
| 5   | `npm audit` + `dependency-review` overlap almost entirely; `CodeQL` + `SonarCloud` both do static analysis                                      | Redundant scanning, redundant compute                                  |
| 6   | Dependabot **and** Renovate both enabled                                                                                                        | Every dependency bump = 2 competing PRs = 2x full pipeline runs        |
| 7   | `e2e`/`smoke`/`a11y`/`visual` are explicitly non-blocking per the `ci-status` job's own comment ("non-blocking until CI backend is added")      | Expensive jobs run on every push with zero decision-making value today |
| 8   | `concurrency.cancel-in-progress` only applies to `pull_request` events, not plain pushes                                                        | Stale runs on a branch aren't cancelled by new pushes                  |

---

## 3. Fix Plan — CI/CD Speed & Reliability

### Immediate, low-risk, high-impact

- [ ] Replace redundant builds: `e2e`/`smoke`/`a11y`/`visual`/`lighthouse` download the `build-output` artifact via `actions/download-artifact` instead of rebuilding.
- [ ] Cache Playwright browsers once: `actions/cache` on `~/.cache/ms-playwright` keyed on lockfile hash, shared across all Playwright jobs, guarded by `if: steps.cache.outputs.cache-hit != 'true'`.
- [ ] Unify dependency caching: make `security.yml`'s `npm-audit` job use the same `./.github/actions/setup-node` composite action as `ci.yml`.
- [ ] Loosen `build`'s `needs` — it only needs checkout, not lint/format/typecheck/secrets/circular/structure to have passed first. Let it run in parallel with quality checks.
- [ ] Set `cancel-in-progress: true` unconditionally in `ci.yml`'s concurrency group (not just for `pull_request`).
- [ ] Merge `lint` + `format` + `typecheck` + `circular` + `structure` into a single `static-checks` job to eliminate 4x redundant job-startup overhead (checkout + setup-node + cache restore per job).

### Consolidation

- [ ] Pick **one** dependency bot. Recommend **Renovate** (better grouping, scheduling, multi-ecosystem config) — remove `.github/dependabot.yml` once confirmed covered.
- [ ] Drop `npm audit` from `security.yml`, keep `Dependency Review` (PR-scoped, faster, blocks merge directly) — or the reverse, but not both.
- [ ] Keep CodeQL (security-focused SAST) and SonarCloud (quality/maintainability) — this split is legitimate, don't add a third overlapping tool.
- [ ] Add `dorny/paths-filter` so doc-only/config-only changes skip the full CI + Security stack — see **3.1 below** for the required-check gotcha this introduces.

### 3.1 The path-filtering gotcha (README/docs-only PRs)

If individual jobs like `unit-test` or `e2e` are set as **required status checks** in branch protection, and a docs-only PR causes those jobs to be skipped via `paths-ignore`/`paths-filter`, GitHub records **no status at all** — not a pass. A required check that never runs blocks the merge indefinitely. That's the opposite of automation.

**Two ways to fix it:**

- **Option A:** Keep path-filtering at the individual-job level, but make each job still technically run with a conditional no-op (`if: needs.check-changes.outputs.code-changed == 'true'`), so GitHub records success instead of "missing." Fragile — every new job added later has to remember to do this correctly.
- **Option B (recommended, chosen for this repo):** Only require the single `ci-status` gate job in branch protection — not each individual job. Path-filter the _expensive work inside_ `ci-status`'s upstream jobs as needed, and have `ci-status` itself treat `skipped` results as passing, only failing on actual `failure`:
  ```yaml
  ci-status:
    needs: [lint, format, typecheck, build, unit-test, ...]
    if: always()
    steps:
      - name: Check results
        run: |
          if [[ "${{ contains(needs.*.result, 'failure') }}" == "true" ]]; then
            exit 1
          fi
          # 'skipped' results pass through fine — docs-only PRs merge cleanly
  ```
  This matches the pipeline's existing structure (it already funnels everything through one gate job) and avoids the failure mode where a newly added job forgets to be path-filter-aware.

### Make the gate honest

- [ ] Either wire `e2e`/`smoke`/`a11y`/`visual`/`lighthouse` results into `ci-status`'s pass/fail conditions once the dev-server-in-CI setup is ready, **or** move them to `workflow_dispatch` / nightly `schedule` until then.
- [ ] Add Playwright's built-in `retries: 2` so a single transient flake doesn't fail the whole job / require a manual re-run.

---

## 4. Full Automation Architecture (24/7, No Manual Work)

```
Renovate (scheduled) ──▶ opens PR ──▶ CI runs once, fast ──▶ risk check
                                                                  │
                                        ┌─────────────────────────┴─────────────────────┐
                                   patch/minor                                      major bump
                                        │                                                │
                                 auto-approved                                  labeled "needs-human"
                                        │                                         (only manual step)
                                  Merge Queue
                                        │
                                    merges to main
                                        │
                                Vercel auto-deploys
                                        │
                          deployment_status webhook fires
                                        │
                              smoke test against live URL
                                        │
                          ┌─────────────┴─────────────┐
                        passes                        fails
                          │                             │
                     done, silent              auto-rollback via Vercel API
                                                          │
                                                   alert only if rollback fails

Independent of all this: scheduled health-check cron every 15 min,
pings production, alerts only on real, non-deploy-related outages.
```

### 4.1 Dependency updates trigger themselves

Renovate config, risk-based automerge:

```json
{
  "extends": ["config:base"],
  "schedule": ["every weekend"],
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": true,
      "automergeType": "pr"
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "labels": ["needs-human"]
    }
  ]
}
```

### 4.2 CI runs once, fast, trustworthy

The deduped/artifact-reusing pipeline from Section 3. Without this being fast and accurate, nothing downstream can safely auto-merge.

### 4.3 Approval is automatic for low-risk changes

Extend existing `Auto Approve Owner PRs` / `Review Gate` / `AI QA` logic: if CI is green and it's not a major-version Renovate PR, auto-approve — no human review needed.

### 4.4 Merge Queue closes the loop

Enable GitHub's native Merge Queue on `main`, with the consolidated CI status check as the required check. Approved (bot or human) + CI green → merges itself, serialized, no manual "should I merge now" decisions.

### 4.5 Post-deploy verification, automatic rollback

New workflow, triggered by Vercel's deployment webhook:

```yaml
name: Post-Deploy Verification
on:
  deployment_status:

jobs:
  smoke-test-production:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Smoke test live deployment
        run: |
          curl -f "${{ github.event.deployment_status.target_url }}" || exit 1
          # add real health-check / critical-path checks here

      - name: Roll back on failure
        if: failure()
        run: |
          # call Vercel CLI/API to promote last known-good deployment
          npx vercel rollback --token=${{ secrets.VERCEL_TOKEN }} --yes

      - name: Alert only if rollback also fails
        if: failure()
        run: echo "Send alert — rollback failed, needs human"
        # wire to Slack/Discord webhook here
```

### 4.6 Continuous health checks, independent of deploys

```yaml
name: Production Health Check
on:
  schedule:
    - cron: '*/15 * * * *'

jobs:
  ping-production:
    runs-on: ubuntu-latest
    steps:
      - name: Check production health
        run: curl -f https://your-production-url.vercel.app/health || exit 1
      - name: Alert on real outage
        if: failure()
        run: echo "Send alert — outage detected outside of a deploy"
        # wire to Slack/Discord webhook here
```

### 4.7 Notification policy — silence by default

Only alert a human for:

1. A major-version Renovate PR waiting (`needs-human` label)
2. A critical/high CVE Dependency Review can't auto-resolve
3. A failed automatic rollback
4. A health-check failure unrelated to any recent deploy

Every routine merge, deploy, and passing check stays silent. Route the above four cases to a single Slack/Discord webhook.

---

## 5. What This Leaves You With

Day to day: nothing. Renovate opens PRs → CI runs once, fast → auto-approved if low-risk → merge queue merges → Vercel deploys → smoke test verifies → rollback fires automatically if something's actually broken.

**Manual attention is only needed for:**

- Major-version dependency bumps that might break APIs
- Critical CVEs that need an actual code fix (not just a version bump)
- The rare case where automatic rollback itself fails

---

## 6. Implementation Checklist (Priority Order)

- [ ] **Week 1 — Dedupe & speed up CI**
  - [ ] Fix build artifact reuse across e2e/smoke/a11y/visual/lighthouse
  - [ ] Cache Playwright browsers once, shared
  - [ ] Unify setup-node/cache between `ci.yml` and `security.yml`
  - [ ] Loosen `build` job's `needs`
  - [ ] Merge static-analysis jobs into one
  - [ ] Fix `cancel-in-progress` scope
- [ ] **Week 2 — Consolidate**
  - [ ] Remove Dependabot, keep Renovate only
  - [ ] Trim overlapping security scanners (npm audit vs. dependency-review)
  - [ ] Add path filtering for docs/config-only changes
  - [ ] Update branch protection to require only `ci-status`, not individual jobs (Option B — see 3.1), and confirm `ci-status` treats `skipped` as passing so docs-only PRs merge cleanly
- [ ] **Week 3 — Make the gate honest**
  - [ ] Wire e2e/a11y/visual into `ci-status`, or move to scheduled/on-demand
  - [ ] Add Playwright retries
- [ ] **Week 4 — Full automation loop**
  - [ ] Configure Renovate risk-based automerge (patch/minor auto, major flagged)
  - [ ] Extend auto-approve logic to low-risk Renovate PRs
  - [ ] Enable GitHub Merge Queue on `main`
  - [ ] Add post-deploy smoke test + auto-rollback workflow (`deployment_status` trigger)
  - [ ] Add scheduled 15-min health-check cron
  - [ ] Wire notification policy to Slack/Discord for the 4 exception cases only
