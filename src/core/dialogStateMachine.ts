import React, { useState, useEffect, useRef, useCallback } from 'react';

export type DialogMode = 'desktop' | 'mobile';
export type DialogStage = 'closed' | 'open' | 'dragging' | 'dismissing';

export interface DialogMachineConfig {
  initialWidth?: number;
  breakpoint?: number;
  isOpen?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  dragThreshold?: number;
  onClose?: () => void;
}

export interface DialogMachineState {
  mode: DialogMode;
  stage: DialogStage;
  isOpen: boolean;
  dragOffset: number;
  breakpoint: number;
  width: number;
}

export type DialogMachineEvent =
  | { type: 'VIEWPORT_RESIZE'; width: number }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'KEY_DOWN'; key: string }
  | { type: 'BACKDROP_CLICK' }
  | { type: 'TOUCH_START'; y: number }
  | { type: 'TOUCH_MOVE'; y: number }
  | { type: 'TOUCH_END' };

export interface DialogStateMachine {
  getState: () => DialogMachineState;
  send: (event: DialogMachineEvent) => void;
  subscribe: (listener: (state: DialogMachineState) => void) => () => void;
}

export function createDialogStateMachine(config: DialogMachineConfig = {}): DialogStateMachine {
  const breakpoint = config.breakpoint ?? 600;
  const initialWidth =
    config.initialWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
  const initialMode: DialogMode = initialWidth <= breakpoint ? 'mobile' : 'desktop';
  const initialIsOpen = Boolean(config.isOpen);
  const initialStage: DialogStage = initialIsOpen ? 'open' : 'closed';
  const closeOnEscape = config.closeOnEscape ?? true;
  const closeOnBackdropClick = config.closeOnBackdropClick ?? true;
  const dragThreshold = config.dragThreshold ?? 100;
  const onClose = config.onClose;

  let state: DialogMachineState = {
    mode: initialMode,
    stage: initialStage,
    isOpen: initialIsOpen,
    dragOffset: 0,
    breakpoint,
    width: initialWidth,
  };

  let startTouchY = 0;
  const listeners = new Set<(state: DialogMachineState) => void>();

  function notify() {
    listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error in dialog state machine listener:', err);
      }
    });
  }

  function send(event: DialogMachineEvent): void {
    switch (event.type) {
      case 'VIEWPORT_RESIZE': {
        const width = event.width;
        const mode: DialogMode = width <= state.breakpoint ? 'mobile' : 'desktop';
        state = {
          ...state,
          width,
          mode,
        };
        notify();
        break;
      }

      case 'OPEN': {
        state = {
          ...state,
          isOpen: true,
          stage: 'open',
          dragOffset: 0,
        };
        notify();
        break;
      }

      case 'CLOSE': {
        state = {
          ...state,
          isOpen: false,
          stage: 'closed',
          dragOffset: 0,
        };
        notify();
        if (onClose) {
          onClose();
        }
        break;
      }

      case 'KEY_DOWN': {
        if (event.key === 'Escape' && closeOnEscape) {
          send({ type: 'CLOSE' });
        }
        break;
      }

      case 'BACKDROP_CLICK': {
        if (closeOnBackdropClick) {
          send({ type: 'CLOSE' });
        }
        break;
      }

      case 'TOUCH_START': {
        startTouchY = event.y;
        state = {
          ...state,
          stage: 'dragging',
          dragOffset: 0,
        };
        notify();
        break;
      }

      case 'TOUCH_MOVE': {
        const delta = event.y - startTouchY;
        const dragOffset = Math.max(0, delta);
        state = {
          ...state,
          dragOffset,
        };
        notify();
        break;
      }

      case 'TOUCH_END': {
        if (state.dragOffset >= dragThreshold) {
          state = {
            ...state,
            stage: 'dismissing',
          };
          notify();
          if (onClose) {
            onClose();
          }
        } else {
          state = {
            ...state,
            stage: 'open',
            dragOffset: 0,
          };
          notify();
        }
        break;
      }
    }
  }

  function getState(): DialogMachineState {
    return state;
  }

  function subscribe(listener: (state: DialogMachineState) => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getState,
    send,
    subscribe,
  };
}

export function useDialogStateMachine(config: DialogMachineConfig = {}) {
  const machineRef = useRef<DialogStateMachine | null>(null);
  if (!machineRef.current) {
    machineRef.current = createDialogStateMachine(config);
  }

  const machine = machineRef.current;
  const [machineState, setMachineState] = useState<DialogMachineState>(() => machine.getState());

  useEffect(() => {
    return machine.subscribe((newState) => {
      setMachineState(newState);
    });
  }, [machine]);

  const send = useCallback((event: DialogMachineEvent) => {
    machine.send(event);
  }, [machine]);

  return {
    state: machineState,
    send,
    machine,
  };
}

