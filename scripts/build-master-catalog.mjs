import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ALL_112_COMPONENTS = [
  // Category 1: Actions & Buttons (17)
  { num: "01", name: "Elevated Button", cat: "Actions & Buttons", api: "<Button variant=\"elevated\">Action</Button>", desc: "Surface elevation shadow for busy canvas separation", device: "Desktop / Tablet / Phone" },
  { num: "02", name: "Filled Button", cat: "Actions & Buttons", api: "<Button variant=\"primary\">Save</Button>", desc: "Primary brand high-emphasis call-to-action", device: "Desktop / Tablet / Phone (Full-width)" },
  { num: "03", name: "Filled Tonal Button", cat: "Actions & Buttons", api: "<Button variant=\"secondary\">Continue</Button>", desc: "Tinted container for medium-high emphasis actions", device: "Desktop / Tablet / Phone" },
  { num: "04", name: "Outlined Button", cat: "Actions & Buttons", api: "<Button variant=\"outline\">Cancel</Button>", desc: "Bordered container for medium-low emphasis actions", device: "Desktop / Tablet / Phone" },
  { num: "05", name: "Text / Ghost Button", cat: "Actions & Buttons", api: "<Button variant=\"ghost\">View all</Button>", desc: "Zero border/container for inline low emphasis", device: "Desktop / Tablet / Phone" },
  { num: "06", name: "Danger / Destructive Button", cat: "Actions & Buttons", api: "<Button variant=\"danger\">Revoke Key</Button>", desc: "High-risk irreversible operations", device: "Desktop / Tablet / Phone" },
  { num: "07", name: "AI Specialty Gradient Button", cat: "Actions & Buttons", api: "<Button variant=\"ai\">Synthesize</Button>", desc: "Violet-to-pink gradient with aura glow", device: "Desktop / Tablet / Phone" },
  { num: "08", name: "Small FAB", cat: "Actions & Buttons", api: "<Button variant=\"fab\" size=\"sm\" icon={<Plus />} />", desc: "40x40px compact floating action trigger", device: "Tablet / Phone" },
  { num: "09", name: "Standard FAB", cat: "Actions & Buttons", api: "<Button variant=\"fab\" size=\"md\" icon={<Plus />} />", desc: "56x56px primary persistent creation trigger", device: "Desktop / Tablet / Phone" },
  { num: "10", name: "Large FAB", cat: "Actions & Buttons", api: "<Button variant=\"fab\" size=\"lg\" icon={<Plus />} />", desc: "96x96px large touch viewport trigger", device: "Tablet / Touch Displays" },
  { num: "11", name: "Extended FAB", cat: "Actions & Buttons", api: "<Button variant=\"fab\" extended icon={<Plus />} label=\"New Metric\" />", desc: "56px height pill with icon + self-explanatory label", device: "Desktop / Tablet / Phone" },
  { num: "12", name: "Standard Icon Button", cat: "Actions & Buttons", api: "<Button variant=\"icon\" icon={<Settings />} />", desc: "40x40px transparent toolbar utility trigger", device: "Desktop / Tablet / Phone" },
  { num: "13", name: "Filled Icon Button", cat: "Actions & Buttons", api: "<Button variant=\"icon\" filled icon={<Send />} />", desc: "High-emphasis solid icon button", device: "Desktop / Tablet / Phone" },
  { num: "14", name: "Filled Tonal Icon Button", cat: "Actions & Buttons", api: "<Button variant=\"icon\" tonal icon={<Filter />} />", desc: "Tinted background icon action", device: "Desktop / Tablet / Phone" },
  { num: "15", name: "Outlined Icon Button", cat: "Actions & Buttons", api: "<Button variant=\"icon\" outline icon={<Download />} />", desc: "Bordered secondary action for table rows", device: "Desktop / Tablet / Phone" },
  { num: "16", name: "Toggle Icon Button", cat: "Actions & Buttons", api: "<Button variant=\"icon\" toggleable active={isFav} icon={<Star />} />", desc: "Dual-state star / bookmark / pin action", device: "Desktop / Tablet / Phone" },
  { num: "17", name: "Segmented Button", cat: "Actions & Buttons", api: "<SegmentedControl options={['1D','1W','1M','YTD']} value={val} />", desc: "Single-choice pill group for timeframe filters", device: "Desktop / Tablet / Phone" },

  // Category 2: Communication & Feedback (12)
  { num: "18", name: "Small Badge (Dot)", cat: "Communication & Feedback", api: "<Badge variant=\"dot\" status=\"online\" />", desc: "6x6px pulsing heartbeat indicator", device: "Desktop / Tablet / Phone" },
  { num: "19", name: "Large Badge (Single Digit)", cat: "Communication & Feedback", api: "<Badge count={3} />", desc: "16x16px notification count badge", device: "Desktop / Tablet / Phone" },
  { num: "20", name: "Large Badge (Multi Digit)", cat: "Communication & Feedback", api: "<Badge count=\"99+\" />", desc: "High-volume overflow badge with tabular nums", device: "Desktop / Tablet / Phone" },
  { num: "21", name: "Linear Determinate Progress", cat: "Communication & Feedback", api: "<Progress value={68} />", desc: "Track with percentage fill bar", device: "Desktop / Tablet / Phone" },
  { num: "22", name: "Linear Indeterminate Progress", cat: "Communication & Feedback", api: "<Progress indeterminate />", desc: "Looping pulse loader for background tasks", device: "Desktop / Tablet / Phone" },
  { num: "23", name: "Linear Buffer Progress", cat: "Communication & Feedback", api: "<Progress buffer={80} value={45} />", desc: "Buffer line for streaming LLM tokens", device: "Desktop / Tablet / Phone" },
  { num: "24", name: "Circular Determinate Progress", cat: "Communication & Feedback", api: "<CircularProgress value={75} />", desc: "SVG ring dial with percentage stroke", device: "Desktop / Tablet / Phone" },
  { num: "25", name: "Circular Indeterminate Spinner", cat: "Communication & Feedback", api: "<CircularProgress indeterminate size=\"md\" />", desc: "Continuous rotating async loader", device: "Desktop / Tablet / Phone" },
  { num: "26", name: "Single-Line Snackbar (Toast)", cat: "Communication & Feedback", api: "<Snackbar message=\"Changes saved\" variant=\"info\" />", desc: "Transient notification anchored bottom-right/center", device: "Desktop (Right) / Phone (Bottom Center)" },
  { num: "27", name: "Multi-Line Snackbar with Undo", cat: "Communication & Feedback", api: "<Snackbar message=\"Deleted\" actionText=\"Undo\" onAction={...} />", desc: "Destructive operation undo window", device: "Desktop / Phone" },
  { num: "28", name: "Alert Box (Semantic Banner: Info, Success, Warning, Danger)", cat: "Communication & Feedback", api: "<Alert variant=\"warning\" title=\"Maintenance\" onDismiss={...} />", desc: "Full-width dismissible alert box with semantic icons, actions, and close button", device: "Desktop / Tablet / Phone" },
  { num: "29", name: "Rich Tooltip Popover (Contextual Pop-up)", cat: "Communication & Feedback", api: "<Tooltip content={<LineageCard />}>...</Tooltip>", desc: "Interactive floating pop-up anchored to trigger with arrow pointer", device: "Desktop (Hover) / Touch (Tap Popover)" },

  // Category 3: Containment & Surfaces (13)
  { num: "30", name: "Elevated Card", cat: "Containment & Surfaces", api: "<Card variant=\"elevated\">Content</Card>", desc: "Soft shadow elevation container", device: "Desktop / Tablet / Phone" },
  { num: "31", name: "Filled Card", cat: "Containment & Surfaces", api: "<Card variant=\"filled\">Content</Card>", desc: "Sunken surface borderless container", device: "Desktop / Tablet / Phone" },
  { num: "32", name: "Outlined Card", cat: "Containment & Surfaces", api: "<Card variant=\"outline\">Content</Card>", desc: "1px stroke border analytics container", device: "Desktop / Tablet / Phone" },
  { num: "33", name: "Interactive / Selectable Card", cat: "Containment & Surfaces", api: "<Card selectable selected={val}>Content</Card>", desc: "Selection highlight for plan/account pickers", device: "Desktop / Tablet / Phone" },
  { num: "34", name: "Basic Confirmation Dialog (Action Pop-up)", cat: "Containment & Surfaces", api: "<Modal title=\"Confirm Delete\" footer={...}>Body</Modal>", desc: "Centered modal pop-up window with Confirm and Cancel buttons", device: "Desktop / Tablet" },
  { num: "35", name: "Alert Dialog with Icon (Security & Incident Alert Pop-up)", cat: "Containment & Surfaces", api: "<Modal icon={<AlertTriangle />} title=\"Warning\">Body</Modal>", desc: "High-priority security incident and destructive alert pop-up", device: "Desktop / Tablet" },
  { num: "36", name: "Full-Screen Dialog Pop-up", cat: "Containment & Surfaces", api: "<Modal fullScreen title=\"Cluster Config\">Body</Modal>", desc: "100vw x 100vh modal pop-up for complex forms and wizards", device: "Mobile / Tablet" },
  { num: "37", name: "Standard Side Sheet", cat: "Containment & Surfaces", api: "<SideSheet variant=\"persistent\">Inspector</SideSheet>", desc: "Non-modal right panel coexisting with table", device: "Desktop (>1024px)" },
  { num: "38", name: "Modal Side Sheet (Drawer)", cat: "Containment & Surfaces", api: "<SideSheet variant=\"modal\">Details</SideSheet>", desc: "Right drawer with backdrop blur overlay", device: "Desktop / Tablet" },
  { num: "39", name: "Standard Bottom Sheet Pop-up", cat: "Containment & Surfaces", api: "<BottomSheet isOpen={open} onClose={...}>Content</BottomSheet>", desc: "Thumb-friendly sliding pop-up sheet anchored to bottom of viewport", device: "Phone (<600px)" },
  { num: "40", name: "Modal Bottom Sheet Pop-up (Responsive Adaptive Pop-up)", cat: "Containment & Surfaces", api: "<AdaptiveDialog isOpen={open} onClose={...}>Content</AdaptiveDialog>", desc: "Auto-detecting pop-up: Centered Modal on desktop, Bottom Sheet on mobile", device: "Desktop (Modal) / Phone (Bottom Sheet)" },
  { num: "41", name: "Full-Bleed Divider", cat: "Containment & Surfaces", api: "<Divider fullBleed />", desc: "100% width 1px section separator", device: "Desktop / Tablet / Phone" },
  { num: "42", name: "Inset Divider", cat: "Containment & Surfaces", api: "<Divider inset />", desc: "Indented divider aligning with list item text", device: "Desktop / Tablet / Phone" },

  // Category 4: Navigation Systems (17)
  { num: "43", name: "Top App Bar - Small", cat: "Navigation Systems", api: "<AppBar size=\"sm\" title=\"Dashboard\" />", desc: "64px top application bar with actions", device: "Desktop / Tablet / Phone" },
  { num: "44", name: "Top App Bar - Center Aligned", cat: "Navigation Systems", api: "<AppBar align=\"center\" title=\"Setup Wizard\" />", desc: "Centered title bar for focused tasks", device: "Desktop / Tablet / Phone" },
  { num: "45", name: "Top App Bar - Medium", cat: "Navigation Systems", api: "<AppBar size=\"md\" title=\"Accounts\" />", desc: "Two-row collapsing header on scroll", device: "Phone (<600px)" },
  { num: "46", name: "Top App Bar - Large", cat: "Navigation Systems", api: "<AppBar size=\"lg\" title=\"Enterprise Suite\" />", desc: "152px hero title collapsing to 64px", device: "Desktop / Landing Pages" },
  { num: "47", name: "Bottom App Bar", cat: "Navigation Systems", api: "<BottomAppBar actions={...} fab={...} />", desc: "Mobile bottom action bar with FAB slot", device: "Phone (<600px)" },
  { num: "48", name: "Permanent Desktop Sidebar", cat: "Navigation Systems", api: "<Sidebar width={260} navItems={...} />", desc: "260px persistent desktop navigation sidebar", device: "Desktop (>1024px)" },
  { num: "49", name: "Collapsible Mini Sidebar", cat: "Navigation Systems", api: "<Sidebar collapsed width={68} navItems={...} />", desc: "68px icon-only rail maximizing data area", device: "Desktop (>1024px)" },
  { num: "50", name: "Modal Navigation Drawer (Hamburger Pop-up Menu)", cat: "Navigation Systems", api: "<HamburgerMenu isOpen={open} onToggle={...} />", desc: "Sliding side drawer pop-up with backdrop dimming", device: "Phone / Tablet (<1024px)" },
  { num: "51", name: "Navigation Rail", cat: "Navigation Systems", api: "<NavigationRail items={...} />", desc: "72px vertical strip for tablet viewports", device: "Tablet (600–1024px)" },
  { num: "52", name: "Navigation Rail with FAB", cat: "Navigation Systems", api: "<NavigationRail fab={<FAB />} items={...} />", desc: "Vertical rail with top primary action FAB", device: "Tablet (600–1024px)" },
  { num: "53", name: "Bottom Navigation Bar", cat: "Navigation Systems", api: "<BottomNavigation items={...} />", desc: "64px thumb-zone bar with 4-5 destinations", device: "Phone (<600px)" },
  { num: "54", name: "Primary Tabs (Underline)", cat: "Navigation Systems", api: "<Tabs variant=\"underline\" items={...} />", desc: "Horizontal row with active indicator line", device: "Desktop / Tablet / Phone" },
  { num: "55", name: "Secondary Tabs (Segmented)", cat: "Navigation Systems", api: "<Tabs variant=\"segmented\" items={...} />", desc: "Pill background slider for sub-navigation", device: "Desktop / Tablet / Phone" },
  { num: "56", name: "Scrollable Tabs", cat: "Navigation Systems", api: "<Tabs variant=\"scrollable\" items={...} />", desc: "Horizontal scroll container with fade edges", device: "Phone / Narrow Screens" },
  { num: "57", name: "Hierarchical Breadcrumbs", cat: "Navigation Systems", api: "<Breadcrumbs items={['Telemetry','Nodes','01']} />", desc: "Nested hierarchy trail with chevron separators", device: "Desktop / Tablet" },
  { num: "58", name: "Search Bar (Docked)", cat: "Navigation Systems", api: "<SearchInput docked shortcut=\"⌘K\" />", desc: "Header omnibar with keyboard accelerator", device: "Desktop / Tablet" },
  { num: "59", name: "Search View (Full Overlay)", cat: "Navigation Systems", api: "<CommandPalette isOpen={open} />", desc: "Full-screen command palette search modal", device: "Desktop / Tablet / Phone" },

  // Category 5: Selection & Form Controls (22)
  { num: "60", name: "Standard Checkbox", cat: "Selection & Form Controls", api: "<Checkbox checked={val} onChange={...} />", desc: "18x18px box with checkmark glyph", device: "Desktop / Tablet / Phone" },
  { num: "61", name: "Indeterminate Checkbox", cat: "Selection & Form Controls", api: "<Checkbox indeterminate />", desc: "Horizontal dash for partial subset select", device: "Desktop / Tablet / Phone" },
  { num: "62", name: "Checkbox with Helper Text", cat: "Selection & Form Controls", api: "<Checkbox label=\"Telemetry\" helperText=\"Opt-in\" />", desc: "Checkbox paired with descriptive text", device: "Desktop / Tablet / Phone" },
  { num: "63", name: "Radio Button", cat: "Selection & Form Controls", api: "<RadioButton value=\"A\" checked={...} />", desc: "Single-select mutually exclusive circle", device: "Desktop / Tablet / Phone" },
  { num: "64", name: "Radio Group Container", cat: "Selection & Form Controls", api: "<RadioGroup options={...} value={val} />", desc: "Stack of related radio options", device: "Desktop / Tablet / Phone" },
  { num: "65", name: "Standard Switch", cat: "Selection & Form Controls", api: "<Switch checked={val} onChange={...} />", desc: "40x22px binary toggle with spring animation", device: "Desktop / Tablet / Phone" },
  { num: "66", name: "Switch with Icons", cat: "Selection & Form Controls", api: "<Switch iconOn={<Check />} iconOff={<X />} />", desc: "Embedded icons inside toggle thumb", device: "Desktop / Tablet / Phone" },
  { num: "67", name: "Continuous Slider", cat: "Selection & Form Controls", api: "<Slider min={0} max={100} value={val} />", desc: "Continuous drag track with value bubble", device: "Desktop / Tablet / Phone" },
  { num: "68", name: "Discrete / Stepped Slider", cat: "Selection & Form Controls", api: "<Slider step={25} marks ticks />", desc: "Slider with discrete retention interval stops", device: "Desktop / Tablet / Phone" },
  { num: "69", name: "Range Slider (Two Thumbs)", cat: "Selection & Form Controls", api: "<RangeSlider min={0} max={1000} value={[100,500]} />", desc: "Dual thumb handles for min/max filtering", device: "Desktop / Tablet / Phone" },
  { num: "70", name: "Filter Chip", cat: "Selection & Form Controls", api: "<Chip type=\"filter\" active label=\"Live\" />", desc: "Checkmark filter tag with active toggle", device: "Desktop / Tablet / Phone" },
  { num: "71", name: "Input Chip", cat: "Selection & Form Controls", api: "<Chip type=\"input\" onRemove={...} label=\"file.csv\" />", desc: "Attachment chip with dismiss trigger", device: "Desktop / Tablet / Phone" },
  { num: "72", name: "Assist Chip", cat: "Selection & Form Controls", api: "<Chip type=\"assist\" icon={<Zap />} label=\"Fix\" />", desc: "Contextual one-click action shortcut", device: "Desktop / Tablet / Phone" },
  { num: "73", name: "Suggestion Chip", cat: "Selection & Form Controls", api: "<Chip type=\"suggestion\" label=\"Explain Drop\" />", desc: "Predictive prompt chip for AI copilot", device: "Desktop / Tablet / Phone" },
  { num: "74", name: "Docked Date Picker Grid", cat: "Selection & Form Controls", api: "<DatePicker variant=\"docked\" />", desc: "7-column calendar dropdown popover", device: "Desktop / Tablet" },
  { num: "75", name: "Modal Date Picker Dialog", cat: "Selection & Form Controls", api: "<DatePicker variant=\"modal\" />", desc: "Full calendar dialog for touch screens", device: "Phone (<600px)" },
  { num: "76", name: "Date Range Picker", cat: "Selection & Form Controls", api: "<DateRangePicker range={[start, end]} />", desc: "Dual-month continuous range highlight", device: "Desktop / Tablet" },
  { num: "77", name: "Clock Time Picker Dial", cat: "Selection & Form Controls", api: "<TimePicker variant=\"dial\" />", desc: "Radial clock face with hour/minute hands", device: "Tablet / Phone" },
  { num: "78", name: "Time Picker Text Input", cat: "Selection & Form Controls", api: "<TimePicker variant=\"input\" />", desc: "HH:MM numeric box entry with AM/PM toggle", device: "Desktop / Keyboard" },
  { num: "79", name: "Dropdown Action Menu", cat: "Selection & Form Controls", api: "<DropdownMenu items={['Edit','Delete']} />", desc: "Floating contextual menu for table rows", device: "Desktop / Tablet / Phone" },
  { num: "80", name: "Cascading / Nested Menu", cat: "Selection & Form Controls", api: "<DropdownMenu nested items={...} />", desc: "Hierarchical sub-menu flyouts", device: "Desktop (>1024px)" },
  { num: "81", name: "Exposed Dropdown (Select)", cat: "Selection & Form Controls", api: "<Select options={regions} value={val} />", desc: "Native/custom select with chevron indicator", device: "Desktop / Tablet / Phone" },

  // Category 6: Text Inputs & Search (8)
  { num: "82", name: "Filled Text Field", cat: "Text Inputs & Search", api: "<Input variant=\"filled\" label=\"Account\" />", desc: "High-contrast sunken background field", device: "Desktop / Tablet / Phone" },
  { num: "83", name: "Outlined Text Field", cat: "Text Inputs & Search", api: "<Input variant=\"outline\" label=\"Cluster Name\" />", desc: "Clean 1.5px stroke border form field", device: "Desktop / Tablet / Phone" },
  { num: "84", name: "Text Field with Leading Icon", cat: "Text Inputs & Search", api: "<Input leadingIcon={<Search />} />", desc: "Icon prefix for search and credentials", device: "Desktop / Tablet / Phone" },
  { num: "85", name: "Text Field with Trailing Action", cat: "Text Inputs & Search", api: "<Input trailingAction={<Eye />} />", desc: "Password reveal or clear input button", device: "Desktop / Tablet / Phone" },
  { num: "86", name: "Text Field with Affixes", cat: "Text Inputs & Search", api: "<Input prefix=\"$\" suffix=\"USD\" />", desc: "Currency or domain prefix/suffix labels", device: "Desktop / Tablet / Phone" },
  { num: "87", name: "Text Field with Character Count", cat: "Text Inputs & Search", api: "<Input maxLength={100} showCount />", desc: "Live character tally (42 / 100)", device: "Desktop / Tablet / Phone" },
  { num: "88", name: "Text Field in Error State", cat: "Text Inputs & Search", api: "<Input error=\"Invalid IPv4 address\" />", desc: "Red border stroke with validation message", device: "Desktop / Tablet / Phone" },
  { num: "89", name: "Multiline Text Area", cat: "Text Inputs & Search", api: "<Textarea rows={4} autoExpand />", desc: "Auto-expanding multiline text editor", device: "Desktop / Tablet / Phone" },

  // Category 7: Data Display & Lists (11)
  { num: "90", name: "Single-Line List Item", cat: "Data Display & Lists", api: "<ListItem lines={1} leading={<Shield />} label=\"Security\" />", desc: "48px height simple setting row", device: "Desktop / Tablet / Phone" },
  { num: "91", name: "Two-Line List Item", cat: "Data Display & Lists", api: "<ListItem lines={2} leading={<Avatar />} title=\"User\" sub=\"Admin\" />", desc: "64px height user or activity feed row", device: "Desktop / Tablet / Phone" },
  { num: "92", name: "Three-Line List Item", cat: "Data Display & Lists", api: "<ListItem lines={3} title=\"Alert\" sub=\"Spike\" meta=\"2m ago\" />", desc: "80px height event notification row", device: "Desktop / Tablet / Phone" },
  { num: "93", name: "Accordion List Item", cat: "Data Display & Lists", api: "<Accordion title=\"Schema\">Columns...</Accordion>", desc: "Collapsible expansion row with chevron", device: "Desktop / Tablet / Phone" },
  { num: "94", name: "Data Table (Standard)", cat: "Data Display & Lists", api: "<DataTable columns={cols} data={rows} />", desc: "Sticky-header virtualized accounts grid", device: "Desktop / Tablet" },
  { num: "95", name: "Data Table with Sorting", cat: "Data Display & Lists", api: "<DataTable columns={cols} sortable />", desc: "Sort direction indicators (Asc / Desc / Neutral)", device: "Desktop / Tablet" },
  { num: "96", name: "Data Table with Checkbox Row", cat: "Data Display & Lists", api: "<DataTable selectable selectedIds={ids} />", desc: "Row checkboxes with bulk action toolbar", device: "Desktop / Tablet" },
  { num: "97", name: "Data Table Pagination Footer", cat: "Data Display & Lists", api: "<Pagination total={148} pageSize={10} />", desc: "Page size select and page index buttons", device: "Desktop / Tablet / Phone" },
  { num: "98", name: "Circular Avatar", cat: "Data Display & Lists", api: "<Avatar name=\"Jane Doe\" size=\"md\" />", desc: "Initials or photo with online presence dot", device: "Desktop / Tablet / Phone" },
  { num: "99", name: "AI Copilot Avatar", cat: "Data Display & Lists", api: "<Avatar variant=\"ai\" size=\"md\" />", desc: "Electric gradient rounded square with glow", device: "Desktop / Tablet / Phone" },
  { num: "100", name: "Avatar Stack Group", cat: "Data Display & Lists", api: "<AvatarGroup max={3} users={users} />", desc: "Overlapping avatars with +4 overflow count", device: "Desktop / Tablet / Phone" },

  // Category 8: Enterprise Dashboard Organisms (7)
  { num: "101", name: "Standard 184px KPI Card", cat: "Dashboard Organisms", api: "<KpiCard title=\"Revenue\" value=\"$4.8M\" />", desc: "Strict 184px rhythm with 48px viz slot", device: "Desktop / Tablet / Phone" },
  { num: "102", name: "KPI Area Sparkline Card", cat: "Dashboard Organisms", api: "<KpiCard sparkline={{ type: 'area', data }} />", desc: "Bézier curve sparkline with hover scrubber", device: "Desktop / Tablet / Phone" },
  { num: "103", name: "KPI Target Progress Card", cat: "Dashboard Organisms", api: "<KpiCard targetProgress={{ current, target }} />", desc: "Annual SLA goal progress bar card", device: "Desktop / Tablet / Phone" },
  { num: "104", name: "KPI Bar Sparkline Card", cat: "Dashboard Organisms", api: "<KpiCard sparkline={{ type: 'bar', data }} />", desc: "Micro bar series for invocations volatility", device: "Desktop / Tablet / Phone" },
  { num: "105", name: "Header-Anchored Anomaly Chart", cat: "Dashboard Organisms", api: "<ChartContainer anomalyBadge={<Badge />} />", desc: "Anomaly trigger in header before timeframe", device: "Desktop / Tablet / Phone" },
  { num: "106", name: "Root-Cause Diagnostic Modal", cat: "Dashboard Organisms", api: "<AdaptiveDialog title=\"Anomaly Diagnostic\" />", desc: "Click-to-diagnose incident investigation", device: "Desktop (Modal) / Phone (Bottom Sheet)" },
  { num: "107", name: "Responsive Mobile Card List", cat: "Dashboard Organisms", api: "<DataTable mobileCardTransform />", desc: "Automatic table fallback to stacked cards", device: "Phone (<600px)" },

  // Category 9: Gen AI & Agentic Interfaces (5)
  { num: "108", name: "Gen AI Prompt Composer", cat: "Gen AI Interfaces", api: "<PromptComposer contextChips={...} onSubmit={...} />", desc: "Multimodal composer with token meter and chips", device: "Desktop / Tablet / Phone" },
  { num: "109", name: "Reasoning Trace Accordion", cat: "Gen AI Interfaces", api: "<ReasoningAccordion duration=\"3.4s\" />", desc: "Borderless CoT disclosure with tool logs", device: "Desktop / Tablet / Phone" },
  { num: "110", name: "Multimodal Compound AI Card", cat: "Gen AI Interfaces", api: "<CompoundGenAiResponse />", desc: "Single response card: Text + Chart + Table", device: "Desktop / Tablet / Phone" },
  { num: "111", name: "Suggestion Diff Viewer", cat: "Gen AI Interfaces", api: "<SuggestionDiffViewer patch={diff} />", desc: "Inline formula patch with Accept/Reject", device: "Desktop / Tablet / Phone" },
  { num: "112", name: "Reject Feedback Taxonomy Modal", cat: "Gen AI Interfaces", api: "<AdaptiveDialog title=\"Why reject?\" />", desc: "Predefined failure taxonomy feedback modal", device: "Desktop / Tablet / Phone" }
];

