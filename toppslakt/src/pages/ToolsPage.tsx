import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAssessment } from '../hooks/useAssessment';
import { useHistory } from '../hooks/useHistory';
import { categories } from '../data/factors';
import { exportReportToPdf } from '../lib/pdf';
import AssessmentMeta from '../components/assessment/AssessmentMeta';
import CategorySection from '../components/assessment/CategorySection';
import ScoreSummary from '../components/results/ScoreSummary';
import ActionBar from '../components/actions/ActionBar';
import HistoryPanel from '../components/history/HistoryPanel';
import ComparisonView from '../components/history/ComparisonView';
import PdfReport from '../components/report/PdfReport';
import type { Assessment } from '../types/assessment';

export default function ToolsPage() {
  const assessment = useAssessment();
  const history = useHistory();
  const [comparison, setComparison] = useState<{ a: Assessment; b: Assessment } | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  function handleSave() {
    history.save(assessment.locationName, assessment.date, assessment.scores);
  }

  function handleLoad(saved: Assessment) {
    assessment.loadScores(saved.scores, saved.locationName, saved.date);
  }

  async function handleExportPdf() {
    if (!reportRef.current) return;
    const filename = `toppslakt-${assessment.locationName || 'vurdering'}-${assessment.date}.pdf`;
    await exportReportToPdf(reportRef.current, filename);
  }

  return (
    <>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AssessmentMeta
          locationName={assessment.locationName}
          onLocationChange={assessment.setLocationName}
          date={assessment.date}
          onDateChange={assessment.setDate}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                scores={assessment.scores}
                onScoreChange={assessment.setScore}
              />
            ))}
          </div>

          <div>
            <ScoreSummary
              totalScore={assessment.totalScore}
              recommendation={assessment.recommendation}
              categoryScores={assessment.categoryScores}
            />
          </div>
        </div>

        <div className="mt-6">
          <ActionBar
            onSave={handleSave}
            onReset={assessment.reset}
            onExportPdf={handleExportPdf}
            canSave={assessment.locationName.trim().length > 0}
          />
        </div>

        <HistoryPanel
          assessments={history.assessments}
          onLoad={handleLoad}
          onDelete={history.remove}
          onCompare={(a, b) => setComparison({ a, b })}
        />
      </main>

      {/* Hidden PDF report - rendered off-screen for capture */}
      <PdfReport
        ref={reportRef}
        locationName={assessment.locationName}
        date={assessment.date}
        scores={assessment.scores}
        totalScore={assessment.totalScore}
        recommendation={assessment.recommendation}
        categoryScores={assessment.categoryScores}
      />

      <AnimatePresence>
        {comparison && (
          <ComparisonView
            a={comparison.a}
            b={comparison.b}
            onClose={() => setComparison(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
