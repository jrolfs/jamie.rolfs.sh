import { dirname, join } from 'path';

import { StorybookConfig } from '@storybook/core-common';

const getAbsolutePath = (path: string) =>
  dirname(require.resolve(join(path, 'package.json')));

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
    },
  },

  staticDirs: ['../assets'],

  swc: {
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
          importSource: 'react',
        },
      },
    },
  },
} satisfies StorybookConfig;
