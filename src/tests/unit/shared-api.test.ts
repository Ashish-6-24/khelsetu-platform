import { matchService, tournamentService } from '@shared/api/tournaments';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@lib/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const { api } = await import('@lib/axios');

const mockResponse = (data: unknown) =>
  ({ data, status: 200, statusText: 'OK', headers: {}, config: {} }) as never;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('tournamentService', () => {
  it('getAll calls correct endpoint', async () => {
    vi.mocked(api.get).mockResolvedValue(mockResponse([{ id: '1' }]));
    const result = await tournamentService.getAll();
    expect(api.get).toHaveBeenCalledWith(expect.any(String), {
      params: undefined,
    });
    expect(result).toEqual([{ id: '1' }]);
  });

  it('getById calls correct endpoint', async () => {
    vi.mocked(api.get).mockResolvedValue(mockResponse({ id: 't1' }));
    const result = await tournamentService.getById('t1');
    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('t1'));
    expect(result).toEqual({ id: 't1' });
  });

  it('create posts data', async () => {
    vi.mocked(api.post).mockResolvedValue(mockResponse({ id: 'new' }));
    const result = await tournamentService.create({
      name: 'Test',
      sport: 'cricket',
      format: 'league',
      startDate: '2026-01-01',
      endDate: '2026-01-02',
      venue: 'Test Ground',
    } as never);
    expect(api.post).toHaveBeenCalled();
    expect(result).toEqual({ id: 'new' });
  });

  it('delete calls correct endpoint', async () => {
    vi.mocked(api.delete).mockResolvedValue(mockResponse(undefined));
    await tournamentService.delete('t1');
    expect(api.delete).toHaveBeenCalledWith(expect.stringContaining('t1'));
  });
});

describe('matchService', () => {
  it('getAll calls correct endpoint', async () => {
    vi.mocked(api.get).mockResolvedValue(mockResponse([{ id: 'm1' }]));
    const result = await matchService.getAll();
    expect(api.get).toHaveBeenCalled();
    expect(result).toEqual([{ id: 'm1' }]);
  });

  it('getById calls correct endpoint', async () => {
    vi.mocked(api.get).mockResolvedValue(mockResponse({ id: 'm1' }));
    const result = await matchService.getById('m1');
    expect(api.get).toHaveBeenCalledWith(expect.stringContaining('m1'));
    expect(result).toEqual({ id: 'm1' });
  });

  it('create posts data', async () => {
    vi.mocked(api.post).mockResolvedValue(mockResponse({ id: 'new' }));
    const result = await matchService.create({
      tournamentId: 't1',
      teamAId: 'a1',
      teamBId: 'b1',
      scheduledAt: '2026-01-01',
      venue: 'Ground 1',
    });
    expect(api.post).toHaveBeenCalled();
    expect(result).toEqual({ id: 'new' });
  });

  it('updateScore posts score', async () => {
    vi.mocked(api.post).mockResolvedValue(mockResponse({ id: 'm1' }));
    const result = await matchService.updateScore('m1', {
      teamAScore: 150,
      teamBScore: 140,
    });
    expect(api.post).toHaveBeenCalled();
    expect(result).toEqual({ id: 'm1' });
  });
});
