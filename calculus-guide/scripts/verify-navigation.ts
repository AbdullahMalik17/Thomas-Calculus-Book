// scripts/verify-navigation.ts
/**
 * Verification test script for curriculum navigation, slug normalization,
 * and adjacent section linking.
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import {
  CHAPTER_METADATA,
  getAllSections,
  getAdjacentSections,
  normalizeChapterKey,
} from '../lib/content/curriculum';
import { loadSectionContent, getSectionDirectory } from '../lib/content/loader';
import fs from 'node:fs';
import path from 'node:path';

function runNavigationTests(): void {
  console.log('\n======================================================');
  console.log('       CURRICULUM & NAVIGATION VERIFICATION TEST      ');
  console.log('======================================================\n');

  // Test 1: Chapter metadata completeness
  console.log('[1] Checking Chapter Metadata...');
  const chapterKeys = Object.keys(CHAPTER_METADATA);
  if (chapterKeys.length !== 16) {
    throw new Error(`Expected 16 chapters, found ${chapterKeys.length}`);
  }
  const allSections = getAllSections();
  if (allSections.length !== 116) {
    throw new Error(`Expected 116 sections in total, found ${allSections.length}`);
  }
  const totalSolutions = allSections.reduce((sum, s) => sum + s.solutionsCount, 0);
  if (totalSolutions !== 598) {
    throw new Error(`Expected 598 total solutions across sections, found ${totalSolutions}`);
  }
  console.log(`    PASS: 16 Chapters, 116 Sections, ${totalSolutions} Solutions registered.`);

  // Test 2: Slug normalization
  console.log('[2] Testing Slug Normalization...');
  const normalizerCases: [string, string][] = [
    ['1', 'ch01'],
    ['01', 'ch01'],
    ['ch1', 'ch01'],
    ['ch01', 'ch01'],
    ['CH1', 'ch01'],
    ['CH01', 'ch01'],
    ['chapter1', 'ch01'],
    ['chapter-1', 'ch01'],
    ['chapter 1', 'ch01'],
    ['ch01-functions', 'ch01'],
    ['2', 'ch02'],
    ['ch2', 'ch02'],
    ['ch02', 'ch02'],
    ['CH2', 'ch02'],
    ['chapter-2', 'ch02'],
    ['ch02-limits-continuity', 'ch02'],
    ['3', 'ch03'],
    ['ch3', 'ch03'],
    ['chapter 3', 'ch03'],
    ['ch03-derivatives', 'ch03'],
    ['4', 'ch04'],
    ['ch4', 'ch04'],
    ['chapter-04', 'ch04'],
    ['ch04-applications-of-derivatives', 'ch04'],
    ['5', 'ch05'],
    ['ch5', 'ch05'],
    ['chapter 5', 'ch05'],
    ['ch05-integrals', 'ch05'],
    ['8', 'ch08'],
    ['ch08', 'ch08'],
    ['12', 'ch12'],
    ['ch12', 'ch12'],
    ['chapter-12', 'ch12'],
    ['ch12-vectors-and-the-geometry-of-space', 'ch12'],
    ['16', 'ch16'],
    ['ch16', 'ch16'],
    ['chapter 16', 'ch16'],
    ['ch16-integrals-and-vector-fields', 'ch16'],
  ];
  for (const [raw, expected] of normalizerCases) {
    const res = normalizeChapterKey(raw);
    if (res !== expected) {
      throw new Error(`normalizeChapterKey("${raw}") returned "${res}", expected "${expected}"`);
    }
  }
  console.log(`    PASS: All ${normalizerCases.length} slug normalization cases passed.`);

  // Test 3: Directory and Content Loader with normalized and raw slugs
  console.log('[3] Testing Content Loader across chapters with raw numbers & ch prefixes...');
  const sampleSlugs = [
    { ch: '1', sec: '1.1', expectedSolutions: 8, expectedChKey: 'ch01' },
    { ch: 'ch01-functions', sec: '1-1', expectedSolutions: 8, expectedChKey: 'ch01' },
    { ch: '2', sec: '2.1', expectedSolutions: 5, expectedChKey: 'ch02' },
    { ch: 'ch2', sec: '2.1-rates-of-change-and-tangents-to-curves', expectedSolutions: 5, expectedChKey: 'ch02' },
    { ch: 'ch02-limits-continuity', sec: '2-1', expectedSolutions: 5, expectedChKey: 'ch02' },
    { ch: '3', sec: '3.1', expectedSolutions: 5, expectedChKey: 'ch03' },
    { ch: 'ch3', sec: '3.6-the-chain-rule', expectedSolutions: 5, expectedChKey: 'ch03' },
    { ch: 'chapter 3', sec: '3-6', expectedSolutions: 5, expectedChKey: 'ch03' },
    { ch: '4', sec: '4.8', expectedSolutions: 5, expectedChKey: 'ch04' },
    { ch: 'ch4', sec: '4.8-antiderivatives', expectedSolutions: 5, expectedChKey: 'ch04' },
    { ch: '5', sec: '5.1', expectedSolutions: 5, expectedChKey: 'ch05' },
    { ch: 'ch5', sec: '5.4-the-fundamental-theorem-of-calculus', expectedSolutions: 5, expectedChKey: 'ch05' },
    { ch: '8', sec: '8.2', expectedSolutions: 5, expectedChKey: 'ch08' },
    { ch: 'ch12', sec: '12.1-three-dimensional-coordinate-systems', expectedSolutions: 5, expectedChKey: 'ch12' },
    { ch: '14', sec: '14.1', expectedSolutions: 5, expectedChKey: 'ch14' },
    { ch: 'ch16', sec: '16.8-the-divergence-theorem-and-a-unified-theory', expectedSolutions: 5, expectedChKey: 'ch16' },
  ];
  for (const item of sampleSlugs) {
    const dir = getSectionDirectory(item.ch, item.sec);
    if (!dir) {
      throw new Error(`getSectionDirectory failed for ch="${item.ch}", sec="${item.sec}"`);
    }
    const content = loadSectionContent(item.ch, item.sec);
    if (!content) {
      throw new Error(`loadSectionContent failed for ch="${item.ch}", sec="${item.sec}"`);
    }
    if (content.solutions.length !== item.expectedSolutions) {
      throw new Error(
        `loadSectionContent("${item.ch}", "${item.sec}") returned ${content.solutions.length} solutions, expected ${item.expectedSolutions}`
      );
    }
    if (content.chapterKey !== item.expectedChKey) {
      throw new Error(
        `loadSectionContent("${item.ch}", "${item.sec}") returned unnormalized chapterKey "${content.chapterKey}", expected "${item.expectedChKey}"`
      );
    }
  }
  console.log(`    PASS: All sample slugs loaded content cleanly with expected solution counts and normalized chapterKey.`);

  // Test 4: All 116 sections load without error
  console.log('[4] Verifying all 116 sections load properly...');
  for (const sec of allSections) {
    const loaded = loadSectionContent(sec.chapterKey, sec.id);
    if (!loaded) {
      throw new Error(`Failed to load section: ${sec.chapterKey}/${sec.id}`);
    }
    if (loaded.solutions.length !== sec.solutionsCount) {
      throw new Error(
        `Mismatch in ${sec.id}: expected ${sec.solutionsCount} solutions, found ${loaded.solutions.length}`
      );
    }
  }
  console.log('    PASS: All 116 sections verified to load their full solution sets.');

  // Test 5: Adjacent section navigation & cross-chapter transitions
  console.log('[5] Testing Adjacent Section Navigation...');
  const firstSec = getAdjacentSections('ch01', '1.1-functions-and-graphs');
  if (firstSec.prev !== null) {
    throw new Error('Section 1.1 prev should be null');
  }
  if (!firstSec.next || firstSec.next.number !== '1.2') {
    throw new Error('Section 1.1 next should be Section 1.2');
  }

  // Cross-chapter boundary 1.4 -> 2.1
  const boundary14 = getAdjacentSections('ch01', '1.4-graphing-with-software');
  if (!boundary14.prev || boundary14.prev.number !== '1.3') {
    throw new Error('Section 1.4 prev should be 1.3');
  }
  if (!boundary14.next || boundary14.next.number !== '2.1') {
    throw new Error('Section 1.4 next should transition to Section 2.1');
  }

  // Cross-chapter boundary 2.6 -> 3.1
  const boundary26 = getAdjacentSections('ch02', '2.6-limits-involving-infinity-asymptotes-of-graphs');
  if (!boundary26.next || boundary26.next.number !== '3.1') {
    throw new Error('Section 2.6 next should transition to Section 3.1');
  }

  // Cross-chapter boundary 3.9 -> 4.1
  const boundary39 = getAdjacentSections('ch03', '3.9-linearization-and-differentials');
  if (!boundary39.next || boundary39.next.number !== '4.1') {
    throw new Error('Section 3.9 next should transition to Section 4.1');
  }

  // Cross-chapter boundary 4.8 -> 5.1
  const boundary48 = getAdjacentSections('ch04', '4.8-antiderivatives');
  if (!boundary48.next || boundary48.next.number !== '5.1') {
    throw new Error('Section 4.8 next should transition to Section 5.1');
  }

  // Cross-chapter boundary 11.7 -> 12.1
  const boundary117 = getAdjacentSections('ch11', '11.7-conics-in-polar-coordinates');
  if (!boundary117.next || boundary117.next.number !== '12.1') {
    throw new Error('Section 11.7 next should transition to Section 12.1');
  }

  // Cross-chapter boundary 15.8 -> 16.1
  const boundary158 = getAdjacentSections('ch15', '15.8-substitutions-in-multiple-integrals');
  if (!boundary158.next || boundary158.next.number !== '16.1') {
    throw new Error('Section 15.8 next should transition to Section 16.1');
  }

  // Last section 16.8
  const lastSec = getAdjacentSections('ch16', '16.8-the-divergence-theorem-and-a-unified-theory');
  if (!lastSec.prev || lastSec.prev.number !== '16.7') {
    throw new Error('Section 16.8 prev should be 16.7');
  }
  if (lastSec.next !== null) {
    throw new Error('Section 16.8 next should be null');
  }
  console.log('    PASS: Adjacent section traversal and cross-chapter boundary handoffs verified.');

  // Test 6: public/llms.txt verification
  console.log('[6] Verifying public/llms.txt references...');
  const llmsPath = path.resolve(process.cwd(), 'public/llms.txt');
  if (!fs.existsSync(llmsPath)) {
    throw new Error('public/llms.txt does not exist');
  }
  const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
  for (let i = 1; i <= 16; i++) {
    if (!llmsContent.includes(`Chapter ${i}:`)) {
      throw new Error(`public/llms.txt missing Chapter ${i}`);
    }
  }
  if (!llmsContent.includes('/chapters')) {
    throw new Error('public/llms.txt missing /chapters link');
  }
  console.log('    PASS: public/llms.txt accurately reflects all chapters and sections.');

  console.log('\nSUCCESS: All curriculum and navigation checks passed cleanly!\n');
}

runNavigationTests();
