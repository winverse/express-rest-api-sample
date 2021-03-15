module.exports = {
  plugins: ['prettier', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'prefer-const': 0,
    'consistent-return': 0,
  },
  env: {
    'jest/globals': true,
    node: true,
  },
};
