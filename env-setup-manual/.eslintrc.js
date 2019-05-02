module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: ['eslint:recommended',
	'plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		// Customizations go here
		// Example turning off prop-types package: 
		// 'react/prop-types': ['off']
		'react/prop-types': ['off']
	},
};