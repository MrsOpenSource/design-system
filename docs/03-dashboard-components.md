# Enterprise Design System Framework
## Volume 3: Dashboard Component Specifications

---

### 1. Standard KPI Card Specification

The KPI Card is the primary atom for executive and analytical glanceability. It delivers immediate metric comprehension, directional velocity, and historical comparison.

```
┌────────────────────────────────────────────────────────┐
│  TOTAL REVENUE                          [i] [ ⋮ ]      │ <- Header: Eyebrow + Tooltip + Overflow
│  $4,892,150.00                                         │ <- Metric Value (Hero Tabular Num)
│  ▲ +14.2%  vs last quarter                             │ <- Delta Badge + Comparison Context
│  [==========================......] 82% of target      │ <- Target Progress Bar (Optional)
└────────────────────────────────────────────────────────┘
```

#### 1.1 Anatomy Breakdown
1. **Header Area**:
   - **Eyebrow Label**: Category/Metric name. `typography.sys.kpi.eyebrow` (uppercase, letter-spacing wide, secondary text).
   - **Info Tooltip `[i]`**: 14×14px icon trigger. Hover/click reveals metric calculation formula and data freshness timestamp.
   - **Context Menu `[ ⋮ ]`**: Actions: "View Detailed Report", "Set Threshold Alert", "Ask AI to Explain", "Export Data".
2. **Metric Value Display**:
   - Hero font: `typography.sys.kpi.metric-hero` (36px desktop, 28px mobile, bold).
   - OpenType features: `font-variant-numeric: tabular-nums` to eliminate layout shift during live counter ticks.
   - Prefix/Suffix: Currency (`$`, `€`), unit (`ms`, `GB`, `req/s`) styled at 0.75× metric font size.
3. **Delta Indicator & Trend Badge**:
   - **Positive Variant**: Green surface (`#ECFDF5`), green text (`#065F46`), up-arrow icon (`▲`).
   - **Negative Variant**: Red surface (`#FEF2F2`), red text (`#991B1B`), down-arrow icon (`▼`).
   - **Neutral / Flat Variant**: Gray surface (`#F1F5F9`), slate text (`#475569`), horizontal dash icon (`▬`).
   - **Context String**: "vs last 30 days", "vs budget", or "target".
4. **Milestone / Target Progress Bar (Optional)**:
   - 4px height bar with rounded caps. Background `neutral.200`, fill `brand.placeholder-primary.500`.

#### 1.2 States Matrix
- **Default**: White background, `border.subtle`, `shadow.sm`.
- **Hover**: Transitions in 150ms to `shadow.md`, border tint `neutral.300`.
- **Active / Pressed**: Subtle scale down (0.995).
- **Loading / Skeleton**: Metric text replaced by `skeleton-box` with animated linear-gradient shimmer (1.5s loop).
- **Error / Offline**: Shows warning icon with "Metric unavailable" and "Retry" inline button.
- **AI Highlighted**: Subtle pulsing border (`ai-special.glow-ambient`) when an AI insight is attached to this metric.

---

### 2. KPI Card with Mini-Graph (Sparkline)

Sparkline KPI cards embed temporal context directly into the metric container without requiring a full chart navigation.

```
┌────────────────────────────────────────────────────────┐
│  ACTIVE USERS (DAU)                     [ ↗ Details ]  │
│  182,400                                               │
│  ▲ +6.8%  30-day velocity                              │
│                                                        │
│   ╭───────╮            ╭────╮                          │ <- SVG Area Sparkline with
│  ╱         ╰───────────╯      ╰● $182.4k (Today)       │    Current-Value Pulse Dot
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                       │
└────────────────────────────────────────────────────────┘
```

#### 2.1 Supported Mini-Graph Archetypes
1. **Area Sparkline (Continuous Trends)**:
   - Stroke: 2px thickness, cubic Bézier interpolation (`sys.color.brand.placeholder-primary.600`).
   - Fill: Vertical SVG linear gradient (Top: Series color at 20% opacity, Bottom: 0% opacity).
   - End-point marker: 4px filled circle at the latest data point with an outer 2px white halo ring.
