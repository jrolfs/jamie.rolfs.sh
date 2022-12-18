import {
  Macintosh as Model,
  MacintoshProps as ModelProps,
  RefType,
} from '@jrolfs/three';
import { forwardRef, useEffect } from 'react';

import { getSocket } from '../socket';

export interface MacintoshProps extends ModelProps {}

export const Macintosh = forwardRef<RefType, MacintoshProps>((props, ref) => {
  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => console.info('Macintosh: socket connected'));

    return () => {
      socket.off('connect');
    };
  }, []);

  return <Model {...props} ref={ref} />;
});
