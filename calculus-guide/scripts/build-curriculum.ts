// scripts/build-curriculum.ts
/**
 * Master Curriculum Generator for Thomas' Calculus Guide Chapters 2, 3, 4
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import fs from 'node:fs';
import path from 'node:path';
import { CH02_SECTIONS, SectionDef } from './curriculum-data-ch02';
import { CH03_SECTIONS } from './curriculum-data-ch03';
import { CH03_SECTIONS_PART2 } from './curriculum-data-ch03-part2';
import { CH03_SECTIONS_PART3 } from './curriculum-data-ch03-part3';
import { CH04_SECTIONS_PART1 } from './curriculum-data-ch04-part1';
import { CH04_SECTIONS_PART2 } from './curriculum-data-ch04-part2';
import { CH05_SECTIONS } from './curriculum-data-ch05';
import { CH06_SECTIONS } from './curriculum-data-ch06';
import { CH07_SECTIONS } from './curriculum-data-ch07';
import { CH08_SECTIONS } from './curriculum-data-ch08';
import { CH09_SECTIONS } from './curriculum-data-ch09';
import { CH10_SECTIONS } from './curriculum-data-ch10';
import { CH11_SECTIONS } from './curriculum-data-ch11';
import { CH12_SECTIONS } from './curriculum-data-ch12';
import { CH13_SECTIONS } from './curriculum-data-ch13';
import { CH14_SECTIONS } from './curriculum-data-ch14';
import { CH15_SECTIONS } from './curriculum-data-ch15';
import { CH16_SECTIONS } from './curriculum-data-ch16';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

export const ALL_SECTIONS: SectionDef[] = [
  ...CH02_SECTIONS,
  ...CH03_SECTIONS,
  ...CH03_SECTIONS_PART2,
  ...CH03_SECTIONS_PART3,
  ...CH04_SECTIONS_PART1,
  ...CH04_SECTIONS_PART2,
  ...CH05_SECTIONS,
  ...CH06_SECTIONS,
  ...CH07_SECTIONS,
  ...CH08_SECTIONS,
  ...CH09_SECTIONS,
  ...CH10_SECTIONS,
  ...CH11_SECTIONS,
  ...CH12_SECTIONS,
  ...CH13_SECTIONS,
  ...CH14_SECTIONS,
  ...CH15_SECTIONS,
  ...CH16_SECTIONS,
];

export function buildCurriculumFiles(): void {
  const inspectPath = path.join(__dirname, 'inspect_toc.py');
  if (fs.existsSync(inspectPath)) {
    try { fs.unlinkSync(inspectPath); } catch {}
  }
  for (const sec of ALL_SECTIONS) {
    const secDir = path.join(CONTENT_DIR, sec.chapterDir, sec.sectionDir);
    const solDir = path.join(secDir, 'solutions');

    fs.mkdirSync(solDir, { recursive: true });

    // 1. Write definitions.json
    const defsPath = path.join(secDir, 'definitions.json');
    const defsPayload = {
      id: `${sec.chapterDir}/${sec.sectionDir}/definitions`,
      chapter: sec.chapter,
      section: sec.section,
      title: sec.title,
      author: 'Muhammad Abdullah Athar',
      definitions: sec.definitions,
    };
    fs.writeFileSync(defsPath, JSON.stringify(defsPayload, null, 2), 'utf-8');

    // 2. Write summary.mdx
    const summaryPath = path.join(secDir, 'summary.mdx');
    fs.writeFileSync(summaryPath, sec.summaryMDX.trim() + '\n', 'utf-8');

    // 3. Write solutions/ex-XX.json
    for (const sol of sec.solutions) {
      const solPath = path.join(solDir, `${sol.filename}.json`);
      const solPayload = {
        id: `${sec.chapterDir}/${sec.sectionDir}/solutions/${sol.filename}`,
        chapter: sec.chapter,
        section: sec.section,
        type: 'solution',
        title: sol.title,
        exerciseReference: sol.exerciseReference,
        originalTopic: sol.originalTopic,
        difficulty: sol.difficulty,
        status: 'verified',
        tags: sol.tags,
        author: 'Muhammad Abdullah Athar',
        problemStatement: sol.problemStatement,
        finalAnswer: sol.finalAnswer,
        steps: sol.steps,
        sympyVerification: sol.sympyVerification,
      };
      fs.writeFileSync(solPath, JSON.stringify(solPayload, null, 2), 'utf-8');
    }
  }
}
