module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    // 'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    // 'prettier/react',
  ],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        format: ['strictCamelCase', 'snake_case'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['strictCamelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