2. **Bar Sparkline (Discrete Volatility / Daily Volumes)**:
   - Sequence of 14 to 30 micro-bars (width: 3px, gap: 2px, radius: 1px).
   - Color logic: Bars below moving average colored in `neutral.300`, bars exceeding target colored in `brand.placeholder-primary.500`.
3. **Win/Loss Sparkline (Binary Status & SLA Monitoring)**:
   - Up-ticks (Green, 12px height) for SLA met; Down-ticks (Red, 12px height) for SLA breach.
4. **Target / Bullet Gauge (Threshold Tracking)**:
   - Horizontal comparative bar: Qualitative ranges (Poor, Satisfactory, Good) as shaded background bands with an overlaid metric bar and target threshold vertical hairline.

#### 2.2 Interactive Scrubber & Tooltip
- **Mouse Hover (Laptop)**: A vertical dashed hairline (`1px neutral.400`) follows the pointer across the sparkline. The nearest data point snaps active with an enlarged dot (6px) and an anchor tooltip displays: `Date: Value (Delta)`.
- **Touch Scrubber (Tablet / Mobile)**: Long-press drags a touch-scrubber across the canvas with haptic feedback tick (on supported mobile devices).

---

### 3. Comprehensive Chart & Graph System

Full visualization widgets render multi-dimensional datasets with standardized cartography, typography, and interactive AI layers.

```
┌────────────────────────────────────────────────────────────────────────┐
│  REVENUE & OPEX FORECAST                 [1D] [7D] [1M] [1Y] [ ✨ AI ]  │ <- Controls
├────────────────────────────────────────────────────────────────────────┤
│  $600k ┤           ╭──────● Anomaly: Cloud surge (+$42k)               │
│  $400k ┤     ╭─────╯      │   ╭ - - - - - - AI Forecast Corridor - - ╮ │
│  $200k ┤────╱─────────────┼───╯......................................│ │
│     $0 ┴────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬─────╯  │
│           Jan    Feb    Mar    Apr    May    Jun    Jul    Aug         │
├────────────────────────────────────────────────────────────────────────┤
│  ■ Actual Revenue   ■ Operating Expenses   ┄ Projected (P90/P10)       │ <- Legend
└────────────────────────────────────────────────────────────────────────┘
```

#### 3.1 Chart Design Standards
- **Cartesian Grid**:
  - Horizontal gridlines: `1px dashed var(--sys-color-border-subtle)` at standard linear intervals (4 to 6 tick marks).
  - Vertical gridlines: Hidden by default to eliminate visual clutter, displayed only on hover crosshair.
  - Zero-baseline: Solid `1px solid var(--sys-color-neutral-300)`.
- **Axes & Tick Labels**:
  - Font: `typography.sys.body.dense` (11px or 12px, tabular-nums).
  - Color: `sys.color.text.secondary`.
  - Formatters: Automated abbreviated numbers (`$1.2M`, `450k`, `85%`, `2.4s`).
- **Interactive Multi-Series Tooltip**:
  - Surface: `sys.color.surface.elevated` with `shadow.lg` and 8px border-radius.
  - Content: Header date/category, sorted series rows with color swatches, exact values, percentage share of total, and summary total row.
- **Interactive Legend**:
  - Click series item to toggle visibility.
  - Alt/Option-click to isolate ("solo") a single series.

#### 3.2 AI-Integrated Chart Features
1. **AI Anomaly Detection Pinpoint**:
   - Automated visual badges pinpointing unexpected spikes or dips.
   - Glyph: Amber or purple glowing marker dot with subtle pulse.
   - Clicking reveals an inline drawer: *"AI Root-Cause: 420% increase in API calls from North America region between 02:00–04:00 UTC."*
2. **AI Forecast Corridor (Confidence Bands)**:
   - Dotted extrapolation line for mean forecast.
   - Shaded envelope representing the 80% and 95% confidence intervals (P10 to P90 percentile).
3. **Natural Language Chart Summarizer**:
   - Header button: `✨ Summarize`.
   - Generates a concise 2-sentence executive takeaway placed as an expandable banner above the chart canvas.

---

### 4. Enterprise Data Table Specification

