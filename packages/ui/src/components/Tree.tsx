import { Tree as MantineTree } from '@mantine/core';

export type { TreeProps } from '@mantine/core';

/**
 * Clementine Tree — a hierarchical, expandable node list (file trees, org/permission
 * hierarchies, nested resources). Keyboard-navigable with `aria-expanded`/`role="tree"`.
 * Spec: specs/tree/index.md
 */
export const Tree: typeof MantineTree = MantineTree;
