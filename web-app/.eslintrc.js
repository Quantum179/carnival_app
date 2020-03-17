module.exports = {
  root: true,
  env: {
    "browser": true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0,
    'comma-dangle': 0,
    'max-len': 0,
    'linebreak-style': 0,
    'padded-blocks': 0,
    'lines-between-class-members': 0,
    'object-curly-newline': 0,
    'no-explicit-any': 0,
    'no-plusplus': 0,
    'no-mixed-operators': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
