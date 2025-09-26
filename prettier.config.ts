import type { Config } from 'prettier';

export default {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  tailwindAttributes: [
    'class',
    'className',

    // For the `classes` prop of MUI components
    'classes',
  ],
  tailwindFunctions: ['tw', 'twObject', 'twMerge', 'twJoin', 'twConsumeCssVar'],
} satisfies Config;
