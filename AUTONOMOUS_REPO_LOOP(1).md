# AUTONOMOUS_REPO_LOOP

## Purpose

This document defines the autonomous pull request and repository maintenance loop for `khelsetu-platform`.

The goal is to make the repository behave like it is maintained by a senior engineer bot:

- review every PR,
- diagnose failures deeply,
- fix safe issues automatically,
- verify the patch,
- merge only when the branch is safe.

This system is designed to reduce manual effort, not to eliminate safety checks.

---

## Core principle

Use **review-first automation**, not blind auto-fix.

The agent should never do this:

```text
PR opened
→ model comments
→ model edits everything immediately
→ model merges immediately
```

Instead, use this loop:

```text
PR opened / updated
→ PR-Agent review
→ CI runs
→ diagnosis workflow reads logs + annotations + artifacts
→ issue classifier decides what is safe to fix
→ fixer workflow patches only safe issues
→ CI reruns
→ verifier confirms green state
→ GitHub auto-merge or merge queue completes merge
```

---

## What PR-Agent does

PR-Agent is the review layer.

It should:

- summarize pull requests,
- suggest improvements,
- review code changes,
- comment on risky patterns,
- help explain failures.

It should **not** be treated as the complete repair engine by itself.

---

## What the fixer does

The fixer workflow is the repair layer.

It should:

- read the diagnosis output,
- inspect failed jobs,
- inspect failed steps,
- inspect Sonar findings,
- inspect annotations,
- inspect logs and artifacts,
- patch only issues that are safe and well understood.

The fixer should never guess on:

- auth flows,
- payment logic,
- database migrations,
- security-sensitive flows,
- large architecture changes,
- unclear failure roots.

---

## System architecture

```text
Pull Request
    |
    v
PR-Agent Review
    |
    v
CI / Test / Build / Sonar
    |
    +------------------------+
    |                        |
    v                        v
  PASS                     FAIL
    |                        |
    v                        v
Enable merge          Diagnose workflow
                              |
                              v
                    Collect logs, annotations,
                    summaries, artifacts, Sonar
                              |
                              v
                  Classify issue by severity/risk
                              |
        +---------------------+---------------------+
        |                     |                     |
        v                     v                     v
   Safe auto-fix         Bounded fix loop      Human escalation
        |                     |                     |
        +----------+----------+----------+----------+
                   |
                   v
              Patch branch
                   |
                   v
                CI reruns
                   |
                   v
          Pass -> merge gate
          Fail -> retry or stop
```

---

## Recommended workflow files

```text
.github/workflows/
  pr-review.yml
  ci.yml
  diagnose.yml
  auto-fix.yml
  verify.yml
  merge.yml
```

Optional support files:

```text
config/
  model-registry.json
  retry-policy.json
  security-policy.json
  workflow-policy.json
```

---

## PR review workflow

### Trigger

Run on every PR update:

- `opened`
- `reopened`
- `ready_for_review`
- `synchronize`

### Why

This lets PR-Agent comment automatically whenever the PR changes.

### Behavior

PR-Agent should:

- generate review comments,
- describe the PR,
- point out likely risks,
- suggest improvements.

### Example workflow

