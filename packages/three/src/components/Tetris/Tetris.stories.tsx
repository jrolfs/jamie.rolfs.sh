import { Meta, StoryObj } from '@storybook/react';
import { Vector3 } from 'three';

import { withStage } from '../../storybook';

import { Tetris } from './Tetris';

export default {
  title: 'Tetris',
  component: Tetris,
  decorators: [
    withStage({ cameraPosition: new Vector3(-30, 30, 30), center: true }),
  ],
  argTypes: {
    thickness: { control: { type: 'range', min: 0, max: 20 } },
    roughness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    clearcoat: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    clearcoatRoughness: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    transmission: { control: { type: 'range', min: 0.9, max: 1, step: 0.01 } },
    ior: { control: { type: 'range', min: 1, max: 2.3, step: 0.05 } },
    attenuationColor: { control: 'color' },
    attenuationDistance: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
  },
  args: {
    thickness: 5,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 1.25,
    attenuationColor: '#fff',
    attenuationDistance: 1,
  },
} as Meta<typeof Tetris>;

type Story = StoryObj<typeof Tetris>;

export const I: Story = {
  args: { type: 'I' },
};

export const L: Story = {
  args: { type: 'L' },
};

export const O: Story = {
  args: { type: 'O' },
};

export const T: Story = {
  args: { type: 'T' },
};

export const Z: Story = {
  args: { type: 'Z' },
};
