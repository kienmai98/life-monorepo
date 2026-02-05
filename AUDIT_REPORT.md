# 🔍 LIFE-MONOREPO FULL AUDIT REPORT

**Audit Date:** 2026-02-03  
**Auditor:** Audit Repo Đĩ của ba Dan 📊🔍  
**Repository:** https://github.com/kienmai98/life-monorepo  

---

## 📋 EXECUTIVE SUMMARY

| Category | Status | Score |
|----------|--------|-------|
| **Build** | ⚠️ PARTIAL | 60% |
| **Lint** | ❌ FAILED | 35% |
| **Format** | ❌ FAILED | 25% |
| **Test** | ❌ FAILED | 20% |
| **Security** | 🔴 CRITICAL | 15% |
| **Dependencies** | ⚠️ OUTDATED | 40% |

**OVERALL HEALTH:** 🔴 **NEEDS IMMEDIATE ATTENTION**

---

## 🏗️ BUILD STATUS

| App | Status | Notes |
|-----|--------|-------|
| `@life/api` | ✅ PASS | TypeScript compilation successful |
| `@life/web` | ✅ PASS | Vite build successful (142.78 kB gzipped) |
| `@life/types` | ✅ PASS | TypeScript compilation successful |
| `@life/cms` | ❌ FAIL | **React version mismatch: react@19.2.0 vs react-dom@19.2.4** |
| `@life/native` | ❌ FAIL | Build command syntax error |

### Build Errors
```
@life/cms: Incompatible React versions:
  - react:      19.2.0
  - react-dom:  19.2.4
```

---

## 🧹 LINT & CODE QUALITY (Biome)

### Lint Results: ❌ FAILED
- **Files Checked:** 360
- **Errors:** 116
- **Warnings:** 124
- **Time:** 296ms

### Top Issues:
| Issue Type | Count | Severity |
|------------|-------|----------|
| `noExplicitAny` | ~40 | Warning |
| `useImportType` | ~15 | Error (Auto-fixable) |
| `useNumberNamespace` | ~8 | Error (Auto-fixable) |
| `useNodejsImportProtocol` | ~5 | Error (Auto-fixable) |
| `unused suppression comments` | ~8 | Warning |

### Critical Files with Issues:
- `apps/api/src/index.ts` - useNumberNamespace
- `apps/api/src/routes/__tests__/*.test.ts` - noExplicitAny
- `apps/native/src/shared/utils/performance.ts` - noExplicitAny, noNonNullAssertion
- Multiple e2e test files - useImportType

### Format Results: ❌ FAILED
- **Files Need Formatting:** 63+
- Issues: Wrong quote style, trailing commas, array formatting

---

## 🧪 TEST STATUS

| App | Tests | Passed | Failed | Status |
|-----|-------|--------|--------|--------|
| `@life/api` | 8 | 8 | 0 | ⚠️ PARTIAL (2 test files failed to load) |
| `@life/web` | 0 | 0 | 4 | ❌ FAIL (missing mocks/server) |
| `@life/native` | 0 | 0 | 7 | ❌ FAIL (Jest ESM config issue) |
| `@life/types` | 30 | 30 | 0 | ✅ PASS |
| `@life/cms` | - | - | - | ⏭️ SKIPPED (no tests configured) |

### Test Errors:

**API:**
```
Failed to load url ../plugins/jwt
- transactions.routes.test.ts
- auth.routes.test.ts
```

**Web:**
```
Failed to resolve import "../mocks/server" from "src/__tests__/setupTests.ts"
```

**Native:**
```
Jest encountered an unexpected token
import '@react-native/js-polyfills/error-guard';
^^^^^^
SyntaxError: Cannot use import statement outside a module
```

---

## 🔒 SECURITY AUDIT (pnpm audit)

### Summary: 🔴 CRITICAL
- **Total Dependencies:** 1,290
- **Vulnerabilities:** 14
- **Critical:** 2
- **High:** 2
- **Moderate:** 7
- **Low:** 3

### Critical Vulnerabilities:

#### 1. CVE-2025-29927 - Authorization Bypass in Next.js Middleware
- **Package:** `next`
- **Severity:** CRITICAL (CVSS 9.1)
- **Affected:** `>=15.0.0 <15.2.3`
- **Current:** `15.1.0`
- **Patched:** `>=15.2.3`
- **Impact:** Authorization bypass via `x-middleware-subrequest` header
- **Action:** ⬆️ Upgrade to Next.js 15.2.3+ IMMEDIATELY

#### 2. GHSA-9qr9-h5gf-34mp - RCE in React Flight Protocol
- **Package:** `next`
- **Severity:** CRITICAL (CVSS 10.0)
- **Affected:** `>=15.1.0-canary.0 <15.1.9`
- **Current:** `15.1.0`
- **Patched:** `>=15.1.9`
- **Impact:** Remote Code Execution via React flight protocol
- **Action:** ⬆️ Upgrade to Next.js 15.1.9+ IMMEDIATELY

### High Severity:

#### 3. CVE-2025-49826 - DoS via Cache Poisoning
- **Package:** `next`
- **Severity:** HIGH (CVSS 7.5)
- **Affected:** `>=15.0.4-canary.51 <15.1.8`
- **Patched:** `>=15.1.8`

#### 4. CVE-2026-25128 - fast-xml-parser RangeError DoS
- **Package:** `fast-xml-parser`
- **Severity:** HIGH (CVSS 7.5)
- **Path:** `@react-native-community/cli > fast-xml-parser`
- **Affected:** `>=4.3.6 <=5.3.3`
- **Patched:** `>=5.3.4`

