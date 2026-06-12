import { MultiSelect, type MultiSelectProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface RolePickerProps extends Omit<MultiSelectProps, 'data'> {
  roles: MultiSelectProps['data'];
}

/**
 * Enterprise · RolePicker — assign one or more roles to a user/group (a MultiSelect preset
 * for RBAC). Tokens reuse `multi-select.*`. Spec: specs/role-picker/index.md
 */
export const RolePicker = forwardRef<HTMLInputElement, RolePickerProps>(({ roles, ...props }, ref) => (
  <MultiSelect ref={ref} data={roles} searchable clearable placeholder="Assign roles" {...props} />
));

RolePicker.displayName = 'RolePicker';
