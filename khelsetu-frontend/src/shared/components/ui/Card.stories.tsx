import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardBody, CardFooter, CardHeader } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hover: { control: 'boolean' },
    glass: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CardBody>
        Card content goes here. This is a default card component.
      </CardBody>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Card Header
          </h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Card with a header section.
          </p>
        </CardBody>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardBody>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Card with a footer section.
          </p>
        </CardBody>
        <CardFooter>
          <p className="text-xs text-gray-400">Footer content</p>
        </CardFooter>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hover: true,
    children: (
      <CardBody>Hover over this card to see the hover effect.</CardBody>
    ),
  },
};
