import React, { useState } from 'react';
import { SuggestionDiffProps } from '../../types';

export const SuggestionDiffViewer: React.FC<SuggestionDiffProps> = ({
  title = 'PROPOSED REVISED FORMULA DIFF',
  deletedLines,
  addedLines,
  explanation,
  onAccept,
  onReject,
  onRefineWithAi
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('incorrect-calc');
  const [customComment, setCustomComment] = useState('');

  const handleRejectClick = () => {
    setShowFeedbackModal(true);
  };

  const handleConfirmReject = () => {
    setShowFeedbackModal(false);
    onReject();
  };

  return (
    <>
      <div
        className="diff-container"
        style={{
          background: 'var(--sys-color-surface-card, #FFFFFF)',
          border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 14,
          fontFamily: 'var(--typography-font-family-mono, monospace)',
          fontSize: 12
        }}
      >
        {/* Diff Header */}
        <div
          style={{
            padding: '6px 12px',
            fontWeight: 700,
            fontSize: 11,
            background: 'var(--sys-color-surface-sunken, #F8FAFC)',
            color: 'var(--sys-color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>✨</span>
          <span>{title}</span>
        </div>

        {/* Deletions */}
        {deletedLines.map((line, idx) => (
          <div
            key={`del-${idx}`}
            className="diff-line-del"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#991B1B',
              padding: '4px 12px',
              textDecoration: 'line-through'
            }}
          >
            - {line}
          </div>
        ))}

        {/* Additions */}
        {addedLines.map((line, idx) => (
          <div
            key={`add-${idx}`}
            className="diff-line-add"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#065F46',
              padding: '4px 12px',
              fontWeight: 600
            }}
          >
            + {line}
          </div>
        ))}

        {explanation && (
          <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--sys-color-text-secondary)', background: 'var(--sys-color-surface-sunken)' }}>
            Note: {explanation}
          </div>
        )}

        {/* Actions Toolbar */}
        <div
          className="diff-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            background: 'var(--sys-color-surface-sunken)',
            borderTop: '1px solid var(--sys-color-border-subtle)'
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            style={{ fontSize: 11, padding: '4px 10px' }}
            onClick={onAccept}
          >
            Accept Changes
          </button>
          {onRefineWithAi && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={onRefineWithAi}
            >
              Refine with AI
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            style={{ fontSize: 11, padding: '4px 10px', color: 'var(--sys-color-status-danger-text)' }}
            onClick={handleRejectClick}
          >
            Reject
          </button>
        </div>
      </div>

      {/* Reject Feedback Capture Modal */}
      {showFeedbackModal && (
        <div
          className="modal-backdrop"
          style={{ display: 'flex' }}
          onClick={() => setShowFeedbackModal(false)}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: 480 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Why did you reject this recommendation?</h3>
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: '2px 8px' }}
                onClick={() => setShowFeedbackModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ padding: '16px 20px' }}>
              <p style={{ fontSize: 12, color: 'var(--sys-color-text-secondary)', marginBottom: 12 }}>
                Your feedback grounds future model reasoning and updates enterprise validation rules.
              </p>

              {[
                { id: 'incorrect-calc', label: 'Incorrect mathematical calculation or formula logic' },
                { id: 'hallucinated-data', label: 'Hallucinated or unverified citation / data source' },
                { id: 'outdated-policy', label: 'Violates internal accounting or reporting standard' },
                { id: 'irrelevant', label: 'Does not address the original analytical prompt' },
                { id: 'other', label: 'Other reason' }
              ].map((opt) => (
                <label
                  key={opt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    border: '1px solid var(--sys-color-border-subtle)',
                    borderRadius: 6,
                    marginBottom: 6,
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  <input
                    type="radio"
                    name="reject-opt"
                    value={opt.id}
                    checked={selectedReason === opt.id}
                    onChange={() => setSelectedReason(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}

              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                  Additional details (optional):
                </label>
                <textarea
                  className="text-input"
                  style={{ height: 60, resize: 'none', padding: 8 }}
                  value={customComment}
                  onChange={(e) => setCustomComment(e.target.value)}
                  placeholder="Provide details to guide model retraining..."
                />
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '12px 20px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmReject}
              >
                Submit Feedback & Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

