import type { Recommendation } from '../types/assessment';
import { categories } from '../data/factors';

export function calculateTotalScore(scores: Record<string, number>): number {
  return Object.values(scores).reduce((sum, val) => sum + val, 0);
}

export function calculateCategoryScore(
  categoryId: string,
  scores: Record<string, number>
): number {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return 0;
  return category.factors.reduce((sum, f) => sum + (scores[f.id] ?? 0), 0);
}

export function getRecommendation(totalScore: number): Recommendation {
  if (totalScore <= 8) {
    return {
      type: 'low',
      textKey: 'rec.low.text',
      descriptionKey: 'rec.low.desc',
      // Keep legacy fields for saved assessments
      text: 'Behold fisk – lav risiko',
      description: 'Risikoprofilen tilsier at det er trygt å beholde fisken i merden.',
    };
  }
  if (totalScore <= 16) {
    return {
      type: 'medium',
      textKey: 'rec.medium.text',
      descriptionKey: 'rec.medium.desc',
      text: 'Vurder selektiv toppslakt (20–40 %)',
      description:
        'Moderat risiko. Vurder å ta ut de største fiskene for å redusere eksponering.',
    };
  }
  return {
    type: 'high',
    textKey: 'rec.high.text',
    descriptionKey: 'rec.high.desc',
    text: 'Gjennomfør toppslakt – høy risiko',
    description:
      'Høy samlet risiko. Anbefaler å gjennomføre toppslakt for å sikre verdier.',
  };
}

export function getInitialScores(): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const cat of categories) {
    for (const factor of cat.factors) {
      scores[factor.id] = 0;
    }
  }
  return scores;
}
