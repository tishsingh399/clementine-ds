import type { ComponentTokenPath, ComponentTokenNamespace } from '../../tokens/dist/tokens';

export type { ComponentTokenPath, ComponentTokenNamespace };

export interface ClementineRuleModule {
  meta: Record<string, unknown>;
  create(context: unknown): Record<string, (node: unknown) => void>;
}

declare const plugin: {
  meta: {
    name: '@clementine-ds/eslint-plugin';
    version: string;
  };
  rules: {
    'no-raw-style-values': ClementineRuleModule;
    'no-unknown-component-token': ClementineRuleModule;
  };
  configs: {
    recommended: unknown[];
  };
};

export const rules: typeof plugin.rules;
export default plugin;
