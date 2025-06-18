/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // run ONLY the Pact specs
  testMatch: ['<rootDir>/tests/contracts/**/*.pact.test.ts']
};
