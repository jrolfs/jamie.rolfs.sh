const { BufferGeometry, MeshStandardMaterial } = require('three');

global.IS_REACT_ACT_ENVIRONMENT = true;

// eslint-disable-next-line import/no-extraneous-dependencies, global-require
jest.mock('scheduler', () => require('scheduler/unstable_mock'));

jest.mock('@react-three/drei', () => {
  const drei = jest.requireActual('@react-three/drei');
  const useGLTF = jest.fn().mockReturnValue({
    nodes: new Proxy({}, { get: () => ({ geometry: new BufferGeometry() }) }),
    materials: new Proxy({}, { get: () => new MeshStandardMaterial() }),
    preload: jest.fn(),
  });

  useGLTF.preload = jest.fn();

  return {
    ...drei,
    useGLTF,
  };
});
