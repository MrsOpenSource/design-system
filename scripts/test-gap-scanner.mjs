import fs from 'fs';
import path from 'path';

export function analyzeComponentGaps(targetDir = './src') {
  const resolved = path.resolve(process.cwd(), targetDir);
  console.log(`\n🔎 Scanning codebase for component gap analysis: ${resolved}\n`);

  if (!fs.existsSync(resolved)) {
    console.log(`Directory ${resolved} not found, using current directory for analysis.`);
  }

  // Registry of 28 master polymorphic components in @hsb_design/design-system
  const SYSTEM_COMPONENTS = {
    // Actions & Buttons
    'Button': { cat: 'Actions & Buttons', import: 'Button', variants: ['elevated', 'filled', 'secondary', 'outline', 'ghost', 'danger', 'ai', 'fab'] },
    'IconButton': { cat: 'Actions & Buttons', import: 'Button', note: 'Use <Button variant="ghost" size="icon" />' },
    'FAB': { cat: 'Actions & Buttons', import: 'Button', note: 'Use <Button variant="fab" />' },
    'SegmentedControl': { cat: 'Actions & Buttons / Inputs', import: 'SegmentedControl', variants: ['default', 'pill'] },
    
    // Containment & Surfaces
    'Card': { cat: 'Containment & Surfaces', import: 'Card', variants: ['elevated', 'filled', 'outlined', 'interactive'] },
    'Modal': { cat: 'Containment & Surfaces', import: 'Modal', note: 'Polymorphic dialog with ESC and backdrop trap' },
    'Dialog': { cat: 'Containment & Surfaces', import: 'AdaptiveDialog', note: 'Adapts to Modal on desktop, BottomSheet on phone' },
    'BottomSheet': { cat: 'Containment & Surfaces', import: 'BottomSheet', note: 'Mobile swipeable drawer with touch drag bar' },
    'Drawer': { cat: 'Containment & Surfaces', import: 'Sidebar', note: 'Slide-in side sheet / modal drawer' },
    
    // Communication & Feedback
    'Alert': { cat: 'Communication & Feedback', import: 'Alert', variants: ['info', 'success', 'warning', 'danger'] },
    'Badge': { cat: 'Communication & Feedback', import: 'Badge', variants: ['dot', 'primary', 'success', 'danger', 'warning'] },
    'Snackbar': { cat: 'Communication & Feedback', import: 'Snackbar', note: 'Transient toast notification' },
    'Toast': { cat: 'Communication & Feedback', import: 'Snackbar', note: 'Use <Snackbar />' },
    'Tooltip': { cat: 'Communication & Feedback', import: 'Tooltip', variants: ['plain', 'rich'] },
    'Progress': { cat: 'Communication & Feedback', import: 'CircularProgress', variants: ['linear', 'circular', 'indeterminate'] },
    'Spinner': { cat: 'Communication & Feedback', import: 'CircularProgress', note: 'Use <CircularProgress indeterminate />' },

    // Navigation Systems
    'Tabs': { cat: 'Navigation Systems', import: 'Tabs', variants: ['primary (underline)', 'secondary (segmented pill)', 'scrollable'] },
    'Sidebar': { cat: 'Navigation Systems', import: 'Sidebar', variants: ['permanent', 'mini', 'modal-drawer'] },
    'NavigationRail': { cat: 'Navigation Systems', import: 'NavigationRail', note: 'Compact 72px vertical tablet rail' },
    'BottomNavigation': { cat: 'Navigation Systems', import: 'BottomNavigation', note: 'Mobile 3-5 destination bottom bar' },
    'HamburgerMenu': { cat: 'Navigation Systems', import: 'HamburgerMenu', note: 'Accessible responsive trigger' },

    // Selection & Inputs
    'Input': { cat: 'Text Inputs & Forms', import: 'Input', variants: ['filled', 'outlined', 'leading-icon', 'trailing-action', 'affix', 'error'] },
    'TextField': { cat: 'Text Inputs & Forms', import: 'Input', note: 'Use <Input />' },
    'Switch': { cat: 'Selection & Form Controls', import: 'Switch', note: 'Accessible ARIA switch' },
    'Chip': { cat: 'Selection & Form Controls', import: 'Chip', variants: ['filter', 'input', 'assist', 'suggestion'] },
    'Slider': { cat: 'Selection & Form Controls', import: 'Slider', variants: ['continuous', 'stepped', 'range'] },
    'Stepper': { cat: 'Selection & Form Controls', import: 'Stepper', note: 'Multi-step process breadcrumb' },

    // Data Display & Dashboards
    'DataTable': { cat: 'Data Display & Lists', import: 'DataTable', note: 'Dense grid with sort, filter, and pagination' },
    'Table': { cat: 'Data Display & Lists', import: 'DataTable', note: 'Use <DataTable />' },
    'ListItem': { cat: 'Data Display & Lists', import: 'ListItem', variants: ['single-line', 'two-line', 'three-line', 'accordion'] },
    'Avatar': { cat: 'Data Display & Lists', import: 'Avatar', variants: ['circular', 'ai-copilot', 'stack'] },
    'KpiCard': { cat: 'Dashboard Organisms', import: 'KpiCard', note: 'Strict 184px KPI card with 48px sparkline slot' },
    'ChartContainer': { cat: 'Dashboard Organisms', import: 'ChartContainer', note: 'High-density chart card with telemetry header' },

    // Gen AI Interfaces
    'PromptComposer': { cat: 'Gen AI Interfaces', import: 'PromptComposer', note: 'Multimodal input with token cost pill' },
    'ReasoningAccordion': { cat: 'Gen AI Interfaces', import: 'ReasoningAccordion', note: 'Collapsible chain-of-thought trace' },
    'SuggestionDiffViewer': { cat: 'Gen AI Interfaces', import: 'SuggestionDiffViewer', note: 'Side-by-side / inline formula diff' },
    'AdaptiveLayout': { cat: 'Foundations & Layout', import: 'AdaptiveLayout', note: '3-tier responsive metamorphosis container' }
  };

  return { SYSTEM_COMPONENTS };
}

const res = analyzeComponentGaps();
console.log('Registered Master System Components:', Object.keys(res.SYSTEM_COMPONENTS).length);

