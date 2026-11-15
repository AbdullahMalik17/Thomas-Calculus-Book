import type { MetadataRoute } from 'next';
import { CHAPTER_METADATA, getAllSections } from '@/lib/content/curriculum';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const chapters = Object.values(CHAPTER_METADATA);
  const allSections = getAllSections();

  // 1. Core Static & Midterm Hub Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/mids`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mids/definitions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/dashboard`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. All 16 Chapter Routes (/chapters/ch01 - /chapters/ch16)
  const chapterRoutes: MetadataRoute.Sitemap = chapters.map((ch) => ({
    url: `${SITE_URL}/chapters/${ch.key}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. All 119 Section Study Guide & Solutions Routes (/chapters/[ch]/[section])
  const sectionRoutes: MetadataRoute.Sitemap = allSections.map((sec) => ({
    url: `${SITE_URL}/chapters/${sec.chapterKey}/${sec.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. All Section Practice Routes (/practice/[section])
  const practiceRoutes: MetadataRoute.Sitemap = allSections.map((sec) => ({
    url: `${SITE_URL}/practice/${sec.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: sec.practiceCount > 0 ? 0.8 : 0.65,
  }));

  // 5. All 16 Chapter Diagnostic Quiz Routes (/quiz/ch01 - /quiz/ch16)
  const quizRoutes: MetadataRoute.Sitemap = chapters.map((ch) => ({
    url: `${SITE_URL}/quiz/${ch.key}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...chapterRoutes,
    ...sectionRoutes,
    ...practiceRoutes,
    ...quizRoutes,
  ];
}
