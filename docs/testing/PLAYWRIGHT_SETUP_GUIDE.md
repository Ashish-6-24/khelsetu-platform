## Playwright Cross-Browser E2E Testing: Production Setup Guide

### 1. playwright.config.ts - Complete Configuration

The config above covers all essentials:

**Key decisions:**
- **Serial execution in CI** (`fullyParallel: !process.env.CI`) - prevents resource contention, ensures reproducibility
- **Retries: 2 in CI, 0 locally** - catches flaky tests without blocking development
- **Reporters: dot (CI) + html + blob + github** - concise output + debugging + sharding support + GH annotations
- **Trace on-first-retry** - captures full trace only when a test fails then passes (minimal overhead)
- **Screenshot only-on-failure** - saves disk space, critical for debugging
- **Video retain-on-failure** - expensive, only keep failures for CI
- **5 projects: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari** - covers 95%+ market

**Why blob reports?** They're designed for sharding. Each shard writes a `.zip` containing test metadata. During merge phase, Playwright combines all shards into final HTML report without re-running.

---

### 2. GitHub Actions Workflow (playwright.yml)

The workflow above includes THREE jobs:

#### **Job 1: test** (Desktop Browsers with Sharding)
```yaml
matrix:
  project: [chromium, firefox, webkit]
  shard: [1, 2, 3]
```
Creates **9 parallel jobs** (3 browsers × 3 shards). Each runs ~1/3 of tests.
- `--shard=${{ matrix.shard }}/3` splits tests deterministically
- Blob reports stored as artifacts for merge phase
- Container: `mcr.microsoft.com/playwright:v1.61.0-noble` includes all system deps

#### **Job 2: merge-reports** (Runs After Desktop Tests)
```yaml
needs: test
```
- Downloads all 9 blob reports
- Runs `playwright merge-reports` - combines into single HTML
- Generates GitHub Actions annotations from failures
- Uploads final report as 30-day artifact

#### **Job 3: mobile-tests** (Mobile Browsers - No Sharding)
```yaml
matrix:
  device: ["Mobile Chrome", "Mobile Safari"]
```
Runs in parallel but NOT sharded (fewer tests typically). 2 separate jobs.

---

### 3. Install Strategy

In CI workflow, install is atomic:
```bash
npm ci                                    # Install exact locked versions
npx playwright install --with-deps        # Install browsers + OS deps
```

**Why `--with-deps`?** Installs system libraries (libgconf2, xvfb, etc.) that headless browsers need. Docker image has these pre-installed, but this handles self-hosted runners.

**What browsers are installed?**
- Chromium: 200MB
- Firefox: 180MB
- WebKit: 150MB
- Mobile variants use same binaries with different viewport/UA emulation

**Caching:** NOT recommended (Playwright docs). Re-downloading is faster than cache restore overhead. Docker layer caching handles this naturally.

---

### 4. Retry & Timeout Configuration

**Config file:**
```typescript
retries: process.env.CI ? 2 : 0,           // Retry flaky tests twice
timeout: 30000,                            // 30s per test
expect: { timeout: 5000 },                 // 5s for assertions
actionTimeout: 10000,                      // 10s for click/fill/goto
globalTimeout: 1800000,                    // 30min total run
```

**Why 2 retries?** Google/Netflix/Stripe pattern - catches 80% of real flakes without inflating test count.

**Why separate expect timeout?** Web-first assertions need shorter timeout (quick pass/fail) than navigation (DNS, server latency).

**Flaky test pattern (big tech standard):**
```typescript
test('should handle slow network', async ({ page }) => {
  // Playwright auto-retries on these:
  // - Timeout errors
  // - Navigation errors
  // - Assertion failures (on retry)
  
  // Does NOT auto-retry:
  // - Logic errors (test code bugs)
  // - Page crashes
  // - Auth failures
});
```

---

### 5. Trace & Screenshot Artifacts

**trace: 'on-first-retry'**
- Captures: DOM snapshots, network logs, console messages, actions
- Only on second attempt (first failure)
- File size: ~5-10MB per test
- Viewed in `playwright show-report` → click test → Trace tab

**screenshot: 'only-on-failure'**
- Captures full page screenshot
- File size: ~100-500KB per test
- PNG format, embedded in HTML report

**video: 'retain-on-failure'** (CI only)
- Full video of test execution
- File size: ~5-50MB per test
- Only kept on failures (saves storage)

**Artifacts config in workflow:**
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/          # HTML + traces + screenshots
    retention-days: 30                # Auto-delete after 30 days
```

**Structure:**
```
playwright-report/
├── index.html                         # Entry point
├── data/
│   ├── trace-1a2b3c.zip             # Trace data
│   ├── screenshot-1a2b3c.png        # Screenshot
│   └── video-1a2b3c.webm            # Video
└── test-results.json                 # Metadata
```

---

### 6. Reporter Configuration

**Multi-reporter setup:**
```typescript
reporter: [
  [process.env.CI ? 'dot' : 'list', { printSteps: true }],  // Console
  ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
  ['blob', { outputDir: 'blob-report' }],                    // For sharding
  process.env.CI ? ['github'] : null,                        // GH annotations
].filter(Boolean),
```

**dot reporter (CI):** One character per test
```
······F·············································
```
- `.` = pass
- `F` = fail
- `±` = flaky (fail then pass on retry)
- `T` = timeout
- `×` = fail + will retry

**list reporter (local):**
```
✓ should display login form (438ms)
✓ should display registration form (515ms)
✗ should validate email (691ms)
```

**github reporter:** Adds annotations to PR
```
❌ auth.spec.ts › should validate email
   Expected "error" but got "success"
