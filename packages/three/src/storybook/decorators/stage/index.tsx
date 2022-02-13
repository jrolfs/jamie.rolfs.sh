import { StoryContext, StoryFn } from '@storybook/react';

import { Stage, StageProps } from './Stage';

const withStage =
  (props: StageProps = {}) =>
  (Story: StoryFn, context: StoryContext) =>
    (
      <Stage {...props}>
        <Story {...context} />
      </Stage>
    );

export { withStage };
