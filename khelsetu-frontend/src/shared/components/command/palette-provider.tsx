import type { ReactNode } from 'react';

import { PaletteContext, type PaletteContextValue } from './palette-context';

interface PaletteProviderProps {
  value: PaletteContextValue;
  children: ReactNode;
}

export const PaletteContextProvider = ({
  value,
  children,
}: PaletteProviderProps) => {
  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
};
