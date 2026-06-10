import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';
import { CommandPaletteProvider } from '@components/command/CommandPalette';
import { ToastProvider } from '@components/ui/Toast';

function App() {
  return (
    <AppProviders>
      <ToastProvider>
        <CommandPaletteProvider>
          <AppRouter />
        </CommandPaletteProvider>
      </ToastProvider>
    </AppProviders>
  );
}

export default App;
