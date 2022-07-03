import { useHelper } from '@react-three/drei';
import { FunctionComponent, useRef } from 'react';
import * as THREE from 'three';
import { SpotLight, Vector3 } from 'three';

export interface LightsProps {
  position: Vector3;
  debug?: boolean;
}

const Lights: FunctionComponent<LightsProps> = ({
  position,
  debug = false,
}) => {
  const light = useRef<SpotLight>(null!);

  useHelper(light, THREE.SpotLightHelper, 'yellow');

  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight
        angle={Math.PI / 7}
        castShadow
        intensity={5}
        penumbra={1}
        position={position}
        ref={debug ? light : null}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
    </>
  );
};

export { Lights };
