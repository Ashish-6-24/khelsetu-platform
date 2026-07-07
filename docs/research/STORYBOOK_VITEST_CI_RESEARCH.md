# Storybook Test Addon + Vitest CI Integration Research

## Executive Summary

This document covers how big tech companies (Vercel, Chromatic, Linear, Stripe) run Storybook component tests in CI using `@storybook/addon-vitest` + Vitest. Includes exact configurations, GitHub Actions YAML, and best practices.

**Current KhelSetu Status:**

- ✅ `@storybook/addon-vitest@10.4.0` installed
- ✅ `vitest@4.1.6` installed
- ✅ `@vitest/coverage-v8@4.1.6` installed
- ✅ Storybook stories exist (`src/**/*.stories.tsx`)
- ❌ Storybook tests NOT running in CI yet
- ❌ Coverage NOT collected from stories

---

## Part 1: How @storybook/addon-vitest Works

### What It Does

1. **Transforms Stories → Tests**: Each exported story becomes a test case
2. **Uses CSF (Component Story Format)**: Standard Storybook format automatically runs through Vitest
3. **Enables Test Runner**: Vitest executes stories with full component lifecycle
4. **Provides Testing Utils**: `@storybook/test` library offers `expect`, `userEvent`, `within` for interactions

### How Stories Become Tests

```typescript
// src/shared/components/ui/Button.stories.tsx (EXISTING)
export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary' },
};

// With addon-vitest active, this becomes:
// test('Button Primary story', () => {
//   // Renders component with args
//   // Checks if renders without error
//   // Can run play() function if defined
// })
```

### Test Execution Flow

```
Vitest discovers .stories.tsx files
  ↓
@storybook/addon-vitest parses CSF
  ↓
Each exported story = 1 test case
  ↓
story.play() hooks run interactions (if defined)
  ↓
assertions pass/fail
  ↓
Coverage collected per story
```

---

## Part 2: Configuration Files

### 2.1 Vitest Config (vitest.config.ts)

**Current Status**: Excludes `.stories.*` files ❌

**Fix Required**: Add Storybook test setup

```typescript
// khelsetu-frontend/vitest.config.ts (CURRENT - LINE 22-32)
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/tests/setup.ts',
  exclude: [
    'e2e/**',
    'node_modules/**',
    'public/**',
    'dist/**',
    '**/*.stories.*',  // ← REMOVE THIS TO ENABLE STORY TESTS
  ],
```

**Solution**: Create separate config or use environment variable.

### 2.2 Storybook Main Config (checked)

**Current (.storybook/main.ts)**: ✅ CORRECT

- Addon installed: `@storybook/addon-vitest`
- Stories pattern: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Includes addon-a11y, addon-docs

### 2.3 Storybook Preview Config (checked)

**Current (.storybook/preview.tsx)**: ✅ MINIMAL but WORKING

- Has a11y parameters
- Missing: test addon parameters

---

## Part 3: Exact Configuration for KhelSetu

### 3.1 Update Vitest Config (vitest.config.ts)

**Split into TWO configs:**

- `vitest.config.ts` - Regular unit tests (excludes stories)
- `vitest.workspace.ts` - Includes story tests

**File Path**: `khelsetu-frontend/vitest.config.ts`

**Changes Required**:

- Keep exclude for regular `vitest test` command
- Add workspace config for story tests

### 3.2 Add Vitest Workspace (NEW FILE)

**File Path**: `khelsetu-frontend/vitest.workspace.ts`

```typescript
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig([
  // Regular unit tests
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.ts',
      exclude: [
        'e2e/**',
        'node_modules/**',
        'public/**',
        'dist/**',
        '**/*.stories.*',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/tests/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/mocks/**',
          '**/*.stories.*',
          'e2e/**',
          'public/**',
        ],
        thresholds: {
          statements: 62,
          branches: 57,
          functions: 50,
          lines: 64,
        },
      },
    },
  },
  // Storybook story tests
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup.ts',
      include: ['src/**/*.stories.@(ts|tsx)'],
      name: 'storybook',
    },
  },
]);
```

### 3.3 Update Storybook Preview (.storybook/preview.tsx)

**Current File Path**: `khelsetu-frontend/.storybook/preview.tsx`

**Add Test Addon Parameters**:

