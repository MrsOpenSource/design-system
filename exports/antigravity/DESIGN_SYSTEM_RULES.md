# Antigravity Design System Customization Rules

## Enterprise Design Token & Component Directives
When implementing or modifying UI components in this workspace:
1. Always adhere to the 3-Tier W3C DTCG Token System.
2. In Dashboard views:
   - Apply 'tabular-nums' to all metric numbers, KPI cards, and data table financial figures.
   - For KPI cards, render directional delta arrows (▲/▼) alongside percentage badges.
   - For tables, ensure sticky headers and maintain compact (32px) or comfortable (44px) row heights.
3. In Gen AI views:
   - Provide an auto-expanding prompt composer (56px to 240px) with token counters and submit/stop morphing actions.
   - Use 'aria-live="polite"' for streaming tokens and provide blinking AI cursor (width 8px).
   - Encapsulate reasoning steps in collapsible "Thinking..." accordions with shimmer borders.
   - Ground model claims with inline superscript citation pills [n] that open grounding popovers.
4. Colors & Fonts:
   - Use CSS custom properties: '--sys-color-surface-*', '--sys-color-text-*', '--sys-color-ai-accent'.
   - Avoid hardcoded hex colors or arbitrary pixel values.
