module.exports = {
  plugins: ['prettier'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
  },
  env: {
    node: true,
  },
};
