import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { forwardRef } from 'react';
import { Group } from 'three';
import type { GLTF } from 'three-stdlib';

export type UseGLTF = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

export interface MacintoshProps extends GroupProps {}

const Macintosh = forwardRef<Group, MacintoshProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    '/models/macintosh-classic--computer.glb',
  ) as UseGLTF;

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={1}>
        <mesh
          geometry={nodes['computer-black'].geometry}
          material={materials['black-void']}
          position={[-0.34, 16.2, 2.35]}
        />
        <mesh
          geometry={nodes['computer-body'].geometry}
          material={materials['case-plastic']}
          position={[-1.16, 16.62, 1.5]}
        />
        <mesh
          geometry={nodes['computer-feet'].geometry}
          material={materials['legs-rubber']}
          position={[-1.04, -0.42, -0.32]}
        />
        <mesh
          geometry={nodes['computer-floppy-outer'].geometry}
          material={materials['black-plastic']}
          position={[3.25, 9.57, 10.82]}
        />
        <mesh
          geometry={nodes['computer-floppy-rails'].geometry}
          material={materials['black-plastic-blur']}
          position={[3.33, 9.43, 12.08]}
        />
        <mesh
          geometry={nodes['computer-label'].geometry}
          material={nodes['computer-label'].material}
          position={[-0.54, 15.44, -12.1]}
        />
        <mesh
          geometry={nodes['computer-ports'].geometry}
          material={nodes['computer-ports'].material}
          position={[-1.02, 4.25, -11.28]}
        />
        <mesh
          geometry={nodes['computer-ports-outer'].geometry}
          material={nodes['computer-ports-outer'].material}
          position={[-1.61, 7.87, -11.02]}
        />
        <mesh
          geometry={nodes['computer-power'].geometry}
          material={nodes['computer-power'].material}
          position={[-11.14, 10.49, -10.88]}
        />
        <mesh
          geometry={nodes['computer-power-prongs'].geometry}
          material={nodes['computer-power-prongs'].material}
          position={[-11.1, 10.5, -10.77]}
        />
        <mesh
          geometry={nodes['computer-screen'].geometry}
          material={materials['display-glass']}
          position={[-1.05, 22.73, 12.08]}
        />
        <mesh
          geometry={nodes['computer-screws'].geometry}
          material={nodes['computer-screws'].material}
          position={[-1.06, 16.26, -3.54]}
        />
      </group>
    </group>
  );
});

useGLTF.preload('/models/macintosh-classic.glb');

export { Macintosh };