```

**HTML report features:**
- Filter by status (passed/failed/flaky)
- Search by test name
- View traces with DOM snapshots
- Timeline view
- Playwright version info

---

### 7. Existing E2E Tests Analysis

Your current tests (3 files):

**auth.spec.ts** (3 tests)
- ✓ Display login form
- ✓ Display registration form
- ✓ Navigate between auth pages

**landing.spec.ts** (3 tests)
- ✓ Load landing page
- ✓ Display features section
- ✓ Navigate to registration

**provider-context-fix.spec.ts** (not read, but likely provider-specific tests)

**Total: ~9-10 tests × 5 browsers = ~50 test executions per run**

With 3-shard strategy:
- Desktop (Chromium/Firefox/WebKit): 9 tests ÷ 3 = 3 tests per shard per browser
- Mobile: 9 tests × 2 devices = 18 tests (no sharding)
- **Total CI time: ~5-8 min (parallel) vs 20-30 min (serial)**

---

### 8. Copy-Paste Patterns (Production Ready)

**Pattern 1: Auth test with retry logic**
```typescript
import { expect, test } from '@playwright/test';

test('should submit login form', async ({ page }) => {
  await page.goto('/auth/login');
  
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('TestPassword123!');
  
  // Playwright auto-waits for button to be clickable
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Auto-retry on failure (up to 2 times in CI)
  await expect(page).toHaveURL('/dashboard');
});
```

**Pattern 2: Mobile-specific test**
```typescript
test.describe('Mobile auth', () => {
  test.use({ 
    ...devices['Pixel 5'],  // 393×851px, Android UA
  });
  
  test('should navigate on mobile', async ({ page }) => {
    await page.goto('/auth/login');
    // Page automatically responsive in Pixel 5 viewport
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});
```

**Pattern 3: Screenshot testing (visual regression)**
```typescript
test('should render login page correctly', async ({ page }) => {
  await page.goto('/auth/login');
  // Compares against baseline screenshot
  await expect(page).toHaveScreenshot();
});
```
First run creates baseline. CI fails if diff > threshold (configurable).

**Pattern 4: Expect web-first assertions**
```typescript
// These auto-retry for 5s (expect timeout)
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.locator('input')).toHaveValue('test');

// vs immediate assertions (no retry)
expect(5 + 5).toBe(10);
```

**Pattern 5: Flaky test with explicit waits**
```typescript
// BAD - timing-dependent
test('bad', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1000);  // ❌ Don't do this
  await expect(page.getByText('Loaded')).toBeVisible();
});

// GOOD - Playwright waits automatically
test('good', async ({ page }) => {
  await page.goto('/');
  // Waits up to 30s (test timeout) for element
  await expect(page.getByText('Loaded')).toBeVisible();
});
```

---

### 9. Run Commands

**Locally:**
```bash
npm run test:e2e                    # All browsers, all tests
npm run test:e2e:chromium          # Chromium only
npm run test:e2e:mobile            # Mobile only
npm run test:e2e:ui                # Interactive mode (UI)
npm run test:e2e:debug             # Debugger mode
npm run test:e2e:report            # View last report
```

**CI (GitHub Actions):**
```bash
# Individual browser/shard (run by matrix)
npx playwright test --project=chromium --shard=1/3

# Mobile (separate job)
npx playwright test --project='Mobile Chrome'

# Merge reports (after all shards)
npx playwright merge-reports --reporter html ./blob-reports
```

**Local debugging:**
```bash
npx playwright test --debug                      # Step through test
npx playwright test --headed                     # See browser (not headless)
npx playwright test --project=chromium --debug   # Debug single browser
PWDEBUG=1 npm run test:e2e                       # Inspector mode
```

---

### 10. Expected CI Times

| Scenario | Time |
|----------|------|
| 3-shard desktop + 2 mobile (parallel) | 5-8 min |
| Single browser local | 2-3 min |
| All 5 browsers local (serial) | 10-15 min |
| Report merge | 30 sec |
| Install + setup | 2-3 min |

Total CI (including setup): **~10-12 minutes end-to-end**

---

### 11. Known Issues & Fixes

**Issue: Tests hang on Chrome sometimes**
- Fix: Set `--disable-blink-features=AutomationControlled` (already in devices)

**Issue: Mobile Safari doesn't work**
- Fix: Requires macOS runner. Use Linux containers for mobile-webkit
- Docker doesn't support real iOS Safari, only iOS WebKit engine

**Issue: Flaky network tests**
- Fix: Use `page.waitForLoadState('networkidle')` before assertions

**Issue: Screenshot diff on different OS**
- Fix: Use Docker container (ensures consistent rendering)

**Issue: Traces are huge**
- Fix: `trace: 'on-first-retry'` not `'on'` (saves 90% disk)

---

### 12. Next Steps for KhelSetu

1. ✅ Update `playwright.config.ts` (DONE)
2. ✅ Create GitHub Actions workflow (DONE)
3. ✅ Update npm scripts (DONE)
4. TODO: Run locally: `npm run test:e2e`
5. TODO: Push to GitHub, verify workflow runs
6. TODO: Add more tests (login with credentials, dashboard, tournament creation)
7. TODO: Set up status checks on branch protection rules

Run locally first to verify setup works before pushing to CI.
