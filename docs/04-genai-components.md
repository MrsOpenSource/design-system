# Enterprise Design System Framework
## Volume 4: Gen AI & AI-Integrated Application Components

---

### 1. Gen AI Design Principles & Cognitive Architecture

Enterprise AI interfaces must balance predictive power with transparency, user agency, and auditability. The following core principles govern all AI component implementations:

1. **Explicit AI Provenance**: Every AI-generated output, summary, or recommendation must be visually distinct from human or deterministic data using the designated AI semantic tokens (`sys.color.ai.*` and sparkle glyphs).
2. **Attribution & Verifiable Grounding**: Model assertions must link back to authoritative source documents, database queries, or retrieved chunks via citation pills.
3. **Inspectable Reasoning**: Complex multi-step reasoning must be encapsulated in collapsible thought-trace containers so users can inspect intermediate logic without visual clutter.
4. **Reversible Human-in-the-Loop**: All AI mutations (e.g., auto-generated code, SQL updates, formula edits) must provide explicit diff inspection with "Accept" and "Reject" controls.
5. **Non-Blocking Streaming Performance**: Token streaming must never freeze the UI thread, degrade typing responsiveness, or flood assistive screen readers.

---

### 2. Multi-Device Prompt Composer

The Prompt Composer is the interactive command center for conversational and hybrid generative interfaces.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [+] [ 📄 Q3_Financials.csv ✕ ]  [ 📊 Revenue_Table ✕ ]                                │ <- Context Chips
│  Summarize the key drivers of customer churn in EMEA and compare them with Q2...       │ <- Auto-growing Textarea
│                                                                                        │
│  [/] Commands   [ 🎙 ] Voice Input                        [ 482 / 8,000 tokens ] [ ■ Stop ] │ <- Toolbar
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 2.1 Anatomy Breakdown
1. **Context Attachment Shelf**:
   - Holds user-attached artifacts: CSVs, documents, database tables, or dashboard KPI chips.
   - Dismissible badge with `✕` remove button.
2. **Auto-Growing Text Area**:
   - Dynamic height expansion: Minimum 56px (single-line command) up to 240px (multi-paragraph prompt). Beyond 240px, auto-scrolls with a sleek custom scrollbar.
   - Placeholder text: Rotates contextual suggestions (e.g., *"Ask a question about this dashboard or type '/' for commands..."*).
3. **Slash Commands Menu `[/]`**:
   - Triggered by typing `/` or clicking the slash icon.
   - Floating popover showing enterprise skills: `/summarize`, `/generate-sql`, `/anomaly-explain`, `/draft-email`, `/export-report`.
4. **Token Budget Counter**:
   - Real-time token estimator: `font-family.mono`, 10px.
   - Color shifts: Normal (`neutral.500`), Approaching limit (`status.warning.text`), Exceeded (`status.danger.text`).
5. **Submit / Morphing Action Button**:
   - **Idle / Ready State**: Rounded arrow icon (`sys.color.interactive.ai-action`). Shortcut: `Enter` to submit, `Shift+Enter` for newline.
   - **Active Streaming State**: Button morphs smoothly into a red stop square `[ ■ Stop Generation ]` allowing instant cancellation of LLM streams.

#### 2.2 Mobile Adaptation
- In mobile viewports (320px–767px), the composer docks persistently above the keyboard with safe-area insets (`env(safe-area-inset-bottom)`). Context chips scroll horizontally (`overflow-x: auto`), and voice input is given prominent tap placement.

---

### 3. Conversational Canvas & Streaming Message Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [ 👤 User ]                                                      10:24 AM             │
│  Explain why our gross margin dipped by 3.2% in October.                               │
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [ ✨ Enterprise Copilot ]                                         10:24 AM (3.2s)      │
│                                                                                        │
│  ┌─ ▼ Thinking Process (4 steps completed) ──────────────────────────────────────────┐ │
│  │  ✔ Queried PostgreSQL: SELECT opex, cogs FROM monthly_ledger WHERE month = 'Oct'  │ │
│  │  ✔ Calculated COGS breakdown: Freight shipping rates surged 28%                   │ │
│  │  ✔ Synthesized grounding citations from Supplier_Contract_2026.pdf               │ │
│  └───────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                        │
│  The 3.2% gross margin contraction in October was primarily driven by two factors:    │
│  1. **Freight Surcharges**: Shipping logistics fees rose by 28% [1] due to fuel costs. │
│  2. **Raw Material Price Adjustments**: Component pricing in EMEA rose by 4.5% [2].    │
│                                                                                        │
│  ┌─ Sources ─────────────────────────────────────────────────────────────────────────┐ │
│  │  [1] Supply_Chain_Report_Oct.pdf   [2] EMEA_Vendor_Invoices_Q4.xlsx               │ │
│  └───────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                        │
│  [ 📋 Copy ]  [ 👍 Helpful ]  [ 👎 Report ]  [ ↻ Regenerate ]  [ ⌥ Branch Thread ]     │ <- Actions
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### 3.1 Streaming Token Behavior
- **Streaming Cursor**: An animated vertical bar (`width: 8px, height: 16px, background: ai-special.accent-primary`) blinks at 800ms frequency at the stream terminus.
- **Auto-Scroll Behavior**: The canvas automatically locks to the bottom while streaming. If the user scrolls up via trackpad/touch to read earlier text, auto-scroll instantly detaches and a floating badge appears: `[ ↓ Jump to latest ]`.
- **Markdown & Code Rendering**:
  - Code blocks render in full syntax highlighting with language label (e.g. `Python`, `SQL`, `TypeScript`) and a one-click `Copy Code` button.
  - Interactive charts and inline data tables can be embedded directly within assistant messages.

