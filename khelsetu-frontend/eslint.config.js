// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sharedRestrictImports = {
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['@features/*'],
          message:
            'shared/ must not import from features/. Use a prop/callback pattern instead.',
          allowTypeImports: false,
        },
      ],
      paths: [
        {
          name: 'react',
          importNames: ['default'],
          message: 'Use named imports (e.g., useState, useEffect).',
        },
      ],
    },
  ],
};

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'public/mockServiceWorker.js',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: 'Use named imports (e.g., useState, useEffect).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**'],
    rules: sharedRestrictImports,
  },
  {
    files: ['src/tests/**', 'e2e/**', '**/*.test.*', '**/*.spec.*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  storybook.configs['flat/recommended'],
);
