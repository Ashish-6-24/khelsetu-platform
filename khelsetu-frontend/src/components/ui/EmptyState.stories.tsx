import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trophy, Users } from 'lucide-react';

import { Button } from './Button';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'UI/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No tournaments yet',
    description: 'Create your first tournament to get started.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No teams found',
    description: 'Add teams to participate in tournaments.',
    action: <Button size="sm">Create Team</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: Trophy,
    title: 'No matches scheduled',
    description: 'Schedule matches for your tournament.',
    action: <Button size="sm">Schedule Match</Button>,
  },
};

export const WithSecondaryAction: Story = {
  args: {
    icon: Users,
    title: 'No players registered',
    description: 'Import players or let them self-register.',
    action: <Button size="sm">Import Players</Button>,
    secondaryAction: <Button size="sm" variant="ghost">Learn More</Button>,
  },
};

export const Compact: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your search.',
    compact: true,
  },
};