export { ALL_112_COMPONENTS };


function getComponentKeywords(c) {
  const name = (c.name || '').toLowerCase();
  const cat = (c.cat || '').toLowerCase();
  const desc = (c.desc || '').toLowerCase();
  const api = (c.api || '').toLowerCase();
  const kws = [];

  if (name.includes('alert') || desc.includes('alert') || api.includes('alert')) {
    kws.push('alert', 'alertbox', 'alert box', 'notice', 'warning', 'banner', 'danger', 'error', 'info', 'success');
  }
  if (name.includes('pop') || desc.includes('pop') || name.includes('dialog') || name.includes('sheet') || name.includes('modal') || name.includes('tooltip') || name.includes('menu') || name.includes('picker')) {
    kws.push('pop', 'popup', 'pop-up', 'popover', 'dialog', 'modal', 'sheet', 'overlay', 'dropdown');
  }
  if (name.includes('date') || name.includes('time') || name.includes('picker') || name.includes('clock') || name.includes('calendar')) {
    kws.push('picker', 'calendar', 'clock', 'date', 'time', 'popup', 'pop-up', 'dropdown', 'schedule');
  }
  if (name.includes('button') || name.includes('fab')) {
    kws.push('button', 'btn', 'cta', 'action', 'fab');
  }
  if (name.includes('table') || name.includes('grid') || name.includes('list') || name.includes('card')) {
    kws.push('data', 'display', 'table', 'grid', 'card', 'list', 'row');
  }
  if (name.includes('nav') || name.includes('drawer') || name.includes('sidebar') || name.includes('rail') || name.includes('tab')) {
    kws.push('navigation', 'nav', 'menu', 'sidebar', 'drawer', 'hamburger', 'rail', 'tabs', 'tab');
  }
  return kws.join(' ');
}


