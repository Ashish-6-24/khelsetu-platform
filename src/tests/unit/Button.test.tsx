import { Button } from '@shared/ui/Button';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(cleanup);

describe('Button Component', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('should render with primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(
      screen.getByRole('button', { name: /primary/i }),
    ).toBeInTheDocument();
  });

  it('should render with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(
      screen.getByRole('button', { name: /secondary/i }),
    ).toBeInTheDocument();
  });

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(
      screen.getByRole('button', { name: /outline/i }),
    ).toBeInTheDocument();
  });

  it('should render with danger variant', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button', { name: /danger/i })).toBeInTheDocument();
  });

  it('should render with success variant', () => {
    render(<Button variant="success">Success</Button>);
    expect(
      screen.getByRole('button', { name: /success/i }),
    ).toBeInTheDocument();
  });

  it('should render with small size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: /small/i })).toBeInTheDocument();
  });

  it('should render with large size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled();
  });

  it('should render with loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(
      screen.getByRole('button', { name: /loading/i }),
    ).toBeInTheDocument();
  });
});
