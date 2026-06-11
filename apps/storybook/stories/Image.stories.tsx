import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '@clementine-ds/ui';
const meta: Meta<typeof Image> = { title:'Components/Image', component: Image, args:{ src:'https://i.pravatar.cc/240?img=47', alt:'Avatar', w:200, h:200, radius:'md' } };
export default meta; type Story = StoryObj<typeof Image>;
export const Default: Story = {};
