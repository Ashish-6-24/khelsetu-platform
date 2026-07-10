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

  http.post('/auth/forgot-password', async ({ request }) => {
    const body = (await request.json()) as { email: string };
    if (!body.email) {
      return HttpResponse.json(
        { error: { message: 'Email is required' } },
        { status: 400 },
      );
    }
    return HttpResponse.json({ success: true, message: 'Reset email sent' });
  }),

  http.post('/auth/reset-password', async ({ request }) => {
    const body = (await request.json()) as {
      token: string;
      password: string;
    };
    if (!body.token || !body.password) {
      return HttpResponse.json(
        { error: { message: 'Token and password are required' } },
        { status: 400 },
      );
    }
    return HttpResponse.json({ success: true, message: 'Password reset' });
  }),

  http.post('/auth/change-password', async ({ request }) => {
    const body = (await request.json()) as {
      currentPassword: string;
      newPassword: string;
    };
    if (!body.currentPassword || !body.newPassword) {
      return HttpResponse.json(
        { error: { message: 'Both passwords are required' } },
        { status: 400 },
      );
    }
    return HttpResponse.json({ success: true, message: 'Password changed' });
  }),

  http.delete('/auth/profile', () => {
    return HttpResponse.json({ success: true, message: 'Account deleted' });
  }),
];
