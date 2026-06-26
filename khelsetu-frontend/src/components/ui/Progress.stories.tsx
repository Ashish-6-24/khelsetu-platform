import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './Progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'gradient'],
    },
    showLabel: { control: 'boolean' },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    showLabel: true,
    label: 'Completion',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
    label: 'Complete',
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    variant: 'warning',
    showLabel: true,
    label: 'Almost there',
  },
};

export const Error: Story = {
  args: {
    value: 20,
    variant: 'error',
    showLabel: true,
    label: 'Low progress',
  },
};

export const Gradient: Story = {
  args: {
    value: 50,
    variant: 'gradient',
    showLabel: true,
    label: 'Brand gradient',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <Progress value={60} size="sm" label="Small" showLabel />
      <Progress value={60} size="md" label="Medium" showLabel />
      <Progress value={60} size="lg" label="Large" showLabel />
    </div>
  ),
};
