import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, Card, Text, Title } from '@clementine-ds/ui';

function Slide({ n }: { n: number }) {
  return (
    <Card withBorder padding="xl" style={{ height: 180 }}>
      <Title order={4}>Slide {n}</Title>
      <Text c="dimmed" size="sm">Any Clementine component composes inside Carousel.Slide.</Text>
    </Card>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  args: { withIndicators: true, slideSize: '70%', slideGap: 'md', height: 200 },
};
export default meta; type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      <Carousel.Slide><Slide n={1} /></Carousel.Slide>
      <Carousel.Slide><Slide n={2} /></Carousel.Slide>
      <Carousel.Slide><Slide n={3} /></Carousel.Slide>
    </Carousel>
  ),
};
