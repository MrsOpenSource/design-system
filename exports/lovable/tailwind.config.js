/**
 * Enterprise Design System - Tailwind CSS Preset
 * Automatically mapped from W3C DTCG tokens
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-placeholder-primary-50)',
          100: 'var(--color-brand-placeholder-primary-100)',
          200: 'var(--color-brand-placeholder-primary-200)',
          300: 'var(--color-brand-placeholder-primary-300)',
          400: 'var(--color-brand-placeholder-primary-400)',
          500: 'var(--color-brand-placeholder-primary-500)',
          600: 'var(--color-brand-placeholder-primary-600)',
          700: 'var(--color-brand-placeholder-primary-700)',
          800: 'var(--color-brand-placeholder-primary-800)',
          900: 'var(--color-brand-placeholder-primary-900)',
          950: 'var(--color-brand-placeholder-primary-950)',
        },
        surface: {
          canvas: 'var(--sys-color-surface-canvas)',
          card: 'var(--sys-color-surface-card)',
          elevated: 'var(--sys-color-surface-elevated)',
          sunken: 'var(--sys-color-surface-sunken)',
          ai: 'var(--sys-color-surface-ai-subtle)',
        },
        content: {
          primary: 'var(--sys-color-text-primary)',
          secondary: 'var(--sys-color-text-secondary)',
          tertiary: 'var(--sys-color-text-tertiary)',
          brand: 'var(--sys-color-text-brand)',
          ai: 'var(--sys-color-text-ai-accent)',
        },
        ai: {
          accent: 'var(--color-ai-special-accent-primary)',
          secondary: 'var(--color-ai-special-accent-secondary)',
          cyan: 'var(--color-ai-special-accent-cyan)',
        }
      },
      fontFamily: {
        sans: 'var(--typography-font-family-sans)',
        display: 'var(--typography-font-family-display)',
        mono: 'var(--typography-font-family-mono)',
      },
      boxShadow: {
        'ai-glow': 'var(--shadow-ai-glow-subtle)',
        'ai-focus': 'var(--shadow-ai-glow-focused)',
      }
    }
  }
};
