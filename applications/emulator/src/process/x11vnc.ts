import { mkdir, stat } from 'fs/promises';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';

import chokidar from 'chokidar';

import { isNoEntryError, loggersFor } from './helpers';
import { StartOptions } from './types';

const STARTING_PORT = 59000;
const PREFIX = 'X11VNC';

const X11NVC_PORTS_DIRECTORY = '/tmp/.X11vnc-ports/';
const X11NVC_PORTS_PREFIX = X11NVC_PORTS_DIRECTORY + PREFIX;

const watcher = chokidar.watch(`${X11NVC_PORTS_PREFIX}*`, { persistent: true });

const ensureNewPort = async (display: number) => {
  try {
    const existing = await stat(X11NVC_PORTS_PREFIX + display.toString());

    if (existing.isFile()) {
      throw new Error(`VNC for display ${display} is already running`);
    }
  } catch (error) {
    if (!isNoEntryError(error)) throw error;
  }
};

const checkExistingPort = async (display: number) => {
  try {
    const existing = await stat(X11NVC_PORTS_PREFIX + display.toString());

    return existing.isFile();
  } catch (error) {
    if (!isNoEntryError(error)) throw error;

    return false;
  }
};

export const start = async ({ display, log }: StartOptions) => {
  await mkdir(X11NVC_PORTS_DIRECTORY, { recursive: true });
  await ensureNewPort(display);

  return new Promise<ChildProcessWithoutNullStreams>((resolve, reject) => {
    const flag = X11NVC_PORTS_PREFIX + display.toString();
    const process = spawn('x11vnc', [
      '-xkb',
      '-noxrecord',
      '-noxfixes',
      '-noxdamage',
      '-display',
      `:${display}`,
      '-forever',
      '-rfbauth',
      '/home/macintosh/.vnc/passwd',
      '-rfbport',
      (STARTING_PORT + display).toString(),
      '-clip',
      '1024x684+8+8',
      '-flag',
      flag,
      '-rmflag',
      flag,
    ]);

    const { closed, started, starting, stderr, stdout } = loggersFor({
      name: 'x11vnc',
      meta: { process, display },
      log,
    });

    starting();

    process.stdout.on('data', stdout);
    process.stderr.on('data', stderr);

    void checkExistingPort(display).then(exists => exists && resolve(process));

    process.on('close', code => {
      closed(code);

      reject(
        new Error(`Exited ${code ? `with code: ${code}` : 'without code'}`),
      );
    });

    watcher.on('add', path => {
      log.debug({ path }, 'x11vnc:chokidar.add');

      if (new RegExp(`${PREFIX}${display}$`).test(path)) {
        started({ path });

        resolve(process);
      }
    });
  });
};
