# Enterprise Design System Framework
## Volume 5: Accessibility & Assistive Technology Architecture

---

### 1. WCAG 2.2 Compliance Standards

The enterprise design system adheres strictly to **WCAG 2.2 Level AA** with selective **Level AAA** enhancements for high-density analytical dashboards and AI-assisted workflows.

| Requirement | Standard | System Implementation |
|---|---|---|
| **Text Contrast** | ≥ 4.5:1 (Normal)<br>≥ 3.0:1 (Large ≥18px) | All `sys.color.text.*` tokens on `sys.color.surface.*` exceed 7.2:1 (AAA) in light and dark modes. |
| **Non-Text Contrast** | ≥ 3.0:1 | Chart lines, active input borders, checkboxes, and focus rings meet or exceed 3.2:1. |
| **Touch Target Size** | ≥ 44px × 44px (Mobile/Tablet)<br>≥ 32px × 32px (Desktop Mouse) | All interactive buttons, table actions, and composer controls respect device-specific tap target minimums. |
| **Visual Focus Indicator**| 2px solid ring with 2px offset | Enforced globally via `sys.color.border.focus` (`#3B82F6`) with high-contrast ring outline. |

---

### 2. Multi-Channel State Encoding (Non-Color Reliance)

Color is never the sole visual signifier for critical enterprise states, dashboard trends, or chart metrics:

1. **KPI Deltas**: Positive and negative metrics combine color with explicit geometric glyphs (`▲`, `▼`, `▬`) and screen-reader hidden prefixes (`Increased by`, `Decreased by`).
2. **Chart Series**: When displaying more than 3 series, line graphs must combine distinct colors with differentiated dash arrays (`solid`, `dashed [6, 4]`, `dotted [2, 2]`) and distinct point markers (`circle`, `square`, `diamond`).
3. **Data Table Status Badges**: Badges include an icon (`check-circle`, `alert-triangle`, `x-circle`) in addition to background tinting.

---

### 3. Screen Reader Architecture for Gen AI & Live Streaming

Streaming LLM tokens present unique accessibility challenges: updating an `aria-live` region with every individual token causes screen readers (JAWS, NVDA, VoiceOver) to stutter, queue hundreds of speech fragments, or crash.

```
┌────────────────────────────────────────────────────────┐
│  Gen AI Streaming Speech Architecture                  │
├────────────────────────────────────────────────────────┤
│  1. Message arrives:                                   │
│     aria-busy="true"                                   │
│     aria-live="polite"                                 │
│                                                        │
│  2. During token streaming:                            │
│     - Visual cursor blinks for sighted users           │
│     - Screen reader speech is DEBOUNCED to complete    │
│       sentences, OR suppressed until completion        │
│                                                        │
│  3. Stream completes:                                  │
│     aria-busy="false"                                  │
│     Announce: "Response finished. 240 words generated. │
│                2 citations available."                 │
└────────────────────────────────────────────────────────┘
```

#### Code Implementation Pattern:
```html
<!-- Assistant Message Container -->
<div 
  role="region" 
  aria-label="AI Assistant Response"
  aria-live="polite" 
  aria-busy="true" <!-- toggled to false when stream ends -->
>
  <div class="sr-only" aria-atomic="true">
    <!-- Live status badge for assistive tech -->
    Generating response...
  </div>
  
  <div class="message-content">
    <!-- Rendered streaming tokens -->
  </div>
</div>
```

---

### 4. Keyboard Navigation Matrix

Enterprise power users rely heavily on keyboard navigation for dense tables and prompt commands.

#### 4.1 Data Table Keyboard Traversal (`role="grid"`)
- `Arrow Keys (↑, ↓, ←, →)`: Move focus between adjacent cells.
- `Home` / `End`: Jump to first / last cell in the current row.
- `Page Up` / `Page Down`: Scroll one page of virtualized rows up / down.
- `Space`: Toggle checkbox selection for the focused row.
- `Enter`: Activate action on focused cell (or initiate inline edit mode).
- `Escape`: Cancel inline editing and revert to previous value.

#### 4.2 Prompt Composer & AI Shortcuts
- `Enter`: Submit prompt.
- `Shift + Enter`: Insert soft line break.
- `Cmd / Ctrl + K`: Global quick-action search & AI command launcher.
- `Escape`: Instantly halt active AI generation (triggers stop signal) or dismiss slash command dropdown.
- `Tab`: Autocomplete active slash command or suggested prompt snippet.

---

### 5. Reduced Motion & Forced Colors (High Contrast)

```css
/* Respect user vestibular sensitivity */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Replace blinking streaming cursor with solid non-blinking cursor */
  .genai-streaming-cursor {
    animation: none !important;
    opacity: 1 !important;
  }
}

/* Windows High Contrast / Forced Colors Mode */
@media (forced-colors: active) {
  .kpi-card, .data-table, .genai-composer {
    border: 2px solid ButtonText !important;
  }
  .focus-ring {
    outline: 3px solid Highlight !important;
  }
}
```

