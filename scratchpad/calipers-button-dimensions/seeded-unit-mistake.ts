import { m } from 'css-calipers';

const radius = m(8);
const remSpacing = m(1, 'rem');

export const seededMistake = radius.add(remSpacing).css();
