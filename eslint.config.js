module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.json'),
  },
  root: true,
  plugins: [
    'react',
    'react-refresh',
    'simple-import-sort',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/semi': 'warn',
    'import/extensions': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: [
          'HookFormInput',
        ],
        depth: 3,
      },
    ],
    'jsx-quotes': [
      'error',
      'prefer-single',
    ],
    'linebreak-style': 'off',
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error',
        ],
      },
    ],
    'no-tabs': [
      'error',
      {
        allowIndentationTabs: true,
      },
    ],
    'no-trailing-spaces': 'warn',
    'react-refresh/only-export-components': 'warn',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.tsx',
          '.ts',
        ],
      },
    ],
    'react/jsx-no-undef': [
      2,
      {
        allowGlobals: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          [
            '^\\u0000',
          ],
          [
            '^react',
            '^@?\\w',
          ],
          [
            '^@/',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
          ],
          [
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          [
            '^@?\\w',
            '^.+\\.s?css$',
          ],
        ],
      },
    ],
    'unicorn/consistent-destructuring': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-null': 'off',
    'unicorn/numeric-separators-style': [
      'warn',
      {
        number: {
          groupLength: 3,
          minimumDigits: 0,
        },
      },
    ],
    'unicorn/prefer-at': 'off',
    'unicorn/prefer-logical-operator-over-ternary': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};