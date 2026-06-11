import { Autocomplete as MantineAutocomplete, type AutocompleteProps as MantineAutocompleteProps } from '@mantine/core';
import { forwardRef } from 'react';

export interface AutocompleteProps extends MantineAutocompleteProps {}

/**
 * Clementine Autocomplete — a text input that suggests matching options as you type,
 * while still allowing free-text entry (combobox pattern).
 *
 * Exposes `role="combobox"` with `aria-expanded` / `aria-controls` on the input and
 * `role="listbox"` on the popover (Mantine wires these). Use Select when the value
 * MUST be one of the options; use Autocomplete when free text is allowed.
 * See specs/autocomplete/index.md.
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>((props, ref) => {
  return <MantineAutocomplete ref={ref} {...props} />;
});

Autocomplete.displayName = 'Autocomplete';
