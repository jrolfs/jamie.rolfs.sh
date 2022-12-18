import { ClientToServerEvents, ServerToClientEvents } from '@jrolfs/core';
import { Socket, io } from 'socket.io-client';

import { configuration } from './configuration';

const { socketHost, socketPath: path } = configuration;

export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => io(socketHost, { path, transports: ['websocket'] });
