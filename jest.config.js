module.exports = {
  moduleNameMapper: {
    '^@/prisma/(.*)$': '<rootDir>/prisma/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
};
