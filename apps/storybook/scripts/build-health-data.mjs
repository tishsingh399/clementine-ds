import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const storybookRoot = resolve(here, '..');
const repoRoot = resolve(storybookRoot, '../..');
const outputPath = resolve(storybookRoot, 'health-data.json');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const readExistingSnapshot = () => {
  if (!existsSync(outputPath)) {
    return null;
  }

  return readJson(outputPath);
};

const ensureContractReport = () => {
  const reportPath = resolve(repoRoot, 'apps/observatory/parity-report.json');
  if (!existsSync(reportPath)) {
    execFileSync(process.execPath, ['scripts/parity-report.mjs', '--strict'], {
      cwd: repoRoot,
      stdio: 'inherit',
    });
  }

  return readJson(reportPath);
};

const summarizeContract = (report) => {
  const specs = report.specs ?? [];
  const total = specs.reduce((sum, spec) => sum + spec.total, 0);
  const passed = specs.reduce((sum, spec) => sum + spec.passed, 0);
  const average =
    specs.length === 0 ? 0 : specs.reduce((sum, spec) => sum + spec.parity, 0) / specs.length;

  return {
    generatedAt: report.generatedAt,
    threshold: report.threshold,
    specs: specs.length,
    total,
    passed,
    average,
    belowThreshold: specs
      .filter((spec) => spec.parity < report.threshold)
      .map((spec) => ({
        component: spec.name,
        parity: spec.parity,
        failed: spec.failed ?? [],
      })),
  };
};

const summarizeDom = (report) => {
  if (!report) {
    return null;
  }

  const components = report.components ?? [];
  const measured = components.filter((component) => component.measured);
  const average =
    measured.length === 0
      ? 0
      : measured.reduce((sum, component) => sum + component.parity, 0) / measured.length;
  const unwiredStates = components.flatMap((component) =>
    (component.unwiredStates ?? []).map((state) => ({
      component: component.component,
      ...state,
    })),
  );

  const belowFullParity = measured.filter((component) => component.parity < 100);

  return {
    generatedAt: report.generatedAt,
    modes: report.modes ?? [],
    measured: measured.length,
    average,
    belowFullParityCount: belowFullParity.length,
    belowFullParity: belowFullParity
      .slice(0, 18)
      .map((component) => ({
        component: component.component,
        parity: component.parity,
        misses: (component.misses ?? []).slice(0, 6),
      })),
    unwiredStateCount: unwiredStates.length,
    unwiredStates: unwiredStates.slice(0, 18),
  };
};

const summarizeStateCoverage = (report) => {
  const gaps = report.gaps ?? [];

  return {
    generatedAt: report.generatedAt,
    gaps: gaps.length,
    componentsWithGaps: new Set(gaps.map((gap) => gap.component)).size,
    visibleGaps: gaps.slice(0, 18),
  };
};

const existingSnapshot = readExistingSnapshot();
const contractReport = ensureContractReport();
const domReportPath = resolve(repoRoot, 'apps/observatory/parity-dom-report.json');
const domReport = existsSync(domReportPath)
  ? summarizeDom(readJson(domReportPath))
  : (existingSnapshot?.dom ?? null);
const stateCoverage = summarizeStateCoverage(
  readJson(resolve(repoRoot, 'governance/state-coverage-baseline.json')),
);

const snapshot = {
  generatedAt: new Date().toISOString(),
  sources: {
    contract: 'apps/observatory/parity-report.json',
    dom: existsSync(domReportPath)
      ? 'apps/observatory/parity-dom-report.json'
      : 'apps/storybook/health-data.json:last-known-dom',
    stateCoverage: 'governance/state-coverage-baseline.json',
  },
  contract: summarizeContract(contractReport),
  dom: domReport,
  stateCoverage,
};

writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`health-data: wrote ${outputPath}`);
