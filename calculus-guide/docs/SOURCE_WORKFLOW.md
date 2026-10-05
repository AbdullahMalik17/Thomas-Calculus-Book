# Source Workflow: Extraction, Copyright Boundaries & Verification Lifecycle

> **Platform**: `calculus-guide` — Thomas' Calculus (14th Edition) Interactive Study Guide  
> **Creator & Author**: **Muhammad Abdullah Athar** ([GitHub: AbdullahMalik17](https://github.com/AbdullahMalik17))  
> **Version**: 1.0.0  
> **Audience**: Content Authors, Auditors, CI/CD Pipelines, Multi-Agent Swarms

---

## 1. Overview & Cleanroom Authoring Philosophy

The `calculus-guide` platform is designed to provide world-class, interactive pedagogical explanations of university-level calculus while maintaining **100% academic integrity and strict compliance with intellectual property laws**.

We employ a **Cleanroom Reverse-Engineering Workflow**:
1. **Source Inspection**: The reference textbook (*Thomas' Calculus, 14th Edition*) is referenced solely to determine curriculum scope, theorem topics, and exercise exercise numbering.
2. **Pedagogical Re-Articulated Synthesis**: Authors and subagents do not transcribe textbook material. Instead, they write fresh, original mathematical definitions, explanatory prose, and solutions from first mathematical principles.
3. **Symbolic Verification**: All generated mathematical assertions and distractors are verified using SymPy.
4. **Isolated Extraction**: Raw textbook files and extracted raster images reside in a local directory (`source/`) that is strictly ignored by Git and never committed to version control.

---

## 2. PDF Extraction Tooling & Commands

Target textbook page ranges are extracted locally using either POSIX shell tools (`pdftoppm` / `pdftotext`) or a cross-platform Python script (`pypdf`).

### 2.1 POSIX Bash Extraction (`scripts/extract_pages.sh`)
The extraction script accepts four positional arguments:
```bash
./scripts/extract_pages.sh <start_page> <end_page> [output_dir] [pdf_path]
```
- **Defaults**:
  - `output_dir`: `source/extracted`
  - `pdf_path`: `../Thomas-Calculus-14th-Edition-[konkur.in].pdf`

#### Example Usage:
```bash
# Extract Section 1.1 (e.g. pages 45 to 55)
./scripts/extract_pages.sh 45 55 source/ch01/sec1.1
```
- Automatically runs `pdftoppm -png -r 150` to generate high-resolution PNG pages for visual reference.
- Automatically runs `pdftotext` to produce `pages_45_55.txt` for text inspection.
- Automatically falls back to `extract_pages.py` if poppler utilities are not found on the system PATH.

### 2.2 Cross-Platform Python Extractor (`scripts/extract_pages.py`)
For Windows environments or systems without `poppler-utils`:
```bash
python scripts/extract_pages.py --start 45 --end 55 --out source/ch01/sec1.1
```

---

## 3. Storage Boundaries & Git Exclusion

### 3.1 Strict Isolation of `source/`
All extracted pages, raster images, and raw PDF files must reside **exclusively** within the `source/` directory at the project root:
```
calculus-guide/
├── source/              <-- EXCLUDED FROM VERSION CONTROL
│   ├── extracted/
│   │   ├── page-045.png
│   │   └── pages_45_55.txt
│   └── reference.pdf
```

### 3.2 Gitignore Enforcement
The `.gitignore` file enforces this policy:
```gitignore
# Source textbook materials and extraction scratchpads
source/
source/**
extracted/
*.pdf
```

> ⚠️ **Zero Tolerance Rule**: Never stage, commit, or push any raw textbook asset, scanned image, or verbatim text dump to Git. Any commit containing raw copyrighted materials will be rejected by the Forensic Auditor.

---

## 4. Copyright Safeguards & Paraphrasing Protocol

### 4.1 Four Core Copyright Rules
1. **Never Copy Problem Statements Verbatim**:
   - Textbook exercise text, story problems, and phrasing are proprietary.
   - Paraphrase all problems into original, clear mathematical prompts.
2. **Reference by Identifier Only**:
   - Always reference textbook exercises using the standardized format:
     `"Section N.N, Exercise M"` (e.g. `"Section 1.1, Exercise 21"`).
   - This provides students with exact textbook cross-referencing while avoiding copyright infringement.
3. **Original Practice Problems & Diagnostic MCQs**:
   - All problems in `practice/*.json` and `mcq/*.json` must be 100% original creations.
   - Do not merely alter numbers in textbook problems; design fresh problems that probe fundamental concepts.
4. **No Raster Diagram Reproduction**:
   - Do not copy figures or diagrams from the textbook.
   - Instead, express visual relationships analytically or generate original vector/SVG graphs.

### 4.2 Paraphrasing Translation Example

| Original Textbook Formulation (Forbidden) | Cleanroom Paraphrased Formulation (Required) |
|-------------------------------------------|---------------------------------------------|
| *"In Exercises 1–6, find the domain and range of each function. 1. $f(x) = 1 + x^2$."* | `"Determine the natural domain and range of the quadratic function $f(x) = 1 + x^2$, showing all algebraic steps."` (Referenced as `"Section 1.1, Exercise 1"`) |
| *"Find the domain of $g(x) = \sqrt{x^2 - 3x}$."* | `"Find the set of all real numbers for which the square-root function $g(x) = \sqrt{x^2 - 3x}$ yields real values."` (Referenced as `"Section 1.1, Exercise 4"`) |

---

## 5. Multi-Agent Authoring & Verification Lifecycle

Every section progresses through a rigorous 6-phase pipeline before reaching publication:

```
┌──────────────────┐
│ 1. Extraction    │ ───► Extracted text & pages in source/ (gitignored)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Authoring     │ ───► chNN-writer generates summary.mdx, solutions, practice, mcq
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. Math Verify   │ ───► math-verifier runs SymPy CLI (verify.py)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Content Audit │ ───► content-reviewer audits 4 Pillars (Copyright, Schema, Pedagogy, Attribution)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Code Validate │ ───► npm run content:validate & npm run content:stats
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 6. Publication   │ ───► Git commit clean content (zero source assets committed)
└──────────────────┘
```

### Phase 1: Extraction & Reference Setup
- The developer or agent extracts the target page range for the section to `source/chNN/secN.N/`.
- Inspect the topics covered (e.g. Domain, Range, Piecewise Functions, Symmetry).

### Phase 2: Authoring (`chNN-writer`)
- The scoped authoring agent (`chNN-writer`) creates:
  - `summary.mdx`: Original exposition, definitions, theorems, and pitfall alerts.
  - `solutions/`: Paraphrased solutions with multi-step reasoning and explicit `"why"` justifications.
  - `practice/`: Original tiered problems (tiers 1-3) with hints and verified steps.
  - `mcq/`: 4-option diagnostic MCQs with cognitive misconception metadata for all distractors.
- Ensures all items include `"author": "Muhammad Abdullah Athar"`.

### Phase 3: Mathematical Verification (`math-verifier`)
- The read-only mathematical verification agent executes:
  ```bash
  python tools/verify/verify.py validate-section --dir content/chNN-...
  ```
- Evaluates:
  - Symbolic algebraic equivalence of all solutions: `simplify(expr - expected) == 0`.
  - MCQ `correctId` evaluation matches expected answer.
  - Distractor pairwise mathematical non-equivalence (no duplicate choices).
  - Distractor separation from correct answer (no multiple correct options).

### Phase 4: Content & Compliance Review (`content-reviewer`)
- The 4-Pillar audit gatekeeper inspects:
  - **Pillar 1**: Copyright compliance (zero verbatim text, proper identifier references).
  - **Pillar 2**: Schema integrity (path-to-ID mapping, no duplicate IDs).
  - **Pillar 3**: Pedagogical quality (meaningful `"why"` fields, authentic misconceptions).
  - **Pillar 4**: Attribution & metadata (persistent footer, author fields).

### Phase 5: CI/CD Validation & Statistics
- Run the schema validator:
  ```bash
  npm run content:validate
  ```
- Generate content metrics:
  ```bash
  npm run content:stats
  ```

### Phase 6: Publication & Commit
- Only files under `content/` and `app/` are staged and committed.
- Verify `git status` shows no files in `source/` staged.

---

## 6. Mandatory Author Attribution

In accordance with platform governance, all prompt templates, documentation, layouts, and metadata must maintain author attribution:
- **Author**: Muhammad Abdullah Athar
- **GitHub**: `https://github.com/AbdullahMalik17`
- **Global Footer**: Rendered on all application views.
- **Content Metadata**: `author: "Muhammad Abdullah Athar"` embedded across all content records.
