import { Center, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { FunctionComponent } from 'react';
import { Vector3 } from 'three';

import { Lights } from './Lights';

export interface StageProps {
  cameraPosition?: Vector3;
  zoom?: number;
  controls?: boolean;
  lights?: boolean;
  lightPosition?: Vector3;
  center?: boolean;
  debugLights?: boolean;
}

const Stage: FunctionComponent<StageProps> = ({
  children,
  cameraPosition = new Vector3(-5, 5, 5),
  zoom = 10,
  controls = true,
  lights = true,
  lightPosition = new Vector3(-10, -35, 5),
  center = false,
  debugLights = false,
  ...props
}) => (
  <Canvas dpr={window.devicePixelRatio} shadows {...props}>
    <color args={['#06092c']} attach="background" />
    <OrthographicCamera makeDefault position={cameraPosition} zoom={zoom} />
    {center ? <Center>{children}</Center> : children}
    {lights && <Lights debug={debugLights} position={lightPosition} />}
    {controls && <OrbitControls />}
  </Canvas>
);

export { Stage };
