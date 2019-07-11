module.exports = {
    transform: {
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    },
    "globals": {
        "NODE_ENV": "test"
    },
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: [
        'js',
    ],
    "testEnvironment": "node",
    "verbose": true,
    transformIgnorePatterns: ['<rootDir>/node_modules/']
}
