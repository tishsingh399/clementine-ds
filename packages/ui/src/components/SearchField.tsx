import { TextInput, type TextInputProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface SearchFieldProps extends TextInputProps {}

/**
 * Clementine SearchField — a TextInput preset for search: `type="search"`, a leading search
 * affordance, and a clearable value. Pair with typeahead/faceted results. Spec: specs/search-field/index.md
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ placeholder = 'Search…', ...props }, ref) => (
    <TextInput ref={ref} type="search" leftSection={<span aria-hidden>⌕</span>} placeholder={placeholder} {...props} />
  ),
);

SearchField.displayName = 'SearchField';
