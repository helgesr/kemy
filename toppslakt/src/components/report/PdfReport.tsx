import { forwardRef } from 'react';
import { categories } from '../../data/factors';
import type { Recommendation } from '../../types/assessment';
import { useT } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/no';

interface PdfReportProps {
  locationName: string;
  date: string;
  scores: Record<string, number>;
  totalScore: number;
  recommendation: Recommendation;
  categoryScores: Record<string, number>;
}

const recStyles: Record<string, { bg: string; border: string; text: string; labelKey: TranslationKey }> = {
  low: { bg: '#30D15810', border: '#30D158', text: '#1B7D32', labelKey: 'pdf.lowRisk' },
  medium: { bg: '#FF9F0A10', border: '#FF9F0A', text: '#C46700', labelKey: 'pdf.moderateRisk' },
  high: { bg: '#FF453A10', border: '#FF453A', text: '#D32F2F', labelKey: 'pdf.highRisk' },
};

const catNameKeys: Record<string, TranslationKey> = {
  biological: 'cat.biological',
  'lice-operations': 'cat.lice',
  economic: 'cat.economic',
};

function Dot({ active, color }: { active: boolean; color: string }) {
  return (
    <div
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        border: active ? 'none' : '1.5px solid #D1D1D6',
        background: active ? color : 'transparent',
      }}
    />
  );
}

const PdfReport = forwardRef<HTMLDivElement, PdfReportProps>(
  ({ locationName, date, scores, totalScore, recommendation, categoryScores }, ref) => {
    const { t, lang } = useT();
    const rec = recStyles[recommendation.type];
    const locale = lang === 'no' ? 'nb-NO' : 'en-GB';
    const generatedAt = new Date().toLocaleString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedDate = new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const textKey = recommendation.textKey as TranslationKey | undefined;
    const descKey = recommendation.descriptionKey as TranslationKey | undefined;

    return (
      <div
        ref={ref}
        style={{
          width: '794px',
          height: '1123px',
          background: '#FFFFFF',
          fontFamily: "'Instrument Sans', 'Helvetica Neue', system-ui, sans-serif",
          color: '#1A1A1E',
          position: 'fixed',
          left: '-9999px',
          top: 0,
          zIndex: -1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: '24px 44px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #E5E5EA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
            <span
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#111111',
              }}
            >
              KEMY
            </span>
            <span style={{ fontSize: '10px', color: '#AEAEB2', letterSpacing: '0.03em' }}>
              {t('pdf.subtitle')}
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#AEAEB2' }}>
            {generatedAt}
          </span>
        </div>

        {/* BODY */}
        <div style={{ flex: 1, padding: '28px 44px 16px', display: 'flex', flexDirection: 'column' }}>

          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h1
              style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                margin: 0,
                color: '#1A1A1E',
              }}
            >
              {t('pdf.title')}
            </h1>
            <div style={{ fontSize: '12px', color: '#6E6E73', display: 'flex', gap: '20px' }}>
              <span><strong style={{ color: '#1A1A1E' }}>{t('pdf.location')}</strong> {locationName || '–'}</span>
              <span><strong style={{ color: '#1A1A1E' }}>{t('pdf.date')}</strong> {formattedDate}</span>
            </div>
          </div>

          {/* RECOMMENDATION */}
          <div
            style={{
              border: `1.5px solid ${rec.border}`,
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                background: rec.bg,
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: rec.text, marginBottom: '3px' }}>
                  {t(rec.labelKey)}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: rec.text }}>
                  {textKey ? t(textKey) : recommendation.text}
                </div>
                <div style={{ fontSize: '11px', color: '#6E6E73', marginTop: '3px', maxWidth: '380px', lineHeight: 1.4 }}>
                  {descKey ? t(descKey) : recommendation.description}
                </div>
              </div>
              <div style={{ textAlign: 'center', paddingLeft: '20px' }}>
                <div
                  style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontSize: '40px',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: rec.text,
                  }}
                >
                  {totalScore}
                </div>
                <div style={{ fontSize: '10px', color: '#6E6E73' }}>{t('score.of')} 24</div>
              </div>
            </div>

            <div style={{ padding: '10px 24px', display: 'flex', gap: '14px' }}>
              {categories.map((cat) => {
                const s = categoryScores[cat.id] ?? 0;
                const pct = (s / 8) * 100;
                const c = s <= 2 ? '#30D158' : s <= 5 ? '#FF9F0A' : '#FF453A';
                return (
                  <div key={cat.id} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 600, color: '#1A1A1E' }}>{t(catNameKeys[cat.id] ?? ('cat.biological' as TranslationKey))}</span>
                      <span style={{ fontWeight: 700, color: c }}>{s}/8</span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '2px', background: '#F2F2F7' }}>
                      <div style={{ height: '100%', borderRadius: '2px', width: `${pct}%`, background: c, minWidth: s > 0 ? '3px' : '0' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TABLE */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 50px 50px 50px',
                padding: '8px 16px',
                background: '#F2F2F7',
                borderRadius: '12px 12px 0 0',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#6E6E73',
              }}
            >
              <span>{t('pdf.factor')}</span>
              <span style={{ textAlign: 'center' }}>{t('pdf.low')}</span>
              <span style={{ textAlign: 'center' }}>{t('pdf.mod')}</span>
              <span style={{ textAlign: 'center' }}>{t('pdf.high')}</span>
            </div>

            {categories.map((cat, ci) => {
              const cs = categoryScores[cat.id] ?? 0;
              const sc = cs <= 2 ? '#30D158' : cs <= 5 ? '#FF9F0A' : '#FF453A';
              return (
                <div key={cat.id}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 50px 50px 50px',
                      padding: '7px 16px',
                      background: ci % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
                      borderTop: '1px solid #F2F2F7',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{t(catNameKeys[cat.id] ?? ('cat.biological' as TranslationKey))}</span>
                    <span style={{ gridColumn: '2/5', textAlign: 'right', fontSize: '11px', fontWeight: 700, color: sc }}>
                      {cs}/8
                    </span>
                  </div>
                  {cat.factors.map((f) => {
                    const v = scores[f.id] ?? 0;
                    const nameKey = `factor.${f.id}` as TranslationKey;
                    return (
                      <div
                        key={f.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 50px 50px 50px',
                          alignItems: 'center',
                          padding: '5px 16px',
                          borderBottom: '1px solid #F2F2F7',
                        }}
                      >
                        <span style={{ fontSize: '11px', color: '#1A1A1E' }}>{t(nameKey)}</span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}><Dot active={v === 0} color="#30D158" /></span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}><Dot active={v === 1} color="#FF9F0A" /></span>
                        <span style={{ display: 'flex', justifyContent: 'center' }}><Dot active={v === 2} color="#FF453A" /></span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div style={{ height: '1px', background: '#E5E5EA', borderRadius: '0 0 12px 12px' }} />
          </div>

          {/* LEGEND */}
          <div style={{ marginTop: '14px', display: 'flex', gap: '20px', fontSize: '9px', color: '#AEAEB2' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#30D158', display: 'inline-block' }} />
              {t('pdf.legendLow')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9F0A', display: 'inline-block' }} />
              {t('pdf.legendMed')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF453A', display: 'inline-block' }} />
              {t('pdf.legendHigh')}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: '12px 44px',
            borderTop: '1px solid #E5E5EA',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: '#AEAEB2',
          }}
        >
          <span>{t('footer.powered')} &copy; 2026</span>
          <span>www.kemy.no</span>
        </div>
      </div>
    );
  }
);

PdfReport.displayName = 'PdfReport';
export default PdfReport;
