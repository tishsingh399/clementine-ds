import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

export default {
  source: ['src/primitives.json'],
  platforms: {
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [
        {
          destination: 'primitives.js',
          format: 'javascript/es6',
        },
        {
          destination: 'primitives.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};
