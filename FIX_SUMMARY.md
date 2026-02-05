# Fix CI/CD: Migrate from npm to pnpm

## Problem
GitHub Actions workflow was failing with:
```
npm error code EUSAGE
npm error The `npm ci` command can only install with an existing package-lock.json
```

**Root Cause:** Project uses pnpm (has `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `"packageManager": "pnpm@10.28.2"` in package.json) but the workflow was using `npm ci` which requires `package-lock.json`.

## Solution
Migrated all workflow jobs from npm to pnpm:

### Changes Made:
1. **Added pnpm setup step** to all jobs:
   ```yaml
   - name: Setup pnpm
     uses: pnpm/action-setup@v3
     with:
       version: 10.28.2
   ```

2. **Updated Node.js setup** to use pnpm cache:
   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
       node-version: '20'
       cache: 'pnpm'  # Changed from 'npm'
   ```

3. **Replaced npm ci with pnpm install**:
   ```yaml
   - name: Install dependencies
     run: pnpm install --frozen-lockfile
   ```

4. **Replaced all npm commands with pnpm**:
   - `npm run` → `pnpm run`
   - `npx` → `pnpm exec`

## Files Modified:
- `.github/workflows/test.yml`

## How to Apply This Fix:

### Option 1: Create PR manually
```bash
# Clone your repo
git clone https://github.com/kienmai98/life-monorepo.git
cd life-monorepo

# Create new branch
git checkout -b fix/ci-cd-pnpm-workflow

# Apply the patch from this workspace
git apply /path/to/fix-pnpm-workflow.patch

# Commit and push
git add .github/workflows/test.yml
git commit -m "fix(ci): migrate workflow from npm to pnpm

The project uses pnpm (pnpm-lock.yaml, pnpm-workspace.yaml) but the
GitHub Actions workflow was using npm ci which requires package-lock.json.
This caused all CI jobs to fail immediately.

Changes:
- Replace npm ci with pnpm install --frozen-lockfile
- Add pnpm/action-setup@v3 step before Node.js setup
- Replace npm commands with pnpm equivalents
- Update cache configuration to use pnpm

Fixes: https://github.com/kienmai98/life-monorepo/actions/runs/21618648468"

git push origin fix/ci-cd-pnpm-workflow

# Then create PR via GitHub UI
```

### Option 2: Manual edit
Copy the contents of `.github/workflows/test.yml` from this fix and paste into your repo.

## Note on Pre-existing Issues
After fixing the npm/pnpm mismatch, the CI will proceed to actually run the tests. There are some pre-existing code quality issues that will need separate fixes:

1. **Lint errors** (74 errors, 53 warnings) - Run `pnpm run lint:biome` locally to see them
2. **Format issues** - Run `pnpm run format:check` to see formatting issues
3. **Test failures** - May need to be addressed once CI can actually run the tests

These are separate from the CI/CD infrastructure issue that was preventing any jobs from running.

## Verification

To verify the fix locally:
```bash
# Install pnpm if not already installed
npm install -g pnpm@10.28.2

# Install dependencies
pnpm install --frozen-lockfile

# Run the commands the CI would run
pnpm run lint:biome
pnpm run format:check
cd packages/types && pnpm exec tsc --noEmit
```

## References
- Failed run: https://github.com/kienmai98/life-monorepo/actions/runs/21618648468/job/62302817261
- pnpm GitHub Action: https://github.com/pnpm/action-setup
