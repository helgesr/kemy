import type { Assessment } from '../types/assessment';

const STORAGE_KEY = 'kemy-toppslakt-history';

export function loadAssessments(): Assessment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAssessment(assessment: Assessment): void {
  const list = loadAssessments();
  list.unshift(assessment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function deleteAssessment(id: string): void {
  const list = loadAssessments().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
