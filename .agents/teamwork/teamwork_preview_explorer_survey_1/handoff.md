# Handoff Report: Survey 1 — Environment & Setup Explorer

## 1. Observation

### 1.1 Workspace Root & Directory Structure
- **Root Directory**: `d:\Thomas-Calculus-Book`
- **Tool Command**: `list_dir(DirectoryPath: "d:\\Thomas-Calculus-Book")`
- **Verbatim Result**:
  ```json
  {"name":".agents", "isDir":true}
  {"name":".git", "isDir":true}
  {"name":"Thomas-Calculus-14th-Edition-[konkur.in].pdf", "sizeBytes":"27054860"}
  ```
- **File Assessment**:
  - The repository has a git history initialized (`.git`).
  - Target application directory `d:\Thomas-Calculus-Book\calculus-guide` does **not** exist yet.
  - The raw textbook source file `Thomas-Calculus-14th-Edition-[konkur.in].pdf` exists directly in the workspace root with size `27,054,860` bytes (~27 MB).

### 1.2 Toolchain Versions
- **Tool Command**: `run_command("node -v; npm -v; python --version; py --version; git --version")`
- **Verbatim Output**:
  ```
  v26.5.1
  11.17.0
  Python 3.14.6
  Python 3.14.6
  git version 2.55.0.windows.3
  ```
- **Observations**:
  - **Node.js**: `v26.5.1` (installed and active on PATH).
  - **npm**: `11.17.0` (installed and active on PATH).
  - **Python**: `3.14.6` located at `C:\Python314\python.exe`.
  - **Git**: `2.55.0.windows.3`.

### 1.3 Python Environment & Package Status
- **Tool Command**: `run_command("python -c \"import sys; print(sys.executable); import sympy; print('sympy:', sympy.__version__)\"")`
- **Verbatim Output**:
  ```
  Traceback (most recent call last):
    File "<string>", line 1, in <module>
      import sys; print(sys.executable); import sympy; print('sympy:', sympy.__version__)
                                         ^^^^^^^^^^^^
  ModuleNotFoundError: No module named 'sympy'
  C:\Python314\python.exe
  ```
- **Tool Command**: `run_command("python -m pip list")`
- **Verbatim Packages Observed**:
  - `pytest 9.1.1` (present)
  - `pypdf 6.19.0` (present)
  - `pillow 12.3.0` (present)
  - `numpy 2.5.1` (present)
  - `ruff 0.16.2` (present)
  - `sympy`: **NOT** installed in `C:\Python314\python.exe`.

### 1.4 Command Availability for PDF Processing & Shell Scripts
- **Tool Command**: `Get-Command pdftoppm, pdftotext, bash, sh, git -ErrorAction SilentlyContinue`
- **Verbatim Output**:
  ```
  Name     Source
  ----     ------
  bash.exe C:\Users\HP\AppData\Local\Microsoft\WindowsApps\bash.exe
  git.exe  C:\Program Files\Git\cmd\git.exe
  ```
- **Observations**:
  - `pdftoppm` and `pdftotext` (poppler binaries) are **not** present on the default Windows PATH.
  - `pypdf 6.19.0` is already installed in the Python 3.14 runtime.

### 1.5 Requirements from `ORIGINAL_REQUEST.md` (Lines 10-24)
- **Creator & Attribution**: Made by Muhammad Abdullah Athar (GitHub: `https://github.com/AbdullahMalik17`). Persistent global footer on every page. JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar.
- **Copyright Safeguards**: Never copy textbook statements/figures verbatim. Paraphrase with identifier reference (e.g., "Section 1.1, Exercise 21"). Gitignore `source/` (never commit raw PDF pages or extracted raster assets).
- **R1 Scope**:
  - Initialize project in `calculus-guide/`.
  - `.gitignore` excluding `node_modules/`, `.next/`, `source/`, and python virtual environments.
  - `PROGRESS.md` (Status Dashboard, Done, In Progress, Blocked) and `CLAUDE.md`.
  - `scripts/extract_pages.sh` leveraging `pdftoppm` and `pdftotext`.
  - Next.js App Router (TypeScript, Tailwind CSS, MDX with `remark-math` and `rehype-katex`, `katex/dist/katex.min.css` in root layout).
  - Persistent global footer with attribution to Muhammad Abdullah Athar.
  - Route placeholders: `/`, `/chapters/[ch]`, `/chapters/[ch]/[section]`, `/practice/[section]`, `/quiz/[chapter]`, `/dashboard`, `/about`.

---

## 2. Logic Chain

