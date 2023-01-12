import { cp, mkdir } from 'fs/promises';
import { spawn } from 'node:child_process';
import path from 'path';

import { loggersFor } from './helpers';
import { StartOptions } from './types';

const MINI_VMAC_DIRECTORY = '/mini-vmac/';

const DISKS = `disks`;

const EXECUTABLE = 'mini-vmac-4x';
const ROM = 'system-6.rom';

const EXECUTABLE_SOURCE = path.join(
  MINI_VMAC_DIRECTORY,
  'executables',
  EXECUTABLE,
);
const DISKS_SOURCE = path.join(MINI_VMAC_DIRECTORY, DISKS);
const ROM_SOURCE = path.join(MINI_VMAC_DIRECTORY, 'roms', ROM);

const DATA_DIRECTORY = '/tmp/.mini-vmac-sessions/';
const PREFIX = 'session-';

export const start = async ({ display, log }: StartOptions) => {
  const session = path.join(DATA_DIRECTORY, PREFIX + display.toString());
  const disks = path.join(session, DISKS);

  log.debug({ session, disks }, 'mini-vmac:copying');

  // TODO: guard against overwrites here similar to xvfb/x11vnc?
  await mkdir(session, { recursive: true });
  await cp(DISKS_SOURCE, disks, { recursive: true });

  const process = spawn(EXECUTABLE_SOURCE, [
    '--rom',
    ROM_SOURCE,
    '-d',
    disks,
    '--display',
    `:${display}`,
  ]);

  const { closed, started, stderr, stdout } = loggersFor({
    name: 'mini-vmac',
    meta: { process, display },
    log,
  });

  started({ session, disks });

  process.stdout.on('data', stdout);
  process.stderr.on('data', stderr);

  process.on('close', closed);

  return process;
};
