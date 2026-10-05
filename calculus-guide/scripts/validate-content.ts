// scripts/validate-content.ts
/**
 * Automated Content Validation Pipeline for calculus-guide.
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 * Strictly verifies:
 * 1. 1-to-1 File path <-> ID mapping assertion
 * 2. Duplicate ID collisions across files
 * 3. Zod schema validation (SolutionSchema, MCQSchema, PracticeProblemSchema)
 * 4. MCQ guardrails: 4 options (A,B,C,D), 1 correctId, 3 distractors with >=10 char misconceptions
 * 5. Solution step 'why' fields (>= 5 chars)
 * 6. MDX file existence and LaTeX delimiter pairing
 *
 * Exit codes:
 * 0: Clean validation (all items pass)
 * 1: Any validation failure or error
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  SolutionSchema,
  MCQSchema,
  PracticeProblemSchema,
} from '../lib/content/schema';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

interface ValidationError {
  file: string;
  field?: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];
const idRegistry = new Map<string, string>(); // id -> filePath

let solutionsCount = 0;
let practiceCount = 0;
let mcqCount = 0;
let mdxCount = 0;

function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function normalizePosix(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

function getExpectedId(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  const posixPath = normalizePosix(relative);
  return posixPath.replace(/\.json$/, '');
}

function validateMDXFile(filePath: string): void {
  mdxCount++;
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.trim().length === 0) {
    errors.push({ file: filePath, message: 'MDX file is empty' });
    return;
  }
  // Check balanced dollar signs for KaTeX inline math
  const singleDollarMatches = (content.match(/(?<!\$)\$(?!\$)/g) || []).length;
  if (singleDollarMatches % 2 !== 0) {
    warnings.push(`Warning: Potential unclosed inline math delimiter '$' in ${filePath}`);
  }
}

function validateJSONContent(filePath: string): void {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (err: any) {
    errors.push({ file: filePath, message: `Invalid JSON syntax: ${err.message}` });
    return;
  }

  // 1. Assertion: File path corresponds directly to item id
  const expectedId = getExpectedId(filePath);
  if (data.id !== expectedId) {
    errors.push({
      file: filePath,
      field: 'id',
      message: `ID mismatch: Expected "${expectedId}" based on file path, but found "${data.id}"`,
    });
  }

  // 2. Assertion: No duplicate IDs across files
  if (idRegistry.has(data.id)) {
    errors.push({
      file: filePath,
      field: 'id',
      message: `Duplicate ID collision: "${data.id}" was already declared in ${idRegistry.get(data.id)}`,
    });
  } else if (data.id) {
    idRegistry.set(data.id, filePath);
  }

  // 3. Schema validation based on item type
  if (data.type === 'solution') {
    solutionsCount++;
    const result = SolutionSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else if (data.type === 'mcq') {
    mcqCount++;
    const result = MCQSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else if (data.type === 'practice') {
    practiceCount++;
    const result = PracticeProblemSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: filePath,
          field: issue.path.join('.'),
          message: issue.message,
        });
      }
    }
  } else {
    errors.push({
      file: filePath,
      field: 'type',
      message: `Unknown or missing content type "${data.type}". Expected 'solution', 'mcq', or 'practice'`,
    });
  }
}

export function runValidation(): { errorCount: number; warningCount: number } {
  console.log('\n\x1b[1m\x1b[36m======================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m    CALCULUS-GUIDE CONTENT VALIDATION PIPELINE       \x1b[0m');
  console.log('\x1b[1m\x1b[36m======================================================\x1b[0m\n');
  console.log(`Author / Attribution : Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)`);
  console.log(`Content Directory    : ${CONTENT_DIR}\n`);

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('\x1b[33mNotice: Content directory does not exist yet. Initializing empty directory.\x1b[0m');
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const allFiles = walkDir(CONTENT_DIR);

  for (const file of allFiles) {
    if (file.endsWith('.json')) {
      validateJSONContent(file);
    } else if (file.endsWith('.mdx')) {
      validateMDXFile(file);
    }
  }

  console.log('\x1b[1mValidation Metrics:\x1b[0m');
  console.log(`  - MDX Summaries Validated : ${mdxCount}`);
  console.log(`  - Solutions Validated     : ${solutionsCount}`);
  console.log(`  - Practice Problems       : ${practiceCount}`);
  console.log(`  - MCQs Validated          : ${mcqCount}`);
  console.log(`  - Total Items Registered  : ${idRegistry.size}`);

  if (warnings.length > 0) {
    console.log('\n\x1b[33mWarnings:\x1b[0m');
    for (const w of warnings) {
      console.log(`  \x1b[33m[!]\x1b[0m ${w}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n\x1b[1m\x1b[31mFAILED: Found ${errors.length} validation error(s):\x1b[0m\n`);
    for (const err of errors) {
      console.error(`  \x1b[31m[X]\x1b[0m ${err.file}`);
      if (err.field) console.error(`      Field: ${err.field}`);
      console.error(`      Error: ${err.message}\n`);
    }
    return { errorCount: errors.length, warningCount: warnings.length };
  }

  console.log('\n\x1b[1m\x1b[32mSUCCESS: All content passed strict schema guardrails with 0 errors!\x1b[0m\n');
  return { errorCount: 0, warningCount: warnings.length };
}

// Execute when invoked directly
if (require.main === module || (typeof process !== 'undefined' && process.argv[1]?.endsWith('validate-content.ts'))) {
  const result = runValidation();
  if (result.errorCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
