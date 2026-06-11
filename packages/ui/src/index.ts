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
export { PromptSuggestions, type PromptSuggestionsProps } from './components/ai/PromptSuggestions';
export { SourcesPanel, type SourcesPanelProps, type Source } from './components/ai/SourcesPanel';
export { ConfidenceMeter, type ConfidenceMeterProps, type ConfidenceLevel } from './components/ai/ConfidenceMeter';
export { ModelSelector, type ModelSelectorProps } from './components/ai/ModelSelector';
export { CodeBlock, type CodeBlockProps } from './components/ai/CodeBlock';
export { AttachmentPill, type AttachmentPillProps } from './components/ai/AttachmentPill';
// AI surfaces — long tail (Wave F)
export { ConversationThread, type ConversationThreadProps } from './components/ai/ConversationThread';
export { MessageActions, type MessageActionsProps } from './components/ai/MessageActions';
export { ContextMeter, type ContextMeterProps } from './components/ai/ContextMeter';
export { DiffView, type DiffViewProps, type DiffLine } from './components/ai/DiffView';
export { AgentStatus, type AgentStatusProps, type AgentState } from './components/ai/AgentStatus';
export { PlanSteps, type PlanStepsProps, type PlanStep, type PlanStepStatus } from './components/ai/PlanSteps';
export { PermissionRequest, type PermissionRequestProps } from './components/ai/PermissionRequest';
export { UndoBar, type UndoBarProps } from './components/ai/UndoBar';
export { RefusalState, type RefusalStateProps } from './components/ai/RefusalState';
export { AgentCard, type AgentCardProps } from './components/ai/AgentCard';
export { AgentPicker, type AgentPickerProps } from './components/ai/AgentPicker';
export { MemoryPanel, type MemoryPanelProps, type MemoryFact } from './components/ai/MemoryPanel';
export { SessionList, type SessionListProps, type SessionItem } from './components/ai/SessionList';
export { CostMeter, type CostMeterProps } from './components/ai/CostMeter';

// Trust & governance (Tray 7)
export { DisclosureBadge, type DisclosureBadgeProps } from './components/trust/DisclosureBadge';

// Feedback & evaluation (Tray 8)
export { FeedbackControl, type FeedbackControlProps, type FeedbackValue } from './components/feedback/FeedbackControl';

// Behavior & state hooks (Tray 5)
export { useStreaming, type UseStreamingResult } from './hooks/useStreaming';
export { useInterruptible, type UseInterruptibleResult } from './hooks/useInterruptible';
export { useRetry, type UseRetryResult } from './hooks/useRetry';

// Core staples (Wave A)
export { Breadcrumbs, type BreadcrumbsProps } from './components/Breadcrumbs';
export { Divider, type DividerProps } from './components/Divider';
export { Anchor, type AnchorProps } from './components/Anchor';
export { Loader, type LoaderProps } from './components/Loader';
export { Chip, ChipGroup, type ChipProps } from './components/Chip';
export { Indicator, type IndicatorProps } from './components/Indicator';
export { Popover, PopoverTarget, PopoverDropdown, type PopoverProps } from './components/Popover';
export { Stepper, StepperStep, StepperCompleted, type StepperProps } from './components/Stepper';
export { SegmentedControl, type SegmentedControlProps } from './components/SegmentedControl';
export { ThemeIcon, type ThemeIconProps } from './components/ThemeIcon';
export { Code, type CodeProps } from './components/Code';
export { Kbd, type KbdProps } from './components/Kbd';

// Form inputs (Wave B)
export { NumberInput, type NumberInputProps } from './components/NumberInput';
export { PasswordInput, type PasswordInputProps } from './components/PasswordInput';
export { PinInput, type PinInputProps } from './components/PinInput';
export { FileInput, type FileInputProps } from './components/FileInput';
export { MultiSelect, type MultiSelectProps } from './components/MultiSelect';
export { TagsInput, type TagsInputProps } from './components/TagsInput';
export { Slider, type SliderProps } from './components/Slider';
export { Rating, type RatingProps } from './components/Rating';
export { Fieldset, type FieldsetProps } from './components/Fieldset';

// Data display (Wave C)
export { Table, TableThead, TableTbody, TableTr, TableTh, TableTd, type TableProps } from './components/Table';
export { Timeline, TimelineItem, type TimelineProps } from './components/Timeline';
export { Notification, type NotificationProps } from './components/Notification';
export { Spoiler, type SpoilerProps } from './components/Spoiler';
export { HoverCard, HoverCardTarget, HoverCardDropdown, type HoverCardProps } from './components/HoverCard';

// Part 1 finishers (Wave E)
export { IconButton, type IconButtonProps } from './components/IconButton';
export { ButtonGroup, type ButtonGroupProps } from './components/ButtonGroup';
export { Pill, PillGroup, type PillProps } from './components/Pill';
export { List, ListItem, type ListProps } from './components/List';
export { Tree, type TreeProps } from './components/Tree';
export { Image, type ImageProps } from './components/Image';
export { ColorInput, type ColorInputProps } from './components/ColorInput';
export { SearchField, type SearchFieldProps } from './components/SearchField';
export { Fab, type FabProps } from './components/Fab';
export { StatusDot, type StatusDotProps, type StatusKind } from './components/StatusDot';
export { Stat, type StatProps } from './components/Stat';
export { DescriptionList, type DescriptionListProps, type DescriptionItem } from './components/DescriptionList';
export { SplitButton, type SplitButtonProps } from './components/SplitButton';

// Re-export commonly used Mantine layout components
export { Stack, Group, Text, Title, Flex, Box, Container } from '@mantine/core';
