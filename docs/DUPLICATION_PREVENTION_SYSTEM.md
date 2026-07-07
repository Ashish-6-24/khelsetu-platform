# KhelSetu: Permanent Duplication Prevention System

**Date:** 2026-07-01  
**Status:** Implemented & Active  
**Purpose:** Prevent build artifacts, dependencies, and duplicate folders from being committed or pushed

---

## Overview

This system uses three layers of defense to ensure no duplicate/build files reach the repository:

1. **`.gitignore`** — Comprehensive patterns for all build artifacts and duplicates
2. **Pre-commit hook** — Blocks staging of forbidden files
3. **Pre-push hook** — Final verification before pushing to remote
4. **Commit-msg hook** — Warns about suspicious commit messages

---

## What Gets Blocked

### Build & Dependency Artifacts (CRITICAL)

```
node_modules/          # Dependencies (can be 1GB+)
dist/                  # Build output
build/                 # Build output
coverage/              # Test coverage reports
.next/                 # Next.js build
.turbo/                # Turborepo cache
```

### Backup & Duplicate Folders (CRITICAL)

```
backup/                # Manual backups
backups/               # Manual backups
old/                   # Old versions
archive/               # Archived code
duplicate*/            # Duplicate* pattern
copy*/                 # Copy* pattern
```

### Secrets & Sensitive Files (SECURITY)

```
.env*                  # Environment variables
*.pem, *.key           # Private keys
*.cert                 # Certificates
secrets/               # Secrets folder
private/               # Private data
```

---

## How Each Layer Works

### Layer 1: .gitignore

**Location:** `/khelsetu/.gitignore`

The comprehensive `.gitignore` file prevents Git from even tracking these files. It uses:

- **Exact directory names** (e.g., `node_modules/`)
- **Wildcard patterns** (e.g., `duplicate*/`, `copy*`)
- **Extension patterns** (e.g., `*.log`, `*.env`)

**Key sections:**

1. Build & dependency artifacts
2. Generated & temporary files
3. Development environment & tools
4. Duplicate folders (critical prevention)
5. Security (secrets, credentials)

**How it works:**

- Git ignores files matching these patterns
- Untracked files can't be staged
- Reduces repository bloat

---

### Layer 2: Pre-commit Hook

**Location:** `/khelsetu/.git/hooks/pre-commit`  
**Trigger:** `git commit` command  
**Action:** Validates staged files BEFORE commit is created

**Protection:**

- Scans all staged files for forbidden directories
- Checks for dangerous patterns (backup/, copy*, duplicate*)
- Blocks secrets (.env, .pem, .key, .cert)
- Warns about large files (>50MB)

**Example output when violated:**

```
❌ COMMIT BLOCKED: Forbidden files/folders detected

The following files cannot be committed:
  ✗ khelsetu-frontend/node_modules
  ✗ khelsetu-frontend/dist
  ✗ backup-old-code/

Reason: These are build artifacts, dependencies, or duplicates.

✓ Solution:
  1. Run: git reset HEAD <file>
  2. Ensure .gitignore includes these patterns
  3. Try commit again
```

---

### Layer 3: Pre-push Hook

**Location:** `/khelsetu/.git/hooks/pre-push`  
**Trigger:** `git push` command  
**Action:** Validates all commits to be pushed BEFORE reaching remote

**Protection:**

- Scans each commit for violations
- Prevents pushing commits with forbidden files
- Acts as final safety net before remote

---

### Layer 4: Commit-msg Hook

**Location:** `/khelsetu/.git/hooks/commit-msg`  
**Trigger:** `git commit` command  
**Action:** Validates commit message format and content

**Protection:**

- Enforces minimum message length (10 chars)
- Warns about suspicious keywords (duplicate, copy, backup, revert)
- Prevents empty or nonsensical commits

---

## Installation & Verification

All hooks are **already installed and active**. Verify with:

```bash
# Check hooks exist and are executable
ls -lh /home/ashish-subedi/khelsetu/.git/hooks/pre-*

# Expected output:
# -rwxrwxr-x pre-commit
# -rwxrwxr-x pre-push
# -rwxrwxr-x commit-msg
```

---

## Testing the System

### Test 1: Try committing node_modules

```bash
cd /khelsetu
# Try to stage node_modules (this will fail)
git add khelsetu-frontend/node_modules/ 2>&1 || true

# Try to commit
git commit -m "test: add node_modules"

# Expected: Pre-commit hook blocks it
# ❌ COMMIT BLOCKED: Forbidden files/folders detected
```

### Test 2: Try committing backup folder

```bash
# Create a backup folder
mkdir -p /khelsetu/backup-old-code
echo "old code" > /khelsetu/backup-old-code/index.js

# Try to commit
git add /khelsetu/backup-old-code/
git commit -m "add backup"

# Expected: Pre-commit hook blocks it
# ❌ COMMIT BLOCKED: backup is forbidden
```

### Test 3: Try pushing with violations

```bash
# If somehow a violation reaches git history:
git push origin feat/branch

# Expected: Pre-push hook blocks it before remote receives it
# ❌ PUSH BLOCKED: violation(s) found
```

---

## Troubleshooting