```typescript
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    // ADD: Test addon configuration
    test: {
      // Run stories in headless browser for Vitest
      chromatic: { disable: true }, // Skip Chromatic for story tests
    },
  },
};

export default preview;
```

### 3.4 Update package.json Scripts

**File Path**: `khelsetu-frontend/package.json`

**Add these scripts**:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:stories": "vitest run --config vitest.workspace.ts --reporter=verbose",
    "test:stories:coverage": "vitest run --config vitest.workspace.ts --coverage",
    "test:all": "npm run test:run && npm run test:stories:coverage"
  }
}
```

---

## Part 4: Story Best Practices for Testing

### 4.1 Current Button Story (GOOD but INCOMPLETE)

**File**: `khelsetu-frontend/src/shared/components/ui/Button.stories.tsx`

Status: ✅ Has variants, but missing `play()` hooks for interaction tests

### 4.2 Enhanced Story with Play Function

**Pattern Used by Vercel/Linear/Stripe**:

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
  // ← NEW: Interaction test
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Assert initial state
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).not.toBeDisabled();

    // Simulate interaction
    await userEvent.click(button);

    // Assert after interaction
    expect(button).toHaveAttribute('data-clicked', 'true');
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('animate-pulse');
  },
};
```

### 4.3 What Stories Should Test

**Best Practice Matrix** (from Vercel/Chromatic docs):

| Story          | Should Test               | Example                               |
| -------------- | ------------------------- | ------------------------------------- |
| Variant states | Visual + DOM              | `Primary`, `Secondary`, `Loading`     |
| Interactive    | Interactions + assertions | `play()` with userEvent               |
| Error states   | Error UI + messages       | `Error`, `Invalid` variants           |
| Accessibility  | a11y attributes           | `aria-label`, `role`, `aria-disabled` |
| Edge cases     | Truncation, overflow      | Long text, emoji, special chars       |
| Dark mode      | Theme variants            | Added via decorator                   |

---

## Part 5: GitHub Actions CI Integration

### 5.1 Current CI Job (ci.yml)

**File Path**: `.github/workflows/ci.yml`

**Current Status**: ✅ Has unit test job (lines 55-72), but NO story test job

### 5.2 Add Story Test Job to CI

**Insert after line 72** (after unit test job):

```yaml
storybook-tests:
  name: Storybook Component Tests
  runs-on: ubuntu-latest
  permissions:
    contents: read
  steps:
    - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
    - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: khelsetu-frontend/package-lock.json
    - run: npm ci
    - run: npm run test:stories
    - name: Upload Storybook test results
      if: always()
      uses: actions/upload-artifact@834a144ee995460fba8ed112a2fc961b36a5ec5a # v4.3.6
      with:
        name: storybook-test-results
        path: khelsetu-frontend/test-results/
        retention-days: 30

storybook-coverage:
  name: Storybook Coverage
  runs-on: ubuntu-latest
  permissions:
    contents: read
  steps:
    - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
    - uses: actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af # v4.1.0
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        cache-dependency-path: khelsetu-frontend/package-lock.json
    - run: npm ci
    - run: npm run test:stories:coverage
    - name: Upload coverage reports
      uses: codecov/codecov-action@5ecb98a3c6b747ed38dc09f064f2b8d3fbb84a16 # v4.3.1
      with:
        files: ./khelsetu-frontend/coverage/coverage-final.json
        flags: storybook
        name: storybook-coverage
```

### 5.3 Update CI Gatekeeper (line 156)

**Current**: `needs: [gitleaks, quality, test, coverage, circular, build, e2e, security]`

**Updated**:

```yaml
needs:
  [
    gitleaks,
    quality,
    test,
    coverage,
    circular,
    build,
    e2e,
    security,
    storybook-tests,
    storybook-coverage,
  ]
```

---

## Part 6: Coverage Collection

### 6.1 Why Story Coverage Matters

- **Chromatic/Vercel Pattern**: Stories ARE tests
- **Coverage includes**: Visual regression + interaction coverage
- **Separate metric**: Story coverage ≠ unit test coverage
- **Combined**: Unit + story coverage = comprehensive

### 6.2 Coverage Configuration

**Add to vitest.workspace.ts story test config**:

```typescript
{
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    include: ['src/**/*.stories.@(ts|tsx)'],
    name: 'storybook',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage/storybook',
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mocks/**',
        'e2e/**',
        'public/**',
      ],
    },
  },
}
```