### 2.1 Workspace Layout & Initialization
- **Step 1 (From Observation 1.1)**: The workspace root is `d:\Thomas-Calculus-Book` and currently contains only `.git`, `.agents`, and `Thomas-Calculus-14th-Edition-[konkur.in].pdf`. `calculus-guide/` does not exist yet.
- **Step 2 (From Observation 1.5)**: Requirement R1 mandates that `calculus-guide/` is the working directory for the interactive Next.js study platform.
- **Inference**: Milestone 1 must create `calculus-guide/` and scaffold all application files inside it. When scripts inside `calculus-guide/scripts/` reference the textbook PDF, they should look at `../../Thomas-Calculus-14th-Edition-[konkur.in].pdf` or accept a customizable path parameter defaulting to `../Thomas-Calculus-14th-Edition-[konkur.in].pdf`.

### 2.2 Toolchain Readiness & Node/npm Compatibility
- **Step 3 (From Observation 1.2)**: Node.js is version `26.5.1` and npm is `11.17.0`.
- **Inference**: This environment is fully capable of running modern Next.js 14 / 15, TypeScript 5, Tailwind CSS 3, and ES module scripts via `tsx`.
- **Inference**: To scaffold `calculus-guide/`, the project can directly define `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, and run `npm install`.

### 2.3 SymPy & Python Verification Tooling Readiness
- **Step 4 (From Observation 1.3)**: Python is version `3.14.6`. Global packages include `pypdf 6.19.0`, `pillow 12.3.0`, `pytest 9.1.1`, but `sympy` is missing.
- **Inference**: R3 requires a standalone SymPy verification CLI under `tools/verify/`. Because `sympy` is not installed globally, the project must either:
  1. Create a dedicated virtual environment (`calculus-guide/tools/verify/.venv` or `calculus-guide/.venv`) and run `pip install sympy`, OR
  2. Run `python -m pip install sympy` into the active Python environment.
- **Inference**: SymPy is a pure-Python library with `mpmath` as its sole dependency (also pure Python), meaning it installs cleanly on Python 3.14.6 without C-compiler compilation bottlenecks.

### 2.4 PDF Extraction Strategy on Windows
- **Step 5 (From Observation 1.4)**: `pdftoppm` and `pdftotext` are Linux/poppler utilities not installed by default on Windows PATH, though `bash.exe` and `git.exe` are present.
- **Step 6 (From Observation 1.3 & 1.5)**: R1 specifically requests `scripts/extract_pages.sh` leveraging `pdftoppm` and `pdftotext`. Additionally, `pypdf 6.19.0` is already present in the active Python environment.
- **Inference**: The project should provide `scripts/extract_pages.sh` as requested (for Linux/WSL/Git Bash/CI execution) AND a companion `scripts/extract_pages.py` leveraging `pypdf`. This guarantees that extracting textbook pages works out-of-the-box on Windows while meeting the strict R1 specification.

### 2.5 Next.js App Router Architecture & Scaffolding Blueprint
- **Step 7 (From Observation 1.5)**: App Router with TypeScript, Tailwind CSS, MDX with `remark-math` and `rehype-katex`, `katex/dist/katex.min.css` in root layout, and 7 specific route placeholders.
- **Inference**:
  1. `next.config.mjs` must configure `@next/mdx` with plugins `remark-math` and `rehype-katex`.
  2. `mdx-components.tsx` must be placed in `calculus-guide/` root to satisfy Next.js App Router MDX loader specifications.
  3. `app/layout.tsx` must import `katex/dist/katex.min.css` and `app/globals.css`.
  4. The 7 required route placeholders must be created with full semantic layout, breadcrumbs, and placeholder content:
     - `/` (`app/page.tsx`): Platform landing page with chapter navigation and feature overview.
     - `/chapters/[ch]` (`app/chapters/[ch]/page.tsx`): Chapter overview with section list and progress metrics.
     - `/chapters/[ch]/[section]` (`app/chapters/[ch]/[section]/page.tsx`): Section study guide with summary, theory, and links.
     - `/practice/[section]` (`app/practice/[section]/page.tsx`): Interactive practice set with difficulty tiers 1–3 and hints.
     - `/quiz/[chapter]` (`app/quiz/[chapter]/page.tsx`): Interactive MCQ quiz engine with misconception explanations.
     - `/dashboard` (`app/dashboard/page.tsx`): Mastery and validation progress dashboard.
     - `/about` (`app/about/page.tsx`): Attribution, pedagogy, copyright safeguards, and tech stack.

### 2.6 Attribution Architecture
- **Step 8 (From Observation 1.5)**: Mandatory requirement: "Made by Muhammad Abdullah Athar (GitHub: `https://github.com/AbdullahMalik17`). Every page must contain a persistent global footer: `'Made by Muhammad Abdullah Athar'` linking to the GitHub profile. Include JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar."
- **Inference**:
  1. `components/layout/Footer.tsx`: Persistent component rendered at the bottom of `app/layout.tsx`. Contains explicit anchor `<a href="https://github.com/AbdullahMalik17" target="_blank" rel="noopener noreferrer">Made by Muhammad Abdullah Athar</a>`.
  2. `app/layout.tsx`: Root layout metadata exports `authors: [{ name: 'Muhammad Abdullah Athar', url: 'https://github.com/AbdullahMalik17' }]`, `creator: 'Muhammad Abdullah Athar'`, `publisher: 'Muhammad Abdullah Athar'`.
  3. Root layout embeds JSON-LD script tag with `EducationalWebSite` / `WebSite` schema declaring `author` and `creator` as `Person` ("Muhammad Abdullah Athar", URL `https://github.com/AbdullahMalik17`).

