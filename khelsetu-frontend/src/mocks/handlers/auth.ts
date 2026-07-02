import { HttpResponse, http } from 'msw';

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email && body.password) {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { id: '1', email: body.email, name: 'Test User', role: 'admin' },
      });
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as { email: string; name: string };
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: { id: '2', email: body.email, name: body.name, role: 'organizer' },
    });
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@khelsetu.com',
      name: 'Test User',
      role: 'admin',
    });
  }),
];
