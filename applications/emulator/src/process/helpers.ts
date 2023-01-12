import { ChildProcessWithoutNullStreams } from 'node:child_process';

import { FastifyBaseLogger } from 'fastify';

type Meta = Record<string, unknown>;

export interface ProcessMeta extends Meta {
  process: ChildProcessWithoutNullStreams;
}

export interface LoggersForOptions {
  name: string;
  meta: ProcessMeta;
  log: FastifyBaseLogger;
}

export const loggersFor = ({
  name,
  meta: { process, ...rest },
  log,
}: LoggersForOptions) => {
  const meta = { ...rest, id: process.pid };

  return {
    stdout: (data: unknown) =>
      log.debug(
        typeof data === 'string' ? { ...meta, data } : meta,
        `${name}:stdout`,
      ),
    stderr: (data: unknown) =>
      log.debug(
        typeof data === 'string' ? { ...meta, data } : meta,
        `${name}:stderr`,
      ),
    closed: (code: number | null) =>
      log.debug({ ...meta, code }, `${name}:close`),
    starting: () => log.debug(meta, `${name}:starting`),
    started: (m: Meta) => log.debug({ ...meta, ...m }, `${name}:started`),
  };
};

export const isNoEntryError = (error: unknown) =>
  error instanceof Error &&
  'code' in error &&
  typeof error.code === 'string' &&
  error.code === 'ENOENT';
