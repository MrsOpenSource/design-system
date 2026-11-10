import React, { useState } from 'react';
import { ReasoningStep } from '../../types';

export interface ReasoningAccordionProps {
  durationSeconds?: number;
  steps?: ReasoningStep[];
  defaultExpanded?: boolean;
}

export const ReasoningAccordion: React.FC<ReasoningAccordionProps> = ({
  durationSeconds = 3.4,
  steps = [
    { id: '1', title: 'Queried PostgreSQL: SELECT opex, cogs FROM ledger_2026 WHERE region=\'EMEA\'', status: 'completed' },
    { id: '2', title: 'Decomposed freight variance: Trans-Atlantic surcharges rose +28.4%', status: 'completed' },
    { id: '3', title: 'Grounded citations against verified Supplier_Contract_2026.pdf', status: 'completed' }
  ],
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className="reasoning-box-borderless"
      style={{
        background: 'var(--sys-color-surface-sunken, #F8FAFC)',
        border: 'none',
        borderRadius: 'var(--custom-reasoning-radius, 8px)',
        padding: '10px 14px',
        marginBottom: 12,
        fontFamily: 'var(--typography-font-family-mono, monospace)',
        fontSize: 12
      }}
    >
      <div
        className="reasoning-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--sys-color-text-secondary)',
          fontWeight: 600
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s ease' }}>
            ▼
          </span>
          <span>Thought for {durationSeconds} seconds ({steps.length} steps completed)</span>
        </span>
        <span style={{ fontSize: 10, color: 'var(--color-ai-special-accent-primary)', letterSpacing: '0.05em', fontWeight: 700 }}>
          AUDITED
        </span>
      </div>

      {isExpanded && (
        <div
          className="reasoning-body"
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            color: 'var(--sys-color-text-code, #334155)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}
        >
          {steps.map((step) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ color: 'var(--sys-color-status-success-base)' }}>✔</span>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

