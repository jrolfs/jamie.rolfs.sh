import ReactThreeTestRenderer from '@react-three/test-renderer';

import { itForwardsRef } from 'test/helpers';

import { Macintosh } from '.';

itForwardsRef(<Macintosh />, result => result.scene.children[0].instance);

test('mesh to have one child', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Macintosh />);
  const mesh = renderer.scene.children[0].allChildren;

  expect(mesh.length).toBe(1);
});
