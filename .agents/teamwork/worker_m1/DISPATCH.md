# Dispatch: Milestone 1 Implementation Worker (Scaffolding & Environment)

## Identity
- Role: Implementation Worker (Milestone 1: Project & Scaffolding)
- Archetype: teamwork_preview_worker
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m1

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Author & Attribution Mandate
Made by Muhammad Abdullah Athar (GitHub: https://github.com/AbdullahMalik17).
Persistent global footer: "Made by Muhammad Abdullah Athar" linking to GitHub profile.
Include JSON-LD and page metadata authoring attributed to Muhammad Abdullah Athar.

## Skills to Apply
Read and apply the following skills:
1. `modern-web-guidance` (`C:\Users\HP\.gemini\config\plugins\modern-web-guidance-plugin\skills\modern-web-guidance\SKILL.md`): Modern Next.js 14 App Router standards, clean TypeScript, responsive layouts.
2. `agency-ux-architect` (`d:\Thomas-Calculus-Book\.agents\skills\design-ux-architect\SKILL.md`) & `agency-ui-designer` (`d:\Thomas-Calculus-Book\.agents\skills\design-ui-designer\SKILL.md`): Design token system in Tailwind CSS, premium typography, mathematical styling, clean navigation.
3. `agency-brand-guardian` (`d:\Thomas-Calculus-Book\.agents\skills\design-brand-guardian\SKILL.md`): Persistent footer attribution to Muhammad Abdullah Athar on every page, JSON-LD, and page metadata.
4. `agency-aeo-foundations-architect` (`d:\Thomas-Calculus-Book\.agents\skills\marketing-aeo-foundations\SKILL.md`) & `agency-seo-specialist` (`d:\Thomas-Calculus-Book\.agents\skills\marketing-seo-specialist\SKILL.md`): Implement `public/llms.txt`, AI-aware `public/robots.txt`, structured JSON-LD schemas.
5. `a11y-debugging` (`C:\Users\HP\.gemini\config\plugins\chrome-devtools-plugin\skills\a11y-debugging\SKILL.md`): Semantic HTML, WCAG AA contrast, keyboard accessibility.

## Scope of Work (Exclusive Write Ownership)
Files owned: `calculus-guide/` root configuration files, `app/**`, `components/**`, `public/**`, `scripts/extract_pages.*`, `PROGRESS.md`, `CLAUDE.md`, `.gitignore`.

1. Initialize `d:\Thomas-Calculus-Book\calculus-guide/`:
   - Create `package.json` with Next.js 14, React 18, `@next/mdx`, `remark-math`, `rehype-katex`, `katex`, `zod`, `tailwindcss`, `lucide-react`, `tsx`, `typescript`.
   - Create `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `mdx-components.tsx`.
   - Run `npm install` in `calculus-guide/`.
2. Layout & Attribution:
   - `app/layout.tsx`: Import `katex/dist/katex.min.css` and `globals.css`. Embed JSON-LD structured data attributing Muhammad Abdullah Athar. Export page metadata with author Muhammad Abdullah Athar.
   - `components/layout/Footer.tsx`: Global persistent footer with text `"Made by Muhammad Abdullah Athar"` linking to `https://github.com/AbdullahMalik17`.
   - `components/layout/Header.tsx`: Navigation bar with links to `/`, Chapters, Practice, Quizzes, Dashboard, About.
3. 7 Route Placeholders:
   - `/` (`app/page.tsx`): Overview of study platform, Thomas' Calculus Chapter 1 feature spotlight, links.
   - `/chapters/[ch]` (`app/chapters/[ch]/page.tsx`): Chapter index.
   - `/chapters/[ch]/[section]` (`app/chapters/[ch]/[section]/page.tsx`): Section study page.
   - `/practice/[section]` (`app/practice/[section]/page.tsx`): Interactive practice interface placeholder.
   - `/quiz/[chapter]` (`app/quiz/[chapter]/page.tsx`): Interactive quiz interface placeholder.
   - `/dashboard` (`app/dashboard/page.tsx`): Student progress and mastery dashboard placeholder.
   - `/about` (`app/about/page.tsx`): Platform mission, attribution to Muhammad Abdullah Athar, copyright safeguards.
4. Additional Assets:
   - `public/llms.txt` and `public/robots.txt` (AEO/SEO discovery).
   - `.gitignore` (excluding node_modules/, .next/, source/, *.pdf, .venv/, etc.).
   - `scripts/extract_pages.sh` and companion `scripts/extract_pages.py`.
   - `PROGRESS.md` and `CLAUDE.md`.
5. Verification:
   - Run `npm run build` and ensure exit code 0.
   - Document commands and results in `handoff.md`. Send message to parent when done.


## 2026-10-05T07:55:39Z
[Message] timestamp=2026-10-05T07:55:39Z sender=7bab1d68-abbc-476d-958e-f8e722650076 priority=MESSAGE_PRIORITY_HIGH content=You are teamwork_preview_worker (Milestone 1 Implementation Worker).
Your working directory is: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m1
Your detailed dispatch instructions are in: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m1\DISPATCH.md
Read the following authoritative reference files before starting:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\teamwork_preview_explorer_survey_1\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

ATTRIBUTION REQUIREMENT:
All pages must include persistent global footer "Made by Muhammad Abdullah Athar" linking to https://github.com/AbdullahMalik17.
Embed author metadata and JSON-LD attributing Muhammad Abdullah Athar.

SKILLS TO APPLY:
1. modern-web-guidance: Next.js 14 App Router, responsive styling, clean TypeScript.
2. agency-ux-architect & agency-ui-designer: Tailwind CSS design tokens, premium typography, mathematical layout.
3. agency-brand-guardian: Persistent author attribution to Muhammad Abdullah Athar.
4. agency-aeo-foundations-architect & agency-seo-specialist: public/llms.txt, AI-aware robots.txt, metadata.
5. a11y-debugging: Semantic HTML, ARIA labels, WCAG AA contrast.

Implement all Milestone 1 deliverables in d:\Thomas-Calculus-Book\calculus-guide:
1. Initialize package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs, mdx-components.tsx. Run npm install.
2. Build app/layout.tsx (with KaTeX css, globals.css, JSON-LD, metadata) and components/layout/Footer.tsx, Header.tsx.
3. Implement 7 route placeholders: /, /chapters/[ch], /chapters/[ch]/[section], /practice/[section], /quiz/[chapter], /dashboard, /about.
4. Add public/llms.txt, public/robots.txt, .gitignore, scripts/extract_pages.sh, scripts/extract_pages.py, PROGRESS.md, CLAUDE.md.
5. Run npm run build and verify exit code 0.
Write your detailed report to handoff.md in your working directory and message parent when complete.
