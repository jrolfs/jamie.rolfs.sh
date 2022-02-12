import { Parameters } from '@storybook/addons';

import './preview.css';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on(?!.*(Pointer|Wheel|Render))[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
