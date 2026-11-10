import React, { useState, useRef, useEffect } from 'react';
import { PromptComposerProps } from '../../types';

export const PromptComposer: React.FC<PromptComposerProps> = ({
  placeholder = "Ask a question about this dashboard or type '/' for slash commands...",
  contextChips = [],
  onRemoveChip,
  onAddChip,
  onSubmit,
  onStop,
  isStreaming = false,
  tokenCount = 0,
  maxTokens = 8000,
  slashCommands = [
    { command: '/summarize', label: 'Summarize Dashboard', description: 'Executive takeaway synthesis' },
    { command: '/forecast', label: 'Forecast Metrics', description: 'Extrapolate trend with confidence corridor' },
    { command: '/explain-anomaly', label: 'Explain Anomaly', description: 'Decompose root cause of metric spike' }
  ]
}) => {
  const [prompt, setPrompt] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(240, Math.max(52, textareaRef.current.scrollHeight))}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() && !isStreaming) {
        onSubmit(prompt.trim());
        setPrompt('');
      }
    } else if (e.key === '/' && prompt === '') {
      setShowSlashMenu(true);
    } else if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  const handleSelectSlash = (cmd: string) => {
    setPrompt(`${cmd} `);
    setShowSlashMenu(false);
    textareaRef.current?.focus();
  };

  return (
    <div
      className="prompt-composer"
      style={{
        border: '1px solid var(--sys-color-border-default, #CBD5E1)',
        borderRadius: 'var(--custom-composer-radius, 14px)',
        padding: '12px 16px',
        background: 'var(--sys-color-surface-card, #FFFFFF)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative'
      }}
    >
      {/* Context Chips Shelf */}
      {contextChips.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {contextChips.map((chip) => (
            <div
              key={chip.id}
              className="context-chip"
              style={{
                background: 'var(--sys-color-surface-sunken)',
                border: '1px solid var(--sys-color-border-subtle)',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--sys-color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>{chip.icon || '📄'}</span>
              <span>{chip.label}</span>
              {onRemoveChip && (
                <span
                  onClick={() => onRemoveChip(chip.id)}
                  style={{ cursor: 'pointer', opacity: 0.6 }}
                >
                  ✕
                </span>
              )}
            </div>
          ))}
          {onAddChip && (
            <button
              onClick={onAddChip}
              style={{
                background: 'transparent',
                border: '1px dashed var(--sys-color-border-default)',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 11,
                cursor: 'pointer',
                color: 'var(--sys-color-text-secondary)'
              }}
            >
              + Attach
            </button>
          )}
        </div>
      )}

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        className="composer-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: '100%',
          border: 'none',
          background: 'transparent',
          resize: 'none',
          fontFamily: 'inherit',
          fontSize: 14,
          color: 'var(--sys-color-text-primary)',
          minHeight: 52,
          outline: 'none',
          lineHeight: 1.5
        }}
      />

      {/* Floating Slash Command Menu */}
      {showSlashMenu && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 16,
            background: 'var(--sys-color-surface-card)',
            border: '1px solid var(--sys-color-border-default)',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 8,
            padding: 6,
            width: 260,
            zIndex: 100,
            marginBottom: 6
          }}
        >
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--sys-color-text-tertiary)', padding: '4px 8px', fontWeight: 700 }}>
            Slash Skills
          </div>
          {slashCommands.map((sc) => (
            <div
              key={sc.command}
              onClick={() => handleSelectSlash(sc.command)}
              style={{
                padding: '6px 8px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sys-color-surface-sunken)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontWeight: 600, color: 'var(--color-brand-placeholder-primary-600)' }}>{sc.command}</span>
              <span style={{ fontSize: 11, color: 'var(--sys-color-text-secondary)' }}>{sc.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Composer Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--sys-color-border-subtle)', paddingTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className="slash-pill"
            onClick={() => setShowSlashMenu(!showSlashMenu)}
            style={{
              background: 'var(--sys-color-surface-sunken)',
              border: '1px solid var(--sys-color-border-subtle)',
              borderRadius: 6,
              padding: '4px 8px',
              fontSize: 12,
              color: 'var(--sys-color-text-secondary)',
              cursor: 'pointer'
            }}
          >
            / Slash Commands
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--typography-font-family-mono, monospace)', fontSize: 11, color: 'var(--sys-color-text-tertiary)' }}>
            {tokenCount || Math.round(prompt.split(/\s+/).filter(Boolean).length * 1.33)} / {maxTokens} tokens
          </span>

          {/* Clean Icon-Only Submit / Stop Button */}
          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              title="Stop Generation"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--sys-color-status-danger-base, #EF4444)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <div style={{ width: 12, height: 12, background: 'white', borderRadius: 2 }} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (prompt.trim()) {
                  onSubmit(prompt.trim());
                  setPrompt('');
                }
              }}
              title="Send Prompt (Enter)"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--sys-color-interactive-primary-default, #2563EB)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

