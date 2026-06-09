import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

/**
 * Storybook test-runner config.
 *
 * Runs against the built Storybook on every CI run. For each story:
 * 1. Visits the story page in a headless Chromium.
 * 2. Injects axe-core into the page.
 * 3. Runs WCAG 2.0 AA rules and fails the run on any violation.
 *
 * Stories can opt out per-story via parameters.a11y.disable: true, and can
 * pass custom axe options via parameters.a11y.config.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Honor per-story opt-out.
    if (storyContext.parameters?.a11y?.disable) return;

    // Honor per-story axe config overrides.
    if (storyContext.parameters?.a11y?.config) {
      await configureAxe(page, storyContext.parameters.a11y.config);
    }

    // Default rules: WCAG 2.0 A + AA. Violations fail the run.
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      },
    });
  },
};

export default config;
