import { theme } from '@jrolfs/core';
import { Center, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FunctionComponent, useEffect } from 'react';
import { Vector3 } from 'three';

import { Lights } from './Lights';

export interface StageProps {
  background?: string;
  cameraPosition?: Vector3;
  zoom?: number;
  controls?: boolean;
  lights?: boolean;
  lightPosition?: Vector3;
  center?: boolean;
  debugLights?: boolean;
}

/**
 * Configurable 3D scene for @react-three/fiber-based stories
 *
 * @see https://github.com/winkerVSbecks/storybook-blocks
 */
const Stage: FunctionComponent<StageProps> = ({
  background = theme.colors.neutral[700],
  children,
  cameraPosition = new Vector3(-5, 5, 5),
  zoom = 10,
  controls = true,
  lights = true,
  lightPosition = new Vector3(-10, -35, 5),
  center = false,
  debugLights = false,
  ...props
}) => {
  useEffect(() => {
    ['#root', 'html', 'body'].forEach(selector => {
      const element = document.querySelector<HTMLElement>(selector);

      if (element) element.style.height = '100%';
    });
  }, []);

  return (
    <Canvas dpr={window.devicePixelRatio} shadows {...props}>
      <color args={[background]} attach="background" />
      <OrthographicCamera makeDefault position={cameraPosition} zoom={zoom} />
      {center ? <Center>{children}</Center> : children}
      {lights && <Lights debug={debugLights} position={lightPosition} />}
      {controls && <OrbitControls />}
    </Canvas>
  );
};

export { Stage };
