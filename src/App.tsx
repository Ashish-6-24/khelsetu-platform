import { AppProviders } from '@core/providers';
import { AppRouter } from '@core/router';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
