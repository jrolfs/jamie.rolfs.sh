import { FastifyInstance } from 'fastify';

import { start as startMac } from '../process/mini-vmac';
import { start as startVNC } from '../process/x11vnc';
import { start as startBuffer } from '../process/xvfb';

import { Server } from './types';

export const boot = (io: Server, { log }: FastifyInstance) => {
  io.on('connection', async socket => {
    log.debug({ id: socket.id }, 'socket: connection');

    try {
      const display = 0;

      const bufferProcess = await startBuffer({ display, log });
      const vncProcess = await startVNC({ display, log });
      const macProcess = await startMac({ display, log });

      socket.on('disconnect', () => {
        log.debug({ id: socket.id }, 'socket: disconnect');

        bufferProcess.kill();
        vncProcess.kill();
        macProcess.kill();
      });
    } catch (error) {
      log.debug(error, 'failed to start xfvb');
    }
  });
};
