#!/usr/bin/env node
/**
 * build-component-index.mjs
 *
 * Aggregates every per-component Tier-3 token file under
 * packages/tokens/src/components/*.json into a single
 * packages/tokens/src/components.generated.json so the runtime theme can
 * import the whole component-tier layer with one statement (works under both
 * tsc and Vite — see clementine-theme.ts).
 *
 * This is the mechanical half of the F1 fix: Tier 3 is only "real" if code
 * consumes it. The theme consumes this generated file. Re-run whenever a
 * component token JSON is added or changed (wired into `pnpm prebuild`).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'packages/tokens/src/components');
const outFile = join(root, 'packages/tokens/src/components.generated.json');

const files = readdirSync(componentsDir)
  .filter((f) => f.endsWith('.json') && f !== 'components.generated.json')
  .sort();

const merged = {};
for (const file of files) {
  const json = JSON.parse(readFileSync(join(componentsDir, file), 'utf8'));
  for (const [ns, value] of Object.entries(json)) {
    if (merged[ns]) {
      console.warn(`⚠︎  duplicate component namespace "${ns}" (from ${file}) — merging`);
      Object.assign(merged[ns], value);
    } else {
      merged[ns] = value;
    }
  }
}

writeFileSync(outFile, JSON.stringify(merged, null, 2) + '\n');
console.log(`✔︎ components.generated.json — ${files.length} files → ${Object.keys(merged).length} namespaces`);
