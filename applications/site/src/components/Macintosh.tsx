import {
  Macintosh as Model,
  MacintoshProps as ModelProps,
  RefType,
} from '@jrolfs/three';
import debug from 'debug';
import { forwardRef, useEffect } from 'react';

import { getSocket } from '../socket';

const log = debug('socket:macintosh');

export interface MacintoshProps extends ModelProps {}

export const Macintosh = forwardRef<RefType, MacintoshProps>((props, ref) => {
  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => log('connect'));

    return () => {
      socket.off('connect');
    };
  }, []);

  return <Model {...props} ref={ref} />;
});