---

## 3. Caveats

1. **Poppler Binaries on Windows**: `pdftoppm` and `pdftotext` are not in the Windows PATH. `scripts/extract_pages.sh` is written to satisfy the assignment, but developers on Windows should use the companion Python script `scripts/extract_pages.py` (or execute via WSL) to extract pages without installing native poppler binaries.
2. **SymPy Installation**: SymPy is not yet installed in the global Python environment. The implementer must execute `pip install sympy` or set up a venv in `calculus-guide/tools/verify/` as part of Milestone 3.
3. **No Direct Package Install in Explorer Mode**: As an explorer in read-only survey mode, this agent did not run `npm install` or `pip install` or create directories in `calculus-guide/`. Those are reserved for Milestone 1 implementers.
4. **No other caveats**: All toolchain versions, file paths, requirements, and config patterns have been verified and documented.

---

## 4. Conclusion

The workspace environment is primed and ready for Milestone 1 scaffolding. Below is the detailed implementation specification and file blueprint for `calculus-guide`:

### 4.1 Recommended Directory Tree
```
calculus-guide/
├── .gitignore
├── CLAUDE.md
├── PROGRESS.md
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── mdx-components.tsx
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── chapters/
│   │   ├── [ch]/
│   │   │   ├── page.tsx
│   │   │   └── [section]/
│   │   │       └── page.tsx
│   ├── practice/
│   │   └── [section]/
│   │       └── page.tsx
│   └── quiz/
│       └── [chapter]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── math/
│   │   ├── MathBlock.tsx
│   │   └── InlineMath.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Button.tsx
├── lib/
│   └── content/
│       └── schema.ts
├── scripts/
│   ├── extract_pages.sh
│   ├── extract_pages.py
│   ├── validate-content.ts
│   └── content-stats.ts
└── tools/
    └── verify/
        ├── verify.py
        └── tests/
```

### 4.2 Blueprint: `package.json`
```json
{
  "name": "calculus-guide",
  "version": "0.1.0",
  "private": true,
  "author": {
    "name": "Muhammad Abdullah Athar",
    "url": "https://github.com/AbdullahMalik17"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "content:validate": "tsx scripts/validate-content.ts",
    "content:stats": "tsx scripts/content-stats.ts"
  },
  "dependencies": {
    "@mdx-js/loader": "^3.0.1",
    "@mdx-js/react": "^3.0.1",
    "@next/mdx": "^14.2.15",
    "clsx": "^2.1.1",
    "katex": "^0.16.11",
    "lucide-react": "^0.447.0",
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "rehype-katex": "^7.0.0",
    "remark-math": "^6.0.0",
    "tailwind-merge": "^2.5.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/katex": "^0.16.7",
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "tsx": "^4.19.1",
    "typescript": "^5.5.4"
  }
}
```

### 4.3 Blueprint: `next.config.mjs` & `mdx-components.tsx`
```javascript
// next.config.mjs
import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
```

```tsx
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
```

### 4.4 Blueprint: Root Layout (`app/layout.tsx`) & Attribution
```tsx
import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: "Thomas' Calculus Study Guide | Interactive & Verifiable",
  description: "Interactive Next.js study platform for Thomas' Calculus (14th Edition) with verifiable math, automated validation pipelines, and verified Golden Examples.",
  authors: [{ name: 'Muhammad Abdullah Athar', url: 'https://github.com/AbdullahMalik17' }],
  creator: 'Muhammad Abdullah Athar',
  publisher: 'Muhammad Abdullah Athar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalWebSite',
    name: "Thomas' Calculus Study Guide",
    url: 'https://github.com/AbdullahMalik17/Thomas-Calculus-Book',
    description: "Interactive study guide and verifiable math platform for Thomas' Calculus 14th Edition",
    author: {
      '@type': 'Person',
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
    creator: {
      '@type': 'Person',
      name: 'Muhammad Abdullah Athar',
      url: 'https://github.com/AbdullahMalik17',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 4.5 Blueprint: Persistent Footer (`components/layout/Footer.tsx`)
```tsx
import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div>
          <span>Thomas&apos; Calculus (14th Edition) Interactive Study Guide</span>
        </div>
        <div>
          <a
            href="https://github.com/AbdullahMalik17"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Made by Muhammad Abdullah Athar
          </a>
        </div>
      </div>
    </footer>
  );
}
```

### 4.6 Blueprint: `.gitignore`
```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js Build Output
.next/
out/
build/
dist/

