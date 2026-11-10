# Enterprise Design System Framework
## Volume 2: Responsive Architecture & Multi-Device Grid System

---

### 1. Viewport Matrix & Breakpoint Specifications

The design system supports three primary device tiers: **Laptop/Desktop**, **Tablet**, and **Mobile**, defined by specific boundary constraints and hardware ergonomics:

| Device Tier | Viewport Range | Grid Columns | Margins | Gutters | Primary Input Mode | Min Tap / Click Target |
|---|---|---|---|---|---|---|
| **Mobile** | 320px – 767px | **4** | 16px | 12px / 16px | Capacitive Touch / Single thumb | 44px × 44px |
| **Tablet** | 768px – 1023px | **8** | 24px | 16px / 20px | Dual Touch / Stylus / Trackpad | 44px × 44px |
| **Laptop** | 1024px – 1439px | **12** | 32px | 20px / 24px | Mouse / Trackpad / Keyboard | 32px × 32px |
| **Desktop-Wide** | 1440px+ | **12** | 40px (Fluid) | 24px | Precision Mouse / Multi-monitor | 32px × 32px |

> [!NOTE]
> Maximum container width on ultra-wide screens is constrained to `1600px` (centered with `auto` margins) to prevent horizontal scan fatigue across tables and multi-series charts.

---

### 2. Multi-Device App Shell Patterns

```
Laptop / Desktop (1024px+):
┌─────────┬──────────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar: Global Search, AI Copilot Quick-Launch, User Profile  │
│ (240px) ├────────────────────────┬─────────────────────────────────────┤
│ Expanded│ Main Canvas:           │ AI Assistant Side-Panel (Optional)  │
│ or Rail │ KPIs, Charts, Tables   │ (380px Docked / Collapsible)        │
│ (64px)  │ (12-Col Responsive)    │                                     │
└─────────┴────────────────────────┴─────────────────────────────────────┘

Tablet (768px - 1023px):
┌──────┬─────────────────────────────────────────────────────────────────┐
│ Rail │ Topbar: Hamburger, Search, Filter Toggle                        │
│ 64px ├─────────────────────────────────────────────────────────────────┤
│ Icon │ Adaptive Canvas: 8-Column Grid                                  │
│ Only │ (AI Panel opens as a Modal Drawer overlay)                      │
└──────┴─────────────────────────────────────────────────────────────────┘

Mobile (320px - 767px):
┌────────────────────────────────────────────────────────────────────────┐
│ Top App Bar: Brand Icon, Page Title, Search & Filter Triggers           │
├────────────────────────────────────────────────────────────────────────┤
│ Main Canvas (4-Column Single Stack / Carousel)                         │
│ - KPI Cards in horizontal snap-scroll or 1-col stack                   │
│ - Data tables transformed into interactive cards                       │
│ - Full-screen modal for Gen AI prompt / chat                           │
├────────────────────────────────────────────────────────────────────────┤
│ Bottom Navigation Bar (4-5 primary tabs: Dashboard, Chat, Data, Alerts)│
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Responsive Column Spanning Rules

The 12-8-4 responsive layout dynamically collapses dashboard cards and data components:

#### 3.1 KPI Card Grid Row
- **Laptop (12 Cols)**: 4 cards per row $\rightarrow$ `col-span-3` each. Or 3 cards $\rightarrow$ `col-span-4` each.
- **Tablet (8 Cols)**: 2 cards per row $\rightarrow$ `col-span-4` each (wraps to 2 rows of 2).
- **Mobile (4 Cols)**: 
  - *Option A (Default)*: Single column full width $\rightarrow$ `col-span-4`.
  - *Option B (Dense Executive view)*: 2 cards per row $\rightarrow$ `col-span-2` each (utilizing Compact KPI variant).
  - *Option C (Carousel)*: Horizontal scroll with `scroll-snap-type: x mandatory`, card width 85vw.

#### 3.2 Complex Chart & Graph Layouts
- **Laptop**: Side-by-side comparison layout:
  - Primary Chart: `col-span-8`
  - Secondary Chart / AI Insights Widget: `col-span-4`
- **Tablet**: Vertical stacking:
  - Primary Chart: `col-span-8`
  - Secondary Chart / AI Insights: `col-span-8` (placed underneath)
- **Mobile**:
  - Full width `col-span-4`. Height constrained to 240px–280px with pinch-to-zoom or drag scrubber for time-series charts.

#### 3.3 Data Table Layouts
- **Laptop**: Full enterprise data grid with horizontal scroll, sticky table header, sticky left selection column, and sticky right action column.
- **Tablet**: Responsive data grid with column visibility manager (low-priority columns hidden behind an "Add Columns" popover).
- **Mobile**:
  - *Card Transformation Mode*: Each row renders as a card with key identifier at the top and expandable accordion for secondary data points.
  - *Frozen Key Column Mode*: Primary identifier (e.g. Account Name) pinned on the left; secondary metrics scroll horizontally with a subtle gradient shadow edge.

---

### 4. Density Scaling Framework

Enterprise applications demand different information densities depending on user persona and device context. We define 3 density tiers:

```
┌───────────────────┬──────────────┬──────────────┬──────────────┐
│ Metric            │ Compact      │ Comfortable  │ Spacious     │
│                   │ (Dense Admin)│ (Standard)   │ (Touch/Exec) │
├───────────────────┼──────────────┼──────────────┼──────────────┤
│ Table Row Height  │ 32px         │ 44px         │ 56px         │
│ Table Cell Pad X  │ 8px          │ 16px         │ 20px         │
│ Table Cell Pad Y  │ 4px          │ 10px         │ 16px         │
│ Input Height      │ 32px         │ 40px         │ 48px         │
│ Button Height     │ 32px         │ 40px         │ 48px         │
│ KPI Card Padding  │ 12px         │ 20px         │ 24px         │
│ Font Scale Base   │ 12px (Dense) │ 14px (Sm)    │ 16px (Base)  │
└───────────────────┴──────────────┴──────────────┴──────────────┘
```

#### Automatic Device Defaults:
- **Laptop**: Defaults to **Comfortable**, user toggleable to **Compact** via toolbar toggle button.
- **Tablet**: Enforced minimum **Comfortable** (maintains 44px minimum touch target).
- **Mobile**: Defaults to **Comfortable** or **Spacious** (strict compliance with touch accessibility; never compact).

---

### 5. Safe Area Insets & Hardware Boundaries

For mobile and tablet devices with notches, camera punch-holes, and gesture bars:
```css
/* Container padding with safe-area fallback */
.app-shell {
  padding-top: max(var(--spacing-4), env(safe-area-inset-top));
  padding-bottom: max(var(--spacing-6), env(safe-area-inset-bottom));
  padding-left: max(var(--spacing-4), env(safe-area-inset-left));
  padding-right: max(var(--spacing-4), env(safe-area-inset-right));
}
```

The Gen AI bottom composer is anchored above the home indicator:
```css
.genai-composer-docked {
  margin-bottom: env(safe-area-inset-bottom);
}
```

