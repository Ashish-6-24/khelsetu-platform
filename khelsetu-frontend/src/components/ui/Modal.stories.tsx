import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Modal } from './Modal';
import { Button } from './Button';

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

const ModalWithState = (props: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWithState title="Confirm Action" description="Are you sure you want to proceed?">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        This action cannot be undone.
      </p>
    </ModalWithState>
  ),
};

export const Small: Story = {
  render: () => (
    <ModalWithState title="Small Modal" size="sm">
      <p className="text-sm text-slate-600">Compact dialog content.</p>
    </ModalWithState>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalWithState title="Large Modal" size="lg" description="With description">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          This modal has more space for complex content like forms or data tables.
        </p>
        <div className="h-32 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    </ModalWithState>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWithState
      title="Delete Tournament"
      description="This cannot be undone"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </>
      }
    >
      <p className="text-sm text-slate-600">
        All matches, teams, and data will be permanently removed.
      </p>
    </ModalWithState>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <ModalWithState>
      <p className="text-sm text-slate-600">A modal without title or description.</p>
    </ModalWithState>
  ),
};
