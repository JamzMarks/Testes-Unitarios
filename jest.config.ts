import {Config} from '@jest/types'

const baseDir = '<rootDir>/src/app/doubles'
const baseTestDir = '<rootDir>/src/test/doubles'
// const baseDir = '<rootDir>/src/app/myTest'
// const baseTestDir = '<rootDir>/src/test/myTest'

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    verbose: true,
    transform: {
      '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    moduleFileExtensions: ["ts", "js", "json", "node"],
    collectCoverage: true,
    collectCoverageFrom: [
      `${baseDir}/**/*.ts`
    ],
    testMatch: [
      `${baseTestDir}/**/*.ts`
    ], // Localiza testes apenas em `src/test`
    
  };

export default config;