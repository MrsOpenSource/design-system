import React, { useState, useRef } from 'react';
import { KpiCardProps } from '../../types';

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  delta,
  subtext,
  targetProgress,
  sparkline,
  infoTooltip,
  loading = false,
  className = '',
  onDetailsClick
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; text: string } | null>(null);
  const sparklineRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className={`kpi-card card-skeleton ${className}`} style={{ padding: 'var(--kpi-padding, 20px)' }}>
        <div style={{ height: 12, width: '40%', background: 'var(--sys-color-surface-sunken)', borderRadius: 4, marginBottom: 12 }} />
        <div style={{ height: 32, width: '70%', background: 'var(--sys-color-surface-sunken)', borderRadius: 6, marginBottom: 10 }} />
        <div style={{ height: 16, width: '50%', background: 'var(--sys-color-surface-sunken)', borderRadius: 4 }} />
      </div>
    );
  }

  // Delta color and glyph logic
  const isUp = delta?.trend === 'up';
  const isDown = delta?.trend === 'down';
  const isPositiveGood = delta?.isPositiveGood !== false;

  let deltaClass = 'delta-neutral';
  let glyph = '▬';

  if (isUp) {
    deltaClass = isPositiveGood ? 'delta-positive' : 'delta-negative';
    glyph = '▲';
  } else if (isDown) {
    deltaClass = isPositiveGood ? 'delta-negative' : 'delta-positive';
    glyph = '▼';
  }

  // Sparkline calculations (SVG normalizer)
  const renderSparkline = () => {
    if (!sparkline || !sparkline.data || sparkline.data.length < 2) return null;
    const data = sparkline.data;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 160;
    const height = 48;
    const padY = 6;

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - padY - ((d - min) / range) * (height - padY * 2);
      return { x, y, val: d, label: sparkline.labels?.[i] || `Point ${i + 1}` };
    });

    const pathD = points.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + pt.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');

    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sparklineRef.current) return;
      const rect = sparklineRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clientX / rect.width));
      const closestIdx = Math.round(ratio * (data.length - 1));
      setHoverIndex(closestIdx);
      const pt = points[closestIdx];
      setTooltipPos({
        x: pt.x * (rect.width / width),
        text: `${pt.label}: ${pt.val}`
      });
    };

    const handleMouseLeave = () => {
      setHoverIndex(null);
      setTooltipPos(null);
    };

    if (sparkline.type === 'bar') {
      return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 42, marginTop: 10 }}>
          {data.map((d, i) => {
            const hPct = Math.round(((d - min) / range) * 80 + 20);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${hPct}%`,
                  background: i === data.length - 1 ? 'var(--color-brand-placeholder-primary-600)' : 'var(--sys-color-border-subtle)',
                  borderRadius: 2
                }}
                title={`Value: ${d}`}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div
        ref={sparklineRef}
        className="sparkline-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', marginTop: 10, height: 48, cursor: 'crosshair' }}
      >
        {tooltipPos && (
          <div
            className="sparkline-tooltip"
            style={{
              position: 'absolute',
              top: -26,
              left: tooltipPos.x,
              transform: 'translateX(-50%)',
              background: 'var(--sys-color-surface-inverse, #0F172A)',
              color: 'var(--sys-color-text-inverse, #FFFFFF)',
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            {tooltipPos.text}
          </div>
        )}
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="kpi-spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-brand-placeholder-primary-600)" stop-opacity="0.25" />
              <stop offset="100%" stop-color="var(--color-brand-placeholder-primary-600)" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#kpi-spark-grad)" />
          <path d={pathD} fill="none" stroke="var(--color-brand-placeholder-primary-600)" strokeWidth="2" />
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="3.5"
              fill="var(--color-brand-placeholder-primary-600)"
              stroke="var(--sys-color-surface-card, #FFFFFF)"
              strokeWidth="1.5"
            />
          )}
          {hoverIndex !== null && points[hoverIndex] && (
            <circle
              cx={points[hoverIndex].x}
              cy={points[hoverIndex].y}
              r="5"
              fill="var(--color-ai-special-accent-primary, #7C3AED)"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`card kpi-card ${className}`}
      style={{
        background: 'var(--sys-color-surface-card, #FFFFFF)',
        border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
        borderRadius: 'var(--radius-xl, 12px)',
        padding: 'var(--kpi-padding, 20px)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--sys-color-text-secondary, #64748B)'
          }}
        >
          {title}
        </span>
        {infoTooltip && (
          <span title={infoTooltip} style={{ cursor: 'help', fontSize: 13, color: 'var(--sys-color-text-tertiary)' }}>
            ℹ️
          </span>
        )}
        {onDetailsClick && (
          <button
            onClick={onDetailsClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-brand-placeholder-primary-600)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ↗ Details
          </button>
        )}
      </div>

      {/* Hero Metric Value */}
      <div
        className="tabular-nums"
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--sys-color-text-primary, #0F172A)',
          lineHeight: 1.1,
          fontFamily: 'var(--typography-font-family-display, inherit)',
          marginBottom: 8
        }}
      >
        {value}
      </div>

      {/* Delta Badge */}
      {delta && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            className={`kpi-delta ${deltaClass}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 9999
            }}
          >
            <span>{glyph}</span>
            <span>{delta.value}</span>
          </span>
          {delta.context && (
            <span style={{ fontSize: 11, color: 'var(--sys-color-text-secondary)' }}>
              {delta.context}
            </span>
          )}
        </div>
      )}

      {/* Target Progress Bar */}
      {targetProgress && (
        <div style={{ marginTop: 10 }}>
          <div style={{ height: 4, background: 'var(--sys-color-surface-sunken)', borderRadius: 4, overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min(100, (targetProgress.current / targetProgress.target) * 100)}%`,
                height: '100%',
                background: 'var(--color-brand-placeholder-primary-600)',
                borderRadius: 4
              }}
            />
          </div>
          {targetProgress.label && (
            <div style={{ fontSize: 10, color: 'var(--sys-color-text-tertiary)', marginTop: 4, textAlign: 'right' }}>
              {targetProgress.label}
            </div>
          )}
        </div>
      )}

      {/* Sparkline Canvas */}
      {renderSparkline()}

      {subtext && (
        <div style={{ fontSize: 11, color: 'var(--sys-color-text-tertiary)', marginTop: 6 }}>
          {subtext}
        </div>
      )}
    </div>
  );
};

