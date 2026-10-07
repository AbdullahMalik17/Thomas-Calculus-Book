// lib/content/loader.ts
/**
 * Content loader utilities for calculus-guide.
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  Solution,
  SolutionSchema,
  DefinitionsFile,
  DefinitionsFileSchema,
} from './schema';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

export interface SectionContentData {
  chapterKey: string;
  sectionKey: string;
  sectionNumber: string;
  title: string;
  definitionsFile: DefinitionsFile | null;
  solutions: Solution[];
  hasSummaryMDX: boolean;
  summaryMDXContent: string | null;
}

export function getSectionDirectory(ch: string, section: string): string | null {
  const chapterDirs = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR) : [];
  const matchedCh = chapterDirs.find(
    (d) => d.toLowerCase() === ch.toLowerCase() || d.startsWith(ch.toLowerCase())
  );
  if (!matchedCh) return null;

  const chPath = path.join(CONTENT_DIR, matchedCh);
  const sectionDirs = fs.readdirSync(chPath);
  const matchedSection = sectionDirs.find(
    (s) =>
      s.toLowerCase() === section.toLowerCase() ||
      s.startsWith(section.toLowerCase()) ||
      s.includes(section.toLowerCase())
  );

  if (!matchedSection) return null;
  return path.join(chPath, matchedSection);
}

export function loadSectionContent(ch: string, section: string): SectionContentData | null {
  const sectionDir = getSectionDirectory(ch, section);
  if (!sectionDir) return null;

  const dirName = path.basename(sectionDir);
  const parentName = path.basename(path.dirname(sectionDir));
  
  // Extract clean section number, e.g. "1.1" from "1.1-functions-and-graphs"
  const secNumMatch = dirName.match(/^(\d+\.\d+)/);
  const sectionNumber = secNumMatch ? secNumMatch[1] : section;

  // 1. Load definitions.json
  let definitionsFile: DefinitionsFile | null = null;
  const defPath = path.join(sectionDir, 'definitions.json');
  if (fs.existsSync(defPath)) {
    try {
      const raw = fs.readFileSync(defPath, 'utf-8');
      const parsed = JSON.parse(raw);
      const res = DefinitionsFileSchema.safeParse(parsed);
      if (res.success) {
        definitionsFile = res.data;
      }
    } catch {
      // Ignored
    }
  }

  // 2. Load solutions
  const solutions: Solution[] = [];
  const solDir = path.join(sectionDir, 'solutions');
  if (fs.existsSync(solDir)) {
    const solFiles = fs.readdirSync(solDir).filter((f) => f.endsWith('.json'));
    for (const file of solFiles) {
      try {
        const raw = fs.readFileSync(path.join(solDir, file), 'utf-8');
        const parsed = JSON.parse(raw);
        const res = SolutionSchema.safeParse(parsed);
        if (res.success) {
          solutions.push(res.data);
        }
      } catch {
        // Ignored
      }
    }
  }

  // Sort solutions by exercise number
  solutions.sort((a, b) => {
    const numA = parseInt(a.exerciseReference.match(/\d+$/)?.[0] || '0', 10);
    const numB = parseInt(b.exerciseReference.match(/\d+$/)?.[0] || '0', 10);
    return numA - numB;
  });

  // 3. Load summary.mdx
  const mdxPath = path.join(sectionDir, 'summary.mdx');
  let hasSummaryMDX = false;
  let summaryMDXContent: string | null = null;
  if (fs.existsSync(mdxPath)) {
    hasSummaryMDX = true;
    summaryMDXContent = fs.readFileSync(mdxPath, 'utf-8');
  }

  const cleanTitle = definitionsFile?.title || dirName.replace(/^\d+\.\d+-/, '').replace(/-/g, ' ');

  return {
    chapterKey: parentName,
    sectionKey: dirName,
    sectionNumber,
    title: cleanTitle,
    definitionsFile,
    solutions,
    hasSummaryMDX,
    summaryMDXContent,
  };
}