export function getComponentLiveSpecimen(c) {
  const num = parseInt(c.num, 10);
  const name = (c.name || '').toLowerCase();

  // Category 1: Buttons & Actions (01–17)
  if (num === 1) return `<button class="btn" style="box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-subtle); font-size: 11px; padding: 4px 10px;">Elevated</button>`;
  if (num === 2) return `<button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;">Filled</button>`;
  if (num === 3) return `<button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;">Tonal</button>`;
  if (num === 4) return `<button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">Outlined</button>`;
  if (num === 5) return `<button class="btn" style="background:transparent; border:none; color:var(--color-brand-placeholder-primary-600); font-size: 11px; padding: 4px 8px; font-weight:700;">Ghost</button>`;
  if (num === 6) return `<button class="btn btn-danger" style="font-size: 11px; padding: 4px 10px;">Danger</button>`;
  if (num === 7) return `<button class="btn btn-ai" style="font-size: 11px; padding: 4px 10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="sparkles" class="lucide-icon" style="width:12px;height:12px;"></i> AI Action</button>`;
  if (num === 8) return `<button class="btn btn-primary" style="width:28px; height:28px; border-radius:50%; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);"><i data-lucide="plus" style="width:14px;height:14px;"></i></button>`;
  if (num === 9) return `<button class="btn btn-primary" style="width:34px; height:34px; border-radius:12px; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-md);"><i data-lucide="plus" style="width:16px;height:16px;"></i></button>`;
  if (num === 10) return `<button class="btn btn-primary" style="width:40px; height:40px; border-radius:14px; padding:0; display:inline-flex; align-items:center; justify-content:center; box-shadow:var(--shadow-lg);"><i data-lucide="plus" style="width:20px;height:20px;"></i></button>`;
  if (num === 11) return `<button class="btn btn-primary" style="border-radius:9999px; font-size:11px; padding:5px 12px; display:inline-flex; align-items:center; gap:5px; box-shadow:var(--shadow-md);"><i data-lucide="plus" style="width:14px;height:14px;"></i><span>Create</span></button>`;
  if (num === 12) return `<button class="btn btn-outline" style="width:28px; height:28px; border-radius:6px; padding:0; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="settings" style="width:14px;height:14px;"></i></button>`;
  if (num === 13) return `<button class="btn btn-primary" style="width:28px; height:28px; border-radius:6px; padding:0; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="bell" style="width:14px;height:14px;"></i></button>`;
  if (num === 14) return `<button class="btn btn-secondary" style="width:28px; height:28px; border-radius:6px; padding:0; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="bookmark" style="width:14px;height:14px;"></i></button>`;
  if (num === 15) return `<button class="btn btn-outline" style="width:28px; height:28px; border-radius:6px; padding:0; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--sys-color-border-default);"><i data-lucide="share-2" style="width:14px;height:14px;"></i></button>`;
  if (num === 16) return `<button class="btn" style="width:28px; height:28px; border-radius:6px; padding:0; display:inline-flex; align-items:center; justify-content:center; background:rgba(37,99,235,0.12); color:var(--color-brand-placeholder-primary-600);"><i data-lucide="star" style="width:14px;height:14px;fill:currentColor;"></i></button>`;
  if (num === 17) return `<div class="control-pill-group" style="display:inline-flex;"><button class="control-pill active" style="font-size:10px;padding:3px 6px;">1D</button><button class="control-pill" style="font-size:10px;padding:3px 6px;">1M</button></div>`;

  // Category 2: Feedback & Status (18–29)
  if (num === 18) return `<span class="badge badge-dot" style="width:8px; height:8px; background:var(--color-brand-placeholder-primary-600); border-radius:50%; display:inline-block;"></span>`;
  if (num === 19) return `<span class="badge badge-primary" style="font-size:10px; font-weight:700; min-width:18px; height:18px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; padding:0 4px;">5</span>`;
  if (num === 20) return `<span class="badge badge-danger" style="font-size:10px; font-weight:700; min-width:24px; height:18px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; padding:0 4px;">99+</span>`;
  if (num === 21) return `<div style="width:80px; height:6px; background:var(--sys-color-surface-sunken); border-radius:9999px; overflow:hidden;"><div style="width:68%; height:100%; background:var(--color-brand-placeholder-primary-600);"></div></div>`;
  if (num === 22) return `<div style="width:80px; height:4px; background:var(--sys-color-surface-sunken); border-radius:9999px; overflow:hidden; position:relative;"><div style="width:40%; height:100%; background:var(--color-brand-placeholder-primary-600); animation: pulse 1s infinite;"></div></div>`;
  if (num === 23) return `<div style="width:80px; height:6px; background:#E2E8F0; border-radius:9999px; overflow:hidden; position:relative;"><div style="width:80%; height:100%; background:#BFDBFE; position:absolute;"></div><div style="width:45%; height:100%; background:var(--color-brand-placeholder-primary-600); position:absolute;"></div></div>`;
  if (num === 24) return `<div style="position:relative; width:22px; height:22px;"><svg viewBox="0 0 36 36" style="width:100%;height:100%;transform:rotate(-90deg);"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--sys-color-border-subtle)" stroke-width="4"/><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="4" stroke-dasharray="75, 100"/></svg></div>`;
  if (num === 25) return `<div class="spinner" style="width:18px; height:18px; border-width:2px;"></div>`;
  if (num === 26) return `<div style="background:var(--sys-color-surface-inverse, #0F172A); color:white; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:600; white-space:nowrap; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check" class="lucide-icon" style="width:11px;height:11px;color:#10B981;"></i> Saved</div>`;
  if (num === 27) return `<div style="background:var(--sys-color-surface-inverse, #0F172A); color:white; padding:3px 8px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:6px;"><span>Deleted</span><span style="color:#38BDF8; font-weight:700; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="rotate-ccw" class="lucide-icon" style="width:10px;height:10px;"></i> Undo</span></div>`;
  if (num === 28) return `<div style="background:#EFF6FF; border:1px solid #BFDBFE; color:#1E40AF; padding:3px 6px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="info" class="lucide-icon" style="width:11px;height:11px;"></i> Alert Box</div>`;
  if (num === 29) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); padding:3px 6px; border-radius:6px; font-size:10px; box-shadow:var(--shadow-sm); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="message-square" class="lucide-icon" style="width:11px;height:11px;"></i> Popover</div>`;

  // Category 3: Surfaces & Overlays (30–42)
  if (num === 30) return `<div style="background:var(--sys-color-surface-card); padding:4px 8px; border-radius:6px; box-shadow:var(--shadow-md); font-size:10px; border:1px solid var(--sys-color-border-subtle);">Elevated</div>`;
  if (num === 31) return `<div style="background:var(--sys-color-surface-sunken); padding:4px 8px; border-radius:6px; font-size:10px;">Filled</div>`;
  if (num === 32) return `<div style="border:1px solid var(--sys-color-border-default); padding:4px 8px; border-radius:6px; font-size:10px; background:var(--sys-color-surface-card);">Outlined</div>`;
  if (num === 33) return `<div style="border:2px solid var(--color-brand-placeholder-primary-600); background:rgba(37,99,235,0.06); padding:4px 8px; border-radius:6px; font-size:10px; font-weight:600; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check" class="lucide-icon" style="width:11px;height:11px;color:var(--color-brand-placeholder-primary-600);"></i> Selected</div>`;
  if (num === 34) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:6px; padding:3px 6px; font-size:10px; box-shadow:var(--shadow-sm); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="square" class="lucide-icon" style="width:10px;height:10px;"></i><span style="font-weight:700;">Modal Pop-up</span></div>`;
  if (num === 35) return `<div style="background:#FEF2F2; border:1px solid #FCA5A5; color:#991B1B; padding:3px 6px; border-radius:6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="alert-triangle" class="lucide-icon" style="width:11px;height:11px;color:#DC2626;"></i><span>Alert Modal</span></div>`;
  if (num === 36) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; border-radius:4px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="maximize-2" class="lucide-icon" style="width:11px;height:11px;color:var(--color-brand-placeholder-primary-600);"></i> Fullscreen</div>`;
  if (num === 37) return `<div style="border-right:3px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; font-size:10px; background:var(--sys-color-surface-sunken); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="panel-right" class="lucide-icon" style="width:11px;height:11px;"></i> Side Panel</div>`;
  if (num === 38) return `<div style="border-left:3px solid var(--color-brand-placeholder-primary-600); background:var(--sys-color-surface-card); box-shadow:var(--shadow-sm); padding:3px 6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="panel-left" class="lucide-icon" style="width:11px;height:11px;"></i> Drawer Menu</div>`;
  if (num === 39) return `<div style="border-top:3px solid var(--color-brand-placeholder-primary-600); padding:3px 6px; font-size:10px; background:var(--sys-color-surface-sunken); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="panel-bottom" class="lucide-icon" style="width:11px;height:11px;"></i> Bottom Sheet</div>`;
  if (num === 40) return `<div style="border-top:3px solid #7C3AED; background:var(--sys-color-surface-card); box-shadow:var(--shadow-md); padding:3px 6px; font-size:10px; display:inline-flex; align-items:center; gap:4px;"><i data-lucide="panel-bottom-close" class="lucide-icon" style="width:11px;height:11px;color:#7C3AED;"></i> Modal Sheet</div>`;
  if (num === 41) return `<div style="width:70px; height:1px; background:var(--sys-color-border-default);"></div>`;
  if (num === 42) return `<div style="width:50px; height:1px; background:var(--sys-color-border-subtle); margin:0 10px;"></div>`;

  // Category 4: Navigation Systems (43–59)
  if (num === 43) return `<div style="display:inline-flex; align-items:center; gap:6px; font-size:10px; font-weight:700;"><i data-lucide="menu" style="width:12px;height:12px;"></i> Title</div>`;
  if (num === 44) return `<div style="display:inline-flex; align-items:center; justify-content:center; width:80px; font-size:10px; font-weight:700; border-bottom:1px solid var(--sys-color-border-subtle);">Centered</div>`;
  if (num === 45) return `<div style="display:inline-flex; flex-direction:column; font-size:10px;"><span style="font-size:8px; color:var(--sys-color-text-secondary);">Small Title</span><span style="font-weight:700;">Medium Bar</span></div>`;
  if (num === 46) return `<div style="display:inline-flex; flex-direction:column; font-size:10px;"><span style="font-weight:800; font-size:12px;">Large Bar</span></div>`;
  if (num === 47) return `<div style="display:inline-flex; align-items:center; gap:8px; font-size:10px; border-top:1px solid var(--sys-color-border-subtle); padding-top:2px;"><i data-lucide="home" style="width:12px;height:12px;"></i><i data-lucide="bar-chart-2" style="width:12px;height:12px;"></i><i data-lucide="settings" style="width:12px;height:12px;"></i></div>`;
  if (num === 48) return `<div style="display:inline-flex; flex-direction:column; gap:2px; font-size:9px; border-right:2px solid var(--color-brand-placeholder-primary-600); padding-right:4px;"><span>Overview</span><span>Nodes</span></div>`;
  if (num === 49) return `<div style="display:inline-flex; flex-direction:column; gap:3px; font-size:10px; border-right:2px solid var(--sys-color-border-default); padding-right:2px;"><i data-lucide="folder" style="width:12px;height:12px;"></i><i data-lucide="settings" style="width:12px;height:12px;"></i></div>`;
  if (num === 50) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); padding:2px 6px; border-radius:4px; font-size:10px; box-shadow:var(--shadow-sm); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="menu" style="width:11px;height:11px;"></i> Nav Drawer</div>`;
  if (num === 51) return `<div style="display:inline-flex; flex-direction:column; gap:4px; align-items:center; padding:2px; background:var(--sys-color-surface-sunken); border-radius:4px;"><i data-lucide="home" style="width:12px;height:12px;"></i><i data-lucide="bar-chart-2" style="width:12px;height:12px;"></i></div>`;
  if (num === 52) return `<div style="display:inline-flex; flex-direction:column; gap:4px; align-items:center; padding:2px; background:var(--sys-color-surface-sunken); border-radius:4px;"><span style="background:var(--color-brand-placeholder-primary-600); color:white; width:16px; height:16px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="plus" style="width:10px;height:10px;"></i></span><i data-lucide="home" style="width:12px;height:12px;"></i></div>`;
  if (num === 53) return `<div style="display:inline-flex; gap:6px; font-size:9px; padding:2px 6px; background:var(--sys-color-surface-sunken); border-radius:4px;"><span style="display:inline-flex;align-items:center;gap:3px;"><i data-lucide="home" style="width:11px;height:11px;"></i> Home</span><span style="display:inline-flex;align-items:center;gap:3px;"><i data-lucide="bar-chart-2" style="width:11px;height:11px;"></i> Stats</span></div>`;

  // Distinct Tabs (54, 55, 56)
  if (num === 54) return `<div style="display:inline-flex; align-items:center; gap:10px; border-bottom:1px solid var(--sys-color-border-subtle); padding:0 2px;"><span style="font-size:10px; font-weight:700; color:var(--color-brand-placeholder-primary-600); border-bottom:2px solid var(--color-brand-placeholder-primary-600); padding-bottom:3px; margin-bottom:-1px;">Overview</span><span style="font-size:10px; color:var(--sys-color-text-secondary); padding-bottom:3px;">Metrics</span><span style="font-size:10px; color:var(--sys-color-text-secondary); padding-bottom:3px;">Logs</span></div>`;
  if (num === 55) return `<div style="display:inline-flex; align-items:center; background:var(--sys-color-surface-sunken); padding:2px; border-radius:9999px; border:1px solid var(--sys-color-border-subtle);"><span style="font-size:9px; font-weight:700; background:var(--sys-color-surface-card); color:var(--color-brand-placeholder-primary-600); padding:2px 8px; border-radius:9999px; box-shadow:var(--shadow-sm);">Day</span><span style="font-size:9px; color:var(--sys-color-text-secondary); padding:2px 6px;">Week</span><span style="font-size:9px; color:var(--sys-color-text-secondary); padding:2px 6px;">Month</span></div>`;
  if (num === 56) return `<div style="display:inline-flex; align-items:center; gap:4px; background:var(--sys-color-surface-sunken); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:2px 4px; max-width:125px; overflow:hidden;"><i data-lucide="chevron-left" class="lucide-icon" style="width:10px;height:10px;color:var(--sys-color-text-tertiary);"></i><span style="font-size:9px; font-weight:700; color:var(--color-brand-placeholder-primary-600); border-bottom:2px solid var(--color-brand-placeholder-primary-600); white-space:nowrap;">Overview</span><span style="font-size:9px; color:var(--sys-color-text-secondary); white-space:nowrap;">Metrics</span><span style="font-size:9px; color:var(--sys-color-text-secondary); white-space:nowrap; opacity:0.4;">Billing</span><i data-lucide="chevron-right" class="lucide-icon" style="width:10px;height:10px;color:var(--color-brand-placeholder-primary-600);"></i></div>`;

  if (num === 57) return `<div style="display:inline-flex; align-items:center; gap:3px; font-size:9px; color:var(--sys-color-text-secondary);"><span>Home</span><i data-lucide="chevron-right" style="width:9px;height:9px;color:var(--sys-color-text-tertiary);"></i><span>Nodes</span><i data-lucide="chevron-right" style="width:9px;height:9px;color:var(--sys-color-text-tertiary);"></i><span style="color:var(--color-brand-placeholder-primary-600); font-weight:700;">us-east</span></div>`;
  if (num === 58) return `<div style="display:inline-flex; align-items:center; gap:4px; border:1px solid var(--sys-color-border-default); border-radius:9999px; padding:2px 8px; font-size:9px; color:var(--sys-color-text-secondary); width:90px; background:var(--sys-color-surface-sunken);"><i data-lucide="search" style="width:10px;height:10px;"></i> Search...</div>`;
  if (num === 59) return `<div style="display:inline-flex; flex-direction:column; background:var(--sys-color-surface-card); border:1px solid var(--color-brand-placeholder-primary-600); border-radius:4px; padding:2px 5px; font-size:8px; width:95px; box-shadow:var(--shadow-sm);"><div style="font-weight:700; border-bottom:1px solid var(--sys-color-border-subtle); padding-bottom:1px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="search" style="width:9px;height:9px;"></i> cluster-a</div><span style="color:var(--sys-color-text-secondary);">3 matching items</span></div>`;

  // Category 5: Selection & Forms (60–81)
  if (num === 60) return `<input type="checkbox" checked style="accent-color:var(--color-brand-placeholder-primary-600); cursor:pointer;">`;
  if (num === 61) return `<input type="checkbox" class="indeterminate-checkbox" style="accent-color:var(--color-brand-placeholder-primary-600); cursor:pointer;">`;
  if (num === 62) return `<div style="display:inline-flex; flex-direction:column; font-size:9px;"><label style="display:flex; align-items:center; gap:3px; font-weight:600;"><input type="checkbox" checked style="accent-color:var(--color-brand-placeholder-primary-600);"> Enable</label><span style="font-size:7px; color:var(--sys-color-text-secondary); margin-left:14px;">Autoscales cluster</span></div>`;
  if (num === 63) return `<input type="radio" checked style="accent-color:var(--color-brand-placeholder-primary-600); cursor:pointer;">`;
  if (num === 64) return `<div style="display:inline-flex; gap:6px; font-size:9px;"><label style="display:flex;align-items:center;gap:2px;"><input type="radio" name="g1" checked style="accent-color:var(--color-brand-placeholder-primary-600);"> A</label><label style="display:flex;align-items:center;gap:2px;"><input type="radio" name="g1" style="accent-color:var(--color-brand-placeholder-primary-600);"> B</label></div>`;
  if (num === 65) return `<div style="width:30px; height:16px; background:var(--color-brand-placeholder-primary-600); border-radius:9999px; position:relative; display:inline-block;"><div style="width:12px; height:12px; background:white; border-radius:50%; position:absolute; top:2px; right:2px;"></div></div>`;
  if (num === 66) return `<div style="width:34px; height:18px; background:var(--color-brand-placeholder-primary-600); border-radius:9999px; position:relative; display:inline-flex; align-items:center; justify-content:space-between; padding:0 3px;"><i data-lucide="check" style="width:9px;height:9px;color:white;"></i><div style="width:12px; height:12px; background:white; border-radius:50%;"></div></div>`;
  if (num === 67) return `<input type="range" value="60" style="width:70px; accent-color:var(--color-brand-placeholder-primary-600);">`;
  if (num === 68) return `<div style="display:inline-flex; flex-direction:column; width:70px;"><input type="range" min="0" max="4" step="1" value="2" style="width:100%; accent-color:var(--color-brand-placeholder-primary-600);"><div style="display:flex; justify-content:space-between; font-size:7px; color:var(--sys-color-text-secondary); font-family:monospace;"><span>0</span><span>2</span><span>4</span></div></div>`;
  if (num === 69) return `<div style="position:relative; width:70px; height:14px; display:inline-flex; align-items:center;"><div style="width:100%; height:4px; background:#E2E8F0; border-radius:2px;"></div><div style="position:absolute; left:20%; width:50%; height:4px; background:var(--color-brand-placeholder-primary-600);"></div><div style="position:absolute; left:20%; width:10px; height:10px; border-radius:50%; background:white; border:2px solid var(--color-brand-placeholder-primary-600); margin-left:-5px;"></div><div style="position:absolute; left:70%; width:10px; height:10px; border-radius:50%; background:white; border:2px solid var(--color-brand-placeholder-primary-600); margin-left:-5px;"></div></div>`;
  
  // Distinct Chips (70-73) with Lucide icons
  if (num === 70) return `<span class="badge" style="display:inline-flex; align-items:center; gap:4px; background:rgba(37,99,235,0.1); color:var(--color-brand-placeholder-primary-600); border:1px solid var(--color-brand-placeholder-primary-600); border-radius:6px; font-size:9px; padding:2px 6px; font-weight:700;"><i data-lucide="check" class="lucide-icon" style="width:10px;height:10px;"></i> In Prod</span>`;
  if (num === 71) return `<span class="badge" style="display:inline-flex; align-items:center; gap:4px; background:var(--sys-color-surface-sunken); color:var(--sys-color-text-primary); border:1px solid var(--sys-color-border-default); border-radius:6px; font-size:9px; padding:2px 5px;">alex@corp <i data-lucide="x" class="lucide-icon" style="width:10px;height:10px;cursor:pointer;color:var(--sys-color-text-secondary);"></i></span>`;
  if (num === 72) return `<span class="badge" style="display:inline-flex; align-items:center; gap:4px; background:var(--sys-color-surface-card); color:var(--sys-color-text-primary); border:1px solid var(--sys-color-border-default); border-radius:6px; font-size:9px; padding:2px 6px; box-shadow:var(--shadow-sm);"><i data-lucide="calendar" class="lucide-icon" style="width:10px;height:10px;color:var(--color-brand-placeholder-primary-600);"></i> Add Event</span>`;
  if (num === 73) return `<span class="badge" style="display:inline-flex; align-items:center; gap:4px; background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(236,72,153,0.08)); color:#7C3AED; border:1px solid #C084FC; border-radius:6px; font-size:9px; padding:2px 6px; font-weight:700;"><i data-lucide="sparkles" class="lucide-icon" style="width:10px;height:10px;"></i> Summarize</span>`;

  // Distinct Date / Time Pickers (74-78)
  if (num === 74) return `<div style="display:inline-flex; flex-direction:column; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 4px; font-size:8px; box-shadow:var(--shadow-sm);"><div style="font-weight:700; color:var(--color-brand-placeholder-primary-600); text-align:center;">Nov 2026</div><div style="display:grid; grid-template-columns:repeat(7, 8px); gap:1px; font-size:7px; text-align:center; margin-top:1px;"><span style="color:#94A3B8;">S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span style="grid-column:2; background:var(--color-brand-placeholder-primary-600); color:white; border-radius:1px; font-weight:700;">9</span></div></div>`;
  if (num === 75) return `<div style="display:inline-flex; align-items:center; gap:4px; background:#EFF6FF; border:1px solid #93C5FD; border-radius:4px; padding:2px 6px; font-size:9px; color:#1E40AF; font-weight:700;"><i data-lucide="calendar" class="lucide-icon" style="width:10px;height:10px;"></i> Pick Date <i data-lucide="chevron-down" class="lucide-icon" style="width:9px;height:9px;"></i></div>`;
  if (num === 76) return `<div style="display:inline-flex; align-items:center; gap:4px; background:var(--sys-color-surface-sunken); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; font-size:8px; font-family:monospace;"><span style="color:var(--color-brand-placeholder-primary-600); font-weight:700;">Nov 01</span><i data-lucide="arrow-right" class="lucide-icon" style="width:9px;height:9px;"></i><span style="color:var(--color-brand-placeholder-primary-600); font-weight:700;">Nov 09</span></div>`;
  if (num === 77) return `<div style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; border:1.5px solid var(--color-brand-placeholder-primary-600); background:var(--sys-color-surface-sunken); position:relative;"><div style="position:absolute; width:1px; height:7px; background:var(--color-brand-placeholder-primary-600); top:5px; left:11px; transform-origin:bottom; transform:rotate(60deg);"></div><div style="width:3px; height:3px; border-radius:50%; background:var(--color-brand-placeholder-primary-600);"></div></div>`;
  if (num === 78) return `<div style="display:inline-flex; align-items:center; gap:2px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; font-size:9px; font-family:monospace; font-weight:700;"><span style="background:rgba(37,99,235,0.1); color:var(--color-brand-placeholder-primary-600); padding:1px 2px; border-radius:2px;">14</span>:<span>30</span> <span style="font-size:7px; color:var(--sys-color-text-secondary);">PM</span></div>`;

  // Distinct Menus (79-81)
  if (num === 79) return `<div style="display:inline-flex; flex-direction:column; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:4px; padding:2px; box-shadow:var(--shadow-sm); font-size:8px; width:65px;"><div style="padding:1px 3px; font-weight:700; color:var(--color-brand-placeholder-primary-600); background:rgba(37,99,235,0.06); border-radius:2px;">Edit</div><div style="padding:1px 3px; color:var(--sys-color-text-secondary);">Delete</div></div>`;
  if (num === 80) return `<div style="display:inline-flex; align-items:center; gap:2px; font-size:9px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px;"><span style="font-weight:600;">Export</span><span style="display:inline-flex; align-items:center; gap:1px; color:var(--color-brand-placeholder-primary-600); font-size:8px;"><i data-lucide="chevron-right" class="lucide-icon" style="width:8px;height:8px;"></i> CSV</span></div>`;
  if (num === 81) return `<div style="display:inline-flex; align-items:center; justify-content:space-between; width:75px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; font-size:9px;"><span style="color:var(--sys-color-text-primary);">Region</span><i data-lucide="chevron-down" class="lucide-icon" style="width:9px;height:9px;color:var(--sys-color-text-tertiary);"></i></div>`;

  // Distinct Text Fields (82-89)
  if (num === 82) return `<div style="display:inline-flex; flex-direction:column; background:var(--sys-color-surface-sunken); border-bottom:2px solid var(--color-brand-placeholder-primary-600); border-radius:3px 3px 0 0; padding:1px 5px; width:75px;"><span style="font-size:7px; color:var(--color-brand-placeholder-primary-600); font-weight:700;">LABEL</span><span style="font-size:9px;">Filled input</span></div>`;
  if (num === 83) return `<div style="display:inline-flex; align-items:center; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; width:75px; font-size:9px; color:var(--sys-color-text-primary);">Outlined input</div>`;
  if (num === 84) return `<div style="display:inline-flex; align-items:center; gap:3px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; width:80px; font-size:9px;"><i data-lucide="mail" style="width:10px;height:10px;color:var(--sys-color-text-tertiary);"></i><span>Email...</span></div>`;
  if (num === 85) return `<div style="display:inline-flex; align-items:center; justify-content:space-between; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; width:80px; font-size:9px;"><span>Password</span><i data-lucide="eye" style="width:10px;height:10px;color:var(--sys-color-text-tertiary);"></i></div>`;
  if (num === 86) return `<div style="display:inline-flex; align-items:center; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 4px; font-size:9px;"><span style="color:var(--sys-color-text-tertiary); font-size:8px; font-weight:700;">$</span><span>120</span><span style="color:var(--sys-color-text-tertiary); font-size:8px; margin-left:2px;">USD</span></div>`;
  if (num === 87) return `<div style="display:inline-flex; align-items:center; justify-content:space-between; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 5px; width:85px; font-size:9px;"><span>Title...</span><span style="font-size:7px; color:var(--sys-color-text-tertiary); font-family:monospace;">14/50</span></div>`;
  if (num === 88) return `<div style="display:inline-flex; flex-direction:column; width:80px;"><div style="display:inline-flex; align-items:center; justify-content:space-between; background:#FEF2F2; border:1px solid #EF4444; border-radius:3px; padding:1px 4px; font-size:9px; color:#B91C1C;"><span>Invalid</span><i data-lucide="alert-circle" class="lucide-icon" style="width:9px;height:9px;"></i></div><span style="font-size:7px; color:#EF4444; margin-top:1px;">Required</span></div>`;
  if (num === 89) return `<div style="width:75px; height:24px; border:1px solid var(--sys-color-border-default); border-radius:4px; font-size:8px; padding:2px 4px; background:var(--sys-color-surface-card); color:var(--sys-color-text-secondary); line-height:1.2;">Multi-line description...</div>`;

  // Distinct List Items (90-93)
  if (num === 90) return `<div style="display:inline-flex; align-items:center; gap:5px; width:95px; padding:2px 5px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:4px;"><i data-lucide="file" style="width:10px;height:10px;color:var(--color-brand-placeholder-primary-600);"></i><span style="font-size:9px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Single Line</span></div>`;
  if (num === 91) return `<div style="display:inline-flex; flex-direction:column; width:95px; padding:2px 5px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:4px;"><span style="font-size:9px; font-weight:700;">Two Line</span><span style="font-size:7px; color:var(--sys-color-text-secondary);">Subtext info</span></div>`;
  if (num === 92) return `<div style="display:inline-flex; flex-direction:column; width:100px; padding:2px 5px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:4px;"><div style="display:flex; justify-content:space-between; font-size:8px; font-weight:700;"><span>Alert</span><span style="color:#059669; font-size:7px;">2m</span></div><span style="font-size:7px; color:var(--sys-color-text-secondary);">Spike +42k</span><span style="font-size:7px; color:var(--color-brand-placeholder-primary-600); font-weight:600; display:inline-flex; align-items:center; gap:2px;">Details <i data-lucide="arrow-right" style="width:8px;height:8px;"></i></span></div>`;
  if (num === 93) return `<div style="display:inline-flex; flex-direction:column; width:95px; border:1px solid var(--sys-color-border-subtle); border-radius:3px; overflow:hidden;"><div style="display:flex; justify-content:space-between; align-items:center; background:var(--sys-color-surface-sunken); padding:2px 4px; font-size:8px; font-weight:700;"><span>Accordion</span><i data-lucide="chevron-down" style="width:9px;height:9px;"></i></div><div style="padding:2px 4px; font-size:7px; color:var(--sys-color-text-secondary); background:var(--sys-color-surface-card);">Expanded item</div></div>`;

  // Distinct Data Tables (94-97)
  if (num === 94) return `<div style="display:inline-grid; grid-template-columns:1fr 1fr; gap:1px; font-size:8px; border:1px solid var(--sys-color-border-subtle); padding:2px 4px; border-radius:3px; width:90px; background:var(--sys-color-surface-card);"><span style="font-weight:700; border-bottom:1px solid var(--sys-color-border-subtle);">Item</span><span style="font-weight:700; border-bottom:1px solid var(--sys-color-border-subtle); text-align:right;">Val</span><span>CPU</span><span style="text-align:right; font-family:monospace;">42%</span></div>`;
  if (num === 95) return `<div style="display:inline-flex; align-items:center; justify-content:space-between; width:90px; background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:3px; padding:2px 5px; font-size:8px;"><span style="font-weight:700;">MRR</span><span style="display:inline-flex; align-items:center; gap:2px; color:var(--color-brand-placeholder-primary-600); font-weight:800; font-size:8px;"><i data-lucide="trending-up" class="lucide-icon" style="width:9px;height:9px;"></i> $14k</span></div>`;
  if (num === 96) return `<div style="display:inline-flex; align-items:center; gap:3px; width:90px; background:rgba(37,99,235,0.06); border:1px solid var(--color-brand-placeholder-primary-600); border-radius:3px; padding:2px 4px; font-size:8px;"><i data-lucide="check-square" class="lucide-icon" style="width:11px;height:11px;color:var(--color-brand-placeholder-primary-600);"></i><span style="font-weight:600;">Selected Row</span></div>`;
  if (num === 97) return `<div style="display:inline-flex; align-items:center; gap:3px; font-size:8px; background:var(--sys-color-surface-sunken); border:1px solid var(--sys-color-border-subtle); border-radius:3px; padding:2px 5px;"><span style="color:var(--sys-color-text-secondary);">1-10</span><span style="display:inline-flex; align-items:center; gap:2px; color:var(--color-brand-placeholder-primary-600); font-weight:700;"><i data-lucide="chevron-left" class="lucide-icon" style="width:9px;height:9px;"></i> 1 2 <i data-lucide="chevron-right" class="lucide-icon" style="width:9px;height:9px;"></i></span></div>`;

  // Distinct Avatars (98-100)
  if (num === 98) return `<div style="width:24px; height:24px; border-radius:50%; background:var(--color-brand-placeholder-primary-600); color:white; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:700;">JD</div>`;
  if (num === 99) return `<div style="width:24px; height:24px; border-radius:6px; background:linear-gradient(135deg,#7C3AED,#EC4899); color:white; display:inline-flex; align-items:center; justify-content:center;"><i data-lucide="sparkles" class="lucide-icon" style="width:12px;height:12px;"></i></div>`;
  if (num === 100) return `<div style="display:inline-flex; margin-left:4px;"><span style="width:18px;height:18px;border-radius:50%;background:#3B82F6;color:white;font-size:8px;display:inline-flex;align-items:center;justify-content:center;margin-left:-4px;">A</span><span style="width:18px;height:18px;border-radius:50%;background:#10B981;color:white;font-size:8px;display:inline-flex;align-items:center;justify-content:center;margin-left:-4px;">B</span></div>`;

  // Distinct KPI Cards (101-104)
  if (num === 101) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:3px 6px; width:85px; box-shadow:var(--shadow-sm);"><div style="font-size:7px; color:var(--sys-color-text-secondary); text-transform:uppercase;">MRR Metric</div><div style="font-weight:800; font-size:10px; font-family:monospace; color:var(--color-brand-placeholder-primary-600);">$128.4k</div><div style="font-size:7px; color:#059669; font-weight:700; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="trending-up" class="lucide-icon" style="width:9px;height:9px;"></i> +14.2%</div></div>`;
  if (num === 102) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:3px 6px; width:90px;"><div style="display:flex; justify-content:space-between; font-size:7px;"><span style="color:var(--sys-color-text-secondary);">Revenue</span><span style="color:#059669; font-weight:700; display:inline-flex; align-items:center; gap:1px;"><i data-lucide="trending-up" class="lucide-icon" style="width:8px;height:8px;"></i> +18%</span></div><svg viewBox="0 0 60 14" style="width:100%; height:12px; margin-top:2px;"><path d="M0 12 Q 15 2, 30 8 T 60 2 L 60 14 L 0 14 Z" fill="rgba(37,99,235,0.15)"/><path d="M0 12 Q 15 2, 30 8 T 60 2" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="1.5"/></svg></div>`;
  if (num === 103) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:3px 6px; width:90px;"><div style="display:flex; justify-content:space-between; font-size:7px;"><span style="color:var(--sys-color-text-secondary);">Target</span><span style="font-weight:700;">84%</span></div><div style="width:100%; height:4px; background:#E2E8F0; border-radius:9999px; margin-top:2px; overflow:hidden;"><div style="width:84%; height:100%; background:#10B981;"></div></div></div>`;
  if (num === 104) return `<div style="background:var(--sys-color-surface-card); border:1px solid var(--sys-color-border-subtle); border-radius:6px; padding:3px 6px; width:90px;"><div style="font-size:7px; color:var(--sys-color-text-secondary);">Daily Traffic</div><div style="display:flex; align-items:flex-end; gap:2px; height:12px; margin-top:2px;"><span style="width:4px; height:5px; background:#93C5FD; border-radius:1px;"></span><span style="width:4px; height:9px; background:#93C5FD; border-radius:1px;"></span><span style="width:4px; height:7px; background:#93C5FD; border-radius:1px;"></span><span style="width:4px; height:12px; background:var(--color-brand-placeholder-primary-600); border-radius:1px;"></span><span style="width:4px; height:10px; background:#93C5FD; border-radius:1px;"></span></div></div>`;
  
  if (num === 105) return `<div style="border:1px solid var(--color-ai-special-accent-primary, #F59E0B); background:rgba(245,158,11,0.06); border-radius:4px; padding:2px 5px; font-size:8px; color:#B45309; font-weight:700; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="trending-up" class="lucide-icon" style="width:10px;height:10px;"></i> Anomaly Spike</div>`;
  if (num === 106) return `<div style="border:1px solid var(--sys-color-border-default); border-radius:4px; padding:2px 6px; font-size:9px; font-weight:700; background:var(--sys-color-surface-card); display:inline-flex; align-items:center; gap:3px;"><i data-lucide="search" class="lucide-icon" style="width:10px;height:10px;"></i> Diagnostic Modal</div>`;
  if (num === 107) return `<div style="display:inline-flex; flex-direction:column; gap:2px; font-size:8px; border:1px solid var(--sys-color-border-subtle); padding:2px 4px; border-radius:4px; width:85px; background:var(--sys-color-surface-sunken);"><span style="font-weight:700;">us-east-1a (18ms)</span><span style="color:var(--sys-color-text-secondary);">CPU 38%</span></div>`;

  // Gen AI Interfaces (108-112)
  if (num === 108) return `<div style="border:1px solid var(--color-brand-placeholder-primary-600); border-radius:6px; padding:2px 6px; font-size:9px; display:inline-flex; align-items:center; gap:3px; background:var(--sys-color-surface-card);"><i data-lucide="sparkles" class="lucide-icon" style="width:10px;height:10px;color:#7C3AED;"></i><span>Prompt...</span></div>`;
  if (num === 109) return `<div style="background:var(--sys-color-surface-sunken); border-radius:4px; padding:2px 5px; font-size:8px; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="brain" class="lucide-icon" style="width:10px;height:10px;color:#6366F1;"></i><span>Reasoning (4s)</span><i data-lucide="chevron-down" class="lucide-icon" style="width:9px;height:9px;"></i></div>`;
  if (num === 110) return `<div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(236,72,153,0.08)); border:1px solid #C084FC; border-radius:6px; padding:3px 6px; font-size:8px; font-weight:600; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="sparkles" class="lucide-icon" style="width:10px;height:10px;color:#7C3AED;"></i> Compound AI Card</div>`;
  if (num === 111) return `<div style="display:inline-flex; gap:3px; font-size:9px; font-family:monospace; background:var(--sys-color-surface-sunken); padding:2px 4px; border-radius:3px;"><span style="color:#EF4444; text-decoration:line-through;">-old</span><span style="color:#10B981; font-weight:700;">+new</span></div>`;
  if (num === 112) return `<div style="border:1px solid #F59E0B; background:#FFFBEB; border-radius:4px; padding:2px 5px; font-size:8px; color:#92400E; font-weight:600; display:inline-flex; align-items:center; gap:3px;"><i data-lucide="message-square" class="lucide-icon" style="width:10px;height:10px;"></i> Feedback Modal</div>`;

  return `<div style="padding:2px 6px; font-size:10px; background:var(--sys-color-surface-sunken); border-radius:4px;">${c.name}</div>`;
}

