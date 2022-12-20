import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { forwardRef, useEffect, useRef } from 'react';
import {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  MeshStandardMaterial,
  Texture,
  Vector2,
} from 'three';

import { image2, image3 } from './test-image';

export type UseGLTF = ReturnType<typeof useGLTF> & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

export interface MacintoshProps extends GroupProps {}
export type RefType = Group;

const base64ToSrc = (data: string) => `data:image/png;base64,${data}`;

const Macintosh = forwardRef<Group, MacintoshProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    '/models/macintosh-classic--computer.glb',
  ) as UseGLTF;

  const screenImageRef = useRef<HTMLImageElement>(new Image());
  const screenRef = useRef<MeshStandardMaterial>(null!);
  const screenTextureRef = useRef<Texture>(new Texture(screenImageRef.current));

  // TODO: come up with good looking materials for everything
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const casePlastic: MeshStandardMaterial = Object.assign(
    materials['case-plastic'],
    { roughness: 100 },
  );

  const bodyRef = useRef<Mesh<BufferGeometry, Material>>(null!);

  useEffect(() => {
    const texture = screenTextureRef.current;
    const image = screenImageRef.current;

    texture.center = new Vector2(1, 1);
    texture.flipY = false;
    texture.offset.y = 0.0155;
    texture.offset.x = 0.01;
    texture.repeat.set(1.02, 1.39);

    image.src = base64ToSrc(image2);
    image.onload = () => {
      texture.needsUpdate = true;
    };
  }, []);

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
          position={[-1.16, 16.62, 1.5]}
          ref={bodyRef}
        >
          <meshStandardMaterial color="#cacab2" />
        </mesh>
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
          onClick={({ unprojectedPoint }) => {
            // TODO: how do we get the mouse coordinates relative
            // to the screen top/left to forward to VNC session?
            // eslint-disable-next-line no-console
            console.log(unprojectedPoint);

            screenImageRef.current.src = base64ToSrc(image3);
          }}
          position={[-1.05, 22.73, 12.08]}
        >
          <meshStandardMaterial
            map={screenTextureRef.current}
            ref={screenRef}
          />
        </mesh>
        <mesh
          geometry={nodes['computer-screws'].geometry}
          material={nodes['computer-screws'].material}
          position={[-1.06, 16.26, -3.54]}
        />
      </group>
    </group>
  );
});

useGLTF.preload('/models/macintosh-classic--computer.glb');

export { Macintosh };
