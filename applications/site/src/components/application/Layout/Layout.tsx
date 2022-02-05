import { Canvas } from '@react-three/fiber';
import { FunctionComponent, PropsWithChildren } from 'react';

import { cssCanvas } from './layout.css';

export interface LayoutProps {}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
}) => <Canvas className={cssCanvas}>{children}</Canvas>;

export { Layout };
