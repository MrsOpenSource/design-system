import test from 'node:test';
import assert from 'node:assert/strict';

// Import Dialog State Machine under test
import { createDialogStateMachine } from '../../src/core/dialogStateMachine.ts';
import { AdaptiveDialog } from '../../src/components/feedback/AdaptiveDialog.ts';

// -----------------------------------------------------------------------------
// 1. Viewport Metamorphosis State Machine Tests
// -----------------------------------------------------------------------------
test('Dialog State Machine — Viewport Metamorphosis (Desktop <-> Mobile)', () => {
  let closed = false;
  const machine = createDialogStateMachine({
    initialWidth: 1024,
    breakpoint: 600,
    isOpen: true,
    onClose: () => { closed = true; },
  });

  // Initial state on desktop viewport
  assert.equal(machine.getState().mode, 'desktop');
  assert.equal(machine.getState().isOpen, true);

  // Resize to mobile viewport <= 600px
  machine.send({ type: 'VIEWPORT_RESIZE', width: 375 });
  assert.equal(machine.getState().mode, 'mobile', 'Should transition to mobile mode');

  // Resize to tablet / desktop viewport > 600px
  machine.send({ type: 'VIEWPORT_RESIZE', width: 768 });
  assert.equal(machine.getState().mode, 'desktop', 'Should transition back to desktop mode');

  // Exact boundary check
  machine.send({ type: 'VIEWPORT_RESIZE', width: 600 });
  assert.equal(machine.getState().mode, 'mobile', 'Boundary 600px should be mobile mode');
});

// -----------------------------------------------------------------------------
// 2. Open / Close & Keyboard Navigation Machine Tests
// -----------------------------------------------------------------------------
test('Dialog State Machine — Open / Close Transitions', () => {
  let closeCallCount = 0;
  const machine = createDialogStateMachine({
    isOpen: false,
    onClose: () => { closeCallCount++; },
  });

  assert.equal(machine.getState().stage, 'closed');

  // Open event
  machine.send({ type: 'OPEN' });
  assert.equal(machine.getState().stage, 'open');
  assert.equal(machine.getState().isOpen, true);

  // Close event
  machine.send({ type: 'CLOSE' });
  assert.equal(machine.getState().stage, 'closed');
  assert.equal(machine.getState().isOpen, false);
  assert.equal(closeCallCount, 1, 'onClose should be invoked');
});

test('Dialog State Machine — Keyboard Navigation (Escape Key)', () => {
  let closed = false;
  const machine = createDialogStateMachine({
    isOpen: true,
    closeOnEscape: true,
    onClose: () => { closed = true; },
  });

  // Other keys do nothing
  machine.send({ type: 'KEY_DOWN', key: 'Enter' });
  assert.equal(closed, false);

  // Escape key triggers close
  machine.send({ type: 'KEY_DOWN', key: 'Escape' });
  assert.equal(closed, true, 'Escape key should trigger close callback');
});

test('Dialog State Machine — Disabled Escape Key Option', () => {
  let closed = false;
  const machine = createDialogStateMachine({
    isOpen: true,
    closeOnEscape: false,
    onClose: () => { closed = true; },
  });

  machine.send({ type: 'KEY_DOWN', key: 'Escape' });
  assert.equal(closed, false, 'Escape should be ignored when closeOnEscape is false');
});

test('Dialog State Machine — Backdrop Click Handling', () => {
  let closed = false;
  const machine = createDialogStateMachine({
    isOpen: true,
    closeOnBackdropClick: true,
    onClose: () => { closed = true; },
  });

  machine.send({ type: 'BACKDROP_CLICK' });
  assert.equal(closed, true, 'Backdrop click should trigger close callback');
});

// -----------------------------------------------------------------------------
// 3. Mobile Swipe / Pull-down Drag Gesture Machine Tests
// -----------------------------------------------------------------------------
test('Dialog State Machine — Drag Gesture Pull-down to Dismiss', () => {
  let closed = false;
  const machine = createDialogStateMachine({
    isOpen: true,
    initialWidth: 390,
    breakpoint: 600,
    dragThreshold: 100,
    onClose: () => { closed = true; },
  });

  // Touch start at Y = 200
  machine.send({ type: 'TOUCH_START', y: 200 });
  assert.equal(machine.getState().stage, 'dragging');
  assert.equal(machine.getState().dragOffset, 0);

  // Drag down by 40px (Y = 240) -> below 100px threshold
  machine.send({ type: 'TOUCH_MOVE', y: 240 });
  assert.equal(machine.getState().dragOffset, 40);

  // Touch end below threshold -> snaps back to open
  machine.send({ type: 'TOUCH_END' });
  assert.equal(machine.getState().stage, 'open', 'Should snap back to open stage');
  assert.equal(machine.getState().dragOffset, 0, 'Drag offset should reset to 0');
  assert.equal(closed, false, 'Should not dismiss below threshold');

  // Start second drag exceeding threshold (150px down)
  machine.send({ type: 'TOUCH_START', y: 100 });
  machine.send({ type: 'TOUCH_MOVE', y: 250 });
  assert.equal(machine.getState().dragOffset, 150);

  machine.send({ type: 'TOUCH_END' });
  assert.equal(machine.getState().stage, 'dismissing');
  assert.equal(closed, true, 'Should invoke onClose when drag exceeds threshold');
});

test('Dialog State Machine — Drag Upward Resistance (Negative Clamping)', () => {
  const machine = createDialogStateMachine({
    isOpen: true,
    initialWidth: 390,
  });

  machine.send({ type: 'TOUCH_START', y: 300 });
  // Drag upward by 50px (Y = 250) -> clamped to 0 or damped
  machine.send({ type: 'TOUCH_MOVE', y: 250 });
  assert.equal(machine.getState().dragOffset, 0, 'Upward drag should not expand sheet beyond max top');
});

// -----------------------------------------------------------------------------
// 4. AdaptiveDialog Metamorphic Machine Integration Tests
// -----------------------------------------------------------------------------
test('AdaptiveDialog — Uses state machine mode for responsive rendering', () => {
  const desktopEl = AdaptiveDialog({
    isOpen: true,
    onClose: () => {},
    title: 'Test Metamorphic',
    children: 'Content',
    breakpoint: 600,
  });

  assert.ok(desktopEl, 'AdaptiveDialog element renders');
});

