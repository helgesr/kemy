import { forwardRef } from 'react';
import { categories } from '../../data/factors';
import type { Recommendation } from '../../types/assessment';

interface PdfReportProps {
  locationName: string;
  date: string;
  scores: Record<string, number>;
  totalScore: number;
  recommendation: Recommendation;
  categoryScores: Record<string, number>;
}

const scoreLabels = ['Lav', 'Moderat', 'Høy'] as const;

const recStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
  low: { bg: '#E8F5EC', border: '#2D8B4E', text: '#1A5C30', label: 'LAV RISIKO' },
  medium: { bg: '#FFF3E0', border: '#D4890A', text: '#8B5A00', label: 'MODERAT RISIKO' },
  high: { bg: '#FDEAEA', border: '#C03030', text: '#8B1A1A', label: 'HØY RISIKO' },
};

const PdfReport = forwardRef<HTMLDivElement, PdfReportProps>(
  ({ locationName, date, scores, totalScore, recommendation, categoryScores }, ref) => {
    const rec = recStyles[recommendation.type];
    const generatedAt = new Date().toLocaleString('nb-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div
        ref={ref}
        style={{
          width: '794px',    /* A4 width at 96dpi */
          minHeight: '1123px',
          background: '#FFFFFF',
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          color: '#1E2025',
          padding: '0',
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -1,
        }}
      >
        {/* === HEADER BAR === */}
        <div
          style={{
            background: '#1E2025',
            padding: '28px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '0.25em',
                color: '#FFFFFF',
              }}
            >
              KEMY
            </div>
            <div style={{ fontSize: '11px', color: '#C7C7C9', letterSpacing: '0.05em', marginTop: '2px' }}>
              Beslutningsstøtte for toppslakt
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#C7C7C9', textAlign: 'right' }}>
            Rapport generert {generatedAt}
          </div>
        </div>

        {/* === CONTENT === */}
        <div style={{ padding: '36px 48px 32px' }}>

          {/* Title + meta */}
          <div style={{ marginBottom: '28px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '24px',
                fontWeight: 700,
                margin: '0 0 4px',
                color: '#1E2025',
              }}
            >
              Vurdering av toppslakt
            </h1>
            <div style={{ display: 'flex', gap: '32px', fontSize: '13px', color: '#56585C', marginTop: '8px' }}>
              <span><strong style={{ color: '#1E2025' }}>Lokalitet:</strong> {locationName || '–'}</span>
              <span>
                <strong style={{ color: '#1E2025' }}>Dato:</strong>{' '}
                {new Date(date).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* === SCORE OVERVIEW CARD === */}
          <div
            style={{
              border: `2px solid ${rec.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            {/* Top banner */}
            <div
              style={{
                background: rec.bg,
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: rec.text, marginBottom: '4px' }}>
                  {rec.label}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: rec.text }}>
                  {recommendation.text}
                </div>
                <div style={{ fontSize: '12px', color: '#56585C', marginTop: '4px', maxWidth: '400px' }}>
                  {recommendation.description}
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: '90px' }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '48px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: rec.text,
                  }}
                >
                  {totalScore}
                </div>
                <div style={{ fontSize: '13px', color: '#56585C', marginTop: '2px' }}>av 24 poeng</div>
              </div>
            </div>

            {/* Category bars */}
            <div style={{ padding: '16px 28px', display: 'flex', gap: '16px' }}>
              {categories.map((cat) => {
                const catScore = categoryScores[cat.id] ?? 0;
                const pct = (catScore / 8) * 100;
                const barColor = catScore <= 2 ? '#2D8B4E' : catScore <= 5 ? '#D4890A' : '#C03030';
                return (
                  <div key={cat.id} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: '#1E2025' }}>{cat.name}</span>
                      <span style={{ fontWeight: 700, color: barColor }}>{catScore}/8</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: '#E5E5EA' }}>
                      <div
                        style={{
                          height: '100%',
                          borderRadius: '3px',
                          width: `${pct}%`,
                          background: barColor,
                          minWidth: catScore > 0 ? '4px' : '0',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* === DETAILED SCORES === */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '18px',
              fontWeight: 700,
              margin: '0 0 16px',
              color: '#1E2025',
            }}
          >
            Detaljert vurdering
          </h2>

          {categories.map((cat) => {
            const catScore = categoryScores[cat.id] ?? 0;
            return (
              <div key={cat.id} style={{ marginBottom: '20px' }}>
                {/* Category header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 16px',
                    background: '#F5F5F7',
                    borderRadius: '8px 8px 0 0',
                    borderBottom: '2px solid #E5E5EA',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E2025' }}>
                    {cat.name}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: catScore <= 2 ? '#2D8B4E' : catScore <= 5 ? '#D4890A' : '#C03030',
                    }}
                  >
                    {catScore} / 8
                  </span>
                </div>

                {/* Factor rows */}
                {cat.factors.map((factor, i) => {
                  const val = scores[factor.id] ?? 0;
                  return (
                    <div
                      key={factor.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 16px',
                        borderBottom: i < cat.factors.length - 1 ? '1px solid #E5E5EA' : 'none',
                        background: '#FFFFFF',
                      }}
                    >
                      {/* Factor name */}
                      <span style={{ flex: 1, fontSize: '13px', color: '#1E2025' }}>
                        {factor.name}
                      </span>

                      {/* Score pills */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[0, 1, 2].map((s) => {
                          const isActive = val === s;
                          const colors = [
                            { bg: '#2D8B4E', activeBg: '#2D8B4E' },
                            { bg: '#D4890A', activeBg: '#D4890A' },
                            { bg: '#C03030', activeBg: '#C03030' },
                          ];
                          return (
                            <div
                              key={s}
                              style={{
                                width: '64px',
                                height: '26px',
                                borderRadius: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: isActive ? 700 : 500,
                                background: isActive ? colors[s].activeBg : '#F5F5F7',
                                color: isActive ? '#FFFFFF' : '#8E8E93',
                                border: isActive ? 'none' : '1px solid #E5E5EA',
                              }}
                            >
                              {scoreLabels[s]}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* === SCORE SCALE LEGEND === */}
          <div
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: '#F5F5F7',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#56585C',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: '#1E2025' }}>Tolkningsnøkkel:</strong>
            <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
              <span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#2D8B4E', marginRight: '6px', verticalAlign: 'middle' }} />
                0–8 poeng: Behold fisk – lav risiko
              </span>
              <span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#D4890A', marginRight: '6px', verticalAlign: 'middle' }} />
                9–16 poeng: Vurder selektiv toppslakt
              </span>
              <span>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#C03030', marginRight: '6px', verticalAlign: 'middle' }} />
                17–24 poeng: Gjennomfør toppslakt
              </span>
            </div>
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          style={{
            padding: '16px 48px',
            borderTop: '1px solid #E5E5EA',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: '#8E8E93',
            marginTop: 'auto',
          }}
        >
          <span>Powered by Saxe.Tech AS © 2026</span>
          <span>www.kemy.no</span>
        </div>
      </div>
    );
  }
);

PdfReport.displayName = 'PdfReport';
export default PdfReport;
