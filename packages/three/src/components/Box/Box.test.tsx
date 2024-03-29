import ReactThreeTestRenderer from '@react-three/test-renderer';

import { itForwardsRef } from 'test/helpers';

import { Box } from '.';

itForwardsRef(<Box />, result => result.scene.children[0].instance);

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

test('rotates', async () => {
  const renderer = await ReactThreeTestRenderer.create(<Box spin />);
  const mesh = renderer.scene.children[0];

  const { x, y, z } = mesh.instance.rotation;

  await renderer.advanceFrames(10, 10);

  expect(mesh.instance.rotation.x).toBeGreaterThan(x);

  expect(mesh.instance.rotation.y).toEqual(y);
  expect(mesh.instance.rotation.z).toEqual(z);
});
