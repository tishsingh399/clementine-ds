import tseslint from 'typescript-eslint';

import clementine from './packages/eslint-plugin/src/index.js';

/**
 * Clementine's token gate.
 *
 * This config exists to run `clementine/no-unknown-component-token` and
 * `clementine/no-raw-style-values` over real source. It deliberately does not
 * enable a general recommended set — the other quality gates in this repo are
 * the `validate:*` scripts, and mixing a broad style ruleset in here would bury
 * contract violations in unrelated noise.
 */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/.turbo/**',
      '**/*.generated.*',
      // Finder/Dropbox conflict copies ("App 2.tsx", "styles 3.css").
      '**/* [0-9].*',
    ],
  },
  {
    files: ['packages/ui/src/**/*.{ts,tsx}', 'apps/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    // `@typescript-eslint` is registered but its rules stay off: source already
    // carries `eslint-disable` directives naming them, and an unregistered rule
    // in a directive is itself an error.
    plugins: { clementine, '@typescript-eslint': tseslint.plugin },
    // Those rules being off makes existing directives read as "unused". They are
    // not — they are correct for the day someone turns the rules on.
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    settings: { clementine: { root: import.meta.dirname } },
    rules: {
      'clementine/no-unknown-component-token': 'error',
      'clementine/no-raw-style-values': 'error',
    },
  },
];
