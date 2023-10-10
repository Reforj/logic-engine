export default {
  roots: [
    '<rootDir>/',
  ],
  testMatch: [
    '__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.tsx?$': ['ts-jest', {tsconfig: 'tsconfig.json'}],
  },
  preset: 'ts-jest',
  moduleDirectories: [
    'node_modules',
  ],
  globals: {
    window: {},
    __DEV__: {},
  },
}
