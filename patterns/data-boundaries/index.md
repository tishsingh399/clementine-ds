# Pattern · Data boundaries

> Tray 3 · **Governance pattern.** Makes clear what leaves the tenant, what is retained, and what is used for training.

## Problem it solves

Makes clear what leaves the tenant, what is retained, and what is used for training.

## Approach

- State data flow at the point of input/attachment.
- Distinguish retained vs ephemeral vs training data.
- Honor regional + tenant boundaries.

## Built from

- DisclosureBadge
- AttachmentPill
- Alert
- content/disclosure-copy.md

## Do / Don't

**Do:** Tell users what is sent / retained / trained on; Respect tenant + regional boundaries.

**Don't:** Send data across boundaries silently; Train on data without disclosure.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
