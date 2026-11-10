import React from 'react';
import figma from '@figma/code-connect';
import {
  Button,
  KpiCard,
  DataTable,
  AdaptiveLayout,
  PromptComposer,
  ReasoningAccordion,
  StreamingMessage,
  SuggestionDiffViewer
} from '@hsb_design/design-system';

/**
 * Figma Code Connect Mapping for @hsb_design/design-system
 * Links Figma canvas nodes in Dev Mode directly to production React components.
 * Learn more: https://figma.com/code-connect
 */

// 1. Button Mapping
figma.connect(Button, 'https://figma.com/design/:fileKey/:fileName?node-id=:buttonNodeId', {
  props: {
    variant: figma.enum('Variant', {
      'Primary': 'primary',
      'Secondary': 'secondary',
      'Outline': 'outline',
      'Ghost': 'ghost',
      'Danger': 'danger',
      'AI': 'ai'
    }),
    disabled: figma.boolean('Disabled'),
    children: figma.string('Label')
  },
  example: (props) => (
    <Button variant={props.variant} disabled={props.disabled}>
      {props.children}
    </Button>
  )
});

// 2. KpiCard Mapping
figma.connect(KpiCard, 'https://figma.com/design/:fileKey/:fileName?node-id=:kpiCardNodeId', {
  props: {
    title: figma.string('Title'),
    value: figma.string('Value'),
    delta: figma.string('Delta')
  },
  example: (props) => (
    <KpiCard
      title={props.title}
      value={props.value}
      delta={props.delta}
      sparklineData={[40, 52, 68, 72, 85]}
    />
  )
});

// 3. DataTable Mapping
figma.connect(DataTable, 'https://figma.com/design/:fileKey/:fileName?node-id=:dataTableNodeId', {
  props: {
    dense: figma.boolean('Dense'),
    striped: figma.boolean('Striped')
  },
  example: (props) => (
    <DataTable
      columns={[{ key: 'name', label: 'Account' }, { key: 'mrr', label: 'MRR' }]}
      data={[{ id: '1', name: 'Acme Corp', mrr: '$42,500' }]}
    />
  )
});

// 4. PromptComposer Mapping
figma.connect(PromptComposer, 'https://figma.com/design/:fileKey/:fileName?node-id=:promptComposerNodeId', {
  props: {
    placeholder: figma.string('Placeholder')
  },
  example: (props) => (
    <PromptComposer
      placeholder={props.placeholder || 'Ask AI to synthesize insights...'}
      onSubmit={(val) => console.log(val)}
    />
  )
});

// 5. AdaptiveLayout Mapping
figma.connect(AdaptiveLayout, 'https://figma.com/design/:fileKey/:fileName?node-id=:adaptiveLayoutNodeId', {
  props: {
    activeNav: figma.string('Active Section')
  },
  example: (props) => (
    <AdaptiveLayout activeNav={props.activeNav || 'dashboard'}>
      {/* Page Content */}
    </AdaptiveLayout>
  )
});

