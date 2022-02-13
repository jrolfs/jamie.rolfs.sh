import { theme } from '@jrolfs/core';
import { animated } from '@react-spring/three';
import { Extrude } from '@react-three/drei';
import { forwardRef, useMemo } from 'react';
import { Object3D } from 'three';

import { THICKNESS, shapes } from './shapes';

export interface TetrisProps {
  type: keyof typeof shapes;
  color: theme.Color;
  thickness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  transmission: number;
  ior: number;
  attenuationColor: string;
  attenuationDistance: number;
}

const AnimatedExtrude = animated(Extrude);

const EXTRUDE_SETTINGS = {
  steps: 2,
  depth: THICKNESS,
  bevelEnabled: false,
};

/**
 * Example of how to draw a `Shape` manually and then extrude it
 *
 * @see https://github.com/winkerVSbecks/storybook-blocks
 */
export const Tetris = forwardRef<Object3D, TetrisProps>(
  (
    {
      type,
      color = theme.colors.blue[300],
      thickness = THICKNESS,
      roughness = 0.4,
      clearcoat = 1,
      clearcoatRoughness = 1,
      transmission = 0.8,
      ior = 1.25,
      attenuationColor = '#fff',
      attenuationDistance = 0,
      ...props
    },
    ref,
  ) => {
    const shape = useMemo(() => shapes[type](), [type]);

    return (
      <AnimatedExtrude args={[shape, EXTRUDE_SETTINGS]} ref={ref} {...props}>
        {/* @ts-expect-error */}
        <animated.meshPhysicalMaterial
          attenuationColor={attenuationColor}
          attenuationDistance={attenuationDistance}
          clearcoat={clearcoat}
          clearcoatRoughness={clearcoatRoughness}
          color={color}
          flatShading
          ior={ior}
          roughness={roughness}
          thickness={thickness}
          transmission={transmission}
        />
      </AnimatedExtrude>
    );
  },
);
