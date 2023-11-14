/**
 * 
 * Ensure import rules are toggled for production,
 * I keep them off for development 
 * because they don't register manual fixes most of the time
 */
module.exports = {
  env: {
    browser: true,
    'es2021': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'next',
    'plugin:@typescript-eslint/strict',
    'plugin:jsx-a11y/strict',
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
    project: './tsconfig.json',
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
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
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
    'no-console': 'off',
    // 'no-console': [ 
    //   'warn',
    //   {
    //     allow: [
    //       'warn',
    //       'error',
    //     ],
    //   },
    // ],
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
        allowGlobals: false,
      },
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'simple-import-sort/exports': 'off',
    'simple-import-sort/imports': 'off',
    // 'simple-import-sort/imports': [
    //   'warn',
    //   {
    //     groups: [
    //       [
    //         '^\\u0000',
    //       ],
    //       [
    //         '^react',
    //         '^@?\\w',
    //       ],
    //       [
    //         '^@/',
    //         '^\\.\\.(?!/?$)',
    //         '^\\.\\./?$',
    //       ],
    //       [
    //         '^\\./(?=.*/)(?!/?$)',
    //         '^\\.(?!/?$)',
    //         '^\\./?$',
    //       ],
    //       [
    //         '^@?\\w',
    //         '^.+\\.s?css$',
    //       ],
    //     ],
    //   },
    // ],
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