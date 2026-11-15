/**
 * scripts/verify-styling.ts
 *
 * Automated Styling & Design System Verification Suite for calculus-guide.
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 *
 * Programmatically inspects the codebase and enforces 8 strict assertions:
 * 1. Token Architecture Check: app/globals.css defines oklch( surface/brand tokens
 *    (--surface-0 through --surface-3), --border-hairline, --border-specular, and .surface-grain.
 * 2. No Hardcoded Hex Soup on Core Pages: app/page.tsx and components/layout/Header.tsx
 *    contain zero arbitrary hex utility classes (bg-[#...], text-[#...], border-[#...]) or generic bg-blue-700.
 * 3. Anti-AI-Slop Layout Check: app/page.tsx uses a 12-column asymmetric Bento grid
 *    (grid-cols-12 with lg:col-span-7 / lg:col-span-5) and contains zero banned
 *    indigo-500 to-purple-600 gradients or backdrop-blur stacking (>2 per view).
 * 4. Optical Typography Triad & Tabular Nums Check: tailwind.config.ts and core components
 *    apply font-reading, font-sans, font-mono, and tabular-nums on numerical counters/badges,
 *    plus 65ch-72ch prose width caps.
 * 5. Interactive Calculus Micro-Artifact Check: app/page.tsx (or an imported hero visualizer)
 *    renders an interactive <svg> calculus graphic with interactive controls/readouts.
 * 6. KaTeX Light/Dark Contrast & Mobile Scroll Check: app/globals.css enforces .katex-display
 *    and .math-block-scroll overflow-x: auto containment and high-contrast light/dark color rules.
 * 7. Reduced Motion & A11y Focus Ring Check: app/globals.css includes
 *    @media (prefers-reduced-motion: reduce) and :focus-visible outline rules.
 * 8. Creator Attribution Check: components/layout/Footer.tsx and app/layout.tsx preserve
 *    "Made by Muhammad Abdullah Athar" and https://github.com/AbdullahMalik17.
 */

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = path.resolve(__dirname, '..');

