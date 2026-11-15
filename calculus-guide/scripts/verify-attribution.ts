/**
 * scripts/verify-attribution.ts
 *
 * Automated Top-of-Page & End-of-Page Creator Attribution Verification Suite
 * for calculus-guide.
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 *
 * Fails (exit code 1) unless all 4 strict attribution checks pass:
 * 1. components/layout/AuthorMasthead.tsx exists, renders "Muhammad Abdullah Athar",
 *    links to "https://github.com/AbdullahMalik17", and includes schema.org/Person author markup.
 * 2. app/layout.tsx imports and renders <AuthorMasthead /> at the start of
 *    <main id="main-content"> before {children} AND <Footer /> at the bottom.
 * 3. components/layout/Header.tsx displays "Muhammad Abdullah Athar" in the sticky top bar.
 * 4. app/page.tsx and components/section/BookSectionReader.tsx include explicit
 *    top-level author attribution to "Muhammad Abdullah Athar".
 */

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = path.resolve(__dirname, '..');

export interface AttributionCheckResult {
  id: number;
  name: string;
  passed: boolean;
  details: string;
}

function readProjectFile(relPath: string): string {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Required file missing: ${relPath}`);
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

export function runAttributionVerification(): {
  allPassed: boolean;
  results: AttributionCheckResult[];
} {
  console.log('\n======================================================================');
  console.log('       CALCULUS-GUIDE TOP-OF-PAGE ATTRIBUTION VERIFICATION            ');
  console.log('======================================================================');
  console.log('Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)\n');

  const results: AttributionCheckResult[] = [];

  // Check 1: components/layout/AuthorMasthead.tsx
  {
    const mastheadPath = path.resolve(PROJECT_ROOT, 'components/layout/AuthorMasthead.tsx');
    const exists = fs.existsSync(mastheadPath);
    const mastheadSrc = exists ? fs.readFileSync(mastheadPath, 'utf-8') : '';

    const hasUsePathname = mastheadSrc.includes('usePathname');
    const hasAuthorName = mastheadSrc.includes('Muhammad Abdullah Athar');
    const hasGithubUrl = mastheadSrc.includes('https://github.com/AbdullahMalik17');
    const hasGithubHandle = mastheadSrc.includes('@AbdullahMalik17');
    const hasKicker = mastheadSrc.includes('AUTHORED & ENGINEERED BY');
    const hasStatement = mastheadSrc.includes(
      'Original Mathematical Exposition & SymPy-Verified Solutions by Muhammad Abdullah Athar'
    );
    const hasSchemaPerson =
      mastheadSrc.includes('schema.org/Person') &&
      mastheadSrc.includes('itemProp="author"') &&
      mastheadSrc.includes('itemProp="name"');

    const passed =
      exists &&
      hasUsePathname &&
      hasAuthorName &&
      hasGithubUrl &&
      hasGithubHandle &&
      hasKicker &&
      hasStatement &&
      hasSchemaPerson;

    results.push({
      id: 1,
      name: 'AuthorMasthead.tsx Component, GitHub Link & Schema.org/Person Microdata',
      passed,
      details: passed
        ? 'AuthorMasthead.tsx renders Muhammad Abdullah Athar, @AbdullahMalik17 link, dynamic folio context, and schema.org/Person markup.'
        : `exists=${exists}, usePathname=${hasUsePathname}, author=${hasAuthorName}, url=${hasGithubUrl}, handle=${hasGithubHandle}, kicker=${hasKicker}, statement=${hasStatement}, schema=${hasSchemaPerson}`,
    });
  }

  // Check 2: app/layout.tsx top <AuthorMasthead /> before {children} AND bottom <Footer />
  {
    const layoutSrc = readProjectFile('app/layout.tsx');
    const footerSrc = readProjectFile('components/layout/Footer.tsx');

    const importsMasthead = layoutSrc.includes('AuthorMasthead');
    const mainIdx = layoutSrc.indexOf('<main id="main-content"');
    const mastheadIdx = layoutSrc.indexOf('<AuthorMasthead');
    const childrenIdx = layoutSrc.indexOf('{children}');
    const footerIdx = layoutSrc.indexOf('<Footer');

    const mastheadAtStartOfMain =
      mainIdx !== -1 &&
      mastheadIdx !== -1 &&
      childrenIdx !== -1 &&
      mainIdx < mastheadIdx &&
      mastheadIdx < childrenIdx;

    const footerAtBottom =
      footerIdx !== -1 &&
      childrenIdx !== -1 &&
      childrenIdx < footerIdx &&
      footerSrc.includes('Made by Muhammad Abdullah Athar') &&
      footerSrc.includes('https://github.com/AbdullahMalik17');

    const passed = importsMasthead && mastheadAtStartOfMain && footerAtBottom;

    results.push({
      id: 2,
      name: 'Root Layout Start-of-Main <AuthorMasthead /> (Before {children}) & Bottom <Footer />',
      passed,
      details: passed
        ? 'app/layout.tsx renders <AuthorMasthead /> at the start of <main id="main-content"> before {children} and <Footer /> at the bottom.'
        : `importsMasthead=${importsMasthead}, mastheadAtStartOfMain=${mastheadAtStartOfMain} (main=${mainIdx}, masthead=${mastheadIdx}, children=${childrenIdx}), footerAtBottom=${footerAtBottom}`,
    });
  }

  // Check 3: components/layout/Header.tsx sticky top bar attribution
  {
    const headerSrc = readProjectFile('components/layout/Header.tsx');
    const isSticky = headerSrc.includes('sticky top-0');
    const hasAuthorInHeader = headerSrc.includes('by Muhammad Abdullah Athar');

    const passed = isSticky && hasAuthorInHeader;
    results.push({
      id: 3,
      name: 'Sticky Top Navigation Bar Author Attribution (components/layout/Header.tsx)',
      passed,
      details: passed
        ? 'Header.tsx displays "by Muhammad Abdullah Athar" inside the sticky top navigation bar.'
        : `isSticky=${isSticky}, hasAuthorInHeader=${hasAuthorInHeader}`,
    });
  }

  // Check 4: app/page.tsx and components/section/BookSectionReader.tsx explicit top-level attribution
  {
    const homeSrc = readProjectFile('app/page.tsx');
    const readerSrc = readProjectFile('components/section/BookSectionReader.tsx');

    const homeHasByline = homeSrc.includes('By Muhammad Abdullah Athar · SymPy Verified');
    const readerHasByline = readerSrc.includes('By Muhammad Abdullah Athar · SymPy Verified');

    const passed = homeHasByline && readerHasByline;
    results.push({
      id: 4,
      name: 'Explicit Top-Level Editorial Bylines in app/page.tsx & BookSectionReader.tsx',
      passed,
      details: passed
        ? 'Both app/page.tsx hero eyebrow and BookSectionReader.tsx section header display "By Muhammad Abdullah Athar · SymPy Verified".'
        : `homeHasByline=${homeHasByline}, readerHasByline=${readerHasByline}`,
    });
  }

  let allPassed = true;
  for (const r of results) {
    if (!r.passed) allPassed = false;
    const badge = r.passed ? 'PASS' : 'FAIL';
    console.log(`[${badge}] Check ${r.id}: ${r.name}`);
    console.log(`       ${r.details}`);
  }

  if (!allPassed) {
    console.error('\nFAILED: One or more creator attribution checks failed.\n');
    return { allPassed: false, results };
  }

  console.log('\nSUCCESS: All 4 top-of-page & end-of-page attribution checks passed cleanly!\n');
  return { allPassed: true, results };
}

if (
  require.main === module ||
  (typeof process !== 'undefined' && process.argv[1]?.endsWith('verify-attribution.ts'))
) {
  const { allPassed } = runAttributionVerification();
  process.exit(allPassed ? 0 : 1);
}
