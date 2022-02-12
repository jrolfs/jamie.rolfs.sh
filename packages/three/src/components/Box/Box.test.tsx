import ReactThreeTestRenderer from '@react-three/test-renderer';

import { Box } from '.';

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Box />);
  const mesh = renderer.scene.children[0].allChildren;

  expect(mesh.length).toBe(2);
});

test('click event makes box bigger', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Box />);
  const mesh = renderer.scene.children[0];

  expect(mesh.props.scale).toBe(1);

  await renderer.fireEvent(mesh, 'click');

  expect(mesh.props.scale).toBe(1.5);
});
