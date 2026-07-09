import {
  createComponentTokenIndex,
  findComponentTokenViolations,
} from '../token-inventory.js';

function getSourceCode(context) {
  return context.sourceCode ?? context.getSourceCode();
}

function configuredRoot(context) {
  return context.settings?.clementine?.root ?? process.cwd();
}

function reportViolations(context, node, text, index) {
  const violations = findComponentTokenViolations(text, index);
  for (const violation of violations) {
    context.report({
      node,
      messageId: violation.kind === 'css-var' ? 'unknownCssVariable' : 'unknownToken',
      data: { value: violation.value, namespace: violation.namespace },
    });
  }
}

function literalText(node, sourceCode) {
  if (node.type === 'Literal' && typeof node.value === 'string') return node.value;
  if (node.type === 'TemplateElement') return node.value?.cooked ?? node.value?.raw ?? '';
  return sourceCode.getText(node);
}

export const noUnknownComponentToken = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow invented Clementine component token paths and component-tier CSS variables.',
    },
    schema: [],
    messages: {
      unknownToken:
        '"{{value}}" looks like a {{namespace}} component token, but it is not in the generated contract.',
      unknownCssVariable:
        '"{{value}}" looks like a {{namespace}} component CSS variable, but it is not emitted by the generated contract.',
    },
  },
  create(context) {
    const sourceCode = getSourceCode(context);
    const index = createComponentTokenIndex({ root: configuredRoot(context) });

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return;
        reportViolations(context, node, node.value, index);
      },
      TemplateElement(node) {
        reportViolations(context, node, literalText(node, sourceCode), index);
      },
    };
  },
};
