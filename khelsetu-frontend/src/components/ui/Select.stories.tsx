import type { Meta, StoryObj } from '@storybook/react-vite';

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

const _SelectWithState = (props: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState('');
  return <Select {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    label: 'Sport',
    options,
    placeholder: 'Select sport',
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: 'Sport',
    options,
    error: 'Please select a sport',
    value: '',
    onChange: () => {},
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Sport',
    options,
    helperText: 'Choose the sport for this tournament',
    value: '',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Sport',
    options,
    disabled: true,
    value: '',
    onChange: () => {},
  },
};
