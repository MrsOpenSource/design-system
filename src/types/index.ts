/**
 * Core Type Definitions for Enterprise Design System
 */

export type DeviceMode = 'laptop' | 'tablet' | 'mobile';
export type DensityMode = 'compact' | 'comfortable' | 'spacious';
export type ThemeMode = 'light' | 'dark';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface KpiDelta {
  value: string;
  trend: TrendDirection;
  context?: string;
  isPositiveGood?: boolean; // Default true (up is green, down is red)
}

export interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: KpiDelta;
  subtext?: string;
  targetProgress?: {
    current: number;
    target: number;
    label?: string;
  };
  sparkline?: {
    data: number[];
    type?: 'area' | 'bar' | 'binary';
    labels?: string[];
  };
  infoTooltip?: string;
  loading?: boolean;
  className?: string;
  onDetailsClick?: () => void;
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (row: T, index: number) => any;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  density?: DensityMode;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: () => void;
  mobileCardTransform?: boolean;
  loading?: boolean;
  searchPlaceholder?: string;
}

export interface ContextChip {
  id: string;
  label: string;
  icon?: string;
  type: 'file' | 'table' | 'metric' | 'prompt';
}

export interface SlashCommand {
  command: string;
  label: string;
  description: string;
}

export interface PromptComposerProps {
  placeholder?: string;
  contextChips?: ContextChip[];
  onRemoveChip?: (id: string) => void;
  onAddChip?: () => void;
  onSubmit: (prompt: string) => void;
  onStop?: () => void;
  isStreaming?: boolean;
  tokenCount?: number;
  maxTokens?: number;
  slashCommands?: SlashCommand[];
}

export interface Citation {
  id: number;
  documentTitle: string;
  pageNumber?: number | string;
  confidenceScore: number; // e.g. 0.96 for 96%
  excerpt: string;
  sourceUrl?: string;
}

export interface ReasoningStep {
  id: string;
  title: string;
  durationMs?: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  detail?: string;
  toolCall?: {
    name: string;
    params?: Record<string, any>;
  };
}

export interface SuggestionDiffProps {
  title?: string;
  deletedLines: string[];
  addedLines: string[];
  explanation?: string;
  onAccept: () => void;
  onReject: () => void;
  onRefineWithAi?: () => void;
}

