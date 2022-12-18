import invariant from 'tiny-invariant';

export interface Configuration {
  socketHost: string;
  socketPath: string;
}

const bootstrap = (): Configuration => {
  if (typeof window !== 'undefined') return window.configuration;

  const { SOCKET_HOST, SOCKET_PATH } = process.env;

  invariant(
    SOCKET_HOST && typeof SOCKET_HOST === 'string',
    'configuration: `socketHost` is required',
  );

  return {
    socketHost: SOCKET_HOST,
    socketPath: SOCKET_PATH ?? '/socket',
  };
};

const configuration = bootstrap();

export { configuration };