---

### 4. Reasoning / Thought Trace Accordion ("Chain of Thought")

Complex Gen AI workflows require transparent model reasoning without cluttering the final output.

#### 4.1 Component States
1. **Thinking (Active Stream)**:
   - Header shows pulsing sparkle icon + *"Analyzing financial tables..."* + live timer counter (`1.2s`, `2.4s`, `3.6s`).
   - Border features an animated shimmer gradient (`motion.ai-shimmer`).
2. **Completed (Collapsed)**:
   - Header displays: `► Thought for 3.4 seconds (4 steps)`.
   - Subtle background (`neutral.50`), clean border (`border.subtle`).
3. **Completed (Expanded)**:
   - Displays step-by-step audit logs:
     - `Tool Call Badge`: Tool name, parameters, execution latency.
     - `SQL / Code Accordion`: Collapsible view of raw query and returned payload.
     - `Internal Deductions`: Monospace thought notes.

---

### 5. Grounding, Citations & Source Attribution

```
Inline Text: "...shipping logistics increased by 28% [1] due to fuel tariffs..."
                                                     │
                                                     ▼ (Hover or Tap)
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  📄 Q3_Logistics_Filing.pdf (Page 14)                               96% Confidence     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  "...effective October 1st, trans-Atlantic container rates increased by 28.4% due     │
│   to emergency bunker fuel surcharges..."                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  [ ↗ Open Source Document ]                                  [ 📋 Copy Excerpt ]       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Inline Citation Pill `[n]`**:
  - Pill radius: `full`, font size: `10px`, background: `neutral.100`, text: `ai-special.accent-primary`.
  - Hover / Focus opens grounding card with direct snippet and vector similarity confidence score.
- **Source Tray Carousel**:
  - Displayed at the bottom of the response, listing all unique referenced documents as interactive chips.

---

### 6. Human-in-the-Loop Diff & Suggestion Widget

When an AI suggests an edit to user dashboards, code, or configuration, it renders as a visual inline diff:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  PROPOSED METRIC FORMULA EDIT                                 [ ✨ AI Recommendation ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  - net_revenue = gross_revenue - discounts;                                            │ <- Deletion (Red)
│  + net_revenue = gross_revenue - discounts - returns_allowance;                        │ <- Addition (Green)
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Reason: Accounting standard updates require factoring returns allowance into Q4 net. │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  [ ✓ Accept Changes ]       [ ✎ Refine with AI ]              [ ✕ Reject ]             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Deletions**: Background `status.danger.surface`, text `status.danger.text`, strikethrough.
- **Additions**: Background `status.success.surface`, text `status.success.text`, bold underline.
- **Actions**:
  - `Accept`: Commits the diff directly to state.
  - `Refine with AI`: Opens prompt composer with the diff pre-loaded for iterative prompt feedback.
  - `Reject`: Discards the suggestion and returns to the previous state.

---

### 7. AI-Integrated Dashboard Patterns

#### 7.1 Executive AI Summary Banner
- Positioned directly below the dashboard title.
- Contains 2-3 synthesized bullet points highlighting key deviations and opportunities.
- Header includes: `✨ AI Executive Summary • Generated today at 09:15 AM (Data freshness: 100%)` with a `[ ↻ Refresh ]` button.

#### 7.2 Anomaly Explanation Drawer
- Triggered whenever an anomaly badge on a chart or KPI is clicked.
- Slides in from the right (`380px` on Laptop, full width on Mobile).
- Displays:
  - Root-cause decomposition chart.
  - Natural language explanation.
  - Recommended actions with 1-click execution buttons.

