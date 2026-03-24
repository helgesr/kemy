export interface Factor {
  id: string;
  name: string;
  categoryId: string;
  tooltip: string;
}

export interface Category {
  id: string;
  name: string;
  factors: Factor[];
}

export type RecommendationType = 'low' | 'medium' | 'high';

export interface Recommendation {
  type: RecommendationType;
  text: string;
  description: string;
}

export interface Assessment {
  id: string;
  locationName: string;
  date: string;
  scores: Record<string, number>;
  totalScore: number;
  recommendation: Recommendation;
  createdAt: string;
}
