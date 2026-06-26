import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Select } from './Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'cricket', label: 'Cricket' },
  { value: 'football', label: 'Football' },
  { value: 'volleyball', label: 'Volleyball' },
  { value: 'basketball', label: 'Basketball' },
];

const SelectWithState = (props: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState('');
  return <Select {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <SelectWithState label="Sport" options={options} placeholder="Select sport" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-64">
      <SelectWithState
        label="Sport"
        options={options}
        error="Please select a sport"
      />
    </div>
  ),
};

export const WithHelper: Story = {
  render: () => (
    <div className="w-64">
      <SelectWithState
        label="Sport"
        options={options}
        helperText="Choose the sport for this tournament"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <SelectWithState label="Sport" options={options} disabled />
    </div>
  ),
};
