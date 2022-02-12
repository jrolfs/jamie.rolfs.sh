import { StoryContext, StoryFn } from '@storybook/addons';
import React from 'react';

import { Stage } from './Stage';

const withStage = (Story: StoryFn<JSX.Element>, context: StoryContext) => (
  <Stage>
    {/* @ts-expect-error */}
    <Story {...context} />
  </Stage>
);

export { withStage };
