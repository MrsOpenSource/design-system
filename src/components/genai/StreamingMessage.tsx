import React from 'react';

export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  avatarUrl?: string;
  authorName?: string;
  timestamp?: string;
  children?: React.ReactNode;
}

export const StreamingMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isStreaming = false,
  authorName = role === 'user' ? 'You' : 'Enterprise Copilot',
  timestamp,
  children
}) => {
  const isUser = role === 'user';

  return (
    <div
      className={`chat-message-row ${isUser ? 'user-row' : ''}`}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: isUser ? 'row-reverse' : 'row'
      }}
    >
      {/* Profile Avatar */}
      <div
        className={`chat-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}`}
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: isUser
            ? 'var(--color-brand-placeholder-primary-600, #2563EB)'
            : 'linear-gradient(135deg, var(--color-ai-special-accent-primary, #7C3AED), #EC4899)',
          color: 'white',
          boxShadow: isUser ? undefined : '0 2px 8px rgba(124, 58, 237, 0.3)'
        }}
        title={authorName}
      >
        {isUser ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
        )}
      </div>

      {/* Message Bubble Card */}
      <div
        className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}
        role="region"
        aria-live="polite"
        aria-busy={isStreaming}
        style={{
          padding: 16,
          borderRadius: 'var(--custom-bubble-radius, 14px)',
          fontSize: 14,
          lineHeight: 1.6,
          maxWidth: isUser ? '80%' : '90%',
          background: isUser
            ? 'var(--sys-color-surface-sunken, #F1F5F9)'
            : 'var(--ai-response-bg, var(--sys-color-surface-card, #FFFFFF))',
          border: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
          color: 'var(--sys-color-text-primary, #0F172A)',
          borderTopRightRadius: isUser ? 4 : undefined,
          borderTopLeftRadius: !isUser ? 4 : undefined,
          boxShadow: !isUser ? '0 4px 12px -2px rgba(0,0,0,0.05)' : undefined
        }}
      >
        {/* Optional Header with author & timestamp */}
        {(authorName || timestamp) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 11, color: 'var(--sys-color-text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>{authorName}</span>
            {timestamp && <span>{timestamp}</span>}
          </div>
        )}

        {/* Content with blinking cursor when streaming */}
        <div>
          {content}
          {isStreaming && <span className="ai-cursor-pulse" aria-hidden="true" />}
        </div>

        {/* Nested components (Reasoning, Diffs, Citations, Action bars) */}
        {children && <div style={{ marginTop: 12 }}>{children}</div>}
      </div>
    </div>
  );
};

