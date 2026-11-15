// Paint keys only: layout tweaks like SplitButton's border radius stay allowed.
const PAINT_KEY = /color|background|fill|stroke|shadow|outline|opacity|filter/i;

function keyName(property) {
  if (property.type !== 'Property' || property.computed) return null;
  return property.key.type === 'Identifier' ? property.key.name : String(property.key.value);
}

export const noButtonPaintOverride = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inline paint (color, background, border color, shadow) on Clementine <Button>; use intent and variant instead.',
    },
    schema: [],
    messages: {
      paintOverride:
        '<Button> paint "{{key}}" is set inline. Use intent/variant; Button owns its own tokens, including hover.',
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name?.name !== 'style') return;
        const element = node.parent?.name;
        if (element?.type !== 'JSXIdentifier' || element.name !== 'Button') return;
        const expr = node.value?.type === 'JSXExpressionContainer' ? node.value.expression : null;
        // shortcut: only object literals are inspected, a style passed by variable is not; upgrade with scope analysis if that shows up.
        if (expr?.type !== 'ObjectExpression') return;
        for (const property of expr.properties) {
          const key = keyName(property);
          if (key && PAINT_KEY.test(key)) {
            context.report({ node: property, messageId: 'paintOverride', data: { key } });
          }
        }
      },
    };
  },
};
