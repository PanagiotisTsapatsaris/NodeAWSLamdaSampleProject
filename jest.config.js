// eslint-disable-next-line no-undef
module.exports = {
	moduleNameMapper: {
		'@middlewares': '<rootDir>/src/middlewares',
		'@libs/(.*)': '<rootDir>/src/libs/$1'
	},
	modulePaths: ['<rootDir>/src/'],

	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest/presets/js-with-ts',

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// An array of directory names to be searched recursively up from the requiring module's location
	moduleDirectories: ['node_modules'],

	modulePathIgnorePatterns: ['<rootDir>/dist/'],

	testPathIgnorePatterns: ['<rootDir>/dist/', '/node_modules/'],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	collectCoverageFrom: ['**/*.ts', '!**/*.test.ts', '!**/node_modules/**'],

	testMatch: ['<rootDir>/**/*.test.ts']
};
