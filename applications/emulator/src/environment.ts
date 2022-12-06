export const environments = ['development', 'test', 'production'] as const;

export type Environment = typeof environments[number];
