import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonStatsCard,
  SkeletonText,
} from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangular', 'circular', 'rounded'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-48',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    className: 'h-12 w-12',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    className: 'h-20 w-48',
  },
};

export const TextLines: Story = {
  render: () => <SkeletonText lines={4} />,
};

export const AvatarVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
    </div>
  ),
};

export const ButtonSkeleton: Story = {
  render: () => (
    <div className="flex gap-3">
      <SkeletonButton />
      <SkeletonButton className="w-32" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonCard />
    </div>
  ),
};

export const StatsCardSkeleton: Story = {
  render: () => (
    <div className="w-72">
      <SkeletonStatsCard />
    </div>
  ),
};
