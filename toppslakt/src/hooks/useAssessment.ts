import { useState, useMemo } from 'react';
import { getInitialScores, calculateTotalScore, calculateCategoryScore, getRecommendation } from '../lib/scoring';
import { categories } from '../data/factors';
import type { Recommendation } from '../types/assessment';

export function useAssessment() {
  const [scores, setScores] = useState<Record<string, number>>(getInitialScores);
  const [locationName, setLocationName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const totalScore = useMemo(() => calculateTotalScore(scores), [scores]);
  const recommendation: Recommendation = useMemo(() => getRecommendation(totalScore), [totalScore]);

  const categoryScores = useMemo(() => {
    const result: Record<string, number> = {};
    for (const cat of categories) {
      result[cat.id] = calculateCategoryScore(cat.id, scores);
    }
    return result;
  }, [scores]);

  function setScore(factorId: string, value: number) {
    setScores((prev) => ({ ...prev, [factorId]: value }));
  }

  function reset() {
    setScores(getInitialScores());
    setLocationName('');
    setDate(new Date().toISOString().split('T')[0]);
  }

  function loadScores(newScores: Record<string, number>, name: string, d: string) {
    setScores(newScores);
    setLocationName(name);
    setDate(d);
  }

  return {
    scores,
    totalScore,
    recommendation,
    categoryScores,
    locationName,
    setLocationName,
    date,
    setDate,
    setScore,
    reset,
    loadScores,
  };
}
