module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  plugins: [
    'prettier', // Enables Prettier as an ESLint rule
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
    'no-console': 'off', // Allow console.log since this is a Node.js application
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore variables starting with underscore
    camelcase: 'off', // Allow non-camelcase for variables
    'max-len': ['error', { code: 100, ignoreUrls: true }], // Set maximum line length
    'no-param-reassign': 'off', // Allow parameter reassignment
    'prefer-destructuring': 'warn', // Prefer destructuring but don't enforce
    'global-require': 'off', // Allow require statements anywhere
  },
};
