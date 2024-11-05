import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

/** @type {eslint.Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
