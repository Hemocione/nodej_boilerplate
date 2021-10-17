module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>//reports//coverage",
  coverageReporters: [
    "text",
    "lcov",
    "html"
  ],
  rootDir: ".",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
}
