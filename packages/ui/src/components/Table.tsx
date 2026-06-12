import { Table as MantineTable } from '@mantine/core';

export type { TableProps } from '@mantine/core';

/** Clementine Table — Display structured records in rows and columns; the workhorse of an enterprise console. Spec: specs/table/index.md */
export const Table: typeof MantineTable = MantineTable;
export const TableThead: typeof MantineTable.Thead = MantineTable.Thead;
export const TableTbody: typeof MantineTable.Tbody = MantineTable.Tbody;
export const TableTr: typeof MantineTable.Tr = MantineTable.Tr;
export const TableTh: typeof MantineTable.Th = MantineTable.Th;
export const TableTd: typeof MantineTable.Td = MantineTable.Td;