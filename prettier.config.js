/** @type {import('prettier').Config} */
export default {
  overrides: [
    {
      files: '*.ts?(x)',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: 'knip.jsonc',
      options: {
        trailingComma: 'none',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  tailwindAttributes: [
    'class',
    'className',

    // For the `classes` prop of MUI components
    'classes',
  ],
  tailwindFunctions: ['tw', 'twObject', 'twMerge', 'twJoin', 'twConsumeCssVar'],
};
