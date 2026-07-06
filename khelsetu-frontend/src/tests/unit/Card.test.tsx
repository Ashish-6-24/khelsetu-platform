import { Card, CardBody, CardFooter, CardHeader } from '@shared/ui/Card';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Card Component', () => {
  it('should render card with body', () => {
    render(
      <Card>
        <CardBody>Card Content</CardBody>
      </Card>,
    );
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  it('should render card with header', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Content</CardBody>
      </Card>,
    );
    expect(screen.getByText(/header/i)).toBeInTheDocument();
  });

  it('should render card with footer', () => {
    render(
      <Card>
        <CardBody>Content</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });

  it('should apply hover class when hover prop is true', () => {
    render(
      <Card hover>
        <CardBody>Hoverable</CardBody>
      </Card>,
    );
    expect(screen.getByText(/hoverable/i).parentElement).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <Card className="custom-class">
        <CardBody>Custom</CardBody>
      </Card>,
    );
    expect(screen.getByText(/custom/i).parentElement).toHaveClass(
      'custom-class',
    );
  });
});
