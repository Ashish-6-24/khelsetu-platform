export const authUtils = {
  isAuthenticated: (tokens: { accessToken: string } | null) =>
    !!tokens?.accessToken,
  getTokenExpiry: (tokens: { accessTokenExpiry?: string } | null) =>
    tokens?.accessTokenExpiry ? new Date(tokens.accessTokenExpiry) : null,
};