# Source Textbook Materials (Copyright Safeguard)
source/
*.pdf
extracted/

# Python Virtual Environments & Bytecode
.venv/
venv/
env/
__pycache__/
*.py[cod]
*$py.class
.pytest_cache/
.ruff_cache/

# TypeScript & IDE
*.tsbuildinfo
next-env.d.ts
.vscode/
.idea/

# Environment Variables & OS Files
.env
.env.local
.env.*.local
.DS_Store
Thumbs.db
```

### 4.7 Blueprint: `scripts/extract_pages.sh` & `scripts/extract_pages.py`
```bash
#!/usr/bin/env bash
# scripts/extract_pages.sh
# Usage: ./scripts/extract_pages.sh <start_page> <end_page> [output_dir] [pdf_path]
set -euo pipefail

START_PAGE=${1:-1}
END_PAGE=${2:-1}
OUTPUT_DIR=${3:-"source/extracted"}
PDF_PATH=${4:-"../Thomas-Calculus-14th-Edition-[konkur.in].pdf"}

mkdir -p "$OUTPUT_DIR"

echo "=== Extracting pages $START_PAGE to $END_PAGE from $PDF_PATH ==="

if ! command -v pdftoppm &> /dev/null || ! command -v pdftotext &> /dev/null; then
  echo "WARNING: pdftoppm or pdftotext not found on PATH."
  echo "Falling back to Python extraction script: python scripts/extract_pages.py ..."
  python scripts/extract_pages.py --start "$START_PAGE" --end "$END_PAGE" --pdf "$PDF_PATH" --out "$OUTPUT_DIR"
  exit 0
fi

echo "Running pdftoppm (150 DPI PNG)..."
pdftoppm -png -r 150 -f "$START_PAGE" -l "$END_PAGE" "$PDF_PATH" "$OUTPUT_DIR/page"

echo "Running pdftotext..."
pdftotext -f "$START_PAGE" -l "$END_PAGE" "$PDF_PATH" "$OUTPUT_DIR/pages_${START_PAGE}_${END_PAGE}.txt"

echo "Extraction complete into $OUTPUT_DIR"
```

---

## 5. Verification Method

### 5.1 Verification Commands
1. **Node and npm inspection**:
   ```powershell
   node -v
   npm -v
   ```
   *Expected*: `v26.5.1` and `11.17.0`.

2. **Python and installed libraries**:
   ```powershell
   python --version
   python -m pip list | Select-String -Pattern "pypdf|pytest|numpy|pillow"
   ```
   *Expected*: Shows Python 3.14.6 and listed packages.

3. **Workspace Root Asset Verification**:
   ```powershell
   Get-ChildItem -Path "d:\Thomas-Calculus-Book"
   ```
   *Expected*: Confirms `Thomas-Calculus-14th-Edition-[konkur.in].pdf` exists and `calculus-guide/` is ready to be created.

### 5.2 Milestone 1 Acceptance Verification (Post-Implementation)
1. `cd d:\Thomas-Calculus-Book\calculus-guide; npm run build` exits with code 0.
2. Verify all 7 routes render correctly:
   - `/`
   - `/chapters/ch01`
   - `/chapters/ch01/1.1-functions-and-graphs`
   - `/practice/1.1-functions-and-graphs`
   - `/quiz/ch01`
   - `/dashboard`
   - `/about`
3. Inspect HTML output for persistent footer string:
   `"Made by Muhammad Abdullah Athar"` with anchor href `"https://github.com/AbdullahMalik17"`.
4. Check `.gitignore` contains `node_modules/`, `.next/`, `source/`, `.venv/`.

### 5.3 Invalidation Conditions
- If Node.js is downgraded below 18 or removed.
- If `calculus-guide` is created outside `d:\Thomas-Calculus-Book`.
- If the footer is placed only on individual pages rather than globally in `app/layout.tsx`.
- If `source/` is committed to git instead of being ignored.
