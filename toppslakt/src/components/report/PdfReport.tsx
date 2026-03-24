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

const recStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
  low: { bg: '#E8F5EC', border: '#2D8B4E', text: '#1A5C30', label: 'LAV RISIKO' },
  medium: { bg: '#FFF3E0', border: '#D4890A', text: '#8B5A00', label: 'MODERAT RISIKO' },
  high: { bg: '#FDEAEA', border: '#C03030', text: '#8B1A1A', label: 'HØY RISIKO' },
};

function ScoreDot({ value, target, color }: { value: number; target: number; color: string }) {
  const active = value === target;
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: active ? 'none' : '1.5px solid #D1D1D6',
        background: active ? color : 'transparent',
        display: 'inline-block',
      }}
    />
  );
}

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

    const formattedDate = new Date(date).toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div
        ref={ref}
        style={{
          width: '794px',
          height: '1123px',
          background: '#FFFFFF',
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          color: '#1E2025',
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: -1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            background: '#1E2025',
            padding: '20px 44px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '0.25em',
                color: '#FFFFFF',
              }}
            >
              KEMY
            </span>
            <span style={{ fontSize: '10px', color: '#8E8E93', letterSpacing: '0.04em' }}>
              Beslutningsstøtte for toppslakt
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#8E8E93' }}>
            {generatedAt}
          </span>
        </div>

        {/* ── BODY ── */}
        <div style={{ flex: 1, padding: '28px 44px 20px', display: 'flex', flexDirection: 'column' }}>

          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px',
                fontWeight: 700,
                margin: 0,
                color: '#1E2025',
              }}
            >
              Vurdering av toppslakt
            </h1>
            <div style={{ fontSize: '12px', color: '#56585C', display: 'flex', gap: '24px' }}>
              <span><strong style={{ color: '#1E2025' }}>Lokalitet:</strong> {locationName || '–'}</span>
              <span><strong style={{ color: '#1E2025' }}>Dato:</strong> {formattedDate}</span>
            </div>
          </div>

          {/* ── RECOMMENDATION CARD ── */}
          <div
            style={{
              border: `2px solid ${rec.border}`,
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '24px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: rec.bg,
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: rec.text, marginBottom: '2px' }}>
                  {rec.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: rec.text }}>
                  {recommendation.text}
                </div>
                <div style={{ fontSize: '11px', color: '#56585C', marginTop: '2px', maxWidth: '380px', lineHeight: 1.4 }}>
                  {recommendation.description}
                </div>
              </div>
              <div style={{ textAlign: 'center', paddingLeft: '20px' }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '42px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: rec.text,
                  }}
                >
                  {totalScore}
                </div>
                <div style={{ fontSize: '11px', color: '#56585C' }}>av 24</div>
              </div>
            </div>

            {/* Category mini-bars */}
            <div style={{ padding: '10px 24px', display: 'flex', gap: '14px', background: '#FFFFFF' }}>
              {categories.map((cat) => {
                const catScore = categoryScores[cat.id] ?? 0;
                const pct = (catScore / 8) * 100;
                const barColor = catScore <= 2 ? '#2D8B4E' : catScore <= 5 ? '#D4890A' : '#C03030';
                return (
                  <div key={cat.id} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 600, color: '#1E2025' }}>{cat.name}</span>
                      <span style={{ fontWeight: 700, color: barColor }}>{catScore}/8</span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '2px', background: '#E5E5EA' }}>
                      <div style={{ height: '100%', borderRadius: '2px', width: `${pct}%`, background: barColor, minWidth: catScore > 0 ? '3px' : '0' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── DETAILED TABLE ── */}
          <div style={{ flex: 1 }}>
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 60px 60px',
                gap: '0',
                padding: '8px 16px',
                background: '#1E2025',
                borderRadius: '8px 8px 0 0',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              <span>FAKTOR</span>
              <span style={{ textAlign: 'center' }}>LAV</span>
              <span style={{ textAlign: 'center' }}>MOD.</span>
              <span style={{ textAlign: 'center' }}>HØY</span>
            </div>

            {/* Category blocks */}
            {categories.map((cat, catIdx) => {
              const catScore = categoryScores[cat.id] ?? 0;
              const scoreColor = catScore <= 2 ? '#2D8B4E' : catScore <= 5 ? '#D4890A' : '#C03030';
              return (
                <div key={cat.id}>
                  {/* Category label row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 60px 60px 60px',
                      padding: '7px 16px',
                      background: '#F5F5F7',
                      borderTop: catIdx > 0 ? '1px solid #E5E5EA' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E2025' }}>
                      {cat.name}
                    </span>
                    <span
                      style={{
                        gridColumn: '2 / 5',
                        textAlign: 'right',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: scoreColor,
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
                          display: 'grid',
                          gridTemplateColumns: '1fr 60px 60px 60px',
                          alignItems: 'center',
                          padding: '6px 16px',
                          borderBottom:
                            i < cat.factors.length - 1
                              ? '1px solid #F0F0F2'
                              : 'none',
                          background: '#FFFFFF',
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#1E2025' }}>
                          {factor.name}
                        </span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}>
                          <ScoreDot value={val} target={0} color="#2D8B4E" />
                        </span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}>
                          <ScoreDot value={val} target={1} color="#D4890A" />
                        </span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}>
                          <ScoreDot value={val} target={2} color="#C03030" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Table bottom border */}
            <div style={{ height: '2px', background: '#1E2025', borderRadius: '0 0 8px 8px' }} />
          </div>

          {/* ── LEGEND ── */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              gap: '24px',
              fontSize: '10px',
              color: '#8E8E93',
              flexShrink: 0,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2D8B4E', display: 'inline-block' }} />
              0–8 p: Behold fisk
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4890A', display: 'inline-block' }} />
              9–16 p: Vurder toppslakt
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C03030', display: 'inline-block' }} />
              17–24 p: Gjennomfør toppslakt
            </span>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{
            padding: '12px 44px',
            borderTop: '1px solid #E5E5EA',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: '#8E8E93',
            flexShrink: 0,
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
