import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from '@jrolfs/core';
import { Server as SocketIOServer } from 'socket.io';

export type Server = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>;
