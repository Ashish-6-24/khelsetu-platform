# CI/CD Improvements Design — KhelSetu Frontend

## Context

Research from 5 parallel agents analyzed GitHub Actions patterns at FAANG companies (Meta, Google, Amazon, Netflix), Vercel/Next.js, React Native, Shopify Hydrogen, and VS Code. This spec implements the 8 Critical + High priority improvements.

## Current State

- `ci.yml` (push/PR): lint, typecheck, test, build, circular, e2e, security
- `auto-format.yml` (daily): auto-format + auto-PR
- `build-verification.yml` (daily): build across Node 20/22
- `dependency-audit.yml` (weekly): security audit
- `performance.yml` (daily + PRs): bundle size
- `dependabot.yml`: automated dependency updates

## Improvements to Implement

### 1. Concurrency Groups (Critical)

**What:** Cancel in-progress CI runs when a new push arrives on the same branch/PR.
**Why:** Saves CI minutes, avoids stale results. Used by Next.js, React, Shopify.
**How:** Add `concurrency: { group: ci-${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true }` to all triggered workflows.

### 2. SHA-Pinned Actions (Critical)

**What:** Pin all third-party actions to commit SHAs instead of mutable tags.
**Why:** The `tj-actions/changed-files` attack (March 2025) compromised 23,000 repos via tag mutation. Next.js SHA-pins all actions.
**How:** Replace `@v4` tags with SHA + version comment for checkout, setup-node, and all third-party actions.

### 3. Permissions Block (Critical)

**What:** Set `permissions: contents: read` at workflow level, escalate per-job.
**Why:** Default GITHUB_TOKEN has read-write to most scopes. Least-privilege is security baseline.
**How:** Add top-level `permissions` to all workflows, per-job escalation where needed.

### 4. Path-Based Filtering (High)

**What:** Skip irrelevant jobs when only certain files change.
**Why:** Next.js uses `dorny/paths-filter` to skip iOS tests for Android-only changes. Saves ~60% CI time for docs-only changes.
**How:** Add `dorny/paths-filter@v3` as first job, condition subsequent jobs on outputs.

### 5. CodeQL / SAST Scanning (High)

**What:** Run GitHub's CodeQL semantic analysis for JavaScript/TypeScript.
**Why:** Catches security vulnerabilities and code quality issues statically. Free for public repos.
**How:** Add new workflow `codeql.yml` running on push to main + weekly schedule.

### 6. Gitleaks Secret Detection (High)

**What:** Scan for accidentally committed secrets (API keys, tokens, passwords).
**Why:** Prevents credential leaks. Lightweight, runs in <30s.
**How:** Add `gitleaks/gitleaks-action` to CI workflow as a fast job.

### 7. Test Sharding (High)

**What:** Split unit tests across 2 parallel matrix runners.
**Why:** Next.js shards 10-ways, React Native shards by platform. Cuts test time ~50%.
**How:** Use Vitest's `--shard=idx/count` with 2-way matrix.

### 8. Gatekeeper Job (High)

**What:** Final job that depends on all other jobs and aggregates pass/fail status.
**Why:** Required status checks in GitHub break when jobs are skipped by path filters. Gatekeeper always runs, reports aggregate status.
**How:** Add `ci-gatekeeper` job with `if: always()` that checks all job results.

## Files to Modify

- `.github/workflows/ci.yml` — concurrency, permissions, SHA pinning, path filtering, test sharding, gatekeeper, gitleaks
- `.github/workflows/auto-format.yml` — concurrency, permissions, SHA pinning
- `.github/workflows/build-verification.yml` — concurrency, permissions, SHA pinning
- `.github/workflows/dependency-audit.yml` — concurrency, permissions, SHA pinning
- `.github/workflows/performance.yml` — concurrency, permissions, SHA pinning
- `.github/workflows/codeql.yml` — NEW file

## Verification

- All workflows pass on push
- Concurrency cancels stale runs
- Path filtering skips docs-only changes correctly
- Gatekeeper reports aggregate status
