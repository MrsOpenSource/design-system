import fs from 'fs';
import path from 'path';

/**
 * Component Gap Scanner & Migration Engine
 * Scans a target directory, identifies all UI components in use, maps them to
 * @hsb_design/design-system 112-component registry, and flags any gaps.
 */
export function scanAndMapComponents(targetDir = './src') {
  const resolved = path.resolve(process.cwd(), targetDir);
  console.log(`\n🔎 Component Gap Analysis Scanning: ${resolved}\n`);

  if (!fs.existsSync(resolved)) {
    console.error(`Target directory not found: ${resolved}`);
    return null;
  }

  // Master Component Mapping Rules (Standard Design System Registry)
  const COMPONENT_MAP = {
    // Buttons & CTAs
    'button': { replacement: 'Button', variant: 'filled', type: 'HTML Native Element' },
    'Button': { replacement: 'Button', variant: 'elevated | filled | secondary | outline | ghost | danger | ai', type: 'Core Atom' },
    'IconButton': { replacement: 'Button', variant: 'ghost size="icon"', type: 'Atom Variant' },
    'FAB': { replacement: 'Button', variant: 'fab', type: 'Atom Variant' },
    'FloatingActionButton': { replacement: 'Button', variant: 'fab', type: 'Atom Variant' },
    'ButtonGroup': { replacement: 'SegmentedControl', variant: 'default', type: 'Input Molecule' },
    'SegmentedButton': { replacement: 'SegmentedControl', variant: 'default', type: 'Input Molecule' },
    'SegmentedControl': { replacement: 'SegmentedControl', variant: 'default | pill', type: 'Input Molecule' },

    // Containment & Surfaces
    'Card': { replacement: 'Card', variant: 'elevated | filled | outlined', type: 'Container' },
    'Paper': { replacement: 'Card', variant: 'elevated', type: 'Container' },
    'Box': { replacement: 'Card / div with tokens', variant: 'token-styled', type: 'Layout' },
    'Modal': { replacement: 'Modal', variant: 'accessible backdrop', type: 'Overlay' },
    'Dialog': { replacement: 'AdaptiveDialog', variant: 'desktop: Modal / phone: BottomSheet', type: 'Metamorphic Dialog' },
    'AdaptiveDialog': { replacement: 'AdaptiveDialog', variant: 'responsive dialog', type: 'Metamorphic Dialog' },
    'BottomSheet': { replacement: 'BottomSheet', variant: 'touch drawer', type: 'Overlay' },
    'Drawer': { replacement: 'Sidebar', variant: 'modal-drawer', type: 'Navigation' },
    'SideSheet': { replacement: 'Sidebar', variant: 'persistent | modal-drawer', type: 'Navigation' },
    'Sheet': { replacement: 'AdaptiveDialog / Sidebar', variant: 'responsive drawer / bottom sheet', type: 'Overlay' },
    'Popover': { replacement: 'Tooltip', variant: 'rich contextual', type: 'Overlay' },
    'Divider': { replacement: 'Divider', variant: 'full-bleed | inset', type: 'Containment' },
    'Separator': { replacement: 'Divider', variant: 'full-bleed | inset', type: 'Containment' },

    // Navigation
    'Tabs': { replacement: 'Tabs', variant: 'primary | secondary | scrollable', type: 'Navigation' },
    'Tab': { replacement: 'Tabs', variant: 'sub-element', type: 'Navigation' },
    'SubTabBar': { replacement: 'Tabs', variant: 'secondary segmented pill', type: 'Navigation' },
    'Sidebar': { replacement: 'Sidebar', variant: 'permanent | mini | drawer', type: 'Navigation' },
    'NavigationRail': { replacement: 'NavigationRail', variant: '72px tablet rail', type: 'Navigation' },
    'BottomNavigation': { replacement: 'BottomNavigation', variant: 'mobile bottom bar', type: 'Navigation' },
    'Breadcrumbs': { replacement: 'div with breadcrumb tokens', variant: 'token-styled', type: 'Navigation' },
    'HamburgerMenu': { replacement: 'HamburgerMenu', variant: 'responsive menu trigger', type: 'Navigation' },
    'Command': { replacement: 'CommandPalette', variant: 'modal search palette (⌘K)', type: 'Navigation' },
    'CommandPrimitive': { replacement: 'CommandPalette', variant: 'modal search palette', type: 'Navigation' },

    // Inputs & Forms
    'input': { replacement: 'Input', variant: 'outlined', type: 'HTML Native' },
    'Input': { replacement: 'Input', variant: 'filled | outlined | with icon', type: 'Form Atom' },
    'TextField': { replacement: 'Input', variant: 'filled | outlined', type: 'Form Atom' },
    'Textarea': { replacement: 'Textarea', variant: 'auto-expanding multiline', type: 'Form Atom' },
    'Checkbox': { replacement: 'Input type="checkbox"', variant: 'token-styled', type: 'Form Atom' },
    'Radio': { replacement: 'Input type="radio"', variant: 'token-styled', type: 'Form Atom' },
    'RadioButton': { replacement: 'Input type="radio"', variant: 'token-styled', type: 'Form Atom' },
    'Switch': { replacement: 'Switch', variant: 'accessible toggle', type: 'Form Atom' },
    'Slider': { replacement: 'Slider', variant: 'continuous | stepped | range', type: 'Form Atom' },
    'Stepper': { replacement: 'Stepper', variant: 'multi-step wizard', type: 'Form Molecule' },
    'Select': { replacement: 'Select / DropdownMenu', variant: 'exposed select', type: 'Form Molecule' },
    'SelectDropdown': { replacement: 'Select / DropdownMenu', variant: 'exposed select', type: 'Form Molecule' },
    'ConditionDropdown': { replacement: 'Select / DropdownMenu', variant: 'exposed select', type: 'Form Molecule' },
    'HeaderDropdown': { replacement: 'DropdownMenu', variant: 'contextual action menu', type: 'Navigation' },
    'DropdownMenu': { replacement: 'DropdownMenu', variant: 'contextual / action menu', type: 'Overlay' },
    'Chip': { replacement: 'Chip', variant: 'filter | input | assist | suggestion', type: 'Form Atom' },
    'DatePicker': { replacement: 'DatePicker', variant: 'docked grid / modal dialog', type: 'Form Molecule' },
    'DayPicker': { replacement: 'DatePicker', variant: 'docked calendar grid', type: 'Form Molecule' },
    'OTPInput': { replacement: 'Input', variant: 'segmented digit tokens', type: 'Form Molecule' },

    // Feedback
    'Alert': { replacement: 'Alert', variant: 'info | success | warning | danger', type: 'Feedback' },
    'Banner': { replacement: 'Alert', variant: 'banner', type: 'Feedback' },
    'Snackbar': { replacement: 'Snackbar', variant: 'transient toast', type: 'Feedback' },
    'Toast': { replacement: 'Snackbar', variant: 'toast notify', type: 'Feedback' },
    'Sonner': { replacement: 'Snackbar', variant: 'transient toast notification', type: 'Feedback' },
    'Badge': { replacement: 'Badge', variant: 'dot | count | status', type: 'Feedback' },
    'Tag': { replacement: 'Badge / Chip', variant: 'status tag', type: 'Feedback' },
    'RequiredBadge': { replacement: 'Badge', variant: 'status text badge', type: 'Feedback' },
    'ManualBadge': { replacement: 'Badge', variant: 'status text badge', type: 'Feedback' },
    'ConditionCountBadge': { replacement: 'Badge', variant: 'count pill', type: 'Feedback' },
    'Avatar': { replacement: 'Avatar', variant: 'circular | ai-copilot | stack', type: 'Data Display' },
    'Progress': { replacement: 'CircularProgress', variant: 'determinate | indeterminate', type: 'Feedback' },
    'CircularProgress': { replacement: 'CircularProgress', variant: 'determinate | indeterminate', type: 'Feedback' },
    'LinearProgress': { replacement: 'CircularProgress', variant: 'linear horizontal bar', type: 'Feedback' },
    'Spinner': { replacement: 'CircularProgress', variant: 'indeterminate', type: 'Feedback' },
    'Tooltip': { replacement: 'Tooltip', variant: 'plain | rich', type: 'Feedback' },
    'Skeleton': { replacement: 'Skeleton', variant: 'pulse loading placeholder', type: 'Feedback' },

    // Data & Dashboards
    'Table': { replacement: 'DataTable', variant: 'sortable dense grid', type: 'Data Organism' },
    'DataTable': { replacement: 'DataTable', variant: 'dense tabular-nums', type: 'Data Organism' },
    'Pagination': { replacement: 'Pagination', variant: 'dense tabular pagination footer', type: 'Data Organism' },
    'ListItem': { replacement: 'ListItem', variant: 'single | two-line | three-line', type: 'Data Display' },
    'Accordion': { replacement: 'Accordion', variant: 'collapsible list item', type: 'Data Display' },
    'Carousel': { replacement: 'Carousel', variant: 'slide / fade container', type: 'Data Display' },
    'KpiCard': { replacement: 'KpiCard', variant: 'strict 184px with sparkline', type: 'Dashboard Organism' },
    'ChartContainer': { replacement: 'ChartContainer', variant: 'telemetry header', type: 'Dashboard Organism' },
    'DecileBar': { replacement: 'ProgressBar', variant: '10-step decile bar', type: 'Dashboard Molecule' },

    // Gen AI
    'PromptInput': { replacement: 'PromptComposer', variant: 'multimodal token cost', type: 'Gen AI' },
    'PromptComposer': { replacement: 'PromptComposer', variant: 'multimodal input', type: 'Gen AI' },
    'AureliaComposer': { replacement: 'PromptComposer', variant: 'multimodal prompt input with token cost', type: 'Gen AI' },
    'DiffViewer': { replacement: 'SuggestionDiffViewer', variant: 'inline / split', type: 'Gen AI' },
    'SuggestionDiffViewer': { replacement: 'SuggestionDiffViewer', variant: 'inline / split diff', type: 'Gen AI' },
    'ReasoningAccordion': { replacement: 'ReasoningAccordion', variant: 'collapsible chain-of-thought', type: 'Gen AI' },
    'ReasoningTrace': { replacement: 'ReasoningAccordion', variant: 'collapsible chain-of-thought', type: 'Gen AI' },
    'AdaptiveLayout': { replacement: 'AdaptiveLayout', variant: '3-tier responsive container', type: 'Layout Container' }
  };

  // M3 (Material 3) Prefix Aliases to Design System mapping
  const M3_MAP = {
    'M3Button': { replacement: 'Button', variant: 'elevated | filled | secondary | outline', type: 'M3 Alias -> Core Atom' },
    'M3IconButton': { replacement: 'Button', variant: 'ghost size="icon"', type: 'M3 Alias -> Atom Variant' },
    'M3Badge': { replacement: 'Badge', variant: 'dot | count | status', type: 'M3 Alias -> Feedback' },
    'M3Card': { replacement: 'Card', variant: 'elevated | filled | outlined', type: 'M3 Alias -> Container' },
    'M3SearchBar': { replacement: 'Input', variant: 'outlined leadingIcon={<Search />}', type: 'M3 Alias -> Form Atom' },
    'M3PrimaryTabs': { replacement: 'Tabs', variant: 'primary (underline)', type: 'M3 Alias -> Navigation' },
    'M3LinearProgress': { replacement: 'CircularProgress', variant: 'linear horizontal bar', type: 'M3 Alias -> Feedback' },
    'M3Chip': { replacement: 'Chip', variant: 'filter | input | assist | suggestion', type: 'M3 Alias -> Form Atom' },
    'M3SegmentedButton': { replacement: 'SegmentedControl', variant: 'pill segmented', type: 'M3 Alias -> Input Molecule' },
    'M3Checkbox': { replacement: 'Input', variant: 'type="checkbox" token-styled', type: 'M3 Alias -> Form Atom' },
    'M3Switch': { replacement: 'Switch', variant: 'accessible toggle', type: 'M3 Alias -> Form Atom' },
    'M3Slider': { replacement: 'Slider', variant: 'continuous | stepped | range', type: 'M3 Alias -> Form Atom' },
    'M3Radio': { replacement: 'Input', variant: 'type="radio" token-styled', type: 'M3 Alias -> Form Atom' },
    'M3Dialog': { replacement: 'AdaptiveDialog', variant: 'desktop: Modal / phone: BottomSheet', type: 'M3 Alias -> Metamorphic Dialog' },
    'M3TextField': { replacement: 'Input', variant: 'filled | outlined', type: 'M3 Alias -> Form Atom' },
    'M3Snackbar': { replacement: 'Snackbar', variant: 'transient toast notify', type: 'M3 Alias -> Feedback' },
    'M3SideSheet': { replacement: 'Sidebar', variant: 'persistent | modal-drawer', type: 'M3 Alias -> Navigation' },
    'M3Divider': { replacement: 'Divider', variant: 'full-bleed | inset', type: 'M3 Alias -> Containment' }
  };

  // Known Lucide Icons set
  const KNOWN_LUCIDE_ICONS = new Set([
    'Check', 'Search', 'Sparkles', 'Send', 'ChevronDown', 'ChevronRight', 'MoreHorizontal',
    'ChevronLeft', 'ArrowLeft', 'ArrowRight', 'CheckIcon', 'SearchIcon', 'ChevronRightIcon',
    'ChevronDownIcon', 'ChevronUpIcon', 'ChevronLeftIcon', 'CircleIcon', 'XIcon', 'MinusIcon',
    'MoreHorizontalIcon', 'GripVerticalIcon', 'PanelLeftIcon', 'PanelRightOpen', 'Plus',
    'MessageSquare', 'BrainCircuit', 'CheckCircle2', 'Layers', 'Users', 'ArrowUpDown',
    'MoreVertical', 'Bell', 'BookOpen', 'RefreshCw', 'AlertCircle', 'Info', 'BarChart',
    'Save', 'Eye', 'ChevronUp', 'Play', 'ShieldCheck', 'Icon', 'Copy', 'Trash', 'Edit',
    'Filter', 'Settings', 'Download', 'Upload', 'Calendar', 'Clock', 'ExternalLink', 'Menu', 'X'
  ]);

  const detectedComponents = new Map();

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (['node_modules', '.git', 'dist', 'build', '.next', 'out'].includes(entry)) continue;
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (/\.(tsx|jsx|js|ts)$/.test(entry)) {
        scanFile(fullPath);
      }
    }
  }

  function scanFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const rel = path.relative(process.cwd(), filePath);

    // Filter out TypeScript generics by matching JSX opening tags: <ComponentName followed by space, /, or >
    const jsxMatches = [...code.matchAll(/<([A-Z][a-zA-Z0-9]+)[\s/>]/g)];
    jsxMatches.forEach(m => {
      const name = m[1];
      // Ignore React utility wrappers, Props, Element types
      if (name.endsWith('Props') || name.startsWith('HTML') || name === 'React' || name === 'Fragment') return;

      if (!detectedComponents.has(name)) {
        detectedComponents.set(name, { count: 0, files: new Set() });
      }
      const data = detectedComponents.get(name);
      data.count++;
      data.files.add(rel);
    });
  }

  scanDirectory(resolved);

  const covered = [];
  const icons = [];
  const primitives = [];
  const organisms = [];
  const gaps = [];

  for (const [name, meta] of detectedComponents.entries()) {
    // 1. Check direct component map or M3 map
    if (COMPONENT_MAP[name]) {
      covered.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        systemMapping: COMPONENT_MAP[name].replacement,
        variant: COMPONENT_MAP[name].variant,
        type: COMPONENT_MAP[name].type,
        category: 'Direct Match'
      });
    } else if (M3_MAP[name]) {
      covered.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        systemMapping: M3_MAP[name].replacement,
        variant: M3_MAP[name].variant,
        type: M3_MAP[name].type,
        category: 'M3 Alias -> System Replacement'
      });
    } else if (KNOWN_LUCIDE_ICONS.has(name) || name.endsWith('Icon')) {
      // 2. Lucide Icons (Design system standard)
      icons.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        sampleFiles: Array.from(meta.files).slice(0, 2),
        standard: 'Lucide Icon Standard (100% Compliant)'
      });
    } else if (
      /Portal$|Overlay$|Content$|Header$|Title$|Description$|Trigger$|Viewport$|ScrollUpButton$|ScrollDownButton$|ScrollBar$|Link$/.test(name) ||
      ['Slot', 'Comp', 'TFieldValues', 'FormFieldContextValue', 'Controller', 'FormField', 'FormItemContextValue', 'Label'].includes(name)
    ) {
      // 3. Radix UI / Headless Primitives & Form Context
      primitives.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        sampleFiles: Array.from(meta.files).slice(0, 2),
        resolution: 'Collapses into unified Metamorphic components (<AdaptiveDialog>, <Tooltip>, <Sidebar>)'
      });
    } else if (
      /Page$|Layout$|Table$|Modal$|Form$|Panel$|Nav$|Bar$/.test(name) ||
      ['App', 'NavItem', 'RuleSet', 'SectionNumber', 'RuleSetNameCell', 'ChartStyle'].includes(name)
    ) {
      // 4. Application Pages & Domain Organisms
      organisms.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        sampleFiles: Array.from(meta.files).slice(0, 2),
        strategy: 'Compose using <AdaptiveLayout>, <DataTable>, <Card>, and W3C tokens'
      });
    } else {
      // 5. True Domain Gaps
      gaps.push({
        name,
        count: meta.count,
        fileCount: meta.files.size,
        sampleFiles: Array.from(meta.files).slice(0, 2)
      });
    }
  }

  return {
    totalScanned: detectedComponents.size,
    covered,
    icons,
    primitives,
    organisms,
    gaps
  };
}
