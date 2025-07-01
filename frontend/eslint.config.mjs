import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
const [typescriptEslint, typescriptParser, reactPlugin, jsxA11y, prettierPlugin] =
  await Promise.all([
    import('@typescript-eslint/eslint-plugin'),
    import('@typescript-eslint/parser'),
    import('eslint-plugin-react'),
    import('eslint-plugin-jsx-a11y'),
    import('eslint-plugin-prettier'),
  ]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js & TypeScript presets
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // General rule overrides
  {
    rules: {
      'no-console': 'warn',
      'max-len': [
        'warn',
        {
          code: 150,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
    },
  },

  // TypeScript & React config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser.default,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint.default,
      react: reactPlugin.default,
      'jsx-a11y': jsxA11y.default,
      prettier: prettierPlugin.default,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React
      'react/react-in-jsx-scope': 'off', // not needed in Next.js
      'react/jsx-uses-react': 'off',

      // A11y
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

    },
  },
];

export default eslintConfig;
