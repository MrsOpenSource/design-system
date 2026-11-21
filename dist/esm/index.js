/**
 * @hsb_design/design-system - Production ESM Bundle
 * Specification: Native ES Modules with DTCG Token Architecture
 */

/**
 * Enterprise Design System - Component Library Index
 * 5-Layer Cross-Platform Architecture: Foundations, Layout, Inputs, Data, Feedback, Domain (Analytics & Gen AI)
 */

export * from './types';
export * from './core';
export * from './transforms';

// Layer 1 & 3: Atoms & Action/Input Components
export * from './components/atoms/Button';
export * from './components/atoms/Input';
export * from './components/atoms/Textarea';
export * from './components/atoms/Card';
export * from './components/atoms/Checkbox';
export * from './components/atoms/RadioGroup';
export * from './components/atoms/SelectionControls';
export * from './components/atoms/Badge';
export * from './components/atoms/Avatar';
export * from './components/atoms/Switch';
export * from './components/atoms/Divider';
export * from './components/inputs/Chip';
export * from './components/inputs/Slider';
export * from './components/inputs/Stepper';
export * from './components/inputs/SegmentedControl';
export * from './components/inputs/Select';
export * from './components/forms/Form';

// Layer 2: Layout & Navigation Components (Desktop, Tablet, Phone)
export * from './components/organisms/Sidebar';
export * from './components/layout/NavigationRail';
export * from './components/layout/BottomNavigation';
export * from './components/molecules/HamburgerMenu';
export * from './components/molecules/Tabs';
export * from './components/molecules/DropdownMenu';
export * from './components/molecules/Accordion';
export * from './components/navigation/CommandPalette';
export * from './components/layout/AdaptiveLayout';

// Layer 4: Data Display & Content Components
export * from './components/data/ListItem';
export * from './components/data/Pagination';
export * from './components/dashboard/KpiCard';
export * from './components/dashboard/DataTable';
export * from './components/dashboard/ChartContainer';

// Layer 5: Feedback & Overlay Components
export * from './components/molecules/Modal';
export * from './components/feedback/BottomSheet';
export * from './components/feedback/AdaptiveDialog';
export * from './components/feedback/Snackbar';
export * from './components/feedback/Tooltip';
export * from './components/molecules/Alert';
export * from './components/feedback/CircularProgress';
export * from './components/feedback/Skeleton';

// Layer 6: Enterprise Domain Organisms (Gen AI & Analytics)
export * from './components/genai/PromptComposer';
export * from './components/genai/StreamingMessage';
export * from './components/genai/ReasoningAccordion';
export * from './components/genai/SuggestionDiffViewer';

