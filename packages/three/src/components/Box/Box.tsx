import { theme } from '@jrolfs/core';
import { MeshProps, useFrame } from '@react-three/fiber';
import { forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Object3D } from 'three';

export interface BoxProps extends MeshProps {
  color?: theme.Color;
  hover?: theme.Color;
  spin?: boolean;
}

const Box = forwardRef<Object3D, BoxProps>(
  (
    {
      color = theme.colors.blue[600],
      hover = theme.colors.purple[600],
      spin = false,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<Object3D>(null!);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useFrame(() => {
      if (spin) localRef.current.rotation.x += 0.01;
    });

    return (
      <mesh
        onClick={() => setIsClicked(!isClicked)}
        onPointerOut={() => setIsHovered(false)}
        onPointerOver={() => setIsHovered(true)}
        ref={mergeRefs([localRef, ref])}
        scale={isClicked ? 1.5 : 1}
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isHovered ? hover : color} />
      </mesh>
    );
  },
);

export { Box };
