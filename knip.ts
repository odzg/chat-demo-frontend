import type { KnipConfig } from 'knip';

export default {
  $schema: 'https://unpkg.com/knip@5/schema-jsonc.json',
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
  },
  entry: [
    // Entry file of Vite's dev server
    'src/main.tsx',

    // Config file of `dependency-cruiser`
    '.dependency-cruiser.js',
  ],
  ignoreDependencies: [
    // Used implicitly by `eslint-plugin-import-x`
    'eslint-import-resolver-typescript',
  ],
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
