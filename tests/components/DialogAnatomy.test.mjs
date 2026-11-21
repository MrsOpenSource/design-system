import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';

// Step 1: Import components under test
import { Modal } from '../../src/components/molecules/Modal.ts';
import { BottomSheet } from '../../src/components/feedback/BottomSheet.ts';
import { AdaptiveDialog } from '../../src/components/feedback/AdaptiveDialog.ts';

// -----------------------------------------------------------------------------
// 1. Modal Slot Anatomy & Compound API Tests
// -----------------------------------------------------------------------------
test('Modal — Backward Compatible Prop API', () => {
  const el = Modal({
    isOpen: true,
    onClose: () => {},
    title: 'Settings Modal',
    description: 'Manage preferences',
    children: 'Modal Body Content',
    footer: React.createElement('button', null, 'Save'),
  });

  assert.ok(el, 'Modal should render when isOpen is true');
  // Root backdrop
  assert.equal(el.type, 'div');
  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const dialogContent = children.find(c => c && c.props && c.props.role === 'dialog');
  assert.ok(dialogContent, 'Content with role="dialog" must exist');
  assert.equal(dialogContent.props['aria-modal'], true);
  assert.ok(dialogContent.props.className.includes('eds-modal'));
});

test('Modal — Closed State Returns Null', () => {
  const el = Modal({ isOpen: false, onClose: () => {}, title: 'Closed' });
  assert.equal(el, null, 'Modal must return null when isOpen is false');
});

test('Modal — Compound Anatomy Attachments', () => {
  assert.ok(typeof Modal.Root === 'function', 'Modal.Root must be defined');
  assert.ok(typeof Modal.Trigger === 'function', 'Modal.Trigger must be defined');
  assert.ok(typeof Modal.Content === 'function', 'Modal.Content must be defined');
  assert.ok(typeof Modal.Close === 'function', 'Modal.Close must be defined');
  assert.ok(typeof Modal.Backdrop === 'function', 'Modal.Backdrop must be defined');
  assert.ok(typeof Modal.Header === 'function', 'Modal.Header must be defined');
  assert.ok(typeof Modal.Title === 'function', 'Modal.Title must be defined');
  assert.ok(typeof Modal.Description === 'function', 'Modal.Description must be defined');
  assert.ok(typeof Modal.Body === 'function', 'Modal.Body must be defined');
  assert.ok(typeof Modal.Footer === 'function', 'Modal.Footer must be defined');
});

test('Modal — Compound Slot Rendering & Context', () => {
  const root = Modal.Root({
    isOpen: true,
    onClose: () => {},
    children: [
      Modal.Backdrop(),
      Modal.Content({
        maxWidth: '640px',
        children: [
          Modal.Header({
            children: [
              Modal.Title({ children: 'Account Security' }),
              Modal.Description({ children: 'Two-factor auth settings' }),
              Modal.Close(),
            ],
          }),
          Modal.Body({ children: 'Security form fields' }),
          Modal.Footer({ children: 'Action Buttons' }),
        ],
      }),
    ],
  });

  assert.ok(root, 'Modal.Root must render');
});

// -----------------------------------------------------------------------------
// 2. BottomSheet Slot Anatomy & Compound API Tests
// -----------------------------------------------------------------------------
test('BottomSheet — Backward Compatible Prop API', () => {
  const el = BottomSheet({
    isOpen: true,
    onClose: () => {},
    title: 'Sheet Menu',
    description: 'Select an action',
    children: 'Options List',
  });

  assert.ok(el, 'BottomSheet should render when isOpen is true');
  const children = Array.isArray(el.props.children) ? el.props.children : [el.props.children];
  const sheetContent = children.find(c => c && c.props && c.props.role === 'dialog');
  assert.ok(sheetContent, 'Sheet content container with role="dialog" must exist');
  assert.ok(sheetContent.props.className.includes('eds-bottom-sheet'));
});

test('BottomSheet — Closed State Returns Null', () => {
  const el = BottomSheet({ isOpen: false, onClose: () => {} });
  assert.equal(el, null, 'BottomSheet must return null when isOpen is false');
});

test('BottomSheet — Compound Anatomy Attachments', () => {
  assert.ok(typeof BottomSheet.Root === 'function', 'BottomSheet.Root must be defined');
  assert.ok(typeof BottomSheet.Trigger === 'function', 'BottomSheet.Trigger must be defined');
  assert.ok(typeof BottomSheet.Content === 'function', 'BottomSheet.Content must be defined');
  assert.ok(typeof BottomSheet.Handle === 'function', 'BottomSheet.Handle must be defined');
  assert.ok(typeof BottomSheet.Close === 'function', 'BottomSheet.Close must be defined');
  assert.ok(typeof BottomSheet.Backdrop === 'function', 'BottomSheet.Backdrop must be defined');
  assert.ok(typeof BottomSheet.Header === 'function', 'BottomSheet.Header must be defined');
  assert.ok(typeof BottomSheet.Title === 'function', 'BottomSheet.Title must be defined');
  assert.ok(typeof BottomSheet.Description === 'function', 'BottomSheet.Description must be defined');
  assert.ok(typeof BottomSheet.Body === 'function', 'BottomSheet.Body must be defined');
  assert.ok(typeof BottomSheet.Footer === 'function', 'BottomSheet.Footer must be defined');
});

// -----------------------------------------------------------------------------
// 3. AdaptiveDialog Slot Anatomy & Compound API Tests
// -----------------------------------------------------------------------------
test('AdaptiveDialog — Backward Compatible Prop API', () => {
  const el = AdaptiveDialog({
    isOpen: true,
    onClose: () => {},
    title: 'Responsive Dialog',
    description: 'Adapts to screen size',
    children: 'Dialog Body',
  });

  assert.ok(el, 'AdaptiveDialog should render');
});

test('AdaptiveDialog — Compound Anatomy Attachments', () => {
  assert.ok(typeof AdaptiveDialog.Root === 'function', 'AdaptiveDialog.Root must be defined');
  assert.ok(typeof AdaptiveDialog.Trigger === 'function', 'AdaptiveDialog.Trigger must be defined');
  assert.ok(typeof AdaptiveDialog.Content === 'function', 'AdaptiveDialog.Content must be defined');
  assert.ok(typeof AdaptiveDialog.Close === 'function', 'AdaptiveDialog.Close must be defined');
  assert.ok(typeof AdaptiveDialog.Backdrop === 'function', 'AdaptiveDialog.Backdrop must be defined');
  assert.ok(typeof AdaptiveDialog.Header === 'function', 'AdaptiveDialog.Header must be defined');
  assert.ok(typeof AdaptiveDialog.Title === 'function', 'AdaptiveDialog.Title must be defined');
  assert.ok(typeof AdaptiveDialog.Description === 'function', 'AdaptiveDialog.Description must be defined');
  assert.ok(typeof AdaptiveDialog.Body === 'function', 'AdaptiveDialog.Body must be defined');
  assert.ok(typeof AdaptiveDialog.Footer === 'function', 'AdaptiveDialog.Footer must be defined');
});

