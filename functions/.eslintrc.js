module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json', 'tsconfig.dev.json'],
        sourceType: 'module',
    },
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
        '/tests/**/*',
    ],
    plugins: ['@typescript-eslint', 'import'],
    rules: {
        // "quotes": ["error", "double"],
        'import/no-unresolved': 0,
        // using arrow function components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md#rule-options
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        // props spreading allowed for jsx components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md#rule-details
        'react/jsx-props-no-spreading': [2, { custom: 'ignore' }],
        // default exports not preferred
        'import/prefer-default-export': 'off',
        // turn indent off: https://typescript-eslint.io/rules/indent/
        indent: 'off',
        '@typescript-eslint/indent': 'off',
    },
};
