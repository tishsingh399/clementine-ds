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

// Re-export commonly used Mantine layout components
export { Stack, Group, Text, Title, Flex, Box, Container } from '@mantine/core';
