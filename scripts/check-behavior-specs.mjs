#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const behaviorsDir = join(root, 'behaviors');
const specDirs = readdirSync(behaviorsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

function frontmatter(markdown, file) {
  const match = /^---\n([\s\S]*?)\n---/.exec(markdown);
  if (!match) throw new Error(`${file}: missing YAML frontmatter`);
  return match[1];
}

function readScalar(yaml, key) {
  const match = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(yaml);
  return match?.[1]?.trim();
}

function readNestedScalar(yaml, section, key) {
  const match = new RegExp(`^${section}:\\n(?:  .+\\n)*?  ${key}:\\s*(.+)$`, 'm').exec(yaml);
  return match?.[1]?.trim();
}

function readListBlock(yaml, section, key) {
  const keyMatch = new RegExp(`^${section}:\\n[\\s\\S]*?^  ${key}:\\n([\\s\\S]*?)(?=^  \\S|^\\S|$)`, 'm').exec(yaml);
  return keyMatch ? [...keyMatch[1].matchAll(/^    -\s+(.+)$/gm)].map((m) => m[1]) : [];
}

const errors = [];

for (const name of specDirs) {
  const specPath = join(behaviorsDir, name, 'index.md');
  if (!existsSync(specPath)) {
    errors.push(`behaviors/${name}: missing index.md`);
    continue;
  }

  const markdown = readFileSync(specPath, 'utf8');
  const yaml = frontmatter(markdown, specPath);
  const behavior = readScalar(yaml, 'behavior');
  const category = readScalar(yaml, 'category');
  const kind = readScalar(yaml, 'kind');
  const status = readScalar(yaml, 'status');
  const sourcePath = readNestedScalar(yaml, 'source', 'path');
  const exportName = readNestedScalar(yaml, 'source', 'export');
  const resultType = readNestedScalar(yaml, 'source', 'result_type');
  const outputs = readListBlock(yaml, 'state_contract', 'outputs');
  const commands = readListBlock(yaml, 'state_contract', 'commands');
  const transitions = readListBlock(yaml, 'state_contract', 'transitions');
  if (behavior !== name) errors.push(`${specPath}: behavior must match directory name "${name}"`);
  if (category !== 'Behavior') errors.push(`${specPath}: category must be Behavior`);
  if (kind !== 'hook') errors.push(`${specPath}: kind must be hook`);
  if (!['AI-Ready', 'In progress', 'Draft'].includes(status ?? '')) {
    errors.push(`${specPath}: status must be AI-Ready, In progress, or Draft`);
  }
  if (!sourcePath || !exportName || !resultType) {
    errors.push(`${specPath}: source.path, source.export, and source.result_type are required`);
    continue;
  }

  const absoluteSource = join(root, sourcePath);
  if (!existsSync(absoluteSource)) {
    errors.push(`${specPath}: source file does not exist (${sourcePath})`);
    continue;
  }

  const source = readFileSync(absoluteSource, 'utf8');
  if (!new RegExp(`export\\s+function\\s+${exportName}\\b|export\\s+const\\s+${exportName}\\b`).test(source)) {
    errors.push(`${specPath}: ${exportName} is not exported from ${sourcePath}`);
  }
  if (!new RegExp(`export\\s+interface\\s+${resultType}\\b|export\\s+type\\s+${resultType}\\b`).test(source)) {
    errors.push(`${specPath}: ${resultType} is not exported from ${sourcePath}`);
  }
  if (outputs.length === 0) errors.push(`${specPath}: state_contract.outputs must list returned state`);
  if (commands.length === 0) errors.push(`${specPath}: state_contract.commands must list commands`);
  if (transitions.length === 0) errors.push(`${specPath}: state_contract.transitions must list transitions`);
  if (!/reset_path:\s+true/.test(yaml) && !commands.some((command) => /^interrupt\(/.test(command))) {
    errors.push(`${specPath}: checks.reset_path must be true unless the behavior has interrupt() as its reset path`);
  }
  if (!/no_visual_tokens:\s+true/.test(yaml)) {
    errors.push(`${specPath}: checks.no_visual_tokens must be true`);
  }
  if (!/required_guards:\n(?:  - .+\n?)+/m.test(yaml)) {
    errors.push(`${specPath}: required_guards must list at least one guard`);
  }
}

if (errors.length) {
  console.error(`behavior specs: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✔︎ behavior specs: ${specDirs.length} hook specs valid`);
