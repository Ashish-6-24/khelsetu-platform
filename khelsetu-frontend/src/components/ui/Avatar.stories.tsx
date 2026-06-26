import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    ring: { control: 'boolean' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: {
    name: 'Ashish Subedi',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Ashish Subedi',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="XS User" size="xs" />
      <Avatar name="SM User" size="sm" />
      <Avatar name="MD User" size="md" />
      <Avatar name="LG User" size="lg" />
      <Avatar name="XL User" size="xl" />
      <Avatar name="2XL User" size="2xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Online" status="online" />
      <Avatar name="Offline" status="offline" />
      <Avatar name="Away" status="away" />
      <Avatar name="Busy" status="busy" />
    </div>
  ),
};

export const WithRing: Story = {
  args: {
    name: 'Ring Avatar',
    ring: true,
    size: 'lg',
  },
};

export const NoName: Story = {
  args: {},
};
