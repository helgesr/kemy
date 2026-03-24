import { useState, useCallback } from 'react';
import type { Assessment, Recommendation } from '../types/assessment';
import { loadAssessments, saveAssessment, deleteAssessment, generateId } from '../lib/storage';
import { calculateTotalScore, getRecommendation } from '../lib/scoring';

export function useHistory() {
  const [assessments, setAssessments] = useState<Assessment[]>(loadAssessments);

  const refresh = useCallback(() => {
    setAssessments(loadAssessments());
  }, []);

  const save = useCallback(
    (locationName: string, date: string, scores: Record<string, number>) => {
      const totalScore = calculateTotalScore(scores);
      const recommendation: Recommendation = getRecommendation(totalScore);
      const assessment: Assessment = {
        id: generateId(),
        locationName: locationName || 'Uten navn',
        date,
        scores: { ...scores },
        totalScore,
        recommendation,
        createdAt: new Date().toISOString(),
      };
      saveAssessment(assessment);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      deleteAssessment(id);
      refresh();
    },
    [refresh]
  );

  return { assessments, save, remove, refresh };
}