The enterprise data table is engineered for high-density information display, sorting, multi-attribute filtering, sticky navigation, and seamless mobile degradation.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🔍 Search accounts...]  [ ⚙ Filters (3) ]  [ Density: Comfort ▾ ]  [ Columns ▾ ]  [ Export ▾ ]│
├────┬────────────────────┬──────────────┬─────────────┬──────────────┬──────────────┬─────────┤
│ ☐  │ ACCOUNT NAME ⇅     │ STATUS ▾     │ MRR ($) ⇅   │ HEALTH SCORE │ 30D TREND    │ ACTIONS │
├────┼────────────────────┼──────────────┼─────────────┼──────────────┼──────────────┼─────────┤
│ ☐  │ Acme Global Inc    │ ● Active     │ $42,500.00  │ [██████░] 85 │ ╱╰───╯       │ [ … ]   │
│ ☑  │ Globex Logistics   │ ▲ Pending    │ $18,200.00  │ [████░░░] 62 │ ──╭──╮       │ [ … ]   │
│ ☐  │ Initech Systems    │ ✖ Suspended  │  $6,140.00  │ [██░░░░░] 28 │ ╰─────       │ [ … ]   │
├────┴────────────────────┴──────────────┴─────────────┴──────────────┴──────────────┴─────────┤
│ Showing 1–25 of 1,420 rows            [ 25 / page ▾ ]               ‹  1  [2]  3  4  ›        │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 4.1 Toolbar Controls
- **Global Search**: Typeahead debounce (300ms) with instant search highlight across string columns.
- **Filter Bar & Chips**: Active filters render as removable pills (e.g., `Status: Active ✕`, `MRR > $10k ✕`).
- **Density Switcher**: 3-option toggle (`Compact` [32px], `Comfortable` [44px], `Spacious` [56px]).
- **Column Visibility Manager**: Drag-and-drop reordering, toggle visibility checkboxes, reset to default view.
- **Export Menu**: One-click download as CSV, XLSX, or formatted PDF report.

#### 4.2 Column Behaviors & Pinning
- **Multi-Column Sorting**:
  - Primary sort on click; Shift-click secondary column for nested sorting.
  - Visual indicators: Up chevron (asc), Down chevron (desc), Muted double chevron (unsorted).
- **Column Resizing**:
  - 6px hit zone on right border with grab cursor (`col-resize`). Double-click auto-fits column to widest content.
- **Sticky Column Pinning**:
  - Frozen Left Column (e.g., Selection checkbox + Entity Name).
  - Frozen Right Column (Actions menu `[ … ]`).
  - Pinned column borders cast an elevation shadow (`shadow.sm`) when scrolling horizontally.

#### 4.3 Cell Typologies & Alignment Rules
| Cell Type | Alignment | Typography Token | Formatting Rules |
|---|---|---|---|
| **Text / Entity** | Left | `body.default` | Avatar + Primary title + Subtitle text |
| **Numeric / Currency** | **Right** | `body.default` (tabular-nums) | Explicit currency symbol, aligned decimal points |
| **Status Badge** | Center / Left | `body.dense` | Color-coded pill with status dot |
| **Progress / Meter** | Left | `body.dense` | Micro progress bar (4px height) with percentage label |
| **Sparkline Trend** | Center | SVG (24px height) | 14-day miniature sparkline curve |
| **Action Menu** | **Right** | N/A | Icon button trigger opening dropdown menu |

#### 4.4 Mobile & Tablet Responsive Transformations
- **Laptop (1024px+)**: Standard data grid with horizontal scroll and pinned columns.
- **Tablet (768px – 1023px)**: Horizontal scroll enabled; non-essential columns automatically hidden behind an expandable drawer; minimum row height locked at 44px for touch ergonomics.
- **Mobile (320px – 767px)**: **Card List Transformation**:
  - Each table row morphs into a standalone mobile card.
  - Card Header: Selection checkbox, Account Name, and Status Badge.
  - Card Body: 2-column grid showing Primary Metrics (`MRR`, `Health Score`).
  - Card Footer: Expandable accordion chevron (`▼ View 5 more fields`) to expose secondary cell data without horizontal scrolling.

