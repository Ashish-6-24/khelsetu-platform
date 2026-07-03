#!/usr/bin/env bash
# scripts/check-duplicates.sh
# Fails if any stale/duplicate directories OR sensitive files exist in the repo.
# These are PERMANENTLY BLOCKED from being committed.

set -euo pipefail

SRC_DIR="khelsetu-frontend/src"
ROOT_DIR="."
ERRORS=0

# Stale directories that must NEVER exist (moved to shared/features/lib)
STALE_DIRS=(
  "components"
  "hooks"
  "services"
  "types-domain"
  "utils"
  "stories"
)

# Files that must NEVER be committed (sensitive, credentials, generated)
BLOCKED_FILES=(
  "puppeteer-auth.js"
  "auth-state/"
  ".auth/"
  "*.pem"
  "*.key"
  "*.cert"
)

echo "=== Duplicate/Stale Directory Check ==="

for dir in "${STALE_DIRS[@]}"; do
  if [ -d "$SRC_DIR/$dir" ]; then
    echo "  FAIL: $SRC_DIR/$dir exists — this directory was moved during the folder restructure."
    echo "        Expected locations:"
    case "$dir" in
      components) echo "          → src/shared/components/ or src/features/*/components/" ;;
      hooks)      echo "          → src/shared/hooks/ or src/features/*/hooks/" ;;
      services)   echo "          → src/features/*/services/" ;;
      types-domain) echo "        → src/shared/types/ or src/features/*/types/" ;;
      utils)      echo "          → src/shared/utils/ or src/features/*/utils/" ;;
      stories)    echo "          → colocated *.stories.tsx next to components" ;;
    esac
    ERRORS=$((ERRORS + 1))
  else
    echo "  OK:   $SRC_DIR/$dir (not present)"
  fi
done

echo ""
echo "=== Checking for stray component files in wrong locations ==="
STRAY=$(find "$SRC_DIR" -maxdepth 1 \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | grep -v "App.tsx\|main.tsx\|index.css\|vite-env.d.ts" || true)
if [ -n "$STRAY" ]; then
  echo "  WARN: Stray files in src/ root (should be in app/, pages/, features/, or shared/):"
  echo "$STRAY" | while read f; do echo "    $f"; done
fi

echo ""
echo "=== Checking for blocked files ==="
for pattern in "${BLOCKED_FILES[@]}"; do
  FOUND=$(find $ROOT_DIR -name "$pattern" -not -path "*/node_modules/*" -not -path "*/.git/*" 2>/dev/null || true)
  if [ -n "$FOUND" ]; then
    echo "  FAIL: Blocked file found: $pattern"
    echo "$FOUND" | while read f; do echo "    $f"; done
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
if [ $ERRORS -gt 0 ]; then
  echo "FAILED: $ERRORS issue(s) found. Fix before committing."
  exit 1
else
  echo "PASSED: All checks passed."
fi
