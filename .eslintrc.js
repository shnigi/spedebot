module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'linebreak-style': 'off',
        indent: ['error', 4],
        'max-len': ['warn', 150],
        camelcase: 'off',
        'no-unused-vars': 'off',
    },
};
