import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from './Accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'rules',
    title: 'Tournament Rules',
    content:
      'All matches follow standard FIFA rules. Each team must have at least 7 players to start.',
  },
  {
    id: 'format',
    title: 'Tournament Format',
    content:
      'Round-robin group stage followed by single-elimination knockout rounds.',
  },
  {
    id: 'scoring',
    title: 'Scoring System',
    content:
      '3 points for a win, 1 for a draw, 0 for a loss. Goal difference used as tiebreaker.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    defaultOpen: 'rules',
  },
};

export const Multiple: Story = {
  args: {
    items: sampleItems,
    multiple: true,
  },
};

export const AllClosed: Story = {
  args: {
    items: sampleItems,
  },
};
