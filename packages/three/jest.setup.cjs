global.IS_REACT_ACT_ENVIRONMENT = true;

// eslint-disable-next-line import/no-extraneous-dependencies, global-require
jest.mock('scheduler', () => require('scheduler/unstable_mock'));
