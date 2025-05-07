import type { KnipConfig } from 'knip';

export default {
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
  },
  entry: 'src/main.tsx',
  ignoreDependencies: [
    // Used implicitly by `eslint-plugin-import-x`
    'eslint-import-resolver-typescript',
  ],
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
