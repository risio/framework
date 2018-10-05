module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "packages/.*/test/(.*/)?.*.ts",
    testPathIgnorePatterns: [
        "<rootDir>/*/dist/",
        "<rootDir>/*/node_modules/"
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    coverageReporters: ["lcov"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
}
