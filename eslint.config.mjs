import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{
		ignores: ['.node_modules/*', '.dist/*', '.build/*', './tsconfig.json'],
		rules: {
			eqeqeq: 'warn',
			'no-unused-vars': 'warn', // Warn about unused variables
			'no-console': 'warn', // Warn about console.log (useful for production)
			'no-undef': 'error', // Disallow undeclared variables
			'prefer-const': 'error', // Prefer const over let
			'no-var': 'error', // Disallow var
			'no-unused-expressions': 'warn', // Warn about unused expressions
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
];
