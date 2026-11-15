// lib/seo.ts
/**
 * Technical SEO & Generative Engine Optimization (GEO / AEO) Utilities
 * Structured Data (Schema.org JSON-LD) & Canonical Metadata Builders
 *
 * Authored by: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
 */

import type { ChapterMetadata, SectionItem } from '@/lib/content/curriculum';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://thomas-calculus-guide.vercel.app';

export const SITE_NAME = "Thomas' Calculus Study Guide";
export const SITE_TITLE = "Thomas' Calculus Study Guide | Interactive & SymPy Verified (14th Ed)";
export const SITE_DESCRIPTION =
  "Interactive study companion for Thomas' Calculus (14th Edition) with 16 chapters, 119 sections, 934 SymPy CAS-verified step-by-step exercise solutions, progressive practice hints, midterm exam simulator, and misconception-annotated quizzes.";

export const AUTHOR_NAME = 'Muhammad Abdullah Athar';
export const AUTHOR_URL = 'https://github.com/AbdullahMalik17';
export const REPO_URL = 'https://github.com/AbdullahMalik17/Thomas-Calculus-Book';

export const AUTHOR_PERSON_JSON_LD = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
  sameAs: [AUTHOR_URL, REPO_URL],
  jobTitle: 'Author & Mathematical Software Architect',
};

export function canonicalUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export function buildRootJsonLd(chapters: ChapterMetadata[]) {
  const totalSections = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);
  const totalSolutions = chapters.reduce(
    (sum, ch) => sum + ch.sections.reduce((sSum, s) => sSum + s.solutionsCount, 0),
    0
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      AUTHOR_PERSON_JSON_LD,
      {
        '@type': 'EducationalWebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: "Thomas' Calculus (14th Edition) Interactive Study Companion",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        educationalUse: [
          'Self-Study',
          'Curriculum Companion',
          'Worked Examples',
          'Practice Problems',
          'Midterm Exam Preparation',
        ],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'Undergraduate Mathematics, Physics, and Engineering Students',
        },
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        publisher: AUTHOR_PERSON_JSON_LD,
        codeRepository: REPO_URL,
        sameAs: [REPO_URL, AUTHOR_URL],
      },
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/#course`,
        name: "Thomas' Calculus (14th Edition) — Complete Interactive Course & Verified Solutions",
        courseCode: 'CALC-14E',
        url: `${SITE_URL}/chapters`,
        description: `Complete 16-chapter single-variable, multivariable, and vector calculus curriculum covering ${totalSections} sections and ${totalSolutions} SymPy CAS-verified step-by-step solutions.`,
        provider: AUTHOR_PERSON_JSON_LD,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        educationalLevel: 'Undergraduate (Calculus I, Calculus II, Calculus III)',
        teaches: [
          'Functions, Limits, and Continuity',
          'Derivatives and Applications of Differentiation',
          'Definite and Indefinite Integrals, Fundamental Theorem of Calculus',
          'Transcendental Functions and Techniques of Integration',
          'First-Order Differential Equations and Infinite Series',
          'Parametric Equations, Polar Coordinates, and Vectors in 3-Space',
          'Partial Derivatives, Multiple Integrals, and Vector Calculus (Green, Stokes, Divergence Theorems)',
        ],
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT120H',
          instructor: AUTHOR_PERSON_JSON_LD,
        },
        hasPart: chapters.map((ch) => ({
          '@type': 'Course',
          '@id': `${SITE_URL}/chapters/${ch.key}#course`,
          name: ch.title,
          courseCode: `CALC-14E-${ch.key.toUpperCase()}`,
          description: ch.description,
          url: `${SITE_URL}/chapters/${ch.key}`,
          provider: AUTHOR_PERSON_JSON_LD,
        })),
      },
      {
        '@type': 'LearningResource',
        '@id': `${SITE_URL}/#learning-resource`,
        name: "Thomas' Calculus 14th Edition SymPy-Verified Solutions & Diagnostic Study Guide",
        url: SITE_URL,
        description:
          'Paraphrased step-by-step calculus solutions verified by a Python SymPy computer algebra engine, paired with 3-tier progressive practice sets, 65 midterm exam MCQs, and distractor misconception diagnostics.',
        learningResourceType: [
          'Study Guide',
          'Worked Example',
          'Practice Problem Set',
          'Diagnostic Assessment',
          'Interactive Exam Simulator',
        ],
        educationalLevel: 'Undergraduate',
        educationalUse: ['Self-Study', 'Homework Reference', 'Exam Review'],
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        publisher: AUTHOR_PERSON_JSON_LD,
        isPartOf: {
          '@id': `${SITE_URL}/#course`,
        },
      },
    ],
  };
}

export function buildChapterJsonLd(chapter: ChapterMetadata) {
  const solCount = chapter.sections.reduce((acc, s) => acc + s.solutionsCount, 0);
  const chapterUrl = `${SITE_URL}/chapters/${chapter.key}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      AUTHOR_PERSON_JSON_LD,
      {
        '@type': 'Course',
        '@id': `${chapterUrl}#course`,
        name: `${chapter.title} | Thomas' Calculus (14th Edition)`,
        courseCode: `CALC-14E-${chapter.key.toUpperCase()}`,
        url: chapterUrl,
        description: `${chapter.description} Includes ${chapter.sections.length} curriculum sections and ${solCount} SymPy CAS-verified step-by-step exercise solutions.`,
        provider: AUTHOR_PERSON_JSON_LD,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        educationalLevel: 'Undergraduate',
        isPartOf: {
          '@type': 'Course',
          '@id': `${SITE_URL}/#course`,
          name: "Thomas' Calculus (14th Edition) Study Guide",
          url: `${SITE_URL}/chapters`,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          instructor: AUTHOR_PERSON_JSON_LD,
        },
      },
      {
        '@type': 'LearningResource',
        '@id': `${chapterUrl}#learning-resource`,
        name: `${chapter.title} — Study Guide, Theorems & ${solCount} Verified Solutions`,
        url: chapterUrl,
        description: chapter.description,
        learningResourceType: ['Chapter Study Guide', 'Worked Solutions', 'Mathematical Theorems'],
        educationalLevel: 'Undergraduate',
        educationalUse: ['Self-Study', 'Problem Solving', 'Concept Review'],
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        author: AUTHOR_PERSON_JSON_LD,
        creator: AUTHOR_PERSON_JSON_LD,
        publisher: AUTHOR_PERSON_JSON_LD,
        isPartOf: {
          '@id': `${chapterUrl}#course`,
        },
        teaches: chapter.sections.map(
          (sec: SectionItem) => `Section ${sec.number}: ${sec.title} — ${sec.description}`
        ),
        hasPart: chapter.sections.map((sec: SectionItem) => ({
          '@type': 'LearningResource',
          '@id': `${SITE_URL}/chapters/${chapter.key}/${sec.id}#learning-resource`,
          name: `Section ${sec.number}: ${sec.title}`,
          description: `${sec.description} (${sec.solutionsCount} SymPy-verified solutions).`,
          url: `${SITE_URL}/chapters/${chapter.key}/${sec.id}`,
          learningResourceType: 'Section Study Guide & Worked Solutions',
          author: AUTHOR_PERSON_JSON_LD,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${chapterUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Chapters Curriculum',
            item: `${SITE_URL}/chapters`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: chapter.title,
            item: chapterUrl,
          },
        ],
      },
    ],
  };
}
