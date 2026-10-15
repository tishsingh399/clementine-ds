import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Storybook 8 hard-codes "⋅ Storybook" into the browser tab title and ships
  // "@storybook/core - Storybook" as the placeholder before it loads. There is
  // no option for either, so rename both, and keep renaming as stories change.
  managerHead: (head) => `${head}
    <script>
      (function () {
        var fix = function () {
          var t = document.title;
          var n = t === '@storybook/core - Storybook' || t === 'Storybook'
            ? 'Clementine Design System'
            : t.replace(/ \u22C5 Storybook$/, ' \u22C5 Clementine');
          if (n !== t) document.title = n;
        };
        fix();
        new MutationObserver(fix).observe(document.head, { childList: true, subtree: true, characterData: true });
      })();
    </script>`,
};

export default config;
