import { useEffect, useRef, useMemo } from 'react';

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
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const comboKey = useMemo(
    () => JSON.stringify(combo),
    [JSON.stringify(combo)],
  );

  const optionsKey = useMemo(
    () => JSON.stringify(options),
    [JSON.stringify(options)],
  );

  useEffect(() => {
    const parsedCombo: KeyCombo = JSON.parse(comboKey);
    const parsedOptions: ShortcutOptions = JSON.parse(optionsKey);
    const onKey = (e: KeyboardEvent) => {
      // Auto-flip to platform: Cmd on macOS, Ctrl elsewhere for letter shortcuts.
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const wantsCmd = parsedCombo.meta ?? !parsedCombo.ctrl;
      const effective: KeyCombo = {
        ...parsedCombo,
        meta: wantsCmd ? e.metaKey : false,
        ctrl: wantsCmd ? e.ctrlKey : (parsedCombo.ctrl ?? false),
      };
      if (isMac && !parsedCombo.meta && !parsedCombo.ctrl) {
        // Letter shortcuts become Cmd on mac by default
        effective.meta = e.metaKey;
        effective.ctrl = false;
      } else if (!isMac && !parsedCombo.meta && !parsedCombo.ctrl) {
        effective.meta = false;
        effective.ctrl = e.ctrlKey;
      }

      if (!matchesCombo(e, effective)) return;
      if (!parsedOptions.ignoreInputs && isFormElement(e.target)) return;

      e.preventDefault();
      handlerRef.current(e);
    };
    window.addEventListener('keydown', onKey, { capture: parsedOptions.capture });
    return () =>
      window.removeEventListener('keydown', onKey, {
        capture: parsedOptions.capture,
      });
  }, [comboKey, optionsKey]);
};
