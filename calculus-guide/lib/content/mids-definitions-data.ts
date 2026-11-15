import { getAllSections } from '@/lib/content/curriculum';
import { loadSectionContent } from '@/lib/content/loader';
import type { DefinitionItem, Solution } from '@/lib/content/schema';

export interface MidsDefinition {
  id: string;
  chapterKey: string;
  chapterNumber: number;
  chapterTitle: string;
  sectionNumber: string;
  sectionTitle: string;
  title: string;
  category: DefinitionItem['category'];
  latex?: string;
  statement: string;
  intuition: string;
  conditions: string[];
  takeaway?: string;
  example: Solution | null;
  notesHref: string;
  practiceHref: string;
}

function findExample(definition: DefinitionItem, solutions: Solution[]): Solution | null {
  const keywords = `${definition.title} ${definition.statement}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 4);

  const ranked = solutions
    .map((solution) => {
      const haystack = `${solution.title} ${solution.originalTopic} ${solution.problemStatement}`.toLowerCase();
      const score = keywords.reduce((total, keyword) => total + (haystack.includes(keyword) ? 1 : 0), 0);
      return { solution, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.solution ?? solutions[0] ?? null;
}

export function getMidsDefinitions(): MidsDefinition[] {
  return getAllSections()
    .filter((section) => section.chapterNum >= 1 && section.chapterNum <= 3)
    .flatMap((section) => {
      const content = loadSectionContent(section.chapterKey, section.id);
      const definitions = content?.definitionsFile?.definitions ?? [];
      return definitions.map((definition) => ({
        id: definition.id,
        chapterKey: section.chapterKey,
        chapterNumber: section.chapterNum,
        chapterTitle: section.chapterTitle,
        sectionNumber: section.number,
        sectionTitle: section.title,
        title: definition.title,
        category: definition.category,
        latex: definition.latex,
        statement: definition.statement,
        intuition: definition.explanation,
        conditions: definition.conditions ?? [],
        takeaway: definition.keyTakeaway,
        example: findExample(definition, content?.solutions ?? []),
        notesHref: `/chapters/${section.chapterKey}/${section.id}`,
        practiceHref: `/practice/${section.id}`,
      }));
    });
}
