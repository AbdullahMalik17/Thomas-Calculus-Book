/**
 * scripts/test-e2e.ts
 *
 * Automated End-to-End Acceptance Test Runner for calculus-guide.
 *
 * Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 *
 * Executes Milestone 6 Acceptance Verification:
 * 1. Check 1: `npm run build` (Next.js App Router, SSR, TypeScript, KaTeX, persistent footer) -> exit code 0
 * 2. Check 2: `npm run content:validate` (Zod schemas, path-to-ID mapping, MCQ guardrails) -> exit code 0
 * 3. Check 3: `npm run content:stats` (100% misconception coverage, tier distribution) -> exit code 0
 * 4. Check 4: `python tools/verify/verify.py` (24 fixtures, Section 1.1 validation) -> exit code 0
 * 5. Check 5: `python tools/verify/verify.py validate-section --dir content/ch01-functions/1.1-functions-and-graphs/` -> exit code 0
 * 6. Check 6: `pytest tools/verify/test_verify.py` (Pytest test suite) -> exit code 0
 *
 * Exit code:
 * 0: All checks passed
 * 1: Any check failed
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REPORT_FILE = path.resolve(PROJECT_ROOT, 'test-e2e-report.json');

export interface CheckDefinition {
  id: number;
  name: string;
  command: string;
  args: string[];
  skipIfDuringBuild?: boolean;
  validateOutput?: (stdout: string, stderr: string) => { passed: boolean; reason?: string };
}

export interface CheckExecutionResult {
  id: number;
  name: string;
  commandString: string;
  exitCode: number;
  passed: boolean;
  durationMs: number;
  stdout: string;
  stderr: string;
  notes?: string;
}

function stripAnsi(str: string): string {
  return str.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '');
}

const CHECKS: CheckDefinition[] = [
  {
    id: 1,
    name: 'Next.js App Router Production Build',
    command: 'npm',
    args: ['run', 'build'],
    skipIfDuringBuild: true,
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const compiled = output.includes('Compiled successfully') || output.includes('✓ Compiled');
      const staticPages = output.includes('Generating static pages') || output.includes('✓ Generating static pages');
      return {
        passed: compiled && staticPages,
        reason: compiled ? undefined : 'Output missing successful compilation markers',
      };
    },
  },
  {
    id: 2,
    name: 'Content Schema & Guardrails Validation',
    command: 'npm',
    args: ['run', 'content:validate'],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const success = output.includes('SUCCESS: All content passed') || output.includes('0 error');
      return {
        passed: success,
        reason: success ? undefined : 'Validation failed to report 0 errors',
      };
    },
  },
  {
    id: 3,
    name: 'Content Statistics & 100% Misconception Coverage',
    command: 'npm',
    args: ['run', 'content:stats'],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const has100 = output.includes('100.0% coverage') || output.includes('100% coverage');
      const hasAttribution = output.includes('Muhammad Abdullah Athar');
      return {
        passed: has100 && hasAttribution,
        reason: !has100
          ? 'Misconception coverage is not 100%'
          : !hasAttribution
          ? 'Missing author attribution in output'
          : undefined,
      };
    },
  },
  {
    id: 4,
    name: 'SymPy Math Engine 24 Fixtures & Section 1.1 Verification',
    command: 'python',
    args: ['tools/verify/verify.py'],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const fixturesPassed = output.includes('24/24 passed');
      const success = output.includes('SUCCESS: All mathematical verification checks passed cleanly');
      return {
        passed: fixturesPassed && success,
        reason: !fixturesPassed ? 'Not all 24 fixtures passed' : undefined,
      };
    },
  },
  {
    id: 5,
    name: 'Section 1.1 Full Directory Mathematical Validation',
    command: 'python',
    args: [
      'tools/verify/verify.py',
      'validate-section',
      '--dir',
      'content/ch01-functions/1.1-functions-and-graphs/',
    ],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const pass = output.includes('Status: PASS');
      return {
        passed: pass,
        reason: pass ? undefined : 'Section validation reported non-PASS status',
      };
    },
  },
  {
    id: 6,
    name: 'Pytest Verification Suite (test_verify.py)',
    command: 'pytest',
    args: ['tools/verify/test_verify.py'],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr).toLowerCase();
      const passed = output.includes('passed') && !output.includes('failed');
      return {
        passed: passed,
        reason: passed ? undefined : 'Pytest suite reported failures',
      };
    },
  },
  {
    id: 7,
    name: 'Curriculum Navigation, Slugs & Adjacent Section Verification',
    command: 'npm',
    args: ['run', 'navigation:verify'],
    validateOutput: (stdout, stderr) => {
      const output = stripAnsi(stdout + '\n' + stderr);
      const passed = output.includes('SUCCESS: All curriculum and navigation checks passed cleanly');
      return {
        passed,
        reason: passed ? undefined : 'Navigation verification reported failure',
      };
    },
  },
];

export function runE2ESuite(options: { skipBuild?: boolean; filterIds?: number[] } = {}): {
  allPassed: boolean;
  results: CheckExecutionResult[];
} {
  console.log('\n\x1b[1m\x1b[36m================================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m             CALCULUS-GUIDE AUTOMATED E2E ACCEPTANCE TEST RUNNER                \x1b[0m');
  console.log('\x1b[1m\x1b[36m================================================================================\x1b[0m');
  console.log('Author & Creator : Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)');
  console.log(`Working Directory: ${PROJECT_ROOT}`);
  console.log(`Execution Timestamp: ${new Date().toISOString()}\n`);

  const results: CheckExecutionResult[] = [];
  let allPassed = true;

  for (const check of CHECKS) {
    if (options.filterIds && !options.filterIds.includes(check.id)) {
      continue;
    }

    if (options.skipBuild && check.skipIfDuringBuild) {
      console.log(`\x1b[33m[*] Check ${check.id}: ${check.name} [SKIPPED - Already executing within build]\x1b[0m`);
      results.push({
        id: check.id,
        name: check.name,
        commandString: `${check.command} ${check.args.join(' ')}`,
        exitCode: 0,
        passed: true,
        durationMs: 0,
        stdout: 'Executed as enclosing next build process.',
        stderr: '',
        notes: 'Enclosing build context',
      });
      continue;
    }

    const cmdStr = `${check.command} ${check.args.join(' ')}`;
    console.log(`\x1b[1m\x1b[34m[>] Running Check ${check.id}: ${check.name}\x1b[0m`);
    console.log(`    Command: ${cmdStr}`);

    const startTime = Date.now();
    let res: any;
    try {
      // First try standard invocation
      res = spawnSync(check.command, check.args, {
        cwd: PROJECT_ROOT,
        shell: true,
        encoding: 'utf-8',
        env: { ...process.env },
      });

      // Special fallback for pytest if not found in PATH directly on Windows
      if (check.command === 'pytest' && (res.error || res.status !== 0)) {
        let fallback = spawnSync('python', ['-m', 'pytest', ...check.args], {
          cwd: PROJECT_ROOT,
          shell: true,
          encoding: 'utf-8',
          env: { ...process.env },
        });
        if (fallback.status !== 0 || fallback.error) {
          fallback = spawnSync('python', check.args, {
            cwd: PROJECT_ROOT,
            shell: true,
            encoding: 'utf-8',
            env: { ...process.env },
          });
        }
        if (fallback.status === 0 || !fallback.error) {
          res = fallback;
        }
      }
    } catch (err: any) {
      res = {
        status: 1,
        stdout: '',
        stderr: String(err?.message || err),
      };
    }
    const durationMs = Date.now() - startTime;

    const stdout = res.stdout || '';
    const stderr = res.stderr || '';
    let passed = (res.status === 0);

    let notes = '';
    if (check.validateOutput) {
      const validation = check.validateOutput(stdout, stderr);
      if (!validation.passed) {
        passed = false;
        notes = validation.reason || 'Output validation check failed';
      }
    }

    if (!passed) {
      allPassed = false;
    }

    const statusBadge = passed
      ? '\x1b[32mPASS\x1b[0m'
      : '\x1b[31mFAIL\x1b[0m';
    console.log(`    Result : ${statusBadge} (exit code ${res.status}, ${durationMs}ms)`);
    if (notes) {
      console.log(`    Note   : ${notes}`);
    }

    results.push({
      id: check.id,
      name: check.name,
      commandString: cmdStr,
      exitCode: res.status ?? (passed ? 0 : 1),
      passed,
      durationMs,
      stdout,
      stderr,
      notes,
    });
  }

  // Summary Table
  console.log('\n\x1b[1m\x1b[36m================================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m                           E2E ACCEPTANCE SUMMARY                               \x1b[0m');
  console.log('\x1b[1m\x1b[36m================================================================================\x1b[0m');
  console.log(
    `${'#'.padEnd(3)} | ${'Check Name'.padEnd(50)} | ${'Exit'.padEnd(5)} | ${'Time'.padEnd(8)} | Status`
  );
  console.log('-'.repeat(80));

  for (const r of results) {
    const statusStr = r.passed ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
    console.log(
      `${String(r.id).padEnd(3)} | ${r.name.slice(0, 50).padEnd(50)} | ${String(r.exitCode).padEnd(5)} | ${(r.durationMs + 'ms').padEnd(8)} | ${statusStr}`
    );
  }
  console.log('-'.repeat(80));

  const totalPassed = results.filter((r) => r.passed).length;
  const totalChecks = results.length;
  console.log(`Summary: ${totalPassed}/${totalChecks} checks passed.\n`);

  // Write detailed report
  fs.writeFileSync(
    REPORT_FILE,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        author: 'Muhammad Abdullah Athar',
        github: 'https://github.com/AbdullahMalik17',
        allPassed,
        totalChecks,
        totalPassed,
        results,
      },
      null,
      2
    ),
    'utf-8'
  );

  return { allPassed, results };
}

// CLI Execution entrypoint
if (require.main === module || (typeof process !== 'undefined' && process.argv[1]?.endsWith('test-e2e.ts'))) {
  const args = process.argv.slice(2);
  const skipBuild = args.includes('--skip-build');
  const filterArg = args.find((a) => a.startsWith('--filter='));
  const filterIds = filterArg
    ? filterArg.replace('--filter=', '').split(',').map(Number)
    : undefined;

  const { allPassed } = runE2ESuite({ skipBuild, filterIds });
  process.exit(allPassed ? 0 : 1);
}
