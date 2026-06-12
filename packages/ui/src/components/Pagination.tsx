import { Pagination as MantinePagination } from '@mantine/core';

export type { PaginationProps } from '@mantine/core';

/**
 * Clementine Pagination — page navigation for long, chunked result sets.
 *
 * Renders a `navigation` landmark with accessible page-button labels and an
 * `aria-current="page"` marker on the active page (Mantine wires these). Pair with
 * a results count ("Showing 1–20 of 240") for orientation. See specs/pagination/index.md.
 */
export const Pagination = MantinePagination;