```yaml
name: PR Agent Review

on:
  pull_request:
    types: [opened, reopened, ready_for_review, synchronize]

permissions:
  contents: read
  pull-requests: write
  issues: write
  checks: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: PR Agent
        uses: The-PR-Agent/pr-agent@v0.39.0
        env:
          OPENAI_KEY: ${{ secrets.NVIDIA_NIM_API_KEY }}
          OPENAI_BASE_URL: https://integrate.api.nvidia.com/v1
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## CI workflow

The CI workflow is the source of truth for status.

It should run:

- lint
- formatting
- typecheck
- unit tests
- build
- optional Sonar scan
- optional E2E / visual / lighthouse

### Recommended policy

Keep blocking checks fast:

- lint
- typecheck
- unit tests
- build

Move expensive checks to:

- merge-to-main
- nightly
- label-triggered runs
- scheduled runs

### Why

This keeps feedback quick and reduces noise.

---

## Diagnosis workflow

The diagnosis workflow is the most important part of the automation.

It must collect:

- workflow conclusion
- failed job names
- failed step names
- step logs
- job summaries
- GitHub annotations
- Sonar findings
- artifacts
- coverage output
- test output
- build output

### Diagnosis output format

The diagnosis workflow should produce a structured file such as:

```json
{
  "workflow": "CI",
  "conclusion": "failure",
  "failed_jobs": [
    {
      "job": "lint",
      "reason": "eslint failure",
      "files": ["src/App.tsx"]
    }
  ],
  "issues": [
    {
      "severity": "safe",
      "category": "lint",
      "file": "src/App.tsx",
      "line": 42,
      "message": "unused variable"
    }
  ]
}
```

### Why structured diagnosis matters

A raw log is too noisy.

The agent needs a clean diagnosis object so it can decide:

- what to fix,
- what to ignore,
- what to escalate.

---

## Auto-fix workflow

The auto-fix workflow should only run after diagnosis and only for safe issues.

### Safe fixes

- lint
- formatting
- unused imports
- obvious type errors
- small path mistakes
- trivial test expectation updates
- missing exports
- simple refactor cleanup

### Unsafe fixes

- auth
- payments
- persistence
- migrations
- permissions
- security-sensitive changes
- large logic rewrites
- unclear root cause failures

### Retry policy

Use a strict retry loop:

- attempt 1
- attempt 2
- attempt 3
- stop and report

Never retry forever.

---

## Verification workflow

The verification workflow reruns the relevant checks after every patch.

It should verify:

- the original failed job is now green,
- no new job has failed,
- the patch did not create side effects.

### Recommended behavior

If the original failure was:

- lint → rerun lint
- typecheck → rerun typecheck
- unit tests → rerun unit tests
- build → rerun build
- Sonar → rerun Sonar
- visual regression → rerun visual tests

---

## Merge workflow

The merge workflow should never force a merge.

It should only:

- enable auto-merge,
- or let merge queue handle the final merge.

### Required merge safety

- required checks must pass
- required reviews must be satisfied
- protected branch rules must allow merge
- no unsafe failures may remain

### Why this matters

This keeps the bot from merging broken branches.

---

## Model selection strategy for NVIDIA NIM

Do **not** hard-code one model forever.

NIM exposes an OpenAI-compatible inference API and a `/v1/models` endpoint that lists models currently loaded and available for inference. The public NVIDIA model catalog also shows the currently offered free-endpoint and downloadable models, including coding and agentic options such as **glm-5.2**, **minimax-m3**, **step-3.7-flash**, **kimi-k2.6**, **mistral-medium-3.5-128b**, **deepseek-v4-flash**, and **deepseek-v4-pro**. The catalog itself should be treated as the real-time source of availability, while the repo’s own telemetry should decide what gets promoted.

### The rule

Use a two-layer model policy:

1. **Availability layer**  
   Check NIM `/v1/models` at runtime or on a scheduled refresh.  
   Only models currently available in the catalog may be used.

2. **Quality layer**  
   Rank the available models with a repository-specific score:
   - coding / agentic suitability,
   - context window size,
   - repo task success rate,
   - patch cleanliness,
   - verification pass rate,
   - latency,
   - retry frequency.

### Practical default order

Use this as the starting allowlist, then let telemetry reorder the list over time:

- `glm-5.2`
- `minimax-m3`
- `step-3.7-flash`
- `kimi-k2.6`
- `mistral-medium-3.5-128b`
- `deepseek-v4-flash`
- `deepseek-v4-pro`

That list should remain **dynamic**, not fixed forever.

### Promotion policy

A model may become the new primary only when:

- it appears in the live NIM catalog,
- it is explicitly allowed in `config/model-registry.json`,
- it passes a repo verification run,
- it outperforms the current primary on real repository tasks,
- it does not increase failure rate or retry count.

### Fallback policy

Fallback should be automatic, but controlled:

- if the primary model is unavailable, move to the next approved available model,
- if a model fails health checks or times out, mark it temporarily degraded,
- if all approved models fail, stop and escalate rather than looping forever.

### Refresh policy

Refresh the catalog and fallback ranking on a schedule:

- daily catalog check,
- weekly ranking review,
- immediate recheck on model failure.

### Why this is the correct senior-level approach

This is better than a hardcore static fallback chain because it:

- follows the real NIM catalog,
- adapts to newly available models,
- keeps security and stability,
- avoids silent drift,
- remains reproducible.

---

## Model registry

Use one file:

```json
{
  "active": "glm-5.2",
  "fallbacks": [
    "minimax-m3",
    "step-3.7-flash",
    "kimi-k2.6",
    "mistral-medium-3.5-128b",
    "deepseek-v4-flash",
    "deepseek-v4-pro"
  ],
  "candidates": [],
  "last_reviewed": "2026-07-08",
  "review_reason": "Initial baseline from current NIM catalog",
  "selection_policy": {
    "source": "live_nim_catalog_plus_repo_telemetry",
    "refresh_schedule": "daily",
    "promotion_requires_verification": true,
    "auto_demote_on_failure": true
  }
}
```

### Model policy

- active model first
- fallback only if the active model fails or is unavailable
- update only through review or automated catalog refresh
- never auto-promote a model just because a benchmark changes
- keep the changelog updated

---

## Branch protection rules

For a public repo, branch protection should require:

- CI checks
- code review if needed
- no direct pushes to protected branches
- auto-merge only after required checks pass
- optionally merge queue

This is the final safety gate.

---

## Permissions policy

Use least privilege.

Recommended permissions:

- `contents: read`
- `pull-requests: write`
- `issues: write`
- `checks: write`

Secrets should live only in GitHub Secrets:

- `NVIDIA_NIM_API_KEY`
- optional `SONAR_TOKEN`
- optional GitHub App private key if using app auth

Do not expose secrets to untrusted forked code.

### Public repository rule

For pull requests coming from forks:

- do not run any write-capable workflow that can change code automatically,
- do not expose the NIM API key,
- restrict the fixer workflow to trusted branches only.

---

## Recommended event design

### PR review

Use `pull_request`.

### CI reactivity

Use `workflow_run` to trigger diagnosis after CI completes.

### Fix replay

Use a dispatcher workflow or a repository dispatch event only after diagnosis says the issue is safe.

### Merge

Use auto-merge and branch protection.

---

## End-to-end logic

```text
1. PR opens
2. PR-Agent reviews
3. CI runs
4. If CI passes:
     - arm auto-merge
