const RAW_HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/g;
const RAW_TIME_VALUE = /(?<![\w-])\d+(?:\.\d+)?m?s\b/g;

export function stripComments(text) {
  let out = '';
  let index = 0;
  let inBlockComment = false;
  let inLineComment = false;

  while (index < text.length) {
    const char = text[index];
    const next = text[index + 1];

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false;
        index += 2;
      } else {
        index += 1;
      }
      continue;
    }

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
        out += char;
      }
      index += 1;
      continue;
    }

    if (char === '/' && next === '*') {
      inBlockComment = true;
      index += 2;
      continue;
    }

    if (char === '/' && next === '/') {
      inLineComment = true;
      index += 2;
      continue;
    }

    out += char;
    index += 1;
  }

  return out;
}

export function findRawStyleValues(text) {
  const styleText = stripComments(text);
  const offenders = [
    ...styleText.matchAll(RAW_HEX_COLOR),
    ...styleText.matchAll(RAW_TIME_VALUE),
  ].map((match) => match[0]);

  return [...new Set(offenders)];
}
