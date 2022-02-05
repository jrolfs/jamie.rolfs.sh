import { Canvas } from '@react-three/fiber';
import { FunctionComponent, PropsWithChildren } from 'react';

export interface LayoutProps {}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
}) => <Canvas>{children}</Canvas>;

export { Layout };
