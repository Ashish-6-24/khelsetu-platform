import { LoginPage } from '@pages/auth/login/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';

vi.mock('@hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Login Page Integration', () => {
  it('should render login form with all fields', () => {
    renderWithRouter(<LoginPage />);
    expect(
      screen.getByRole('heading', { name: /welcome back/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^email\b/i, { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^password\b/i, { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^sign in$/i }),
    ).toBeInTheDocument();
  });

  it('should display link to registration page', () => {
    renderWithRouter(<LoginPage />);
    const link = screen.getByRole('link', { name: /create an account/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/auth/register');
  });
});
