export const websocketUtils = {
  isConnectionError: (error: unknown) => {
    if (error instanceof Error) {
      return error.message.includes('connection');
    }
    return false;
  },
  formatWebSocketUrl: (baseUrl: string, path: string) =>
    `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`,
};
