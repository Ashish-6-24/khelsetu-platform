import { createContext, useContext, useMemo } from 'react';

interface PaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export const useCommandPalette = (): PaletteContextValue => {
  const ctx = useContext(PaletteContext);
  return useMemo<PaletteContextValue>(
    () =>
      ctx ?? {
        open: false,
        setOpen: () => {},
        toggle: () => {},
      },
    [ctx],
  );
};

export type { PaletteContextValue };
export { PaletteContext };
