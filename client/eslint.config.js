import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'off',
      'no-var': 'error',
      'prefer-const': 'error'
    }
  }
]; 