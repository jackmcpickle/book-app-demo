module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
        commonjs: true,
        node: true,
        jest: true,
    },
    globals: {
        $: true,
    },
    settings: {
        react: {
            version: '17',
        },
    },
    plugins: ['prettier', 'jsx-a11y'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'react-app',
        'react-app/jest',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    rules: {
        'no-alert': 0,
        'no-console': 0,
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
};
