import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@stock-tracker/prisma/client$":
      "<rootDir>/../../packages/prisma/dist/client.js",
    "^@stock-tracker/prisma$": "<rootDir>/../../packages/prisma/dist/index.js",
    "^@stock-tracker/validation$":
      "<rootDir>/../../packages/validation/dist/index.js",
    "^@stock-tracker/types$": "<rootDir>/../../packages/types/dist/index.js",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(@stock-tracker)/)"],
  testMatch: ["**/__tests__/**/*.e2e.test.ts"],
  testTimeout: 30000,
  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts", "!src/__tests__/**", "!src/server.ts"],
};

export default config;
