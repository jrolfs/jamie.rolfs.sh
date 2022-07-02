import {
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';

import * as styles from './layout.css';

export interface LayoutProps {}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
}) => (
  <Canvas camera={{ fov: 45 }} className={styles.canvas} dpr={[1, 2]} shadows>
    <color args={['#101010']} attach="background" />
    <fog args={['#101010', 10, 20]} attach="fog" />
    <Suspense fallback={null}>
      <PresentationControls
        global
        polar={[-0.1, Math.PI / 4]}
        speed={1.5}
        zoom={0.7}
      >
        <Stage
          contactShadow={false}
          environment={null}
          intensity={1}
          shadowBias={-0.0015}
        >
          {children}
        </Stage>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[170, 170]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            color="#101010"
            depthScale={1.2}
            maxDepthThreshold={1.4}
            metalness={0.5}
            minDepthThreshold={0.4}
            mirror={0}
            mixBlur={1}
            mixStrength={40}
            resolution={2048}
            roughness={1}
          />
        </mesh>
      </PresentationControls>
    </Suspense>
  </Canvas>
);

export { Layout };
