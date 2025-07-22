import type { KnipConfig } from 'knip';

export default {
  compilers: {
    // Detect dependencies imported through `@import` statements within CSS files
    css: (text) =>
      text
        .matchAll(/(?<=@)import[^;]+/g)
        .toArray()
        .join('\n'),
  },
  ignore:
    // Auto-generated but not included in .gitignore
    '**/routeTree.gen.ts',
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
