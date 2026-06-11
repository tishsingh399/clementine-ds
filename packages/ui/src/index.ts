// Provider
export { ClementineDSProvider, type ClementineDSProviderProps } from './ClementineDSProvider';

// Theme
export { clementineTheme, cssVariablesResolver } from './theme/clementine-theme';

// Components
export { Button, type ButtonProps } from './components/Button';
export { TextInput, type TextInputProps } from './components/TextInput';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Select, type SelectProps } from './components/Select';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Switch, type SwitchProps } from './components/Switch';
export { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from './components/Radio';
export { Badge, type BadgeProps, type RiskLevel } from './components/Badge';
export { Tabs, TabsList, TabsTab, TabsPanel, type TabsProps, type TabsListProps, type TabsTabProps, type TabsPanelProps } from './components/Tabs';
export { Modal, type ModalProps } from './components/Modal';
export { Tooltip, type TooltipProps } from './components/Tooltip';
export { Alert, type AlertProps, type AlertIntent } from './components/Alert';
export { Card, CardSection, type CardProps, type CardSectionProps } from './components/Card';
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps } from './components/Avatar';
export { Accordion, AccordionItem, AccordionControl, AccordionPanel, type AccordionProps, type AccordionItemProps, type AccordionControlProps, type AccordionPanelProps } from './components/Accordion';
export { Menu, MenuTarget, MenuDropdown, MenuItem, MenuLabel, MenuDivider, type MenuProps, type MenuItemProps, type MenuLabelProps, type MenuDividerProps, type MenuTargetProps, type MenuDropdownProps } from './components/Menu';
export { Drawer, type DrawerProps } from './components/Drawer';
export { Autocomplete, type AutocompleteProps } from './components/Autocomplete';
export { Pagination, type PaginationProps } from './components/Pagination';
export { Progress, type ProgressProps } from './components/Progress';
export { Skeleton, type SkeletonProps } from './components/Skeleton';

// AI surface components (Tray 4)
export { Message, type MessageProps, type MessageRole, type MessageStatus } from './components/ai/Message';
export { Composer, type ComposerProps } from './components/ai/Composer';
export { ReasoningTrace, type ReasoningTraceProps } from './components/ai/ReasoningTrace';
export { ToolCallCard, type ToolCallCardProps, type ToolCallStatus } from './components/ai/ToolCallCard';
export { HITLGate, type HITLGateProps, type HITLStatus } from './components/ai/HITLGate';
export { CitationChip, type CitationChipProps } from './components/ai/CitationChip';
export { StreamingText, type StreamingTextProps } from './components/ai/StreamingText';
export { ArtifactFrame, type ArtifactFrameProps } from './components/ai/ArtifactFrame';

// Trust & governance (Tray 7)
export { DisclosureBadge, type DisclosureBadgeProps } from './components/trust/DisclosureBadge';

// Feedback & evaluation (Tray 8)
export { FeedbackControl, type FeedbackControlProps, type FeedbackValue } from './components/feedback/FeedbackControl';

// Behavior & state hooks (Tray 5)
export { useStreaming, type UseStreamingResult } from './hooks/useStreaming';
export { useInterruptible, type UseInterruptibleResult } from './hooks/useInterruptible';
export { useRetry, type UseRetryResult } from './hooks/useRetry';

// Re-export commonly used Mantine layout components
export { Stack, Group, Text, Title, Flex, Box, Container } from '@mantine/core';