export function generateMasterCatalogHTML() {
  const tableRows = ALL_112_COMPONENTS.map(c => {
    const rawApi = c.api.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    const escapedAttrCode = rawApi.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `
    <tr class="comp-matrix-row" data-cat="${c.cat}" data-name="${c.name.toLowerCase()}" data-keywords="${getComponentKeywords(c)}" style="border-bottom: 1px solid var(--sys-color-border-subtle); transition: background 0.15s ease;">
      <td style="padding: 12px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); font-family: monospace; font-size: 12px;">${c.num}</td>
      <td style="padding: 12px;">
        <div style="font-weight: 700; font-size: 13px; color: var(--sys-color-text-primary);">${c.name}</div>
        <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 2px; line-height: 1.4;">${c.desc}</div>
      </td>
      <td style="padding: 12px; vertical-align: middle;">
        <div class="live-specimen-slot" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 8px; padding: 6px 10px; display: inline-flex; align-items: center; justify-content: center; min-height: 38px; min-width: 90px;">
          ${getComponentLiveSpecimen(c)}
        </div>
      </td>
      <td style="padding: 12px;">
        <span class="badge" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); font-size: 10px; font-weight: 600; white-space: nowrap;">${c.cat}</span>
      </td>
      <td style="padding: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <code style="font-family: monospace; font-size: 11px; background: rgba(37,99,235,0.08); color: var(--color-brand-placeholder-primary-600); padding: 4px 8px; border-radius: 6px; display: inline-block; word-break: break-all;">${c.api.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
          <button class="btn btn-outline copy-matrix-code-btn" data-code="${escapedAttrCode}" data-name="${c.name}" onclick="copyComponentCode(this)" title="Copy React code snippet" style="font-size: 11px; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; cursor: pointer;">
            <i data-lucide="copy" class="lucide-icon" style="width:12px; height:12px;"></i> Copy
          </button>
        </div>
      </td>
      <td style="padding: 12px; font-size: 11px; color: var(--sys-color-text-secondary); line-height: 1.4;">${c.device}</td>
      <td style="padding: 12px; text-align: right;">
        <button class="btn btn-outline" onclick="openComponentDetailModal('${c.num}')" style="font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 600; white-space: nowrap;" title="Inspect component in detail modal">
          <i data-lucide="eye" class="lucide-icon" style="width:12px; height:12px;"></i> Inspect
        </button>
      </td>
    </tr>
  `;
  }).join('');

  return `        <div id="view-atomic-suite" style="display: none; flex-direction: column; gap: 32px;">

          <!-- Catalog Header & Archetype Switcher -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid var(--sys-color-border-subtle); padding-bottom: 20px;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; background: rgba(37, 99, 235, 0.1); color: var(--color-brand-placeholder-primary-600); font-size: 11px; font-weight: 700; margin-bottom: 8px;">
                <i data-lucide="layers" class="lucide-icon" style="width: 13px; height: 13px;"></i> BRAD FROST ATOMIC ARCHITECTURE • 112 COMPONENTS
              </div>
              <h2 style="font-size: 26px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 6px 0;">Exhaustive Enterprise Component Catalog</h2>
              <p style="font-size: 13px; color: var(--sys-color-text-secondary); max-width: 840px; margin: 0;">
                Complete visual inventory matching our 5-Layer Cross-Platform Architecture: Foundations, Layout & Navigation, Action & Inputs, Data Display, Feedback & Overlays, Multimodal Gen AI Organisms, and Responsive Metamorphosis.
              </p>
            </div>

            <!-- Archetype Quick Switcher -->
            <div style="display: flex; align-items: center; gap: 8px; background: var(--sys-color-surface-sunken); padding: 6px 12px; border-radius: 12px; border: 1px solid var(--sys-color-border-subtle);">
              <span style="font-size: 12px; font-weight: 700; color: var(--sys-color-text-secondary);">Brand Archetype:</span>
              <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="applyArchetypePreset('neobrutalist')">
                Neobrutalist (24px)
              </button>
              <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="applyArchetypePreset('corporate')">
                Corporate (6px)
              </button>
              <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="applyArchetypePreset('modern-saas')">
                Modern SaaS (16px)
              </button>
            </div>
          </div>

          <!-- Quick Navigation Jump Ribbon -->
          <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 12px; border-bottom: 1px solid var(--sys-color-border-subtle);">
            <a href="#cat-foundations" class="control-pill active" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">1. Foundations</a>
            <a href="#cat-layout" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">2. Layout & Nav</a>
            <a href="#cat-inputs" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">3. Actions & Inputs</a>
            <a href="#cat-data" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">4. Data Display</a>
            <a href="#cat-feedback" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">5. Feedback & Overlays</a>
            <a href="#cat-genai" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">6. Gen AI Organisms</a>
            <a href="#cat-responsive" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap;">7. Multi-Device Suite</a>
            <a href="#cat-all-112" class="control-pill" style="text-decoration: none; font-size: 12px; padding: 6px 12px; white-space: nowrap; background: rgba(37,99,235,0.15); color: var(--color-brand-placeholder-primary-600); font-weight: 700;">8. All 112 Matrix Directory</a>
          </div>

          <!-- SECTION 1: FOUNDATIONS -->
          <section id="cat-foundations" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="palette" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 1. Foundations & Design Tokens
              </h3>
              <span class="badge badge-primary">W3C DTCG Standard</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 20px;">
              Tokens govern color ramps (50–950), fluid typography, elevation shadows, spatial scales, and numeric tabular guarantees across all viewports.
            </p>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                1.1 Semantic Color Ramps & Specialty Palettes
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
                <div style="padding: 12px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                  <div style="height: 36px; border-radius: 6px; background: var(--color-brand-placeholder-primary-600); margin-bottom: 8px;"></div>
                  <div style="font-weight: 700; font-size: 13px;">Primary Brand (600)</div>
                  <div style="font-size: 11px; color: var(--sys-color-text-secondary); font-family: monospace;">var(--color-brand-primary-600)</div>
                </div>
                <div style="padding: 12px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                  <div style="height: 36px; border-radius: 6px; background: #059669; margin-bottom: 8px;"></div>
                  <div style="font-weight: 700; font-size: 13px;">Success Status</div>
                  <div style="font-size: 11px; color: var(--sys-color-text-secondary); font-family: monospace;">#059669 (WCAG AA 4.8:1)</div>
                </div>
                <div style="padding: 12px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                  <div style="height: 36px; border-radius: 6px; background: #DC2626; margin-bottom: 8px;"></div>
                  <div style="font-weight: 700; font-size: 13px;">Danger / Incident</div>
                  <div style="font-size: 11px; color: var(--sys-color-text-secondary); font-family: monospace;">#DC2626 (Error Baseline)</div>
                </div>
                <div style="padding: 12px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                  <div style="height: 36px; border-radius: 6px; background: #D97706; margin-bottom: 8px;"></div>
                  <div style="font-weight: 700; font-size: 13px;">Warning Alert</div>
                  <div style="font-size: 11px; color: var(--sys-color-text-secondary); font-family: monospace;">#D97706 (Amber Alert)</div>
                </div>
                <div style="padding: 12px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                  <div style="height: 36px; border-radius: 6px; background: linear-gradient(135deg, #7C3AED, #EC4899); margin-bottom: 8px;"></div>
                  <div style="font-weight: 700; font-size: 13px;">Gen AI Specialty Aura</div>
                  <div style="font-size: 11px; color: var(--sys-color-text-secondary); font-family: monospace;">Violet ⇄ Pink Gradient</div>
                </div>
              </div>
            </div>

            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                1.2 Typography Hierarchy & Tabular Numeric Guarantee
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: var(--sys-color-surface-sunken); border-radius: 8px; padding: 16px; border: 1px solid var(--sys-color-border-subtle); display: flex; flex-direction: column; gap: 8px;">
                  <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Display Heading (24px/800)</div>
                  <div style="font-size: 18px; font-weight: 700;">Section Heading H1 (18px/700)</div>
                  <div style="font-size: 15px; font-weight: 600;">Subsection Header H2 (15px/600)</div>
                  <div style="font-size: 13px; color: var(--sys-color-text-secondary); line-height: 1.5;">Body copy: Crisp, legible Inter/Plus Jakarta Sans with strict WCAG 2.2 AA contrast.</div>
                  <div style="font-size: 11px; font-family: monospace; color: var(--sys-color-text-tertiary);">Caption/Code: 11px Monospace for tokens & metrics</div>
                </div>

                <div style="background: var(--sys-color-surface-sunken); border-radius: 8px; padding: 16px; border: 1px solid var(--sys-color-border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-weight: 700; font-size: 13px;">Live Tabular Figure Stability</span>
                      <span class="badge badge-success" id="atomic-live-ticker">0.00s</span>
                    </div>
                    <p style="font-size: 12px; color: var(--sys-color-text-secondary); margin: 0 0 12px 0;">
                      Tabular numbers eliminate horizontal jitter during real-time streaming:
                    </p>
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div style="padding: 10px; background: var(--sys-color-surface-card); border-radius: 6px; border: 1px dashed #EF4444;">
                      <div style="font-size: 10px; font-weight: 700; color: #EF4444; margin-bottom: 4px;">❌ Proportional (Jitters)</div>
                      <div id="atomic-prop-num" style="font-size: 16px; font-weight: 700;">$4,892,150.24</div>
                    </div>
                    <div style="padding: 10px; background: var(--sys-color-surface-card); border-radius: 6px; border: 2px solid #059669;">
                      <div style="font-size: 10px; font-weight: 700; color: #059669; margin-bottom: 4px;">✅ Tabular Enforced</div>
                      <div id="atomic-tab-num" style="font-size: 16px; font-weight: 700; font-family: monospace; font-variant-numeric: tabular-nums;">$4,892,150.24</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 2: LAYOUT & NAVIGATION -->
          <section id="cat-layout" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="layout" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 2. Layout & Navigation Components
              </h3>
              <span class="badge badge-primary">Desktop, Tablet & Phone Ready</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 20px;">
              Cross-platform structural navigation: Persistent Sidebar (Desktop), Vertical Rail (Tablet), Bottom Navigation (Phone), Top App Bar, Hamburger Drawer, and Tab bars.
            </p>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                2.1 Top Application Bar (Header)
              </div>
              <header style="background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 10px; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <button style="background: none; border: 1px solid var(--sys-color-border-subtle); border-radius: 6px; padding: 6px; cursor: pointer; display: flex; align-items: center;">
                    <i data-lucide="menu" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                  </button>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 28px; height: 28px; border-radius: 6px; background: var(--color-brand-placeholder-primary-600); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">E</div>
                    <span style="font-weight: 700; font-size: 14px;">Enterprise Console</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="position: relative; display: flex; align-items: center; width: 220px;">
                    <i data-lucide="search" class="lucide-icon" style="position: absolute; left: 10px; width: 14px; height: 14px; color: var(--sys-color-text-tertiary);"></i>
                    <input type="text" class="text-input" placeholder="Quick search..." style="padding-left: 32px; padding-right: 46px; height: 32px; font-size: 12px;">
                    <span style="position: absolute; right: 8px; font-size: 10px; padding: 1px 4px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 4px; font-family: monospace;">⌘K</span>
                  </div>
                  <button style="position: relative; background: none; border: 1px solid var(--sys-color-border-subtle); border-radius: 6px; padding: 6px; cursor: pointer;">
                    <i data-lucide="bell" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    <span style="position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; border-radius: 50%; background: #EF4444;"></span>
                  </button>
                  <div class="user-avatar" style="width: 30px; height: 30px; font-size: 12px;">JD</div>
                </div>
              </header>
            </div>

            <div style="display: grid; grid-template-columns: 80px 240px 1fr; gap: 20px; margin-bottom: 24px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Tablet Rail</div>
                <div style="width: 64px; background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 12px 0; display: flex; flex-direction: column; align-items: center; gap: 14px; box-shadow: var(--shadow-sm);">
                  <div style="width: 40px; height: 40px; border-radius: 12px; background: var(--color-brand-placeholder-primary-600); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(37,99,235,0.3);">
                    <i data-lucide="plus" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                  </div>
                  <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; cursor: pointer;">
                    <i data-lucide="layout-dashboard" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                  </div>
                  <div style="width: 44px; height: 44px; border-radius: 10px; color: var(--sys-color-text-secondary); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10px; cursor: pointer;">
                    <i data-lucide="database" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                  </div>
                  <div style="width: 44px; height: 44px; border-radius: 10px; color: var(--sys-color-text-secondary); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10px; cursor: pointer;">
                    <i data-lucide="bot" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                  </div>
                </div>
              </div>

              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Desktop Sidebar</div>
                <div style="background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 8px; box-shadow: var(--shadow-sm);">
                  <div style="font-size: 10px; font-weight: 700; color: var(--sys-color-text-secondary); text-transform: uppercase; padding: 0 8px;">Main Menu</div>
                  <div style="padding: 8px 12px; border-radius: 6px; background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: space-between;">
                    <span style="display: flex; align-items: center; gap: 8px;"><i data-lucide="layout-dashboard" class="lucide-icon" style="width: 14px; height: 14px;"></i> Overview</span>
                    <span class="badge badge-primary" style="font-size: 9px; padding: 1px 6px;">LIVE</span>
                  </div>
                  <div style="padding: 8px 12px; border-radius: 6px; color: var(--sys-color-text-secondary); font-size: 12px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="database" class="lucide-icon" style="width: 14px; height: 14px;"></i> Telemetry Stream
                  </div>
                  <div style="padding: 8px 12px; border-radius: 6px; color: var(--sys-color-text-secondary); font-size: 12px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="bot" class="lucide-icon" style="width: 14px; height: 14px;"></i> Gen AI Copilot
                  </div>
                  <div style="padding: 8px 12px; border-radius: 6px; color: var(--sys-color-text-secondary); font-size: 12px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="settings" class="lucide-icon" style="width: 14px; height: 14px;"></i> System Policies
                  </div>
                </div>
              </div>

              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Phone Bottom Navigation (64px Thumb Reach)</div>
                <div style="background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 12px 16px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: center; min-height: 140px;">
                  <div style="font-size: 12px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                    Fixed to phone bottom; provides 44px+ hit targets across primary app tabs:
                  </div>
                  <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; background: var(--sys-color-surface-sunken); height: 56px; display: flex; align-items: center; justify-content: space-around; padding: 0 8px;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--color-brand-placeholder-primary-600); font-size: 10px; font-weight: 700; min-width: 44px; min-height: 44px; justify-content: center;">
                      <i data-lucide="layout-dashboard" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                      <span>Home</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                      <i data-lucide="database" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                      <span>Data</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                      <i data-lucide="bot" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                      <span>AI</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                      <i data-lucide="user" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                      <span>Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Tabs Variants (Underline & Pill)</div>
                <div style="display: flex; gap: 16px; border-bottom: 2px solid var(--sys-color-border-subtle); margin-bottom: 12px;">
                  <button style="background: none; border: none; padding: 6px 0; font-size: 13px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); border-bottom: 2px solid var(--color-brand-placeholder-primary-600); margin-bottom: -2px; cursor: pointer;">
                    Overview
                  </button>
                  <button style="background: none; border: none; padding: 6px 0; font-size: 13px; font-weight: 500; color: var(--sys-color-text-secondary); cursor: pointer;">
                    Telemetry
                  </button>
                  <button style="background: none; border: none; padding: 6px 0; font-size: 13px; font-weight: 500; color: var(--sys-color-text-secondary); cursor: pointer;">
                    Policies
                  </button>
                </div>
                <div class="control-pill-group">
                  <button class="control-pill active">Segmented Tab 1</button>
                  <button class="control-pill">Segmented Tab 2</button>
                  <button class="control-pill">Segmented Tab 3</button>
                </div>
              </div>

              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Breadcrumb Trail & Pagination</div>
                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--sys-color-text-secondary); margin-bottom: 16px;">
                  <span>Infrastructure</span>
                  <i data-lucide="chevron-right" class="lucide-icon" style="width: 12px; height: 12px;"></i>
                  <span>US-East Clusters</span>
                  <i data-lucide="chevron-right" class="lucide-icon" style="width: 12px; height: 12px;"></i>
                  <span style="font-weight: 700; color: var(--sys-color-text-primary);">Node 04</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
                  <span style="color: var(--sys-color-text-secondary);">Showing 1–10 of 148</span>
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <button class="btn btn-outline" style="padding: 2px 8px; height: 28px;">&lt;</button>
                    <button class="btn btn-primary" style="padding: 2px 8px; height: 28px; min-width: 28px;">1</button>
                    <button class="btn btn-outline" style="padding: 2px 8px; height: 28px; min-width: 28px;">2</button>
                    <button class="btn btn-outline" style="padding: 2px 8px; height: 28px; min-width: 28px;">3</button>
                    <span>...</span>
                    <button class="btn btn-outline" style="padding: 2px 8px; height: 28px; min-width: 28px;">15</button>
                    <button class="btn btn-outline" style="padding: 2px 8px; height: 28px;">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 3: ACTIONS & INPUTS -->
          <section id="cat-inputs" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="mouse-pointer-click" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 3. Action & Input Components (Forms & Controls)
              </h3>
              <span class="badge badge-primary">Touch & Pointer Standard</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 20px;">
              Comprehensive input system: Buttons (6 variants, 3 sizes), Floating Action Buttons (FABs), Selection Controls, Continuous/Stepped Sliders, Stepper Wizards, and Date/Time pickers.
            </p>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                3.1 Button Hierarchy & Floating Action Buttons (FAB)
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 14px;">
                <button class="btn btn-primary"><i data-lucide="check" class="lucide-icon"></i> Primary (High Emphasis)</button>
                <button class="btn btn-secondary">Secondary (Tonal)</button>
                <button class="btn btn-outline">Outlined (Medium Emphasis)</button>
                <button class="btn" style="background: transparent; color: var(--sys-color-text-secondary); border: none;">Text / Ghost</button>
                <button class="btn" style="background: #FEF2F2; color: #991B1B; border: 1px solid #FCA5A5;">Destructive</button>
                <button class="btn btn-ai"><i data-lucide="sparkles" class="lucide-icon"></i> AI Specialty Action</button>
                <button class="btn btn-primary" disabled style="opacity: 0.5; cursor: not-allowed;">Disabled Button</button>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
                <button class="btn btn-primary" style="height: 32px; padding: 4px 10px; font-size: 11px;">Small (32px)</button>
                <button class="btn btn-primary" style="height: 40px; padding: 8px 16px; font-size: 13px;">Medium (40px)</button>
                <button class="btn btn-primary" style="height: 48px; padding: 12px 24px; font-size: 15px;">Large (48px Touch)</button>
                
                <div style="height: 24px; width: 1px; background: var(--sys-color-border-default); margin: 0 4px;"></div>
                <button style="width: 40px; height: 40px; border-radius: 12px; background: var(--color-brand-placeholder-primary-600); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow-md);" title="Small FAB">
                  <i data-lucide="plus" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                </button>
                <button style="padding: 10px 18px; border-radius: 16px; background: var(--color-brand-placeholder-primary-600); color: white; border: none; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: var(--shadow-md);" title="Extended FAB">
                  <i data-lucide="plus" class="lucide-icon" style="width: 16px; height: 16px;"></i> Extended FAB
                </button>
                <button class="btn-send-icon" style="width: 40px; height: 40px;" title="Circular Action">
                  <i data-lucide="send" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                </button>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                3.2 Text Fields, Validation States & Search
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
                <div>
                  <label class="field-label" style="margin-bottom: 6px;">Standard Input with Helper</label>
                  <input type="text" class="text-input" placeholder="e.g. Production Cluster" value="Acme Cloud Platform">
                  <span style="font-size: 11px; color: var(--sys-color-text-tertiary); margin-top: 4px; display: block;">Primary domain identity</span>
                </div>
                <div>
                  <label class="field-label" style="margin-bottom: 6px;">Error State Validation</label>
                  <input type="text" class="text-input" value="192.168.0.999" style="border-color: #EF4444; background: #FEF2F2; color: #991B1B;">
                  <span style="font-size: 11px; color: #EF4444; margin-top: 4px; display: block;">✕ Invalid IPv4 address format</span>
                </div>
                <div>
                  <label class="field-label" style="margin-bottom: 6px;">Search with Keyboard Shortcut</label>
                  <div style="position: relative; display: flex; align-items: center;">
                    <i data-lucide="search" class="lucide-icon" style="position: absolute; left: 12px; color: var(--sys-color-text-tertiary);"></i>
                    <input type="text" class="text-input" placeholder="Filter entities..." style="padding-left: 36px; padding-right: 50px;">
                    <span style="position: absolute; right: 10px; font-size: 10px; padding: 2px 6px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 4px; font-family: monospace;">⌘K</span>
                  </div>
                </div>
                <div>
                  <label class="field-label" style="margin-bottom: 6px;">Date Picker Field</label>
                  <div style="position: relative; display: flex; align-items: center;">
                    <i data-lucide="calendar" class="lucide-icon" style="position: absolute; left: 12px; color: var(--sys-color-text-tertiary);"></i>
                    <input type="text" class="text-input" value="2026-11-09 (Q3 Review)" style="padding-left: 36px;">
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                3.3 Selection Controls (Checkboxes, Radios, Switches & Segmented Pills)
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px;">Checkboxes</div>
                  <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <input type="checkbox" checked style="accent-color: var(--color-brand-placeholder-primary-600); width: 16px; height: 16px;"> Checked State
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <input type="checkbox" style="width: 16px; height: 16px;"> Unchecked State
                    </label>
                  </div>
                </div>

                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px;">Radio Buttons</div>
                  <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <input type="radio" name="demo-radio" checked style="accent-color: var(--color-brand-placeholder-primary-600); width: 16px; height: 16px;"> Standalone (Primary)
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <input type="radio" name="demo-radio" style="width: 16px; height: 16px;"> Clustered Replica
                    </label>
                  </div>
                </div>

                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px;">Toggle Switch</div>
                  <div style="display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                    <input type="checkbox" id="demo-toggle-switch" checked style="width: 18px; height: 18px; accent-color: var(--color-brand-placeholder-primary-600); cursor: pointer;">
                    <label for="demo-toggle-switch" style="font-size: 13px; font-weight: 500; cursor: pointer;">Live WebSockets</label>
                  </div>
                </div>

                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px;">Segmented Control</div>
                  <div class="control-pill-group" style="margin-top: 4px;">
                    <button class="control-pill active" style="font-size: 11px; padding: 4px 8px;">Auto</button>
                    <button class="control-pill" style="font-size: 11px; padding: 4px 8px;">Manual</button>
                    <button class="control-pill" style="font-size: 11px; padding: 4px 8px;">AI Sync</button>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary);">Continuous Slider</span>
                  <span style="font-family: monospace; font-weight: 700; font-size: 12px;" id="cat-slider-num">75%</span>
                </div>
                <input type="range" min="0" max="100" value="75" oninput="document.getElementById('cat-slider-num').textContent = this.value + '%'" style="width: 100%; accent-color: var(--color-brand-placeholder-primary-600); min-height: 36px; cursor: pointer;">
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--sys-color-text-tertiary);">
                  <span>0% (Minimum)</span>
                  <span>50%</span>
                  <span>100% (Maximum)</span>
                </div>
              </div>

              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 12px;">Stepper Wizard (Flow)</div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <div style="width: 22px; height: 22px; border-radius: 50%; background: #059669; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">✓</div>
                    <span style="font-size: 12px; font-weight: 600;">Plan</span>
                  </div>
                  <div style="flex: 1; height: 2px; background: #059669; margin: 0 8px;"></div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <div style="width: 22px; height: 22px; border-radius: 50%; background: var(--color-brand-placeholder-primary-600); color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</div>
                    <span style="font-size: 12px; font-weight: 700;">Build</span>
                  </div>
                  <div style="flex: 1; height: 2px; background: var(--sys-color-border-subtle); margin: 0 8px;"></div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <div style="width: 22px; height: 22px; border-radius: 50%; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-default); color: var(--sys-color-text-tertiary); display: flex; align-items: center; justify-content: center; font-size: 11px;">3</div>
                    <span style="font-size: 12px; color: var(--sys-color-text-tertiary);">Deploy</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 4: DATA DISPLAY & CONTENT -->
          <section id="cat-data" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="table" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 4. Data Display & Content Components
              </h3>
              <span class="badge badge-primary">High-Density & Tabular Standard</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 20px;">
              Standardized 184px KPI Cards, Cartesian Time-Series Charts with Header Anomaly Triggers, High-Density Data Tables, Single/Two/Three-line List Items, Chips, Badges, and Avatars.
            </p>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                4.1 Standardized 184px KPI Cards (Strict Vertical Rhythm & 48px Viz Slot)
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                <div class="kpi-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span class="kpi-label">NET REVENUE (Q3)</span>
                      <i data-lucide="info" class="lucide-icon" style="width: 14px; height: 14px; color: var(--sys-color-text-tertiary);"></i>
                    </div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span class="kpi-value" style="font-size: 22px;">$4,892,150</span>
                      <span class="badge badge-success" style="font-size: 11px;">▲ +14.2%</span>
                    </div>
                  </div>
                  <div style="height: 48px; width: 100%; margin-top: 10px;">
                    <svg viewBox="0 0 100 40" style="width: 100%; height: 100%; overflow: visible;">
                      <path d="M 0 35 Q 25 15, 50 25 T 100 5" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="2.5" />
                      <path d="M 0 35 Q 25 15, 50 25 T 100 5 L 100 40 L 0 40 Z" fill="rgba(37,99,235,0.12)" />
                    </svg>
                  </div>
                </div>

                <div class="kpi-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span class="kpi-label">API CONVERSION</span>
                      <span class="badge badge-primary" style="font-size: 10px;">MONTHLY</span>
                    </div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span class="kpi-value" style="font-size: 22px;">4.82%</span>
                      <span class="badge badge-success" style="font-size: 11px;">▲ +0.6%</span>
                    </div>
                  </div>
                  <div style="height: 48px; display: flex; align-items: flex-end; gap: 6px; padding-top: 10px;">
                    <div style="flex: 1; height: 35%; background: var(--sys-color-border-default); border-radius: 2px;"></div>
                    <div style="flex: 1; height: 50%; background: var(--sys-color-border-default); border-radius: 2px;"></div>
                    <div style="flex: 1; height: 40%; background: var(--sys-color-border-default); border-radius: 2px;"></div>
                    <div style="flex: 1; height: 75%; background: var(--color-brand-placeholder-primary-600); border-radius: 2px;"></div>
                    <div style="flex: 1; height: 90%; background: var(--color-brand-placeholder-primary-600); border-radius: 2px;"></div>
                  </div>
                </div>

                <div class="kpi-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span class="kpi-label">SLA AVAILABILITY</span>
                      <span class="badge badge-success" style="font-size: 10px;">99.98%</span>
                    </div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span class="kpi-value" style="font-size: 22px;">Operational</span>
                    </div>
                  </div>
                  <div style="display: flex; gap: 4px; padding-top: 18px;">
                    <div style="flex: 1; height: 24px; background: #059669; border-radius: 2px;"></div>
                    <div style="flex: 1; height: 24px; background: #059669; border-radius: 2px;"></div>
                    <div style="flex: 1; height: 24px; background: #059669; border-radius: 2px;"></div>
                    <div style="flex: 1; height: 24px; background: #D97706; border-radius: 2px;" title="Degraded"></div>
                    <div style="flex: 1; height: 24px; background: #059669; border-radius: 2px;"></div>
                    <div style="flex: 1; height: 24px; background: #059669; border-radius: 2px;"></div>
                  </div>
                </div>

                <div class="kpi-card" style="min-height: 184px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span class="kpi-label">ANNUAL TARGET</span>
                      <span style="font-size: 11px; font-weight: 700; color: var(--color-brand-placeholder-primary-600);">82% Achieved</span>
                    </div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span class="kpi-value" style="font-size: 22px;">$5.9M / $7.2M</span>
                    </div>
                  </div>
                  <div style="padding-top: 14px;">
                    <div style="height: 8px; background: var(--sys-color-surface-sunken); border-radius: 9999px; overflow: hidden; border: 1px solid var(--sys-color-border-subtle);">
                      <div style="width: 82%; height: 100%; background: var(--color-brand-placeholder-primary-600); border-radius: 9999px;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 6px;">
                      <span>Q1-Q3 Elapsed</span>
                      <span>$1.3M Remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 24px;">
              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary);">High-Density Data Grid (32px Compact)</span>
                  <span class="badge badge-primary">Sorted by MRR</span>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-variant-numeric: tabular-nums;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--sys-color-border-default); color: var(--sys-color-text-secondary); text-align: left;">
                      <th style="padding: 6px 8px;"><input type="checkbox"></th>
                      <th style="padding: 6px 8px;">Account</th>
                      <th style="padding: 6px 8px;">Tier</th>
                      <th style="padding: 6px 8px; text-align: right;">MRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--sys-color-border-subtle);">
                      <td style="padding: 6px 8px;"><input type="checkbox" checked></td>
                      <td style="padding: 6px 8px; font-weight: 600;">Acme Logistics</td>
                      <td style="padding: 6px 8px;"><span class="badge badge-success" style="font-size: 10px;">Enterprise</span></td>
                      <td style="padding: 6px 8px; text-align: right; font-weight: 700;">$42,850</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--sys-color-border-subtle);">
                      <td style="padding: 6px 8px;"><input type="checkbox"></td>
                      <td style="padding: 6px 8px; font-weight: 600;">Starlight Media</td>
                      <td style="padding: 6px 8px;"><span class="badge badge-primary" style="font-size: 10px;">Growth</span></td>
                      <td style="padding: 6px 8px; text-align: right; font-weight: 700;">$18,400</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 8px;"><input type="checkbox"></td>
                      <td style="padding: 6px 8px; font-weight: 600;">Apex Healthcare</td>
                      <td style="padding: 6px 8px;"><span class="badge badge-success" style="font-size: 10px;">Enterprise</span></td>
                      <td style="padding: 6px 8px; text-align: right; font-weight: 700;">$64,120</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 10px;">
                  List Items (1-Line, 2-Line & 3-Line Slots)
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; background: var(--sys-color-surface-sunken); font-size: 12px;">
                    <span style="display: flex; align-items: center; gap: 8px;"><i data-lucide="shield" class="lucide-icon" style="width: 14px; height: 14px;"></i> Security Compliance</span>
                    <i data-lucide="chevron-right" class="lucide-icon" style="width: 12px; height: 12px; color: var(--sys-color-text-tertiary);"></i>
                  </div>
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 6px; border: 1px solid var(--sys-color-border-subtle);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div class="user-avatar" style="width: 28px; height: 28px; font-size: 11px;">SK</div>
                      <div>
                        <div style="font-size: 12px; font-weight: 600;">Sarah Koenig</div>
                        <div style="font-size: 10px; color: var(--sys-color-text-secondary);">Lead Infrastructure Engineer</div>
                      </div>
                    </div>
                    <span class="badge badge-success" style="font-size: 9px;">ACTIVE</span>
                  </div>
                  <div style="padding: 8px; border-radius: 6px; border: 1px solid var(--sys-color-border-subtle); background: var(--sys-color-surface-card);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 12px; font-weight: 700;">Cluster Rebalance Alert</span>
                      <span style="font-size: 10px; color: var(--sys-color-text-tertiary);">2m ago</span>
                    </div>
                    <div style="font-size: 11px; color: var(--sys-color-text-secondary); margin: 2px 0;">
                      Automated scaling agent shifted 4,200 connections to Frankfurt zone.
                    </div>
                    <div style="display: flex; gap: 6px; margin-top: 4px;">
                      <span class="badge badge-primary" style="font-size: 9px;">P90 Safe</span>
                      <span style="font-size: 10px; color: var(--color-brand-placeholder-primary-600); cursor: pointer; font-weight: 600;">Inspect logs &rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Chips & Tags</div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button class="eds-chip active" style="padding: 4px 10px; border-radius: 9999px; border: 1px solid var(--color-brand-placeholder-primary-600); background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="check" class="lucide-icon" style="width: 11px; height: 11px;"></i> Filter Active
                  </button>
                  <button class="eds-chip" style="padding: 4px 10px; border-radius: 9999px; border: 1px solid var(--sys-color-border-default); background: var(--sys-color-surface-sunken); font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                    <span>Removable</span> <span style="font-weight: 700;">&times;</span>
                  </button>
                  <button class="eds-chip" style="padding: 4px 10px; border-radius: 9999px; border: 1px solid var(--sys-color-border-default); background: var(--sys-color-surface-sunken); font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="sparkles" class="lucide-icon" style="width: 11px; height: 11px; color: #D97706;"></i> Suggestion
                  </button>
                </div>
              </div>

              <div>
                <div style="font-size: 11px; font-weight: 700; color: var(--sys-color-text-secondary); margin-bottom: 8px; text-transform: uppercase;">Avatar Stack</div>
                <div style="display: flex; align-items: center;">
                  <div class="user-avatar" style="width: 28px; height: 28px; font-size: 10px; border: 2px solid white; margin-right: -8px;">JD</div>
                  <div class="user-avatar" style="width: 28px; height: 28px; font-size: 10px; border: 2px solid white; margin-right: -8px; background: #7C3AED;">SK</div>
                  <div class="user-avatar" style="width: 28px; height: 28px; font-size: 10px; border: 2px solid white; margin-right: -8px; background: #059669;">AL</div>
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--sys-color-surface-sunken); border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: var(--sys-color-text-secondary);">+4</div>
                </div>
              </div>
            </div>
          </section>

                    <!-- SECTION 5: FEEDBACK & OVERLAYS -->
          <section id="cat-feedback" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="bell" class="lucide-icon" style="color: var(--color-brand-placeholder-primary-600);"></i> 5. Feedback, Pop-ups & Overlay Components
              </h3>
              <span class="badge badge-primary">Accessible Overlays</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 24px;">
              Complete overlay suite: Dismissible Alert Boxes across 4 semantic variants, Contextual Pop-ups & Popovers, Confirmation Pop-up Modals, Adaptive Dialogs, Snackbars/Toasts, and Progress Loaders.
            </p>

            <!-- 1. ALERT BOXES SHOWCASE (4 SEMANTIC VARIANTS) -->
            <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 24px; background: var(--sys-color-surface-sunken);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">Alert Boxes (All 4 Semantic Variants)</span>
                  <span class="badge" style="background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); font-size: 10px;">Interactive Dismissible</span>
                </div>
                <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="resetAlerts()">
                  ↺ Reset Dismissed Alerts
                </button>
              </div>

              <div style="display: flex; flex-direction: column; gap: 12px;" id="alert-boxes-container">
                <!-- Info Alert Box -->
                <div id="demo-alert-info" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; font-size: 13px;">
                  <i data-lucide="info" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #2563EB; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">System Scheduled Maintenance (Info Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Transatlantic cluster re-indexing scheduled for 02:00 UTC. Zero downtime expected.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #BFDBFE; color: #1E40AF;" onclick="showToast('Maintenance schedule: 02:00 - 02:30 UTC')">Details</button>
                  <button onclick="dismissAlert('demo-alert-info')" style="background: none; border: none; font-size: 16px; color: #1E40AF; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Success Alert Box -->
                <div id="demo-alert-success" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 13px;">
                  <i data-lucide="check-circle" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #10B981; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">All 112 Components Verified & Active (Success Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Complete Material-level component directory active with 100% W3C DTCG token fidelity.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #A7F3D0; color: #065F46;" onclick="showToast('Audit complete: 0 warnings, 112 passed')">View Audit</button>
                  <button onclick="dismissAlert('demo-alert-success')" style="background: none; border: none; font-size: 16px; color: #065F46; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Warning Alert Box -->
                <div id="demo-alert-warning" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; font-size: 13px;">
                  <i data-lucide="alert-triangle" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #F59E0B; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">High Memory Utilization Threshold (Warning Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Telemetry threshold exceeded 85% capacity. Auto-scaling pod provisioning in progress.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #FDE68A; color: #92400E;" onclick="showToast('Auto-scaler provisioning 2 additional nodes')">Scale Now</button>
                  <button onclick="dismissAlert('demo-alert-warning')" style="background: none; border: none; font-size: 16px; color: #92400E; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>

                <!-- Destructive / Danger Alert Box -->
                <div id="demo-alert-danger" class="eds-alert" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; font-size: 13px;">
                  <i data-lucide="alert-octagon" class="lucide-icon" style="width: 18px; height: 18px; flex-shrink: 0; color: #EF4444; margin-top: 2px;"></i>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; margin-bottom: 2px; font-size: 13px;">Security Revocation Event (Destructive Alert Box)</div>
                    <div style="opacity: 0.9; line-height: 1.4; font-size: 12px;">Emergency credential revocation initiated following unauthorized token access attempt.</div>
                  </div>
                  <button class="btn btn-outline" style="font-size: 11px; padding: 3px 8px; border-color: #FCA5A5; color: #991B1B;" onclick="showToast('Credentials rotated. Session tokens invalidated.')">Rotate Key</button>
                  <button onclick="dismissAlert('demo-alert-danger')" style="background: none; border: none; font-size: 16px; color: #991B1B; cursor: pointer; padding: 0 4px; line-height: 1;" title="Dismiss alert">&times;</button>
                </div>
              </div>
            </div>

            <!-- 2. POP-UPS, POPOVERS & CONFIRMATION MODALS -->
            <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 14px;">
                Pop-ups, Popovers & Confirmation Dialogs (Interactive Triggers)
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 12px; position: relative;">
                <!-- Popover / Context Menu Trigger -->
                <div style="position: relative; display: inline-block;">
                  <button class="btn btn-primary" style="font-size: 12px; padding: 8px 14px;" onclick="togglePopoverDemo(event)">
                    <i data-lucide="message-square" class="lucide-icon"></i> 💬 Open Context Pop-up
                  </button>

                  <!-- Anchored Floating Pop-up Card -->
                  <div id="demo-context-popover" style="display: none; position: absolute; top: calc(100% + 10px); left: 0; width: 280px; background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1); z-index: 500;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                      <span style="font-weight: 700; font-size: 13px;">Quick Settings Pop-up</span>
                      <button onclick="togglePopoverDemo(event)" style="background: none; border: none; cursor: pointer; font-size: 14px; color: var(--sys-color-text-secondary);">&times;</button>
                    </div>
                    <p style="font-size: 11px; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                      Contextual floating pop-up card with anchored pointer and direct state triggers.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                      <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Telemetry Streaming</span>
                        <input type="checkbox" checked>
                      </label>
                      <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Auto-dismiss Toasts</span>
                        <input type="checkbox" checked>
                      </label>
                    </div>
                    <div style="margin-top: 12px; pt-2; border-top: 1px solid var(--sys-color-border-subtle); display: flex; justify-content: flex-end;">
                      <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="togglePopoverDemo(event)">Done</button>
                    </div>
                  </div>
                </div>

                <!-- Delete Confirmation Pop-up Trigger -->
                <button class="btn btn-danger" style="font-size: 12px; padding: 8px 14px;" onclick="openConfirmPopupDemo()">
                  <i data-lucide="trash-2" class="lucide-icon"></i> ⚠️ Delete Confirmation Pop-up
                </button>

                <!-- Adaptive Modal / Bottom Sheet Trigger -->
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerAdaptiveDialogDemo()">
                  <i data-lucide="maximize-2" class="lucide-icon"></i> 📱 Adaptive Modal Pop-up
                </button>

                <!-- Toast Triggers -->
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerSnackbarDemo('success', 'Production database backup verified')">
                  <i data-lucide="check" class="lucide-icon"></i> ✓ Success Toast
                </button>
                <button class="btn btn-outline" style="font-size: 12px; padding: 8px 14px;" onclick="triggerSnackbarDemo('error', 'API Rate limit exceeded on node-04')">
                  <i data-lucide="x" class="lucide-icon"></i> ✕ Error Toast
                </button>
              </div>
            </div>

            <!-- 3. PROGRESS INDICATORS & SKELETON LOADERS -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                  Progress Indicators (Linear & Circular)
                </div>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                      <span>Linear Determinate</span>
                      <strong style="font-family: monospace;">68%</strong>
                    </div>
                    <div style="height: 6px; border-radius: 9999px; background: var(--sys-color-surface-sunken); overflow: hidden;">
                      <div style="width: 68%; height: 100%; background: var(--color-brand-placeholder-primary-600); border-radius: 9999px;"></div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                      <div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>
                      <span>Indeterminate Spinner</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                      <div style="position: relative; width: 28px; height: 28px;">
                        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--sys-color-border-subtle)" stroke-width="4" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-placeholder-primary-600)" stroke-width="4" stroke-dasharray="75, 100" />
                        </svg>
                      </div>
                      <span>Circular (75%)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 16px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 12px;">
                  Skeleton Loaders (Shimmer Effect)
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px;">
                  <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--sys-color-surface-sunken); animation: pulse 1.5s infinite;"></div>
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                    <div style="height: 12px; width: 60%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
                    <div style="height: 10px; width: 90%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
                  </div>
                </div>
                <div style="height: 14px; width: 100%; background: var(--sys-color-surface-sunken); border-radius: 4px; animation: pulse 1.5s infinite;"></div>
              </div>
            </div>
          </section>

          <!-- SECTION 6: GEN AI ORGANISMS -->
          <section id="cat-genai" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="bot" class="lucide-icon" style="color: #7C3AED;"></i> 6. Enterprise Multimodal Gen AI Organisms
              </h3>
              <span class="badge badge-ai">Multimodal AI Standard</span>
            </div>
            <p style="font-size: 13px; color: var(--sys-color-text-secondary); margin-bottom: 20px;">
              Proprietary AI patterns: Prompt Composer with token meters and context chips, borderless Reasoning Accordion, Grounding Citation Pills, and Suggestion Diff Viewers.
            </p>

            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div style="background: var(--sys-color-surface-sunken); border-radius: 8px; padding: 12px 16px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                  <span style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: #7C3AED;">
                    <i data-lucide="sparkles" class="lucide-icon" style="width: 14px; height: 14px;"></i>
                    Thought for 2.8 seconds • 3 tools executed
                  </span>
                  <i data-lucide="chevron-down" class="lucide-icon" style="width: 14px; height: 14px; color: var(--sys-color-text-tertiary);"></i>
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--sys-color-border-subtle); color: var(--sys-color-text-secondary); line-height: 1.5;">
                  ✓ CloudWatch Telemetry API queried &bull; Analyzed P90 spike on Node-04 &bull; Verified SLA thresholds
                </div>
              </div>

              <div style="border: 1px solid var(--sys-color-border-default); border-radius: 12px; padding: 16px; background: var(--sys-color-surface-card);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                  <div class="ai-avatar" style="width: 24px; height: 24px;"><i data-lucide="sparkles" class="lucide-icon" style="width: 12px; height: 12px; color: white;"></i></div>
                  <span style="font-weight: 700; font-size: 13px;">Enterprise AI Copilot</span>
                </div>
                
                <p style="font-size: 13px; line-height: 1.6; margin: 0 0 12px 0;">
                  Anomaly spike of <strong>+$42,850</strong> was driven by an unbudgeted database provisioning burst on the EMEA AWS availability zone
                  <span class="citation-pill" title="Click to view telemetry evidence">[1]</span>. 
                  Recommendation: activate capacity reserve to prevent SLA degradation
                  <span class="citation-pill" title="Corporate Policy §4.2">[2]</span>.
                </p>

                <div style="background: var(--sys-color-surface-sunken); border-radius: 8px; padding: 10px; font-family: monospace; font-size: 11px; margin-bottom: 12px; border: 1px solid var(--sys-color-border-subtle);">
                  <div style="background: rgba(239, 68, 68, 0.1); color: #991B1B; padding: 2px 6px; border-radius: 4px; margin-bottom: 2px;">
                    - capacity_reserve_limit = 50000;
                  </div>
                  <div style="background: rgba(16, 185, 129, 0.1); color: #065F46; padding: 2px 6px; border-radius: 4px;">
                    + capacity_reserve_limit = 75000; // P90 headroom buffer
                  </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                  <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="openRejectFeedbackModal()">✕ Reject with Feedback</button>
                  <button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="showToast('✓ AI Recommendation accepted')">✓ Accept Changes</button>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 7: MULTI-DEVICE RESPONSIVE METAMORPHOSIS SUITE -->
          <section id="cat-responsive" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
              <div>
                <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 11px; font-weight: 700; margin-bottom: 8px;">
                  <i data-lucide="smartphone" class="lucide-icon" style="width: 13px; height: 13px;"></i> CROSS-PLATFORM ARCHITECTURE
                </div>
                <h3 style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; margin: 0 0 4px 0;">7. Multi-Device Responsive Metamorphosis Suite</h3>
                <p style="font-size: 13px; color: var(--sys-color-text-secondary); max-width: 800px; margin: 0;">
                  Instead of separate platform codebases, our proprietary system uses <strong>Tokenized Polymorphic Metamorphosis</strong>: components automatically morph structure and density according to viewport and pointer capabilities.
                </p>
              </div>

              <div style="display: flex; align-items: center; gap: 6px; background: var(--sys-color-surface-sunken); padding: 4px; border-radius: 10px; border: 1px solid var(--sys-color-border-subtle);">
                <button id="sim-btn-desktop" class="btn btn-outline active" style="font-size: 12px; padding: 6px 12px;" onclick="setSimulatorMode('desktop')">
                  💻 Desktop (>1024px)
                </button>
                <button id="sim-btn-tablet" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;" onclick="setSimulatorMode('tablet')">
                  📱 Tablet (768px)
                </button>
                <button id="sim-btn-phone" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;" onclick="setSimulatorMode('phone')">
                  📲 Phone (390px)
                </button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
              <div style="padding: 14px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                <div style="font-size: 11px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); text-transform: uppercase; margin-bottom: 4px;">Navigation Metamorphosis</div>
                <div style="font-size: 13px; font-weight: 600;">Sidebar ⇄ Rail ⇄ Bottom Nav</div>
                <div style="font-size: 12px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                  Desktop: 260px Persistent Sidebar<br>
                  Tablet: 72px Vertical Rail<br>
                  Phone: 64px Bottom Nav + Hamburger
                </div>
              </div>

              <div style="padding: 14px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                <div style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase; margin-bottom: 4px;">Data Table Metamorphosis</div>
                <div style="font-size: 13px; font-weight: 600;">Dense Grid ⇄ Stacked Card List</div>
                <div style="font-size: 12px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                  Desktop: 32px compact rows, sorting, sticky headers<br>
                  Phone: Auto-degrades into thumb-friendly key-value card rows
                </div>
              </div>

              <div style="padding: 14px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                <div style="font-size: 11px; font-weight: 700; color: #7C3AED; text-transform: uppercase; margin-bottom: 4px;">Overlay Metamorphosis</div>
                <div style="font-size: 13px; font-weight: 600;">Centered Modal ⇄ Bottom Sheet</div>
                <div style="font-size: 12px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                  Desktop: Centered dialog box with backdrop blur<br>
                  Phone: Slide-up bottom sheet with swipe grab-handle
                </div>
              </div>

              <div style="padding: 14px; border-radius: 8px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle);">
                <div style="font-size: 11px; font-weight: 700; color: #D97706; text-transform: uppercase; margin-bottom: 4px;">Input & Touch Target Standard</div>
                <div style="font-size: 13px; font-weight: 600;">Adaptive Hit-Box & Full-Width</div>
                <div style="font-size: 12px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                  Desktop: Mouse fine-pointer compact density<br>
                  Touch/Mobile: Strict 44×44px hit-targets, full-width actions
                </div>
              </div>
            </div>

            <div style="border: 2px dashed var(--sys-color-border-default); border-radius: 16px; padding: 24px; background: #0F172A; display: flex; justify-content: center; overflow-x: auto;">
              <div id="multi-device-frame" style="width: 100%; max-width: 900px; background: var(--sys-color-surface-card); border-radius: 12px; border: 1px solid var(--sys-color-border-default); overflow: hidden; transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); display: flex; flex-direction: column;">
                <div style="background: var(--sys-color-surface-sunken); border-bottom: 1px solid var(--sys-color-border-subtle); padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 600; color: var(--sys-color-text-secondary);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="sim-device-pill" style="padding: 2px 8px; border-radius: 4px; background: var(--color-brand-placeholder-primary-600); color: white; font-size: 10px; font-weight: 700;">DESKTOP CANVAS (900px)</span>
                    <span id="sim-device-input-indicator">Input: Mouse / Fine Pointer</span>
                  </div>
                  <div>Touch Target: <strong id="sim-touch-target-val">32px (Compact)</strong></div>
                </div>

                <div style="padding: 12px 16px; border-bottom: 1px solid var(--sys-color-border-subtle); display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button id="sim-hamburger-btn" style="display: none; background: none; border: 1px solid var(--sys-color-border-subtle); border-radius: 6px; padding: 6px; cursor: pointer;">
                      <i data-lucide="menu" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    </button>
                    <div style="width: 24px; height: 24px; border-radius: 6px; background: var(--color-brand-placeholder-primary-600); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 11px;">E</div>
                    <span style="font-weight: 700; font-size: 13px;">Enterprise Workspace</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="triggerAdaptiveDialogDemo()">
                      <i data-lucide="layers" class="lucide-icon" style="width: 13px; height: 13px;"></i> Trigger Dialog
                    </button>
                    <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;" onclick="triggerSnackbarDemo('success', 'Changes synced across mobile & desktop')">
                      <i data-lucide="bell" class="lucide-icon" style="width: 13px; height: 13px;"></i> Trigger Toast
                    </button>
                  </div>
                </div>

                <div style="display: flex; min-height: 340px;">
                  <div id="sim-sidebar-pane" style="width: 180px; border-right: 1px solid var(--sys-color-border-subtle); background: var(--sys-color-surface-sunken); padding: 12px; display: flex; flex-direction: column; gap: 6px;">
                    <div style="font-size: 10px; font-weight: 700; color: var(--sys-color-text-secondary); text-transform: uppercase; margin-bottom: 4px;">Navigation</div>
                    <div style="padding: 8px 10px; border-radius: 6px; background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600); font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 8px;">
                      <i data-lucide="layout-dashboard" class="lucide-icon" style="width: 14px; height: 14px;"></i> Overview
                    </div>
                    <div style="padding: 8px 10px; border-radius: 6px; color: var(--sys-color-text-secondary); font-size: 12px; display: flex; align-items: center; gap: 8px;">
                      <i data-lucide="database" class="lucide-icon" style="width: 14px; height: 14px;"></i> Telemetry
                    </div>
                    <div style="padding: 8px 10px; border-radius: 6px; color: var(--sys-color-text-secondary); font-size: 12px; display: flex; align-items: center; gap: 8px;">
                      <i data-lucide="bot" class="lucide-icon" style="width: 14px; height: 14px;"></i> Gen AI
                    </div>
                  </div>

                  <div id="sim-rail-pane" style="display: none; width: 64px; border-right: 1px solid var(--sys-color-border-subtle); background: var(--sys-color-surface-sunken); padding: 12px 0; flex-direction: column; align-items: center; gap: 16px;">
                    <div style="padding: 8px; border-radius: 8px; background: rgba(37,99,235,0.1); color: var(--color-brand-placeholder-primary-600);">
                      <i data-lucide="layout-dashboard" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div style="padding: 8px; border-radius: 8px; color: var(--sys-color-text-secondary);">
                      <i data-lucide="database" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div style="padding: 8px; border-radius: 8px; color: var(--sys-color-text-secondary);">
                      <i data-lucide="bot" class="lucide-icon" style="width: 18px; height: 18px;"></i>
                    </div>
                  </div>

                  <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;">
                    <div style="background: var(--sys-color-surface-card); border: 1px solid var(--sys-color-border-default); border-radius: var(--radius-card, 12px); padding: 12px;">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 11px; font-weight: 600; color: var(--sys-color-text-secondary);">API CALLS (Q3)</span>
                        <span style="font-size: 11px; color: #059669; font-weight: 700;">▲ +28.4%</span>
                      </div>
                      <div style="font-size: 20px; font-weight: 800; font-family: monospace; font-variant-numeric: tabular-nums; margin: 4px 0;">
                        14,892,104
                      </div>
                      <div style="font-size: 11px; color: var(--sys-color-text-secondary);">
                        Standardized 184px rhythm with 44px tap targets
                      </div>
                    </div>

                    <div id="sim-desktop-table">
                      <div style="font-size: 12px; font-weight: 700; margin-bottom: 8px; display: flex; justify-content: space-between;">
                        <span>Cluster Nodes (Dense Table)</span>
                        <span style="font-size: 11px; color: var(--sys-color-text-secondary);">2 Active</span>
                      </div>
                      <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-variant-numeric: tabular-nums;">
                        <thead>
                          <tr style="border-bottom: 1px solid var(--sys-color-border-default); color: var(--sys-color-text-secondary); text-align: left;">
                            <th style="padding: 6px 8px;">Node</th>
                            <th style="padding: 6px 8px;">Region</th>
                            <th style="padding: 6px 8px;">CPU</th>
                            <th style="padding: 6px 8px; text-align: right;">Latency</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="border-bottom: 1px solid var(--sys-color-border-subtle);">
                            <td style="padding: 6px 8px; font-weight: 600;">us-east-1a</td>
                            <td style="padding: 6px 8px; color: var(--sys-color-text-secondary);">Virginia</td>
                            <td style="padding: 6px 8px;"><span class="badge badge-success">38%</span></td>
                            <td style="padding: 6px 8px; text-align: right; font-weight: 700;">18ms</td>
                          </tr>
                          <tr style="border-bottom: 1px solid var(--sys-color-border-subtle);">
                            <td style="padding: 6px 8px; font-weight: 600;">eu-central-1</td>
                            <td style="padding: 6px 8px; color: var(--sys-color-text-secondary);">Frankfurt</td>
                            <td style="padding: 6px 8px;"><span class="badge badge-primary">64%</span></td>
                            <td style="padding: 6px 8px; text-align: right; font-weight: 700;">42ms</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div id="sim-phone-cards" style="display: none; flex-direction: column; gap: 8px;">
                      <div style="font-size: 12px; font-weight: 700; color: var(--sys-color-text-secondary);">
                        Cluster Nodes (Degraded to Stacked Cards)
                      </div>
                      <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 8px; padding: 10px; background: var(--sys-color-surface-sunken);">
                        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px;">
                          <span>us-east-1a</span>
                          <span style="color: #059669;">18ms</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                          <span>N. Virginia</span>
                          <span class="badge badge-success" style="font-size: 10px;">CPU 38%</span>
                        </div>
                      </div>
                      <div style="border: 1px solid var(--sys-color-border-subtle); border-radius: 8px; padding: 10px; background: var(--sys-color-surface-sunken);">
                        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px;">
                          <span>eu-central-1</span>
                          <span style="color: var(--color-brand-placeholder-primary-600);">42ms</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--sys-color-text-secondary); margin-top: 4px;">
                          <span>Frankfurt</span>
                          <span class="badge badge-primary" style="font-size: 10px;">CPU 64%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="sim-bottom-nav" style="display: none; height: 56px; background: var(--sys-color-surface-card); border-top: 1px solid var(--sys-color-border-subtle); justify-content: space-around; align-items: center; padding: 0 8px;">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--color-brand-placeholder-primary-600); font-size: 10px; font-weight: 700; min-width: 44px; min-height: 44px; justify-content: center;">
                    <i data-lucide="layout-dashboard" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    <span>Overview</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                    <i data-lucide="database" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    <span>Data</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                    <i data-lucide="bot" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    <span>AI</span>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--sys-color-text-secondary); font-size: 10px; min-width: 44px; min-height: 44px; justify-content: center;">
                    <i data-lucide="settings" class="lucide-icon" style="width: 16px; height: 16px;"></i>
                    <span>Menu</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ========================================================================
               SECTION 8: MASTER 112-COMPONENT DIRECTORY & IMPLEMENTATION REGISTRY
               ======================================================================== -->
          <section id="cat-all-112" class="card" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
              <div>
                <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; background: rgba(37, 99, 235, 0.1); color: var(--color-brand-placeholder-primary-600); font-size: 11px; font-weight: 700; margin-bottom: 8px;">
                  <i data-lucide="list" class="lucide-icon" style="width: 13px; height: 13px;"></i> MASTER SPECIFICATION DIRECTORY
                </div>
                <h3 style="font-size: 20px; font-weight: 800; letter-spacing: -0.01em; margin: 0 0 6px 0;">8. Master 112-Component Directory & Implementation Registry</h3>
                <p style="font-size: 13px; color: var(--sys-color-text-secondary); max-width: 860px; margin: 0;">
                  Exhaustive index of all 112 discrete components, sub-variants, and anatomical configurations. Each entry maps directly to our 28 master polymorphic React components and tokens in <code>@hsb_design/design-system</code>.
                </p>
              </div>

              <!-- Live Counter Pill -->
              <div style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 10px; padding: 6px 14px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--sys-color-text-secondary);">Showing:</span>
                <span id="matrix-count-badge" class="badge badge-primary" style="font-size: 12px; font-family: monospace;">112 / 112</span>
              </div>
            </div>

            <!-- Search and Filter Bar -->
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 14px;">
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="search" class="lucide-icon" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--sys-color-text-tertiary);"></i>
                <input
                  type="text"
                  id="matrix-search-input"
                  class="text-input"
                  placeholder="Search 112 components (e.g. 'FAB', 'Slider', 'Sparkline', 'Dialog', 'Diff', 'Breadcrumb', 'Chip')..."
                  style="padding-left: 40px; height: 42px; font-size: 13px; border-radius: 8px;"
                  oninput="onMatrixSearchInput()"
                />
              </div>

              <!-- Category Filter Buttons -->
              <div id="matrix-cat-pills-container" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="control-pill active" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('All', this)">All (112)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Actions & Buttons', this)">Actions & Buttons (17)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Communication & Feedback', this)">Feedback (12)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Containment & Surfaces', this)">Surfaces (13)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Navigation Systems', this)">Navigation (17)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Selection & Form Controls', this)">Selection & Forms (22)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Text Inputs & Search', this)">Inputs (8)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Data Display & Lists', this)">Data Display (11)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Dashboard Organisms', this)">Dashboards (7)</button>
                <button class="control-pill" style="font-size: 11px; padding: 4px 10px;" onclick="filterMatrixByCategory('Gen AI Interfaces', this)">Gen AI (5)</button>
              </div>
            </div>

            <!-- Active Category Notice -->
            <div id="matrix-active-filter-notice" style="display: none; align-items: center; justify-content: space-between; font-size: 12px; padding: 8px 14px; background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.2); border-radius: 8px; margin-bottom: 12px; color: var(--color-brand-placeholder-primary-600);">
              <span id="matrix-active-filter-text">Filtering by category</span>
              <button onclick="filterMatrixByCategory('All', null)" style="background: none; border: none; font-size: 11px; font-weight: 700; color: var(--color-brand-placeholder-primary-600); cursor: pointer; text-decoration: underline;"><i data-lucide="x" class="lucide-icon" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:2px;"></i> Clear category filter (Show All 112)</button>
            </div>

            <!-- Complete 112 Table -->
            <div style="border: 1px solid var(--sys-color-border-default); border-radius: 10px; overflow-x: auto; max-height: 600px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
                <thead style="position: sticky; top: 0; background: var(--sys-color-surface-card); z-index: 10; box-shadow: 0 1px 2px rgba(0,0,0,0.06);">
                  <tr style="border-bottom: 2px solid var(--sys-color-border-default); color: var(--sys-color-text-secondary);">
                    <th style="padding: 10px 12px; width: 44px;">#</th>
                    <th style="padding: 10px 12px; width: 200px;">Component & Anatomy</th>
                    <th style="padding: 10px 12px; width: 150px;">Live Visual Preview</th>
                    <th style="padding: 10px 12px; width: 140px;">Category</th>
                    <th style="padding: 10px 12px;">React Implementation & One-Click Copy</th>
                    <th style="padding: 10px 12px; width: 160px;">Responsive Behavior</th>
                    <th style="padding: 10px 12px; text-align: right; width: 90px;">Actions</th>
                  </tr>
                </thead>
                <tbody id="matrix-tbody">
                  ${tableRows}
                </tbody>
              </table>
            </div>
          </section>

        
          <!-- ========================================================================
               INTERACTIVE COMPONENT DETAIL & FULL CODE MODAL
               ======================================================================== -->
          <div id="component-detail-modal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); z-index: 3000; align-items: center; justify-content: center; padding: 20px;" onclick="closeComponentDetailModalOnBackdrop(event)">
            <div style="background: var(--sys-color-surface-card); border-radius: 16px; max-width: 680px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid var(--sys-color-border-subtle); animation: fadeIn 0.2s ease;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span id="detail-modal-num" class="badge badge-primary" style="font-family: monospace; font-size: 12px;">#01</span>
                    <span id="detail-modal-cat" class="badge" style="background: var(--sys-color-surface-sunken); font-size: 11px;">Category</span>
                  </div>
                  <h3 id="detail-modal-title" style="font-size: 20px; font-weight: 800; margin: 0 0 4px 0; color: var(--sys-color-text-primary);">Component Name</h3>
                  <p id="detail-modal-desc" style="font-size: 13px; color: var(--sys-color-text-secondary); margin: 0;">Component description and anatomy breakdown.</p>
                </div>
                <button onclick="closeComponentDetailModal()" style="background: none; border: none; font-size: 22px; cursor: pointer; color: var(--sys-color-text-secondary); padding: 0 4px; line-height: 1;">&times;</button>
              </div>

              <!-- High-Fidelity Rendered Preview Canvas -->
              <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); margin-bottom: 8px; letter-spacing: 0.05em;">Live Rendered Component Specimen</div>
                <div id="detail-modal-specimen" style="background: var(--sys-color-surface-sunken); border: 1px solid var(--sys-color-border-subtle); border-radius: 12px; padding: 32px 20px; display: flex; align-items: center; justify-content: center; min-height: 110px;">
                  <!-- Dynamically populated live specimen -->
                </div>
              </div>

              <!-- Responsive Metamorphosis Breakdown -->
              <div style="margin-bottom: 20px; background: rgba(37,99,235,0.05); border: 1px solid rgba(37,99,235,0.15); border-radius: 10px; padding: 14px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-brand-placeholder-primary-600); margin-bottom: 4px;">Responsive Metamorphosis Behavior</div>
                <div id="detail-modal-device" style="font-size: 13px; color: var(--sys-color-text-primary);">Desktop / Tablet / Phone</div>
              </div>

              <!-- Full React JSX Snippet & Copy Action -->
              <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--sys-color-text-secondary); letter-spacing: 0.05em;">React Component Code (TypeScript)</span>
                  <button id="detail-modal-copy-btn" class="btn btn-primary" onclick="copyModalCode()" style="font-size: 12px; padding: 4px 12px; display: inline-flex; align-items: center; gap: 6px;">
                    <i data-lucide="copy" class="lucide-icon" style="width:12px; height:12px;"></i> Copy Full Code
                  </button>
                </div>
                <pre style="background: #0F172A; color: #F8FAFC; padding: 16px; border-radius: 10px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0; line-height: 1.5;"><code id="detail-modal-code">import { Button } from '@hsb_design/design-system';</code></pre>
              </div>

              <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--sys-color-border-subtle); padding-top: 16px;">
                <button class="btn btn-outline" onclick="closeComponentDetailModal()" style="font-size: 13px; padding: 8px 18px;">Close</button>
              </div>
            </div>
          </div>


          ${(() => {
            const componentsDict = {};
            ALL_112_COMPONENTS.forEach(c => {
              const tagMatch = c.api.match(/<([A-Z][a-zA-Z0-9]*)/);
              const primaryExport = tagMatch ? tagMatch[1] : 'Button';
              const cleanName = c.name.replace(/[^a-zA-Z0-9]/g, '');
              const fullCode = '// React 18+ / Next.js 14+ Implementation\n' +
                'import React from \'react\';\n' +
                'import { ' + primaryExport + ' } from \'@hsb_design/design-system\';\n\n' +
                'export const ' + cleanName + 'Specimen: React.FC = () => {\n' +
                '  return (\n    ' + c.api + '\n  );\n};\n\n' +
                'export default ' + cleanName + 'Specimen;';

              componentsDict[c.num] = {
                num: c.num,
                name: c.name,
                cat: c.cat,
                desc: c.desc,
                device: c.device,
                api: c.api,
                specimen: getComponentLiveSpecimen(c),
                fullCode: fullCode
              };
            });

            return `
            <script>
              window.COMPONENTS_DATA = ${JSON.stringify(componentsDict)};

              window.copyToClipboard = function(text) {
                if (navigator.clipboard && window.isSecureContext) {
                  return navigator.clipboard.writeText(text);
                }
                return new Promise(function(resolve, reject) {
                  try {
                    var textArea = document.createElement("textarea");
                    textArea.value = text;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-999999px";
                    textArea.style.top = "-999999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    var successful = document.execCommand("copy");
                    document.body.removeChild(textArea);
                    if (successful) resolve();
                    else reject(new Error("execCommand failed"));
                  } catch (err) {
                    reject(err);
                  }
                });
              };

              window.copyComponentCode = function(btn) {
                if (!btn) return;
                var code = btn.getAttribute('data-code') || '';
                var name = btn.getAttribute('data-name') || 'Component';
                
                window.copyToClipboard(code).then(function() {
                  var origHtml = btn.innerHTML;
                  btn.innerHTML = '<i data-lucide="check" class="lucide-icon" style="width:12px; height:12px;"></i> Copied!'; if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
                  btn.style.color = '#059669';
                  btn.style.borderColor = '#059669';
                  btn.style.background = 'rgba(5, 150, 105, 0.08)';
                  
                  setTimeout(function() {
                    btn.innerHTML = origHtml;
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.background = '';
                  }, 2000);
                  
                  if (typeof showToast === 'function') {
                    showToast('Copied ' + name + ' JSX snippet to clipboard!');
                  }
                }).catch(function() {
                  if (typeof showToast === 'function') {
                    showToast('Copied to clipboard');
                  }
                });
              };

              window.openComponentDetailModal = function(num) {
                var comp = window.COMPONENTS_DATA ? window.COMPONENTS_DATA[num] : null;
                if (!comp) return;

                var numEl = document.getElementById('detail-modal-num');
                var titleEl = document.getElementById('detail-modal-title');
                var catEl = document.getElementById('detail-modal-cat');
                var descEl = document.getElementById('detail-modal-desc');
                var deviceEl = document.getElementById('detail-modal-device');
                var specimenEl = document.getElementById('detail-modal-specimen');
                var codeEl = document.getElementById('detail-modal-code');

                if (numEl) numEl.textContent = '#' + comp.num;
                if (titleEl) titleEl.textContent = comp.name;
                if (catEl) catEl.textContent = comp.cat;
                if (descEl) descEl.textContent = comp.desc;
                if (deviceEl) deviceEl.innerHTML = '<strong>Metamorphosis Invariant:</strong> ' + comp.device;
                if (specimenEl) specimenEl.innerHTML = comp.specimen;
                if (codeEl) codeEl.textContent = comp.fullCode;

                var modal = document.getElementById('component-detail-modal');
                if (modal) {
                  modal.style.display = 'flex';
                }
                if (window.lucide && typeof lucide.createIcons === 'function') {
                  lucide.createIcons();
                }
              };

              window.closeComponentDetailModal = function() {
                var modal = document.getElementById('component-detail-modal');
                if (modal) {
                  modal.style.display = 'none';
                }
              };

              window.closeComponentDetailModalOnBackdrop = function(e) {
                if (e && e.target && e.target.id === 'component-detail-modal') {
                  window.closeComponentDetailModal();
                }
              };

              window.copyModalCode = function() {
                var codeEl = document.getElementById('detail-modal-code');
                if (!codeEl) return;
                var text = codeEl.textContent;
                
                window.copyToClipboard(text).then(function() {
                  var btn = document.getElementById('detail-modal-copy-btn');
                  if (btn) {
                    var origHtml = btn.innerHTML;
                    btn.innerHTML = '<i data-lucide="check" class="lucide-icon" style="width:12px; height:12px;"></i> Copied Full Code!'; if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
                    btn.style.background = '#059669';
                    setTimeout(function() {
                      btn.innerHTML = origHtml;
                      btn.style.background = '';
                    }, 2000);
                  }
                  if (typeof showToast === 'function') {
                    showToast('Copied full React component code to clipboard!');
                  }
                }).catch(function() {
                  if (typeof showToast === 'function') {
                    showToast('Failed to copy code to clipboard');
                  }
                });
              };
            </script>
            `;
          })()}

        </div> <!-- END VIEW 2: ATOMIC CATALOG -->`;
}

export function buildMasterCatalog() {
  const indexPath = path.join(rootDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  const startTag = '<div id="view-atomic-suite"';
  const endTag = '</div> <!-- END VIEW 2: ATOMIC CATALOG -->';

  const startIdx = indexHtml.indexOf(startTag);
  const endIdx = indexHtml.indexOf(endTag);

  if (startIdx !== -1 && endIdx !== -1) {
    const newCatalog = generateMasterCatalogHTML();
    const updatedHtml = indexHtml.substring(0, startIdx) + newCatalog + indexHtml.substring(endIdx + endTag.length);
    fs.writeFileSync(indexPath, updatedHtml, 'utf8');
    console.log(`✓ Successfully updated ${indexPath} with Complete 112-Component Directory!`);

    // Sync to showcase/index.html
    const showcasePath = path.join(rootDir, 'showcase', 'index.html');
    fs.writeFileSync(showcasePath, updatedHtml, 'utf8');
    console.log(`✓ Synced to ${showcasePath}`);
  } else {
    console.error('Could not find catalog boundaries in index.html!');
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  buildMasterCatalog();
}
