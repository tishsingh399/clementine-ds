import { findRawStyleValues } from '../style-values.js';

function getSourceCode(context) {
  return context.sourceCode ?? context.getSourceCode();
}

function reportRawStyleValues(context, node, text) {
  const offenders = findRawStyleValues(text);
  for (const offender of offenders) {
    context.report({
      node,
      messageId: 'rawStyleValue',
      data: { value: offender },
    });
  }
}

function isStyleElementName(name) {
  return name?.type === 'JSXIdentifier' && name.name === 'style';
}

export const noRawStyleValues = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow raw colors and durations inside JSX style contexts; use Clementine tokens/CSS variables instead.',
    },
    schema: [],
    messages: {
      rawStyleValue: 'Raw style value "{{value}}" is not token-backed.',
    },
  },
  create(context) {
    const sourceCode = getSourceCode(context);

    return {
      JSXAttribute(node) {
        if (node.name?.name !== 'style' || !node.value) return;
        reportRawStyleValues(context, node, sourceCode.getText(node.value));
      },
      JSXElement(node) {
        if (!isStyleElementName(node.openingElement?.name)) return;
        const text = node.children?.map((child) => child.value ?? sourceCode.getText(child)).join('\n') ?? '';
        reportRawStyleValues(context, node, text);
      },
    };
  },
};
