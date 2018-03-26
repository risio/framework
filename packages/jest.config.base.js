module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: ".*/test/(.*/)?.*.ts",
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
