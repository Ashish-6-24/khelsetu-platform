import { RegisterPage } from '@pages/auth/register/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';

vi.mock('@features/auth/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Register Page Integration', () => {
  it('should render registration form with all fields', () => {
    renderWithRouter(<RegisterPage />);
    expect(
      screen.getByRole('heading', { name: /create your account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^full name\b/i, { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^work email\b/i, { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^password\b/i, { selector: 'input' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^create account$/i }),
    ).toBeInTheDocument();
  });

  it('should display link to login page', () => {
    renderWithRouter(<RegisterPage />);
    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/auth/login');
  });
});