5. If CI fails:
     - diagnosis workflow runs
     - safe issues are classified
     - fixer workflow patches the branch
     - CI reruns
     - verification confirms the fix
     - auto-merge is enabled only if everything passes
6. If the issue is unsafe:
     - stop
     - report clearly
```

---

## What should be automated

Automate:

- PR review comments
- CI result collection
- failure diagnosis
- safe patch generation
- rerun verification
- merge gating
- live model catalog refresh
- fallback ranking refresh

Do not automate:

- risky architectural changes
- secret rotation without policy
- unrestricted write access
- auto-merging unverified patches

---

## What “senior engineer bot” means here

A senior engineer bot does not mean a bot that changes everything.

It means a bot that:

- sees the full repo context,
- understands failure severity,
- fixes trivial and safe issues reliably,
- escalates unclear problems,
- keeps the repo stable,
- avoids unnecessary complexity,
- adapts to new NIM models safely.

That is the real automation target.

---

## Recommended rollout order

Start in this order:

1. PR-Agent review only
2. CI diagnostics only
3. safe auto-fix only
4. verification rerun
5. auto-merge after required checks
6. live NIM catalog refresh
7. telemetry-driven model ranking
8. later, Sonar ingestion
9. later, deeper multi-file refactors

This gives you value early without creating a fragile automation stack.

---

## Maintenance rules

Review this system on a schedule:

- daily for model availability refresh
- weekly for workflow failures
- monthly for model ranking review
- after major repo changes
- after PR-Agent changes
- after GitHub Actions syntax changes

The automation should be maintained like product code.

---

## Final architecture summary

The repo should behave like this:

- PR-Agent = reviewer
- diagnosis workflow = root cause collector
- fixer workflow = safe patch engine
- verification workflow = correctness gate
- merge workflow = final delivery gate
- NIM catalog refresh = model availability source
- telemetry ranking = model quality source

That is the cleanest and safest autonomous maintenance loop for a public GitHub repo.

---

## References used to keep this current

- NVIDIA NIM exposes an OpenAI-compatible inference API and `/v1/models` endpoint for listing loaded models. citeturn944120view0
- NVIDIA’s live model catalog shows current coding/agentic candidates and labels free endpoints / downloadable free endpoints. citeturn944120view1
- PR-Agent’s GitHub installation docs show it can run as a GitHub Action / GitHub App on pull request events. citeturn137049search3turn137049search6turn137049search11
