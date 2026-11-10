# Volume 7: Cross-Platform Metamorphosis & Multi-Device Architecture
### Desktop (>1024px), Tablet (600px–1024px), and Phone (<600px)

---

## 1. Executive Summary: The Principle of Responsive Metamorphosis

Traditional responsive web design typically stops at shrinking font sizes and wrapping flexbox columns. In enterprise analytical dashboards and Gen AI applications, this approach causes critical usability failures:
- **Unusable 8-column data tables** on small viewports with broken horizontal scroll.
- **Unreachable modal close buttons** and dialogs that bleed outside phone viewports.
- **Microscopic 24px buttons** that fail touch accuracy on touchscreens.
- **Desktop sidebars** that consume 40% of tablet screen real estate.

Our design system solves this through **Tokenized Polymorphic Metamorphosis**:
> A component maintains a single, unified React/TypeScript API (`title`, `children`, `isOpen`, `onClose`, `data`, `columns`), but automatically morphs its structural layout geometry, density, and interaction patterns according to viewport boundaries and pointer capabilities (`@media (pointer: coarse)` vs `pointer: fine`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CROSS-PLATFORM METAMORPHOSIS                          │
├─────────────────────┬───────────────────────┬───────────────────────────────┤
│ DESKTOP (>1024px)   │ TABLET (600–1024px)   │ PHONE (<600px)                │
├─────────────────────┼───────────────────────┼───────────────────────────────┤
│ 260px Persistent    │ 72px Vertical         │ 64px Bottom Navigation        │
│ Sidebar Drawer      │ Navigation Rail       │ + Hamburger Drawer            │
├─────────────────────┼───────────────────────┼───────────────────────────────┤
│ High-Density Table  │ Sticky-Header Table   │ Stacked Key-Value             │
│ (32px Compact Rows) │ (40px Comfortable)    │ Card List Rows                │
├─────────────────────┼───────────────────────┼───────────────────────────────┤
│ Centered Dialog     │ Centered Dialog       │ Slide-Up Bottom Sheet         │
│ Window + Backdrop   │ Window                │ with Drag Handle              │
├─────────────────────┼───────────────────────┼───────────────────────────────┤
│ Inline Buttons      │ Auto-Width Buttons    │ Full-Width Stacked            │
│ (Auto Width)        │ (44px Touch Targets)  │ Buttons (44px Minimum)        │
├─────────────────────┼───────────────────────┼───────────────────────────────┤
│ Hover Tooltip       │ Tap-to-Open Popover   │ Tap-to-Open Popover           │
│ on Mouse Hover      │ with Outside Dismiss  │ / Inline Dismissible Sheet    │
└─────────────────────┴───────────────────────┴───────────────────────────────┘
```

---

## 2. Layer 1: Foundations & Spatial Breakpoints

### 2.1 Viewport Breakpoint Boundaries
Defined in `tokens/responsive.json`:
- **Phone (`mobile`)**: `< 600px` (4 fluid columns, 16px margins, 12px gutters, min tap target `44px`).
- **Tablet (`tablet`)**: `600px – 1024px` (8 fluid columns, 24px margins, 16px gutters, min tap target `44px`).
- **Desktop (`laptop` & `desktop-wide`)**: `> 1024px` (12 fluid columns, 32px margins, 20px gutters, compact density `32px`).

### 2.2 Adaptive Pointer & Hit-Target Standard
```css
/* Touch device pointer detection */
@media (pointer: coarse) {
  :root {
    --touch-target-min: 44px;
    --control-hitbox-padding: 12px;
  }
}

/* Mouse fine pointer detection */
@media (pointer: fine) {
  :root {
    --touch-target-min: 32px;
    --control-hitbox-padding: 6px;
  }
}
```
Interactive elements (buttons, segmented toggles, table selection checkboxes, bottom navigation icons) MUST enforce `min-width: 44px; min-height: 44px;` whenever rendered on phone or touch-driven devices.

---

## 3. Layer 2: Navigation Tri-Morph (`AdaptiveLayout`)

The application navigation adapts across three form factors:

### 3.1 Desktop Viewport (>1024px)
- **Component**: `Sidebar.tsx`
- **Behavior**: Persistent left column (width: `260px`). Can toggle into an icon-only collapsed rail (`68px`).
- **Ergonomics**: Optimizes wide-aspect ratio workspace; groups menu items into logical functional domains.

### 3.2 Tablet Viewport (600px–1024px)
- **Component**: `NavigationRail.tsx`
- **Behavior**: Persistent vertical strip (width: `72px`). Vertically stacked icon + 10px label destinations with floating FAB slot at top.
- **Ergonomics**: Maximizes horizontal canvas width for Cartesian graphs and side-by-side KPI cards.

### 3.3 Phone Viewport (<600px)
- **Components**: `BottomNavigation.tsx` + `HamburgerMenu.tsx`
- **Behavior**: 
  - Primary 4–5 app destinations anchor to the thumb reach zone at the bottom (`height: 64px`).
  - Secondary destinations, account switcher, and settings nest inside the top header `HamburgerMenu` drawer.
- **Ergonomics**: Keeps thumb travel distance under 45% of total screen height.

```tsx
import { AdaptiveLayout } from '@hsb_design/design-system';

<AdaptiveLayout
  brandName="Enterprise Cloud"
  items={[
    { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
    { id: 'telemetry', label: 'Telemetry', icon: <DataIcon />, badge: 'LIVE' },
    { id: 'ai', label: 'Copilot', icon: <AiIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
  ]}
  activeItemId="overview"
  onNavigate={(id) => handleNav(id)}
>
  <YourPageContent />
</AdaptiveLayout>
```

---

## 4. Layer 3: Action & Input Control Adaptation

### 4.1 Buttons: Inline Auto vs Full-Width Stacked
On desktop, action buttons are inline-flex with auto-width:
```css
.btn-action-group {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```
On mobile (`<600px`), button groups automatically stack vertically or stretch to 100% width, placing the primary confirmation button closest to the thumb:
```css
@media (max-width: 600px) {
  .btn-action-group {
    flex-direction: column-reverse;
    width: 100%;
  }
  .btn-action-group .btn {
    width: 100%;
    height: 48px; /* 44px+ touch standard */
    justify-content: center;
  }
}
```

### 4.2 Segmented Controls vs Native Selects
- On desktop and tablet, options render as horizontal sliding segmented pill groups (`SegmentedControl.tsx`).
- When options exceed 4 items or on small phone viewports, the control degrades into a native `<select>` dropdown or a bottom sheet selection list.

---

## 5. Layer 4: Data Display & Content Degradation

### 5.1 Data Table to Card List Metamorphosis
Traditional wide data tables break on screens under 768px. Rather than forcing awkward horizontal scroll bars, `DataTable.tsx` automatically transforms rows into structured Card Items:

```
DESKTOP (TABLE MODE):
┌───────────┬───────────────┬──────────┬───────────┐
│ Node ID   │ Region        │ CPU      │ Latency   │
├───────────┼───────────────┼──────────┼───────────┤
│ us-east-1 │ N. Virginia   │ [ 38% ]  │ 18ms      │
│ eu-west-1 │ Dublin        │ [ 64% ]  │ 42ms      │
└───────────┴───────────────┴──────────┴───────────┘

PHONE (CARD LIST MODE):
┌──────────────────────────────────────────────────┐
│ us-east-1                              18ms      │
│ N. Virginia                    [ CPU: 38% ]      │
├──────────────────────────────────────────────────┤
│ eu-west-1                              42ms      │
│ Dublin                         [ CPU: 64% ]      │
└──────────────────────────────────────────────────┘
```

The transformation is controlled via the `mobileCardTransform` prop:
```tsx
<DataTable
  columns={columns}
  data={data}
  density="compact"
  mobileCardTransform={true}
/>
```

---

## 6. Layer 5: Feedback & Overlay Metamorphosis

### 6.1 Adaptive Dialogs (Modal ⇄ Bottom Sheet)
The `AdaptiveDialog.tsx` component automatically renders:
- **Centered Dialog Window** on desktop/tablet (`>600px`) with backdrop blur and centered alignment.
- **Bottom Sheet** on phone (`≤600px`) anchored to the bottom edge with a swipe grab handle and slide-up transition.

```tsx
import { AdaptiveDialog } from '@hsb_design/design-system';

<AdaptiveDialog
  isOpen={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  title="Revoke Edge Cluster Token?"
  description="This action will terminate 1,420 active client WebSocket tunnels."
  footer={
    <>
      <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleRevoke}>Revoke Immediately</Button>
    </>
  }
>
  <div className="warning-content">...</div>
</AdaptiveDialog>
```

### 6.2 Snackbars & Toast Anchoring
- **Desktop**: Anchored to bottom-right (`bottom: 24px; right: 24px; max-width: 420px;`).
- **Phone**: Anchored to bottom-center above the Bottom Navigation Bar (`bottom: 76px; left: 16px; right: 16px; width: auto;`).

---

## 7. Layer 6: Enterprise Gen AI Domain Metamorphosis

### 7.1 Compound AI Response Layout
Analytical LLM responses contain text, citations, charts, tables, and formula diffs:
- **Desktop**: Renders embedded comparisons side-by-side with tabular breakdowns.
- **Phone**: Stacks reasoning traces, narrative diagnosis, mini bar comparisons, and diff viewers vertically with sticky Accept/Reject action footers.

### 7.2 Prompt Composer Thumb Reach
On mobile devices, the `PromptComposer` stays docked directly above the virtual keyboard, with quick-action context attachment chips horizontally scrollable with momentum scrolling (`-webkit-overflow-scrolling: touch;`).

---

## 8. Summary Checklist for Implementation

When building any screen with `@hsb_design/design-system`, verify:
1. [ ] **Navigation Shell**: Uses `AdaptiveLayout` (Sidebar on desktop, Rail on tablet, Bottom Nav + Drawer on mobile).
2. [ ] **Touch Targets**: All interactive elements enforce `44px` minimum height on touch devices.
3. [ ] **Table Degradation**: Tables enable `mobileCardTransform` to degrade cleanly into card lists on `<600px`.
4. [ ] **Dialogs**: All modals use `AdaptiveDialog` to morph into bottom sheets on mobile.
5. [ ] **Tabular Numerals**: Strict `font-variant-numeric: tabular-nums` applied to all numbers, metrics, and currency displays.
6. [ ] **KPI Rhythms**: All KPI cards maintain `184px` height and `48px` visualization slots.
7. [ ] **Chart Anomaly Badges**: Anomaly triggers are anchored in the chart header *before* timeframe filters.

