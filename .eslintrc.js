module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'warn',
    'react/forbid-prop-types': 'warn',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-cycle': 'warn',
    'arrow-body-style': 'warn',
    'consistent-return': 'warn',
  },
};
