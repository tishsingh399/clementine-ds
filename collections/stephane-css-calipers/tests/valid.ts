import { assertMatchingUnits, m } from 'css-calipers';
import { buttonTokens } from '../../../packages/tokens/dist/components/button-tokens';

const radius = m(8);
const paddingInline = m(12);
const paddingBlock = m(8);
const focusOffset = m(2);

assertMatchingUnits(radius, paddingBlock, 'button radius and block padding should both be px');

export const buttonDimensionProbe = {
  token: buttonTokens.radius,
  radius: radius.css(),
  paddingInline: paddingInline.css(),
  paddingBlock: paddingBlock.css(),
  focusHaloRadius: radius.add(focusOffset).css(),
};