### Q: "Pre-commit hook failed but I need to commit anyway"

**A:** Hooks can be bypassed (NOT RECOMMENDED), but don't do this for duplicate files:

```bash
# DANGEROUS - only for legitimate exceptions:
git commit --no-verify -m "message"

# Better: Fix the actual issue instead
git reset HEAD <forbidden-file>
# Then commit normally
```

### Q: "I accidentally committed a large file, how do I remove it?"

**A:** Use BFG Repo-Cleaner or git filter-branch:

```bash
# Option 1: Remove from last commit (if not pushed)
git reset HEAD~1
git reset khelsetu-frontend/node_modules
git commit -m "remove node_modules"

# Option 2: Amend last commit (if not pushed)
git rm --cached khelsetu-frontend/node_modules
git commit --amend -m "fix: remove node_modules"
```

### Q: "Hook is not running, why?"

**A:** Check hook permissions:

```bash
# Verify executable permissions
ls -l /khelsetu/.git/hooks/pre-commit
# Should show: -rwxr-xr-x (755 permissions)

# If not executable, fix it:
chmod +x /khelsetu/.git/hooks/pre-commit
chmod +x /khelsetu/.git/hooks/pre-push
chmod +x /khelsetu/.git/hooks/commit-msg
```

### Q: "I'm on Windows and hooks don't work"

**A:** Windows requires Git Bash or WSL. Alternatively, use Husky (optional enhancement):

```bash
npm install husky --save-dev
npx husky install
```

---

## For Team Members

### When joining the project:

1. **Hooks are automatic** — No setup needed after git clone
2. **If hooks don't run**, verify permissions:
   ```bash
   chmod +x .git/hooks/*
   ```
3. **Never bypass hooks** for build artifacts
4. **Always use `.gitignore`** — it's the first line of defense

### Common mistakes to avoid:

❌ Don't commit `node_modules/`  
❌ Don't commit `dist/` or `build/`  
❌ Don't commit `coverage/`  
❌ Don't create backup folders in the repo  
❌ Don't copy code into `duplicate*/` or `copy*/` folders  
❌ Don't commit `.env` files

✅ Use `.gitignore` to exclude build output  
✅ Use separate branches for experiments  
✅ Delete old code instead of archiving in repo  
✅ Store secrets in environment variables

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────┐
│         PERMANENT DUPLICATION PREVENTION             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Layer 1: .gitignore                               │
│  ├─ Prevents tracking build artifacts              │
│  ├─ Prevents tracking dependencies                 │
│  └─ Prevents tracking backup/duplicate folders     │
│                                                      │
│  Layer 2: Pre-commit Hook                          │
│  ├─ Scans staged files                             │
│  ├─ Blocks forbidden directories                   │
│  └─ Prevents commit creation                       │
│                                                      │
│  Layer 3: Pre-push Hook                            │
│  ├─ Scans commits to be pushed                     │
│  ├─ Final verification before remote               │
│  └─ Prevents push to GitHub                        │
│                                                      │
│  Layer 4: Commit-msg Hook                          │
│  ├─ Validates message format                       │
│  ├─ Warns about suspicious keywords                │
│  └─ Prevents empty commits                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Files Modified/Created

| File                               | Purpose                                       |
| ---------------------------------- | --------------------------------------------- |
| `.gitignore`                       | Comprehensive ignore patterns (ALL artifacts) |
| `.git/hooks/pre-commit`            | Block staging of forbidden files              |
| `.git/hooks/pre-push`              | Block pushing forbidden commits               |
| `.git/hooks/commit-msg`            | Validate commit message format                |
| `DUPLICATION_PREVENTION_SYSTEM.md` | This documentation                            |

---

## Success Criteria

✅ No `node_modules/` in repository  
✅ No `dist/`, `build/`, or `coverage/` in repository  
✅ No `backup*/`, `copy*/`, or `duplicate*/` folders  
✅ No `.env` or `.pem` files committed  
✅ No commits blocked without reason  
✅ All team members understand the system

---

## Quick Reference

### For Developers

```bash
# Check what's ignored
cat .gitignore

# See what would be committed
git diff --cached --name-only

# Unstage if you accidentally staged something
git reset HEAD <file>

# See hook status
ls -l .git/hooks/pre-*
```

### For Repo Maintenance

```bash
# Monthly: Check repo size
du -sh .git

# Monthly: Verify hooks are executable
chmod +x .git/hooks/pre-* .git/hooks/commit-msg

# Monthly: Review .gitignore
head -50 .gitignore
```

---

## Implementation Status

| Component       | Status      | Location                          |
| --------------- | ----------- | --------------------------------- |
| .gitignore      | ✅ Active   | `/khelsetu/.gitignore`            |
| Pre-commit hook | ✅ Active   | `/khelsetu/.git/hooks/pre-commit` |
| Pre-push hook   | ✅ Active   | `/khelsetu/.git/hooks/pre-push`   |
| Commit-msg hook | ✅ Active   | `/khelsetu/.git/hooks/commit-msg` |
| Documentation   | ✅ Complete | This file                         |

---

## Last Updated

**Date:** 2026-07-01  
**Status:** Production Ready ✓  
**System Verified:** All hooks functional and executable
