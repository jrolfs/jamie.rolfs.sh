import { keys, split, theme } from '@jrolfs/core';
import { Center, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { button, useControls } from 'leva';
import {
  FunctionComponent,
  PropsWithChildren,
  Suspense,
  useEffect,
} from 'react';
import { Vector3 } from 'three';

import { Lights } from './Lights';

export interface StageProps {
  background?: string;
  cameraPosition?: Vector3;
  zoom?: number;
  orbit?: boolean;
  lights?: boolean;
  lightPosition?: Vector3;
  center?: boolean;
  debugLights?: boolean;
}

const vectorToControl = ({ x, y, z }: Vector3) => ({
  value: { x, y, z },
});

const controlToVector = ({ x, y, z }: { x: number; y: number; z: number }) =>
  new Vector3(x, y, z);

const defaults: Required<StageProps> = {
  background: theme.colors.neutral[700],
  cameraPosition: new Vector3(-5, 5, 5),
  zoom: 10,
  orbit: true,
  lights: true,
  lightPosition: new Vector3(-10, -35, 5),
  center: false,
  debugLights: false,
} as const;

/**
 * Configurable 3D scene for @react-three/fiber-based stories
 *
 * @see https://github.com/winkerVSbecks/storybook-blocks
 */
const Stage: FunctionComponent<PropsWithChildren<StageProps>> = props => {
  const [options, { children, ...rest }] = split(props, keys(defaults));

  const {
    background,
    center,
    orbit,
    lights,
    debugLights,
    zoom,
    cameraPosition,
    lightPosition,
  } = { ...defaults, ...options };

  const [controls, set] = useControls(() => ({
    background,
    cameraPosition: vectorToControl(cameraPosition),
    center,
    debugLights,
    lightPosition: vectorToControl(lightPosition),
    lights,
    orbit,
    zoom: { value: zoom, min: 0, max: 100 },
    defaults: button(() =>
      set({
        ...defaults,
        cameraPosition,
        lightPosition,
      }),
    ),
  }));

  useEffect(() => {
    set({
      background,
      cameraPosition,
      center,
      debugLights,
      lightPosition,
      lights,
      orbit,
      zoom,
    });
  }, [
    background,
    cameraPosition,
    center,
    debugLights,
    lightPosition,
    lights,
    orbit,
    set,
    zoom,
  ]);

  useEffect(() => {
    ['#root', 'html', 'body'].forEach(selector => {
      const element = document.querySelector<HTMLElement>(selector);

      if (element) element.style.height = '100%';
    });
  }, []);

  return (
    <Suspense fallback="loading...">
      <Canvas dpr={window.devicePixelRatio} shadows {...rest}>
        <color args={[controls.background]} attach="background" />
        <OrthographicCamera
          makeDefault
          position={controlToVector(controls.cameraPosition)}
          zoom={controls.zoom}
        />
        {controls.center ? <Center>{children}</Center> : children}
        {controls.lights && (
          <Lights
            debug={controls.debugLights}
            position={controlToVector(lightPosition)}
          />
        )}
        {controls.orbit && <OrbitControls />}
      </Canvas>
    </Suspense>
  );
};

export { Stage };
