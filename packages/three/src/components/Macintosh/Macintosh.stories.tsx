import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Vector3 } from 'three';

import { withStage } from '../../storybook';

import { Macintosh } from './Macintosh';

export default {
  title: 'Macintosh',
  component: Macintosh,
  decorators: [
    withStage({
      cameraPosition: new Vector3(-70, 30, 30),
      lightPosition: new Vector3(-100, 100, 100),
    }),
  ],
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof Macintosh>;

const Template: ComponentStory<typeof Macintosh> = args => (
  <Macintosh {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'Macintosh';
