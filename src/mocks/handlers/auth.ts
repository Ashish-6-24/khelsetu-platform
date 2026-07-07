import { HttpResponse, http } from 'msw';

const MOCK_TOKENS = {
  accessToken: 'mock-access-token-dev',
  refreshToken: 'mock-refresh-token-dev',
  expiresIn: 3600,
};

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email && body.password) {
      return HttpResponse.json({
        user: {
          id: '1',
          email: body.email,
          name: 'Test User',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tokens: MOCK_TOKENS,
      });
    }
    return HttpResponse.json(
      { error: { message: 'Invalid credentials' } },
      { status: 401 },
    );
  }),

  http.post('/auth/register', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      name: string;
      password: string;
    };
    return HttpResponse.json({
      user: {
        id: '2',
        email: body.email,
        name: body.name,
        role: 'organizer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: MOCK_TOKENS,
    });
  }),

  http.post('/auth/logout', () => {
    return HttpResponse.json({ success: true });
  }),

  http.post('/auth/refresh', () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@khelsetu.com',
        name: 'Test User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: MOCK_TOKENS,
    });
  }),

  http.get('/auth/profile', () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@khelsetu.com',
      name: 'Test User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),
];
