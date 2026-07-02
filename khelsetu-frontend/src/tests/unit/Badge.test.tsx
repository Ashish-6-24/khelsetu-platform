import { Badge } from '@shared/components/ui/Badge';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Badge Component', () => {
  it('should render with default variant', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText(/default/i)).toBeInTheDocument();
  });

  it('should render with different variants', () => {
    const variants = [
      'default',
      'success',
      'warning',
      'error',
      'info',
      'live',
      'gold',
    ] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with pulse animation', () => {
    render(<Badge pulse>Live</Badge>);
    expect(screen.getByText(/live/i)).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(<Badge className="custom-class">Badge</Badge>);
    expect(screen.getByText(/badge/i)).toHaveClass('custom-class');
  });
});
