import { ComponentMeta, ComponentStory } from '@storybook/react';
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
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'Box';

export const Spinning = Template.bind({});
Spinning.args = { spin: !isChromatic() };
