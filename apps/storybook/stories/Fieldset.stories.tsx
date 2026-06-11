import type { Meta, StoryObj } from '@storybook/react';
import { Fieldset, TextInput, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof Fieldset> = { title:'Components/Fieldset', component: Fieldset, render:(args) => (
  <Fieldset {...args} legend="Access details" w={360}>
    <Stack gap="sm">
      <TextInput label="Resource" placeholder="prod-db" />
      <TextInput label="Justification" placeholder="Why is this needed?" />
    </Stack>
  </Fieldset>
) };
export default meta; type Story = StoryObj<typeof Fieldset>;
export const Default: Story = {};
export const Disabled: Story = { args:{ disabled:true } };
