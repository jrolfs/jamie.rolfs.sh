import { theme } from '@jrolfs/core';
import { MeshProps, useFrame } from '@react-three/fiber';
import { FunctionComponent, useRef, useState } from 'react';
import { Object3D } from 'three';

export interface BoxProps extends MeshProps {
  color?: theme.Color;
  hover?: theme.Color;
}

const Box: FunctionComponent<BoxProps> = ({
  color = theme.colors.blue[600],
  hover = theme.colors.purple[600],
  ...props
}) => {
  const ref = useRef<Object3D>(null!);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    ref.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      onClick={() => setIsClicked(!isClicked)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
      ref={ref}
      scale={isClicked ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovered ? hover : color} />
    </mesh>
  );
};

export { Box };
