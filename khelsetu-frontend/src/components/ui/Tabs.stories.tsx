import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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
];

const TabsWithState = (props: React.ComponentProps<typeof Tabs>) => {
  const [activeTab, setActiveTab] = useState(props.tabs[0]?.id ?? '');
  return <Tabs {...props} activeTab={activeTab} onChange={setActiveTab} />;
};

export const Default: Story = {
  render: () => <TabsWithState tabs={tabs} />,
};

export const Pills: Story = {
  render: () => <TabsWithState tabs={tabs} variant="pills" />,
};

export const Underline: Story = {
  render: () => <TabsWithState tabs={tabs} variant="underline" />,
};

export const WithCounts: Story = {
  render: () => (
    <TabsWithState
      tabs={[
        { id: 'all', label: 'All', count: 42 },
        { id: 'active', label: 'Active', count: 12 },
        { id: 'completed', label: 'Completed', count: 30 },
      ]}
    />
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <TabsWithState tabs={tabs} fullWidth />
    </div>
  ),
};
