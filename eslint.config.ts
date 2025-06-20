import type { Linter } from 'eslint';

// @ts-expect-error Currently does not include type declarations
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import react from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import pluginRouter from '@tanstack/eslint-plugin-router';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import deMorgan from 'eslint-plugin-de-morgan';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
// @ts-expect-error Currently does not include type declarations
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginMath from 'eslint-plugin-math';
import moduleInterop from 'eslint-plugin-module-interop';
import nodePlugin from 'eslint-plugin-n';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error Currently does not include type declarations
import pluginPromise from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error Currently does not include type declarations
import pluginSecurity from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginYml from 'eslint-plugin-yml';
import typegen from 'eslint-typegen';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const GLOB_JS = '**/*.?([cm])js';
const GLOB_PACKAGE_JSON = '**/package.json';
const GLOB_TS = '**/*.?([cm])ts?(x)';

export default typegen(
  defineConfig([
    gitignore(),
    globalIgnores([
      // Auto-generated files/directories that are not included in .gitignore
      'pnpm-lock.yaml',
      '**/routeTree.gen.ts',

      // Dot files/directories which should NOT be ignored
      '!.dependency-cruiser.js',
      '!.vscode',
    ]),
    {
      extends: ['js/recommended'],
      files: [GLOB_JS, GLOB_TS],
      name: js.meta.name,
      plugins: { js },
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.strictTypeChecked,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.stylisticTypeChecked,
      ],
      files: [GLOB_JS, GLOB_TS],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      } satisfies ConfigArray[number]['languageOptions'],
      name: tseslint.plugin.meta?.name,
    },
    {
      ...jsdoc.configs['flat/recommended-typescript-error'],
      files: [GLOB_TS],
    },
    {
      ...jsdoc.configs['flat/recommended-typescript-flavor-error'],
      files: [GLOB_JS],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    comments.recommended as Linter.Config,
    {
      // @ts-expect-error The built-in types for `eslint-plugin-jsonc` configs are currently incompatible
      // with the official ESLint `Linter.Config` type.
      extends: [
        ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
        ...eslintPluginJsonc.configs['flat/prettier'],
      ],
      name: eslintPluginJsonc.meta.name,
    },
    {
      ignores: [GLOB_PACKAGE_JSON],
      name: `${eslintPluginJsonc.meta.name}/sort-keys-except-package-json`,
      rules: {
        'jsonc/sort-keys': 'error',
      },
    },
    {
      extends: eslintPluginJsonSchemaValidator.configs['flat/recommended'],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- For some reason `eslintPluginJsonSchemaValidator.meta` is seen as `any` by TypeScript
      name: eslintPluginJsonSchemaValidator.meta.name,
    },
    markdown.configs.recommended,
    nodePlugin.configs['flat/recommended'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginSecurity.configs.recommended as Linter.Config,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginPromise.configs['flat/recommended'] as Linter.Config,
    {
      // Temporary name until the plugin is updated to include names in its exported configs
      name: `${perfectionist.meta.name}/recommended-natural`,
      ...perfectionist.configs['recommended-natural'],
    },
    {
      // @ts-expect-error The built-in types for `eslint-plugin-yml` configs are currently incompatible
      // with the official ESLint `Linter.Config` type.
      extends: [
        ...eslintPluginYml.configs['flat/recommended'],
        ...eslintPluginYml.configs['flat/prettier'],
      ],
      name: eslintPluginYml.meta.name,
    },
    // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
    eslintPluginImportX.flatConfigs.recommended,
    // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
    eslintPluginImportX.flatConfigs.typescript,
    reactHooks.configs.recommended,
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        reactPlugin.configs.flat.recommended,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        reactPlugin.configs.flat['jsx-runtime'],
      ],
      name: 'eslint-plugin-react',
    },
    // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
    {
      ...react.configs['recommended-type-checked'],
      files: [GLOB_JS, GLOB_TS],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    jsxA11y.flatConfigs.recommended as Linter.Config,
    reactRefresh.configs.vite,
    {
      extends: pluginRouter.configs['flat/recommended'],
      name: pluginRouter.meta?.name ?? '',
    },
    eslintPluginUnicorn.configs.recommended,
    sonarjs.configs.recommended,
    {
      // Temporary name until the plugin is updated to include names in its exported configs
      name: 'eslint-plugin-regexp/flat/recommended',
      ...regexpPlugin.configs['flat/recommended'],
    },
    {
      // Temporary name until the plugin is updated to include names in its exported configs
      name: `${deMorgan.meta.name}/recommended`,
      ...deMorgan.configs.recommended,
    },
    {
      // Temporary name until the plugin is updated to include names in its exported configs
      name: `${eslintPluginMath.meta.name}/recommended`,
      ...eslintPluginMath.configs.recommended,
    },
    {
      // Temporary name until the plugin is updated to include names in its exported configs
      name: `${moduleInterop.meta.name}/recommended`,
      ...moduleInterop.configs.recommended,
    },
    packageJson.configs.recommended,
    eslintConfigPrettier,
    {
      extends: [
        {
          files: [GLOB_JS, GLOB_TS],
          name: 'js-and-ts-files-only',
          rules: {
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/consistent-type-imports': [
              'error',
              { fixStyle: 'inline-type-imports' },
            ],
            '@typescript-eslint/no-empty-object-type': [
              'error',
              { allowInterfaces: 'with-single-extends' },
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-unused-vars': [
              'error',
              { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/only-throw-error': [
              'error',
              {
                allow: [
                  // Returned by `redirect` function from `@tanstack/react-router`
                  'Redirect',
                ],
              },
            ],
          },
        },
      ],
      name: 'rule-overrides',
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error',
        'import-x/default': 'off', // TypeScript already enforces this
        'import-x/named': 'off', // TypeScript already enforces this
        'import-x/namespace': 'off', // TypeScript already enforces this
        'import-x/newline-after-import': 'error',
        'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
        'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
        'jsdoc/require-jsdoc': 'off', // Too restrictive
        'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
        'no-console': ['error', { allow: ['error'] }],
        'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],
        'react-hooks/react-compiler': 'error',
        'security/detect-object-injection': 'off', // Too restrictive
        'unicorn/no-null': 'off', // Too restrictive
        'unicorn/prevent-abbreviations': [
          'error',
          { ignore: [/env/i, /props$/i, /params$/i] },
        ],
      },
    },
    {
      linterOptions: {
        reportUnusedInlineConfigs: 'error',
      },
      name: 'linter-options',
    },
    {
      name: 'settings',
      settings: {
        'import-x/resolver-next': createTypeScriptImportResolver(),
      },
    },
  ]),
);
