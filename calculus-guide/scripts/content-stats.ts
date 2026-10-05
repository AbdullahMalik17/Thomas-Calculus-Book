// scripts/content-stats.ts
/**
 * Content Repository Statistics Dashboard for calculus-guide.
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 * Collects and renders an ANSI dashboard detailing:
 * - Content counts (chapters, sections, summaries, solutions, practice, MCQs)
 * - Difficulty tier distributions
 * - Pedagogical rigor metrics (total steps, avg steps, misconception coverage)
 * - Verification lifecycle status
 */

import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

export interface RepositoryStats {
  chapters: Set<string>;
  sections: Set<string>;
  summaries: number;
  solutions: number;
  practice: number;
  mcqs: number;
  tiers: { tier1: number; tier2: number; tier3: number; easy: number; medium: number; hard: number };
  status: { draft: number; 'in-review': number; verified: number; published: number; deprecated: number };
  totalSteps: number;
  totalMCQDistractors: number;
  distractorsWithMisconceptions: number;
}

export function collectStats(): RepositoryStats {
  const stats: RepositoryStats = {
    chapters: new Set(),
    sections: new Set(),
    summaries: 0,
    solutions: 0,
    practice: 0,
    mcqs: 0,
    tiers: { tier1: 0, tier2: 0, tier3: 0, easy: 0, medium: 0, hard: 0 },
    status: { draft: 0, 'in-review': 0, verified: 0, published: 0, deprecated: 0 },
    totalSteps: 0,
    totalMCQDistractors: 0,
    distractorsWithMisconceptions: 0,
  };

  function walk(dir: string): void {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        stats.summaries++;
      } else if (entry.name.endsWith('.json')) {
        try {
          const item = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
          if (item.chapter) stats.chapters.add(item.chapter);
          if (item.chapter && item.section) stats.sections.add(`${item.chapter}/${item.section}`);

          if (item.difficulty && (item.difficulty in stats.tiers)) {
            stats.tiers[item.difficulty as keyof typeof stats.tiers]++;
          }
          if (item.status && (item.status in stats.status)) {
            stats.status[item.status as keyof typeof stats.status]++;
          }

          if (item.type === 'solution') {
            stats.solutions++;
            if (Array.isArray(item.steps)) stats.totalSteps += item.steps.length;
          } else if (item.type === 'practice') {
            stats.practice++;
            if (Array.isArray(item.steps)) stats.totalSteps += item.steps.length;
          } else if (item.type === 'mcq') {
            stats.mcqs++;
            if (Array.isArray(item.options)) {
              for (const opt of item.options) {
                if (opt.id !== item.correctId) {
                  stats.totalMCQDistractors++;
                  if (typeof opt.misconception === 'string' && opt.misconception.trim().length >= 10) {
                    stats.distractorsWithMisconceptions++;
                  }
                }
              }
            }
          }
        } catch {
          // Ignore JSON parsing errors during stats collection
        }
      }
    }
  }

  walk(CONTENT_DIR);
  return stats;
}

export function displayDashboard(): void {
  const stats = collectStats();

  const totalExercises = stats.solutions + stats.practice + stats.mcqs;
  const coveragePct = stats.totalMCQDistractors > 0
    ? ((stats.distractorsWithMisconceptions / stats.totalMCQDistractors) * 100).toFixed(1)
    : '100.0';

  const avgSteps = (stats.solutions + stats.practice) > 0
    ? (stats.totalSteps / (stats.solutions + stats.practice)).toFixed(1)
    : '0.0';

  console.log('\n\x1b[1m\x1b[36m======================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m         CALCULUS-GUIDE CONTENT REPOSITORY STATS      \x1b[0m');
  console.log('\x1b[1m\x1b[36m======================================================\x1b[0m\n');
  console.log(`\x1b[1mAuthor / Attribution\x1b[0m   : Muhammad Abdullah Athar`);
  console.log(`\x1b[1mGitHub Repository\x1b[0m      : https://github.com/AbdullahMalik17`);
  console.log(`\x1b[36m------------------------------------------------------\x1b[0m`);
  console.log(`Chapters Represented   : \x1b[1m${stats.chapters.size}\x1b[0m`);
  console.log(`Sections Represented   : \x1b[1m${stats.sections.size}\x1b[0m`);
  console.log(`Summary MDX Modules    : \x1b[1m${stats.summaries}\x1b[0m`);
  console.log(`\x1b[36m------------------------------------------------------\x1b[0m`);
  console.log(`Textbook Solutions     : \x1b[32m${stats.solutions}\x1b[0m`);
  console.log(`Original Practice Sets : \x1b[32m${stats.practice}\x1b[0m`);
  console.log(`MCQ Assessment Items   : \x1b[32m${stats.mcqs}\x1b[0m`);
  console.log(`Total Content Items    : \x1b[1m\x1b[32m${totalExercises}\x1b[0m`);
  console.log(`\x1b[36m------------------------------------------------------\x1b[0m`);
  console.log(`Difficulty Tier Distribution:`);
  console.log(`  - Tier 1 (Basic)     : ${stats.tiers.tier1 + stats.tiers.easy}`);
  console.log(`  - Tier 2 (Applied)   : ${stats.tiers.tier2 + stats.tiers.medium}`);
  console.log(`  - Tier 3 (Advanced)  : ${stats.tiers.tier3 + stats.tiers.hard}`);
  console.log(`\x1b[36m------------------------------------------------------\x1b[0m`);
  console.log(`Pedagogical Rigor Metrics:`);
  console.log(`  - Total Solution Steps        : \x1b[1m${stats.totalSteps}\x1b[0m`);
  console.log(`  - Average Steps per Problem   : \x1b[1m${avgSteps}\x1b[0m`);
  console.log(
    `  - Distractor Misconceptions   : \x1b[1m\x1b[32m${stats.distractorsWithMisconceptions} / ${stats.totalMCQDistractors}\x1b[0m (\x1b[1m\x1b[32m${coveragePct}%\x1b[0m coverage)`
  );
  console.log(`\x1b[36m------------------------------------------------------\x1b[0m`);
  console.log(`Content Verification Lifecycle:`);
  console.log(`  - Published                   : \x1b[32m${stats.status.published}\x1b[0m`);
  console.log(`  - Verified                    : \x1b[32m${stats.status.verified}\x1b[0m`);
  console.log(`  - In Review                   : \x1b[33m${stats.status['in-review']}\x1b[0m`);
  console.log(`  - Draft                       : ${stats.status.draft}`);
  console.log(`\x1b[1m\x1b[36m======================================================\x1b[0m\n`);
}

// Execute when invoked directly
if (require.main === module || (typeof process !== 'undefined' && process.argv[1]?.endsWith('content-stats.ts'))) {
  displayDashboard();
}
