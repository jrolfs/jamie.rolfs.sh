import { ClientToServerEvents, ServerToClientEvents } from '@jrolfs/core';
import { Socket as IO, io } from 'socket.io-client';

import { configuration } from './configuration';

const { socketHost, socketPath: path } = configuration;

let socket: Socket;

export type Socket = IO<ServerToClientEvents, ClientToServerEvents>;

export const getSocket = (): Socket => {
  if (socket) return socket;

  socket = io(socketHost, { path, transports: ['websocket'] });

  return socket;
};
