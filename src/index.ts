/**
 * Enterprise Design System - Component Library Index
 * 5-Layer Cross-Platform Architecture: Foundations, Layout, Inputs, Data, Feedback, Domain (Analytics & Gen AI)
 */

export * from './types';

// Layer 1 & 3: Atoms & Action/Input Components
export * from './components/atoms/Button';
export * from './components/atoms/Input';
export * from './components/atoms/Badge';
export * from './components/atoms/Avatar';
export * from './components/atoms/Switch';
export * from './components/inputs/Chip';
export * from './components/inputs/Slider';
export * from './components/inputs/Stepper';
export * from './components/inputs/SegmentedControl';

// Layer 2: Layout & Navigation Components (Desktop, Tablet, Phone)
export * from './components/organisms/Sidebar';
export * from './components/layout/NavigationRail';
export * from './components/layout/BottomNavigation';
export * from './components/molecules/HamburgerMenu';
export * from './components/molecules/Tabs';
export * from './components/layout/AdaptiveLayout';

// Layer 4: Data Display & Content Components
export * from './components/data/ListItem';
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

// Layer 6: Enterprise Domain Organisms (Gen AI & Analytics)
export * from './components/genai/PromptComposer';
export * from './components/genai/StreamingMessage';
export * from './components/genai/ReasoningAccordion';
export * from './components/genai/SuggestionDiffViewer';