### Moderate Severity (7):
| CVE | Package | Issue |
|-----|---------|-------|
| CVE-2024-56332 | next | DoS with Server Actions |
| GHSA-67mh-4wv8-2f99 | esbuild | CORS dev server leak |
| CVE-2025-57752 | next | Image optimization cache confusion |
| CVE-2025-55173 | next | Content injection in Image Optimization |
| CVE-2025-57822 | next | SSRF via middleware redirect |
| CVE-2025-59471 | next | DoS via Image Optimizer |
| CVE-2025-59472 | next | Memory consumption via PPR |

### Low Severity (3):
| CVE | Package | Issue |
|-----|---------|-------|
| CVE-2025-48068 | next | Dev server origin verification |
| CVE-2025-32421 | next | Race condition cache poisoning |
| CVE-2026-25224 | fastify | DoS via WebStream |

---

## 📦 DEPENDENCY ANALYSIS

### Package Manager: pnpm 10.28.2 ✅

### Monorepo Structure:
```
apps/
  ├── api/          (@life/api)     - Fastify + TypeScript
  ├── web/          (@life/web)     - React 18 + Vite
  ├── native/       (@life/native)  - React Native 0.83
  └── cms/          (@life/cms)     - Next.js 15 + React 19
packages/
  └── types/        (@life/types)   - Shared TypeScript types
```

### Version Conflicts:
- **React:** Multiple versions (18.2.0, 19.0.0, 19.2.0)
- **React-DOM:** Mismatch in CMS (19.2.4 vs react@19.2.0)
- **TypeScript:** 5.8.3 (consistent) ✅

### Outdated Major Dependencies:
| Package | Current | Latest | Risk |
|---------|---------|--------|------|
| next | 15.1.0 | 15.x | 🔴 Critical CVEs |
| fastify | 5.7.2 | 5.7.3+ | 🟡 Low CVE |
| esbuild | 0.21.5 | 0.25.0+ | 🟡 Moderate CVE |

---

## ⚙️ GITHUB ACTIONS WORKFLOW

### Workflow File: `.github/workflows/test.yml`

**Status:** ⚠️ Configuration Issues Detected

### Issues:
1. **Uses npm instead of pnpm** - Workflow uses `npm ci` but project uses pnpm
2. **Missing packageManager respect** - Should use `pnpm install --frozen-lockfile`
3. **Cache configuration** - Uses npm cache, not pnpm cache

### Workflow Jobs:
| Job | Condition | Issue |
|-----|-----------|-------|
| lint-and-typecheck | Always | Uses npm instead of pnpm |
| test-native | After lint | May fail due to Jest config |
| test-web | After lint | Mock server file missing |
| test-api | After lint | JWT plugin path issue |
| test-types | After lint | ✅ Working |
| test-e2e | After web+api | Playwright not configured |

---

## 📊 CODE STATISTICS

| Metric | Value |
|--------|-------|
| Total Size | 1.4 GB |
| Source Files (TS/TSX/JS/JSX) | 178 files |
| Lines of Code (approx) | 15,547 lines |
| node_modules directories | 3,831 |
| pnpm-lock.yaml lines | 13,053 |
| Dependencies | 1,290 |

---

## 🎯 PRIORITY FIXES

### 🔴 CRITICAL (Fix Immediately)

1. **Upgrade Next.js in CMS**
   ```bash
   cd apps/cms
   pnpm add next@latest react@latest react-dom@latest
   ```

2. **Fix React Version Mismatch**
   ```json
   {
     "react": "^19.0.0",
     "react-dom": "^19.0.0"
   }
   ```

3. **Run Formatter**
   ```bash
   pnpm run format
   ```

### 🟡 HIGH (Fix This Week)

4. **Fix API Tests**
   - Create missing `plugins/jwt.ts` or fix import path
   - Update test setup

5. **Fix Web Tests**
   - Create `src/mocks/server.ts`
   - Configure MSW properly

6. **Fix Native Tests**
   - Update Jest config for ESM support
   - Add transformIgnorePatterns

7. **Fix GitHub Actions**
   - Switch from npm to pnpm
   - Update cache configuration

### 🟢 MEDIUM (Fix Next Sprint)

8. **Resolve Lint Issues**
   ```bash
   pnpm run lint:biome -- --write
   ```

9. **Update Security Patches**
   ```bash
   pnpm audit --fix
   ```

10. **Align React Versions**
    - Standardize on React 18 or 19 across all apps

---

## 📝 RECOMMENDATIONS

### Immediate Actions:
1. ⚠️ **DO NOT DEPLOY** CMS app until Next.js is upgraded
2. 🔒 Address critical security vulnerabilities before production
3. 🧪 Fix test infrastructure to ensure CI/CD reliability

### Architecture Improvements:
1. **Single React Version** - Use pnpm catalogs or syncpack
2. **Unified Test Setup** - Share test utilities across apps
3. **Strict CI/CD** - Block merges on test failures
4. **Automated Security Scanning** - Add to GitHub Actions

### Tooling:
1. Add `syncpack` for dependency alignment
2. Configure `renovate` or `dependabot` for auto-updates
3. Add pre-commit hooks with lint-staged

---

## ✅ VERIFICATION CHECKLIST

- [ ] Build passes for all apps
- [ ] All tests pass
- [ ] Lint checks pass
- [ ] Format checks pass
- [ ] No critical/high security vulnerabilities
- [ ] GitHub Actions workflow uses pnpm
- [ ] React versions aligned
- [ ] TypeScript strict mode enabled

---

**Report Generated:** 2026-02-03  
**Next Audit Recommended:** After critical fixes applied
