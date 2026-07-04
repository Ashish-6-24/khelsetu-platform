self.addEventListener('message', async (event) => {
  if (event.origin && event.origin !== self.location.origin) {
    return;
  }
  const { type, data } = event.data;

  switch (type) {
    case 'SYNC_OFFLINE_DATA':
      try {
        const result = await syncData(data);
        self.postMessage({ type: 'SYNC_SUCCESS', data: result });
      } catch (error) {
        self.postMessage({
          type: 'SYNC_ERROR',
          error: (error as Error).message,
        });
      }
      break;

    case 'CALCULATE_STANDINGS':
      try {
        const standings = calculateStandings(data);
        self.postMessage({ type: 'STANDINGS_READY', data: standings });
      } catch (error) {
        self.postMessage({
          type: 'CALCULATION_ERROR',
          error: (error as Error).message,
        });
      }
      break;

    default:
      self.postMessage({ type: 'UNKNOWN_COMMAND' });
  }
});

async function syncData(data: unknown): Promise<unknown> {
  // Simulate sync operation
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}

function calculateStandings(matches: unknown[]): unknown[] {
  // Simulate standings calculation
  return matches.map((_, idx) => ({
    rank: idx + 1,
    team: `Team ${idx + 1}`,
    points: Math.floor(Math.random() * 20),
  }));
}

export {};
