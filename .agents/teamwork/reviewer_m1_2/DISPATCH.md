# Dispatch: Reviewer 2 (Milestone 1 Attribution & Guardrails)

## Identity
- Role: Attribution & Guardrails Reviewer
- Archetype: teamwork_preview_reviewer
- Working Directory: d:\Thomas-Calculus-Book\.agents\teamwork\reviewer_m1_2

## Objective
Independently review attribution, legal boundaries, and scripts in `d:\Thomas-Calculus-Book\calculus-guide`.

## Reference Materials
- Original Request: d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- Project Scope: d:\Thomas-Calculus-Book\PROJECT.md
- Worker M1 Handoff: d:\Thomas-Calculus-Book\.agents\teamwork\worker_m1\handoff.md

## Review Criteria
1. Verify persistent global footer in `components/layout/Footer.tsx` has exact text `"Made by Muhammad Abdullah Athar"` with anchor href `"https://github.com/AbdullahMalik17"`.
2. Verify `app/layout.tsx` metadata and JSON-LD structured data attributing `Muhammad Abdullah Athar`.
3. Verify `.gitignore` excludes `node_modules/`, `.next/`, `source/`, `extracted/`, `*.pdf`, `.venv/`.
4. Verify `scripts/extract_pages.sh` and `scripts/extract_pages.py`.
5. Verify `PROGRESS.md`, `CLAUDE.md`, `public/llms.txt`, `public/robots.txt`.
6. Output verdict: APPROVE or REQUEST_CHANGES in `handoff.md`.


## 2026-10-05T08:21:17Z
[Message] sender=7bab1d68-abbc-476d-958e-f8e722650076 priority=MESSAGE_PRIORITY_HIGH
You are teamwork_preview_reviewer (Reviewer 2 for Milestone 1).
Working directory: d:\Thomas-Calculus-Book\.agents\teamwork\reviewer_m1_2
Read instructions: d:\Thomas-Calculus-Book\.agents\teamwork\reviewer_m1_2\DISPATCH.md
Read:
- d:\Thomas-Calculus-Book\.agents\teamwork\ORIGINAL_REQUEST.md
- d:\Thomas-Calculus-Book\PROJECT.md
- d:\Thomas-Calculus-Book\.agents\teamwork\worker_m1\handoff.md

Review persistent footer attribution to Muhammad Abdullah Athar (https://github.com/AbdullahMalik17), JSON-LD, metadata, .gitignore, and PDF extraction scripts.
Maintain progress.md. Write your report to handoff.md with verdict APPROVE or REQUEST_CHANGES. Send message to parent when done.
