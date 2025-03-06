import { Meta, StoryObj } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { withStage } from '../../storybook';

import { Box } from './Box';

export default {
  title: 'Box',
  component: Box,
  decorators: [withStage({ zoom: 100 })],
  argTypes: {
    color: { control: 'color' },
  },
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {},
  name: 'Box',
};

export const Spinning: Story = {
  args: {
    spin: !isChromatic(),
  },
};
