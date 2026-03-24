import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useAssessment } from './hooks/useAssessment';
import { useHistory } from './hooks/useHistory';
import { categories } from './data/factors';
import { exportToPdf } from './lib/pdf';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AssessmentMeta from './components/assessment/AssessmentMeta';
import CategorySection from './components/assessment/CategorySection';
import ScoreSummary from './components/results/ScoreSummary';
import ActionBar from './components/actions/ActionBar';
import HistoryPanel from './components/history/HistoryPanel';
import ComparisonView from './components/history/ComparisonView';
import type { Assessment } from './types/assessment';

export default function App() {
  const { dark, toggle } = useTheme();
  const assessment = useAssessment();
  const history = useHistory();
  const [comparison, setComparison] = useState<{ a: Assessment; b: Assessment } | null>(null);

  function handleSave() {
    history.save(assessment.locationName, assessment.date, assessment.scores);
  }

  function handleLoad(saved: Assessment) {
    assessment.loadScores(saved.scores, saved.locationName, saved.date);
  }

  async function handleExportPdf() {
    const filename = `toppslakt-${assessment.locationName || 'vurdering'}-${assessment.date}.pdf`;
    await exportToPdf('pdf-content', filename);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header dark={dark} onToggleTheme={toggle} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div id="pdf-content">
          <AssessmentMeta
            locationName={assessment.locationName}
            onLocationChange={assessment.setLocationName}
            date={assessment.date}
            onDateChange={assessment.setDate}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Left column: assessment form */}
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

            {/* Right column: results */}
            <div>
              <ScoreSummary
                totalScore={assessment.totalScore}
                recommendation={assessment.recommendation}
                categoryScores={assessment.categoryScores}
              />
            </div>
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

      <Footer />

      <AnimatePresence>
        {comparison && (
          <ComparisonView
            a={comparison.a}
            b={comparison.b}
            onClose={() => setComparison(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
