import { useEffect } from 'react';

type KeyCombo = {
  /** Lowercase character or special key. e.g. 'k', '/', '?', 'Escape' */
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
};

interface ShortcutOptions {
  /** Allow the shortcut to fire even when the user is typing in an input/textarea/contenteditable. */
  ignoreInputs?: boolean;
  /** When true, the shortcut listens at the capture phase. */
  capture?: boolean;
}

const isFormElement = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    el.isContentEditable
  );
};

const matchesCombo = (e: KeyboardEvent, combo: KeyCombo): boolean => {
  if (e.key.toLowerCase() !== combo.key.toLowerCase()) return false;
  if (Boolean(combo.meta) !== e.metaKey) return false;
  if (Boolean(combo.ctrl) !== e.ctrlKey) return false;
  if (Boolean(combo.shift) !== e.shiftKey) return false;
  if (Boolean(combo.alt) !== e.altKey) return false;
  return true;
};

/**
 * Register a global keyboard shortcut.
 *
 * The Cmd/Ctrl modifier is automatic: `useShortcut('k')` will listen for
 * both `Cmd+K` (macOS) and `Ctrl+K` (Windows/Linux). Pass `meta: true`
 * explicitly if you need to *require* the Cmd/Ctrl modifier.
 */
export const useShortcut = (
  combo: KeyCombo,
  handler: (e: KeyboardEvent) => void,
  options: ShortcutOptions = {},
): void => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Auto-flip to platform: Cmd on macOS, Ctrl elsewhere for letter shortcuts.
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const wantsCmd = combo.meta ?? !combo.ctrl;
      const effective: KeyCombo = {
        ...combo,
        meta: wantsCmd ? e.metaKey : false,
        ctrl: wantsCmd ? e.ctrlKey : (combo.ctrl ?? false),
      };
      if (isMac && !combo.meta && !combo.ctrl) {
        // Letter shortcuts become Cmd on mac by default
        effective.meta = e.metaKey;
        effective.ctrl = false;
      } else if (!isMac && !combo.meta && !combo.ctrl) {
        effective.meta = false;
        effective.ctrl = e.ctrlKey;
      }

      if (!matchesCombo(e, effective)) return;
      if (!options.ignoreInputs && isFormElement(e.target)) return;

      e.preventDefault();
      handler(e);
    };
    window.addEventListener('keydown', onKey, { capture: options.capture });
    return () =>
      window.removeEventListener('keydown', onKey, {
        capture: options.capture,
      });
  }, [combo, handler, options.ignoreInputs, options.capture]);
};
