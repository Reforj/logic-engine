export default {
  roots: [
    '<rootDir>/',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  moduleDirectories: [
    'node_modules',
  ],
  globals: {
    window: {},
    __DEV__: {},
    __TEST__: {},
    __PROD__: {},
    __DISABLE_LOGGER_: {},
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
}
