import { Stack, Group, Avatar, Text, Textarea, Button } from '@mantine/core';
import { forwardRef, useState } from 'react';

export interface Comment {
  id: string;
  author: string;
  body: string;
  when: string;
}
export interface CommentThreadProps {
  comments: Comment[];
  onSubmit?: (body: string) => void;
}

/**
 * Enterprise · CommentThread — a list of comments plus a composer. Tokens: comment-thread.* .
 * Spec: specs/comment-thread/index.md
 */
export const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(({ comments, onSubmit }, ref) => {
  const [draft, setDraft] = useState('');
  return (
    <Stack ref={ref} gap="md" style={{ width: 420 }}>
      {comments.map((c) => (
        <Group key={c.id} gap="sm" wrap="nowrap" align="flex-start">
          <Avatar name={c.author} color="blue" radius="xl" size="sm" />
          <div>
            <Group gap={8} align="baseline">
              <Text size="sm" fw={600} style={{ color: 'var(--cds-text-primary)' }}>{c.author}</Text>
              <Text size="xs" style={{ color: 'var(--cds-text-tertiary)' }}>{c.when}</Text>
            </Group>
            <Text size="sm" style={{ color: 'var(--cds-text-primary)' }}>{c.body}</Text>
          </div>
        </Group>
      ))}
      <Group gap="sm" align="flex-end">
        <Textarea placeholder="Add a comment…" autosize minRows={1} value={draft} onChange={(e) => setDraft(e.currentTarget.value)} style={{ flex: 1 }} />
        <Button size="sm" disabled={!draft.trim()} onClick={() => { onSubmit?.(draft); setDraft(''); }}>Comment</Button>
      </Group>
    </Stack>
  );
});

CommentThread.displayName = 'CommentThread';