### 6.3 Coverage Reports

**Output locations**:

- Unit tests: `coverage/` (existing)
- Story tests: `coverage/storybook/` (new)
- Combined HTML: View both in CI artifacts

---

## Part 7: Running Storybook Tests Locally

### 7.1 Full Storybook (Interactive)

```bash
npm run storybook
# Opens http://localhost:6006
# Vitest addon visible in toolbar
```

### 7.2 Run Story Tests (Headless)

```bash
npm run test:stories
# Runs all .stories.tsx files through Vitest
# Uses jsdom environment (no browser)
```

### 7.3 Run with Coverage

```bash
npm run test:stories:coverage
# Generates coverage report in coverage/storybook/
# Shows what % of component code is tested via stories
```

### 7.4 Watch Mode

```bash
npm run test:stories -- --watch
# Reruns when stories change
```

---

## Part 8: Advanced: Parallel Story Tests

### 8.1 Shard Story Tests (like unit tests)

**GitHub Actions approach** (similar to unit tests):

```yaml
storybook-tests:
  name: Storybook Tests (Shard ${{ matrix.shard }}/2)
  runs-on: ubuntu-latest
  strategy:
    fail-fast: false
    matrix:
      shard: [1, 2]
  steps:
    - uses: actions/checkout@...
    - uses: actions/setup-node@...
    - run: npm ci
    - run: npm run test:stories -- --shard=${{ matrix.shard }}/2
```

### 8.2 Why Shard?

- Stories can be slow (jsdom rendering each story)
- Parallel = faster CI
- 50+ stories → 2-5s each with sharding vs 30-50s sequential

---

## Part 9: Common Issues & Solutions

### Issue 1: Stories excluded from tests

**Problem**: Vitest skips `.stories.tsx` files
**Cause**: `exclude: ['**/*.stories.*']` in vitest.config.ts
**Solution**: Use separate config or workspace

### Issue 2: Missing `@storybook/test` imports

**Problem**: `userEvent`, `expect`, `within` not found
**Solution**: Install `@storybook/test` (comes with addon-vitest)

### Issue 3: Coverage not combining

**Problem**: Unit + story coverage not merged
**Solution**: Separate reports OK for now (tracked independently)

### Issue 4: Slow story tests

**Problem**: jsdom rendering is slow
**Solution**: Shard across matrix jobs (Part 8)

### Issue 5: Play function timeouts

**Problem**: `play()` function takes >5s
**Solution**: Increase timeout in vitest config

```typescript
test: {
  testTimeout: 10000, // 10s instead of default 5s
}
```

---

## Part 10: Copy-Paste Implementation Checklist

### Files to Create/Modify

- [ ] **NEW**: `khelsetu-frontend/vitest.workspace.ts` (Part 3.2)
- [ ] **EDIT**: `khelsetu-frontend/.storybook/preview.tsx` (Part 3.3)
- [ ] **EDIT**: `khelsetu-frontend/package.json` (Part 3.4)
- [ ] **EDIT**: `.github/workflows/ci.yml` (Part 5.2 + 5.3)
- [ ] **ENHANCE**: Existing stories with `play()` functions (Part 4.2)

### Verification Commands

```bash
# Local: Test stories work
npm run test:stories

# Local: Coverage report
npm run test:stories:coverage

# CI simulation (full CI pipeline)
npm run validate  # Already includes all tests
```

---

## Part 11: Industry Examples

### Vercel (Next.js)

- Uses stories as component tests
- Coverage threshold: 80%
- Shard approach: 4-6 parallel jobs
- CI time: ~2 min for stories

### Chromatic (Storybook)

- Dedicated story test job
- Uses `@storybook/addon-vitest`
- Combines visual + interaction tests
- Coverage: separate metric

### Stripe (React components)

- Play functions test interactions
- Before/after assertions
- A11y checks in stories
- Coverage: 85% target

### Linear (React)

- Story coverage == acceptance tests
- Play functions extensive
- Dark mode tested via decorators
- CI: Parallel story test jobs

---

## Next Steps

1. Create `vitest.workspace.ts`
2. Update `.storybook/preview.tsx`
3. Add scripts to `package.json`
4. Update `.github/workflows/ci.yml`
5. Add `play()` functions to existing stories
6. Test locally: `npm run test:stories`
7. Push to GitHub and verify CI passes
