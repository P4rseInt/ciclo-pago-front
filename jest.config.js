const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./test-setup.ts'],
  testPathIgnorePatterns: [
    '/e2e',
  ],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/src' }),
};
