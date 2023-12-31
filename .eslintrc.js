module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
		'@typescript-eslint/no-explicit-any': ['error'],
		'no-trailing-spaces': ['error']
	},
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		},
		{
			files: ['*.test.ts', 'testConstants.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': ['off']
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: ['@typescript-eslint', 'prettier']
};
