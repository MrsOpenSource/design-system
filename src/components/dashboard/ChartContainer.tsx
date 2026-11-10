import React, { useState } from 'react';

export interface ChartSeries {
  id: string;
  name: string;
  color: string;
  data: number[];
  dashed?: boolean;
}

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  timeframes?: string[];
  activeTimeframe?: string;
  onTimeframeChange?: (tf: string) => void;
  anomaly?: {
    label: string;
    value: string;
    rootCause: string;
    details: string[];
    recommendation: string;
  };
  children?: React.ReactNode;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  timeframes = ['1M', '3M', 'YTD'],
  activeTimeframe = '1M',
  onTimeframeChange,
  anomaly,
  children,
  className = ''
}) => {
  const [showAnomalyModal, setShowAnomalyModal] = useState(false);

  return (
    <>
      <div
        className={`card chart-card ${className}`}
        style={{
          background: 'var(--card-custom-bg, var(--sys-color-surface-card, #FFFFFF))',
          border: 'var(--custom-card-border-width, 1px) solid var(--custom-card-border-color, var(--sys-color-border-subtle, #E2E8F0))',
          borderRadius: 'var(--custom-card-radius, var(--radius-xl, 12px))',
          padding: 'var(--kpi-padding, 20px)',
          position: 'relative'
        }}
      >
        {/* Chart Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--sys-color-text-primary)' }}>{title}</h3>
            {subtitle && <p style={{ fontSize: 12, color: 'var(--sys-color-text-secondary)' }}>{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Header Anomaly Trigger Button */}
            {anomaly && (
              <button
                type="button"
                className="chart-ai-anomaly-trigger"
                onClick={() => setShowAnomalyModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid var(--color-ai-special-accent-primary, #7C3AED)',
                  color: 'var(--color-ai-special-accent-primary, #7C3AED)',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
              >
                <span>⚠️</span>
                <span>{anomaly.label} ({anomaly.value})</span>
              </button>
            )}

            {/* Timeframe Controls */}
            {timeframes.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  background: 'var(--sys-color-surface-sunken)',
                  padding: 3,
                  borderRadius: 6,
                  border: '1px solid var(--sys-color-border-subtle)'
                }}
              >
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => onTimeframeChange?.(tf)}
                    style={{
                      border: 'none',
                      background: activeTimeframe === tf ? 'var(--sys-color-surface-card)' : 'transparent',
                      color: activeTimeframe === tf ? 'var(--sys-color-text-primary)' : 'var(--sys-color-text-secondary)',
                      fontSize: 11,
                      fontWeight: activeTimeframe === tf ? 600 : 500,
                      padding: '3px 8px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      boxShadow: activeTimeframe === tf ? '0 1px 2px rgba(0,0,0,0.06)' : undefined
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div style={{ height: 260, position: 'relative' }}>
          {children || (
            <svg viewBox="0 0 600 240" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              {/* Cartesian 1px Dashed Horizontal Gridlines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="var(--sys-color-border-subtle)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="var(--sys-color-border-subtle)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="var(--sys-color-border-subtle)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="var(--sys-color-border-subtle)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="230" x2="600" y2="230" stroke="var(--sys-color-border-default)" strokeWidth="1" />

              {/* Confidence Corridor (P90) */}
              <polygon points="340,110 420,80 500,60 590,40 590,140 500,160 420,180 340,150" fill="var(--color-ai-special-accent-primary)" opacity="0.08" />
              <line x1="340" y1="110" x2="590" y2="40" stroke="var(--color-ai-special-accent-primary)" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.4" />
              <line x1="340" y1="150" x2="590" y2="140" stroke="var(--color-ai-special-accent-primary)" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.4" />

              {/* Historical Trend Line */}
              <path d="M 10 200 Q 80 180, 150 160 T 260 120 T 340 70" fill="none" stroke="var(--color-brand-placeholder-primary-600)" strokeWidth="3" />
              {/* Anomaly Dot Marker */}
              <circle cx="340" cy="70" r="5" fill="var(--color-ai-special-accent-primary)" stroke="#FFFFFF" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => setShowAnomalyModal(true)} />

              {/* Mean Extrapolation */}
              <path d="M 340 70 Q 420 90, 500 70 T 590 50" fill="none" stroke="var(--color-brand-placeholder-primary-600)" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          )}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, fontSize: 12, marginTop: 10, color: 'var(--sys-color-text-secondary)', justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: 'var(--color-brand-placeholder-primary-600)', borderRadius: 2 }} />
            <span>Actual Revenue</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, border: '1.5px dashed var(--color-brand-placeholder-primary-600)', borderRadius: 2 }} />
            <span>AI Forecast Projection</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: 'var(--color-ai-special-accent-primary)', opacity: 0.3, borderRadius: 2 }} />
            <span>90% Confidence Corridor</span>
          </span>
        </div>
      </div>

      {/* Anomaly Diagnosis Modal */}
      {showAnomalyModal && anomaly && (
        <div className="modal-backdrop" style={{ display: 'flex' }} onClick={() => setShowAnomalyModal(false)}>
          <div className="modal-dialog" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>AI Root Cause: {anomaly.label}</h3>
              <button type="button" className="btn btn-outline" style={{ padding: '2px 8px' }} onClick={() => setShowAnomalyModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ padding: 20 }}>
              <div style={{ background: 'var(--sys-color-surface-sunken)', padding: 12, borderRadius: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--sys-color-text-secondary)' }}>Deviation</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-ai-special-accent-primary)' }}>{anomaly.value}</div>
              </div>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Causal Analysis:</h4>
              <ul style={{ fontSize: 13, lineHeight: 1.6, marginLeft: 18, marginBottom: 14 }}>
                {anomaly.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid var(--color-ai-special-accent-primary)', borderRadius: 8, padding: 12, fontSize: 12 }}>
                <strong>Recommendation:</strong> {anomaly.recommendation}
              </div>
            </div>
            <div className="modal-footer" style={{ padding: 12 }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowAnomalyModal(false)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

