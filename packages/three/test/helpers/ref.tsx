import ReactThreeTestRenderer, {
  ReactThreeTest,
} from '@react-three/test-renderer';
import React, { ReactElement } from 'react';
import { Event, Object3D } from 'three';

export type RenderResult = ReactThreeTest.Renderer;
export type Matcher = (result: RenderResult) => Object3D<Event>;

export interface ItForwardsRefOptions {
  debug?: boolean;
  only?: boolean;
  skip?: boolean;
}

/**
 * Asserts that a component forwards its ref to a child component
 *
 * @param ui JSX fragment to render
 * @param matcher callback returning element that should recieve ref
 */
export const itForwardsRef = <
  R extends Element,
  P extends { ref: R } = { ref: R },
>(
  { type: Element, props }: ReactElement<P>,
  matcher: Matcher,
  { skip, only, debug }: ItForwardsRefOptions = {
    skip: false,
  },
) => {
  const run = (() => {
    if (skip) return test.skip;
    if (only) return test.only;
    return test;
  })();

  return run('forwards ref', async () => {
    const ref = React.createRef<R>();
    const testProps: P = { ...props, ref };

    const result = await ReactThreeTestRenderer.create(
      <Element {...testProps} />,
    );

    const { current } = ref;
    const matched = matcher(result);

    if (debug) {
      console.debug('ref:', current); // eslint-disable-line no-console
      console.debug('expected:', matched); // eslint-disable-line no-console
    }

    expect(current).toBe(matched);
  });
};
