import { noRawStyleValues } from './rules/no-raw-style-values.js';
import { noUnknownComponentToken } from './rules/no-unknown-component-token.js';

const rules = {
  'no-raw-style-values': noRawStyleValues,
  'no-unknown-component-token': noUnknownComponentToken,
};

const plugin = {
  meta: {
    name: '@clementine-ds/eslint-plugin',
    version: '0.1.0',
  },
  rules,
  configs: {},
};

plugin.configs.recommended = [
  {
    plugins: {
      clementine: plugin,
    },
    rules: {
      'clementine/no-raw-style-values': 'error',
      'clementine/no-unknown-component-token': 'error',
    },
  },
];

export { rules };
export default plugin;
