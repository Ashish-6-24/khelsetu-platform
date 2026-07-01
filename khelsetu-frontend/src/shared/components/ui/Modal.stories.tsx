import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { Modal } from './Modal';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    children: (
      <p className="text-sm text-slate-600 dark:text-slate-400">
        This action cannot be undone.
      </p>
    ),
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Small Modal',
    size: 'sm',
    children: <p className="text-sm text-slate-600">Compact dialog content.</p>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Large Modal',
    size: 'lg',
    description: 'With description',
    children: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          This modal has more space for complex content like forms or data
          tables.
        </p>
        <div className="h-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Delete Tournament',
    description: 'This cannot be undone',
    footer: (
      <>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </>
    ),
    children: (
      <p className="text-sm text-slate-600">
        All matches, teams, and data will be permanently removed.
      </p>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <p className="text-sm text-slate-600">
        A modal without title or description.
      </p>
    ),
  },
};
