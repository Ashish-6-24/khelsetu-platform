import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
    },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'matches', label: 'Matches' },
  { id: 'teams', label: 'Teams' },
  { id: 'standings', label: 'Standings' },
] as const;

const defaultTabId = tabs[0].id;
const tabsForStories = tabs as unknown as Array<{
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}>;

export const Pills: Story = {
  args: {
    tabs: tabsForStories,
    activeTab: defaultTabId,
    onChange: () => {},
    variant: 'pills',
  },
};

export const Underline: Story = {
  args: {
    tabs: tabsForStories,
    activeTab: defaultTabId,
    onChange: () => {},
    variant: 'underline',
  },
};

export const WithCounts: Story = {
  args: {
    tabs: [
      { id: 'all', label: 'All', count: 42 },
      { id: 'active', label: 'Active', count: 12 },
      { id: 'completed', label: 'Completed', count: 30 },
    ],
    activeTab: 'all',
    onChange: () => {},
  },
};

export const FullWidth: Story = {
  args: {
    tabs: tabsForStories,
    activeTab: defaultTabId,
    onChange: () => {},
    fullWidth: true,
  },
};
