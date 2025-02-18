// @ts-expect-error Currently does not include a type-declaration file
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import react from '@eslint-react/eslint-plugin';
import eslint from '@eslint/js';
import markdown from '@eslint/markdown';
import gitignore from 'eslint-config-flat-gitignore';
// @ts-expect-error Currently does not include a type-declaration file
import eslintConfigPrettier from 'eslint-config-prettier';
import cssPlugin from 'eslint-plugin-css';
import deMorgan from 'eslint-plugin-de-morgan';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import nodePlugin from 'eslint-plugin-n';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error Currently does not include a type-declaration file
import pluginPromise from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error Currently does not include a type-declaration file
import reactCompiler from 'eslint-plugin-react-compiler';
// @ts-expect-error Currently does not include a type-declaration file
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error Currently does not include a type-declaration file
import pluginSecurity from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginYml from 'eslint-plugin-yml';
import typegen from 'eslint-typegen';
import tseslint from 'typescript-eslint';

const GLOB_JS = '**/*.?([cm])js';
const GLOB_TS = '**/*.?([cm])ts';

export default typegen([
  gitignore(),
  {
    ignores: [
      /* Auto-generated files/directories */
      'pnpm-lock.yaml',

      /* Specific dot-files/dot-directories which should not be auto-ignored */
      '!.dependency-cruiser.js',
      '!.vscode',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.config({
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      react.configs['recommended-type-checked'],
    ],
    files: [GLOB_JS, GLOB_TS],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: /** @satisfies {import('./eslint-typegen').RuleOptions} */ ({
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Too restrictive
    }),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  comments.recommended,
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  ...eslintPluginJsonc.configs['flat/prettier'],
  ...eslintPluginJsonSchemaValidator.configs['flat/recommended'],
  ...markdown.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  pluginSecurity.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
  pluginPromise.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  ...eslintPluginYml.configs['flat/recommended'],
  ...eslintPluginYml.configs['flat/prettier'],
  nodePlugin.configs['flat/recommended-script'],
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactRefresh.configs.vite,
  {
    files: [GLOB_TS],
    ...jsdoc.configs['flat/recommended-typescript-error'],
  },
  {
    files: [GLOB_JS],
    ...jsdoc.configs['flat/recommended-typescript-flavor-error'],
  },
  eslintPluginUnicorn.configs.recommended,
  sonarjs.configs.recommended,
  regexpPlugin.configs['flat/recommended'],
  deMorgan.configs.recommended,
  cssPlugin.configs['flat/standard'],
  packageJson,
  {
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- No type declaration
      'react-compiler': reactCompiler,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- No type declaration
      'react-hooks': reactHooks,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- No type declaration for `eslint-plugin-react-hooks`
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
      ...reactHooks.configs.recommended.rules,
      '@eslint-community/eslint-comments/require-description': 'error',
      'import-x/default': 'off', // TypeScript already enforces this
      'import-x/named': 'off', // TypeScript already enforces this
      'import-x/namespace': 'off', // TypeScript already enforces this
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
      'import-x/no-unresolved': ['error', { commonjs: true }],
      'jsonc/sort-keys': 'error',
      'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
      'n/no-unpublished-import': [
        'error',
        {
          ignoreTypeImport: true,
        },
      ],
      'no-console': ['error', { allow: ['error'] }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          internalPattern: ['^@/'],
          newlinesBetween: 'always',
        },
      ],
      'react-compiler/react-compiler': 'error',
      'security/detect-object-injection': 'off', // Too restrictive
      'unicorn/no-null': 'off', // Too restrictive
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            EnvSchema: true,
          },
          ignore: [/^env$/, /props$/i, /params$/i],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // CommonJS files must use "require" to import modules
    },
  },
  {
    files: ['package.json'],
    rules: {
      'jsonc/sort-keys': 'off', // Sorting of keys within `package.json` is handled by `eslint-plugin-package-json`
    },
  },
  {
    files: ['src/store.ts'],
    rules: {
      'unicorn/prefer-spread': 'off',
    },
  },
  eslintConfigPrettier,
  {
    linterOptions: {
      reportUnusedInlineConfigs: 'error',
    },
  },
]);
