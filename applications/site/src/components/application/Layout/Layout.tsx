import { PresentationControls, Stage } from '@react-three/drei';
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
        <Stage adjustCamera environment="warehouse" intensity={1}>
          {children}
        </Stage>
      </PresentationControls>
    </Suspense>
  </Canvas>
);

export { Layout };
