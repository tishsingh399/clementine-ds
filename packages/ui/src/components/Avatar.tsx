import { Avatar as MantineAvatar } from '@mantine/core';

export type { AvatarProps, AvatarGroupProps } from '@mantine/core';

/**
 * Clementine Avatar — a user or entity's visual identity (image, initials, or icon).
 *
 * Always pass `alt` for image avatars; fall back to initials via `name`. Use `AvatarGroup`
 * to stack and truncate ("+3") collections. See specs/avatar/index.md.
 */
export const Avatar = MantineAvatar;
export const AvatarGroup = MantineAvatar.Group;
