# Project Engineering Rules: calculus-guide

## Creator & Attribution Mandate
- **Author & Architect**: Muhammad Abdullah Athar
- **GitHub Profile**: `https://github.com/AbdullahMalik17`
- **Start-of-Page Attribution**: Every page must render the persistent top `<AuthorMasthead />` (at the start of `<main id="main-content">` before `{children}`) and sticky `<Header />` subtitle (`by Muhammad Abdullah Athar`) attributing `"Muhammad Abdullah Athar"` (`https://github.com/AbdullahMalik17`), as well as explicit top-level bylines (`By Muhammad Abdullah Athar · SymPy Verified`) in `app/page.tsx` and `components/section/BookSectionReader.tsx`.
- **End-of-Page Attribution**: Every page must render the persistent global `<Footer />` containing `"Made by Muhammad Abdullah Athar"` linking to `https://github.com/AbdullahMalik17`.
- **Structured Data**: Root layout and `<AuthorMasthead />` must export page metadata, embed JSON-LD (`EducationalWebSite` / `Person`), and include `https://schema.org/Person` microdata attributing Muhammad Abdullah Athar.

---

## Legal & Copyright Boundaries
- **No Verbatim Reproduction**: Never copy textbook problem statements, figures, or prose verbatim from Thomas' Calculus (14th Edition).
- **Identifier Referencing**: Paraphrase all worked exercises with references strictly by identifier (e.g., "Section 1.1, Exercise 21").
- **Original Content**: All practice problems and multiple-choice questions must be original creations designed specifically for this platform.
- **Excluded Source Materials**: Raw textbook PDFs and extracted raster images reside in `source/` and are strictly excluded via `.gitignore`. Never commit raw textbook assets.

---

## Build, Verification & Attribution Guardrails
- Run `npm run attribution:verify` to enforce top-of-page (`AuthorMasthead.tsx`, `Header.tsx`, `app/layout.tsx`, `app/page.tsx`, `BookSectionReader.tsx`) and end-of-page (`Footer.tsx`) author attribution.
- Run `npm run style:verify` to enforce the 3-layer `oklch()` Warm Editorial Luxury / Stripe Press Mathematical Monograph design system.
- Run `npm run test:e2e` for the complete automated acceptance test suite.
