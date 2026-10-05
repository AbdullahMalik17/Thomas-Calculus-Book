import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const triggerFile = path.resolve(__dirname, '.run-e2e');
if (fs.existsSync(triggerFile)) {
  console.log('\n--- Running Triggered Milestone 6 E2E Verification Suite ---');
  const tsxBin = path.resolve(__dirname, 'node_modules/.bin/tsx.cmd');
  const scriptPath = path.resolve(__dirname, 'scripts/test-e2e.ts');
  const res = spawnSync(tsxBin, [scriptPath, '--skip-build'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit',
    env: { ...process.env },
  });
  if (res.status !== 0) {
    console.error(`E2E Verification failed with exit code ${res.status}`);
    process.exit(1);
  }
  try {
    fs.unlinkSync(triggerFile);
  } catch {}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX(nextConfig);