interface AssertionResult {
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

export function runStylingVerification(): { allPassed: boolean; results: AssertionResult[] } {
  console.log('\n======================================================================');
  console.log('         CALCULUS-GUIDE STYLING & DESIGN SYSTEM VERIFICATION          ');
  console.log('======================================================================');
  console.log('Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)\n');

  const globalsCss = readProjectFile('app/globals.css');
  const tailwindConfig = readProjectFile('tailwind.config.ts');
  const landingPage = readProjectFile('app/page.tsx');
  const headerFile = readProjectFile('components/layout/Header.tsx');
  const footerFile = readProjectFile('components/layout/Footer.tsx');
  const layoutFile = readProjectFile('app/layout.tsx');
  const bookReaderFile = readProjectFile('components/section/BookSectionReader.tsx');
  const practiceCardFile = readProjectFile('components/practice/PracticeProblemCard.tsx');
  const quizQuestionFile = readProjectFile('components/quiz/QuizQuestion.tsx');
  const midsHubFile = readProjectFile('components/mids/MidsExamHub.tsx');
  const dashboardFile = readProjectFile('app/dashboard/page.tsx');

  const results: AssertionResult[] = [];

  // 1. Token Architecture Check
  {
    const requiredTokens = [
      'oklch(',
      '--surface-0',
      '--surface-1',
      '--surface-2',
      '--surface-3',
      '--border-hairline',
      '--border-specular',
      '--callout-theorem',
      '--callout-definition',
      '--callout-example',
      '--callout-misconception',
      '.surface-grain',
      'feTurbulence',
    ];
    const missing = requiredTokens.filter((t) => !globalsCss.includes(t));
    results.push({
      id: 1,
      name: 'Token Architecture Check (oklch, surfaces 0-3, specular/hairline, .surface-grain)',
      passed: missing.length === 0,
      details:
        missing.length === 0
          ? 'All 3-layer oklch() surface, border, callout tokens, and .surface-grain defined in app/globals.css.'
          : `Missing tokens in app/globals.css: ${missing.join(', ')}`,
    });
  }

  // 2. No Hardcoded Hex Soup on Core Pages
  {
    const hexClassRegex = /\b(?:bg|text|border|from|via|to)-\[#[0-9a-fA-F]{3,8}\]/g;
    const pageHexMatches = landingPage.match(hexClassRegex) ?? [];
    const headerHexMatches = headerFile.match(hexClassRegex) ?? [];
    const hasGenericBlue700 = landingPage.includes('bg-blue-700') || headerFile.includes('bg-blue-700');

    const passed = pageHexMatches.length === 0 && headerHexMatches.length === 0 && !hasGenericBlue700;
    results.push({
      id: 2,
      name: 'No Hardcoded Hex Soup on Core Pages (app/page.tsx & Header.tsx)',
      passed,
      details: passed
        ? 'Zero arbitrary [#...] hex classes and zero generic bg-blue-700 in app/page.tsx and Header.tsx.'
        : `Found hex classes (${[...pageHexMatches, ...headerHexMatches].join(', ')}) or bg-blue-700=${hasGenericBlue700}.`,
    });
  }

  // 3. Anti-AI-Slop Layout Check
  {
    const hasBento12 = landingPage.includes('grid-cols-12');
    const hasCol7 = landingPage.includes('lg:col-span-7');
    const hasCol5 = landingPage.includes('lg:col-span-5');
    const hasSymmetric3ColBenefits = landingPage.includes('learningBenefits');
    const hasBannedGradient =
      /indigo-500[\s\S]{0,40}to-purple-600/.test(landingPage) ||
      /indigo-500[\s\S]{0,40}to-purple-600/.test(globalsCss);
    const pageBlurCount = (landingPage.match(/backdrop-blur/g) ?? []).length;
    const headerBlurCount = (headerFile.match(/backdrop-blur/g) ?? []).length;
    const blurWithinLimit = pageBlurCount <= 2 && headerBlurCount <= 2;

    const passed =
      hasBento12 &&
      hasCol7 &&
      hasCol5 &&
      !hasSymmetric3ColBenefits &&
      !hasBannedGradient &&
      blurWithinLimit;

    results.push({
      id: 3,
      name: 'Anti-AI-Slop Asymmetric 12-Col Bento Grid & Gradient/Blur Discipline',
      passed,
      details: passed
        ? 'Asymmetric 12-col Bento grid (lg:col-span-7 + lg:col-span-5) verified with 0 banned gradients or blur stacking.'
        : `Bento=${hasBento12}/${hasCol7}/${hasCol5}, symmetricBenefits=${hasSymmetric3ColBenefits}, bannedGrad=${hasBannedGradient}, blurs=${pageBlurCount}/${headerBlurCount}`,
    });
  }

  // 4. Optical Typography Triad & Tabular Nums Check
  {
    const hasTriadInTailwind =
      tailwindConfig.includes('reading:') &&
      tailwindConfig.includes('sans:') &&
      tailwindConfig.includes('mono:');
    const combinedComponents =
      landingPage +
      headerFile +
      bookReaderFile +
      practiceCardFile +
      quizQuestionFile +
      midsHubFile +
      dashboardFile;

    const usesFontReading = combinedComponents.includes('font-reading');
    const usesFontSans = combinedComponents.includes('font-sans') || layoutFile.includes('font-sans');
    const usesFontMono = combinedComponents.includes('font-mono');
    const tabularNumsCount = (combinedComponents.match(/tabular-nums/g) ?? []).length;
    const hasProseMeasureCap =
      /(?:max-width:\s*(?:6[5-9]|7[0-2])ch|max-w-\[(?:6[5-9]|7[0-2])ch\])/.test(
        globalsCss + combinedComponents
      );

    const passed =
      hasTriadInTailwind &&
      usesFontReading &&
      usesFontSans &&
      usesFontMono &&
      tabularNumsCount >= 10 &&
      hasProseMeasureCap;

    results.push({
      id: 4,
      name: 'Optical Typography Triad (reading/sans/mono), Tabular Nums & 65ch-72ch Measure',
      passed,
      details: passed
        ? `Triad active across components (${tabularNumsCount} tabular-nums instances, 65ch-72ch prose caps enforced).`
        : `Triad=${hasTriadInTailwind}, reading=${usesFontReading}, sans=${usesFontSans}, mono=${usesFontMono}, tabularCount=${tabularNumsCount}, measure=${hasProseMeasureCap}`,
    });
  }

  // 5. Interactive Calculus Micro-Artifact Check
  {
    const heroCalculusCardFile = fs.existsSync(
      path.resolve(PROJECT_ROOT, 'components/math/HeroCalculusCard.tsx')
    )
      ? readProjectFile('components/math/HeroCalculusCard.tsx')
      : '';
    const secantExplorerFile = fs.existsSync(
      path.resolve(PROJECT_ROOT, 'components/math/SecantTangentExplorer.tsx')
    )
      ? readProjectFile('components/math/SecantTangentExplorer.tsx')
      : '';
    const heroSource = landingPage + '\n' + heroCalculusCardFile + '\n' + secantExplorerFile;

    const noEmptyRightPlaceholder = !landingPage.includes('w-1/3 bg-gradient-to-bl');
    const hasHeroCardRendered =
      landingPage.includes('<HeroCalculusCard') && heroCalculusCardFile.length > 0;
    const hasSvg = heroSource.includes('<svg') && heroSource.includes('</svg>');
    const hasInteractiveInput =
      heroSource.includes('type="range"') || heroSource.includes('onChange');
    const hasCalculusReadout =
      heroSource.includes('secantSlope') &&
      heroSource.includes('exactSlope') &&
      landingPage.includes('16 chapters') &&
      landingPage.includes('116 sections') &&
      landingPage.includes('100% misconception coverage');

    const passed =
      noEmptyRightPlaceholder &&
      hasHeroCardRendered &&
      hasSvg &&
      hasInteractiveInput &&
      hasCalculusReadout;
    results.push({
      id: 5,
      name: 'Interactive Calculus Micro-Artifact & Live Telemetry Check',
      passed,
      details: passed
        ? 'HeroCalculusCard 3-mode SVG explorer and SecantTangentExplorer verified with zero empty hero placeholder.'
        : `noPlaceholder=${noEmptyRightPlaceholder}, hasHeroCard=${hasHeroCardRendered}, hasSvg=${hasSvg}, hasInteractiveInput=${hasInteractiveInput}, hasCalculusReadout=${hasCalculusReadout}`,
    });
  }

  // 6. KaTeX Light/Dark Contrast & Mobile Scroll Check
  {
    const hasKatexDisplay = globalsCss.includes('.katex-display');
    const hasMathBlockScroll = globalsCss.includes('.math-block-scroll');
    const hasOverflowXAuto = (globalsCss.match(/overflow-x:\s*auto/g) ?? []).length >= 2;
    const hasDarkMathContrast =
      globalsCss.includes('.dark-math .katex-display') &&
      globalsCss.includes('.dark-math .katex');

    const passed = hasKatexDisplay && hasMathBlockScroll && hasOverflowXAuto && hasDarkMathContrast;
    results.push({
      id: 6,
      name: 'KaTeX Light/Dark Contrast & 375px Mobile Horizontal Scroll Containment',
      passed,
      details: passed
        ? '.katex-display and .math-block-scroll enforce overflow-x: auto and light/dark high-contrast rules.'
        : `katexDisplay=${hasKatexDisplay}, mathBlockScroll=${hasMathBlockScroll}, overflowAuto=${hasOverflowXAuto}, darkMath=${hasDarkMathContrast}`,
    });
  }

  // 7. Reduced Motion & A11y Focus Ring Check
  {
    const hasReducedMotion = globalsCss.includes('@media (prefers-reduced-motion: reduce)');
    const hasFocusVisible =
      globalsCss.includes(':focus-visible') && globalsCss.includes('outline:');

    const passed = hasReducedMotion && hasFocusVisible;
    results.push({
      id: 7,
      name: 'Reduced Motion (@media prefers-reduced-motion) & :focus-visible Ring Check',
      passed,
      details: passed
        ? 'Reduced motion media query and :focus-visible outline rules verified in app/globals.css.'
        : `reducedMotion=${hasReducedMotion}, focusVisible=${hasFocusVisible}`,
    });
  }

  // 8. Creator Attribution Check
  {
    const footerHasCreator =
      footerFile.includes('Made by Muhammad Abdullah Athar') &&
      footerFile.includes('https://github.com/AbdullahMalik17');
    const layoutHasCreator =
      layoutFile.includes('Muhammad Abdullah Athar') &&
      layoutFile.includes('https://github.com/AbdullahMalik17');

    const passed = footerHasCreator && layoutHasCreator;
    results.push({
      id: 8,
      name: 'Persistent Creator Attribution Check (Footer.tsx & app/layout.tsx)',
      passed,
      details: passed
        ? 'Persistent attribution "Made by Muhammad Abdullah Athar" and GitHub link preserved in Footer.tsx & layout.tsx.'
        : `footerHasCreator=${footerHasCreator}, layoutHasCreator=${layoutHasCreator}`,
    });
  }

  let allPassed = true;
  for (const r of results) {
    if (!r.passed) allPassed = false;
    const badge = r.passed ? 'PASS' : 'FAIL';
    console.log(`[${badge}] Assertion ${r.id}: ${r.name}`);
    console.log(`       ${r.details}`);
  }

  if (!allPassed) {
    console.error('\nFAILED: One or more styling & design system assertions failed.\n');
    return { allPassed: false, results };
  }

  console.log('\nSUCCESS: All 8 styling & design system checks passed cleanly!\n');
  return { allPassed: true, results };
}

if (require.main === module || (typeof process !== 'undefined' && process.argv[1]?.endsWith('verify-styling.ts'))) {
  const { allPassed } = runStylingVerification();
  process.exit(allPassed ? 0 : 1);
}
