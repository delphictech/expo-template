module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended"
        
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
        "react"
    ],
    "rules": {
        // using arrow function components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md#rule-options
        "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
        // props spreading allowed for jsx components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md#rule-details
        "react/jsx-props-no-spreading": [2, {"custom": "ignore"}],
        // default exports not preferred
        "import/prefer-default-export": "off",
        // for managing state with redux toolkit: https://redux-starter-kit.js.org/usage/immer-reducers#linting-state-mutations
        "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
        // for throwing firebase errors: https://typescript-eslint.io/rules/no-throw-literal/#options
        "@typescript-eslint/no-throw-literal": ["error", { "allowThrowingAny": true }]
    }
};
