import { stat } from 'fs/promises';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';

import chokidar from 'chokidar';

import { isNoEntryError, loggersFor } from './helpers';
import { StartOptions } from './types';

const PREFIX = 'X';
const XVFB_SOCKETS_PREFIX = `/tmp/.X11-unix/${PREFIX}`;

const watcher = chokidar.watch(`${XVFB_SOCKETS_PREFIX}*`, { persistent: true });

const ensureNewSocket = async (display: number) => {
  try {
    const existing = await stat(XVFB_SOCKETS_PREFIX + display.toString());

    if (existing.isSocket()) {
      throw new Error(`Buffer for display ${display} is already running`);
    }
  } catch (error) {
    if (!isNoEntryError(error)) throw error;
  }
};

const checkExistingSocket = async (display: number) => {
  try {
    const existing = await stat(XVFB_SOCKETS_PREFIX + display.toString());

    return existing.isSocket();
  } catch (error) {
    if (!isNoEntryError(error)) throw error;

    return false;
  }
};

export const start = async ({ display, log }: StartOptions) => {
  await ensureNewSocket(display);

  return new Promise<ChildProcessWithoutNullStreams>((resolve, reject) => {
    const process = spawn('Xvfb', [
      `:${display}`,
      '-screen',
      '0',
      '1032x692x24',
      '-ac',
      '+extension',
      'GLX',
      '+render',
      '-noreset',
      '-audit',
      '4',
    ]);

    const { closed, started, starting, stderr, stdout } = loggersFor({
      name: 'xvfb',
      meta: { process, display },
      log,
    });

    starting();

    process.stdout.on('data', stdout);
    process.stderr.on('data', stderr);

    void checkExistingSocket(display).then(
      exists => exists && resolve(process),
    );

    process.on('close', code => {
      closed(code);

      reject(
        new Error(`Exited ${code ? `with code: ${code}` : 'without code'}`),
      );
    });

    watcher.on('add', path => {
      if (new RegExp(`${PREFIX}${display}$`).test(path)) {
        started({ path });

        resolve(process);
      }
    });
  });
};
