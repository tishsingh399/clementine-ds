#!/usr/bin/env node
// Upload docs/readme/*.md to ReadMe.io via the ReadMe v1 API.
//
// Usage:
//   export RDM_API_KEY=rdme_xxx
//   export RDM_VERSION=v1.0   # optional, defaults to "v1.0"
//   node scripts/upload-readme-docs.js [--dry-run]
//
// Mapping:
//   docs/readme/<category>/<slug>.md  →  category=<category>, slug=<slug>
//
// The script:
//   1. Lists existing categories in the project.
//   2. Creates any missing categories.
//   3. For each local .md, upserts the page (PUT if exists, POST if new).
//   4. Resolves relative links like "../tokens/the-cascade-rule.md" to
//      ReadMe slug links "/docs/the-cascade-rule".
//
// Why the v1 API: it is what the readme-docs CLI uses, it is stable, and
// the docs are public (https://docs.readme.com/main/reference). For larger
// pushes, swap to the bidirectional sync (rdme docs:sync) — this script
// is meant as a "I want to ship one repo without a separate CLI" path.

import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(__dirname, '..', 'docs', 'readme');
const API_BASE = 'https://dash.readme.com/api/v1';

const apiKey = process.env.RDM_API_KEY;
const version = process.env.RDM_VERSION ?? 'v1.0';
const dryRun = process.argv.includes('--dry-run');

if (!apiKey) {
  console.error('Set RDM_API_KEY before running.');
  console.error('Get one at https://dash.readme.com/project/<your-project>/api-key');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
const headers = {
  Authorization: auth,
  'x-readme-version': version,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function api(method, path, body) {
  if (dryRun && method !== 'GET') {
    console.log(`  [dry-run] ${method} ${path}`);
    return { dryRun: true };
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/\.md$/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function readDocs() {
  // Returns [{ category, slug, title, filePath, content }, ...]
  const categories = await readdir(DOCS_ROOT, { withFileTypes: true });
  const docs = [];
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catDir = join(DOCS_ROOT, cat.name);
    const files = await readdir(catDir);
    for (const f of files) {
      if (!f.endsWith('.md') || f === 'README.md') continue;
      const filePath = join(catDir, f);
      const content = await readFile(filePath, 'utf8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : slugify(f);
      docs.push({
        category: cat.name,
        slug: slugify(f),
        title,
        filePath,
        content,
      });
    }
  }
  return docs;
}

function rewriteLinks(content) {
  // ../tokens/the-cascade-rule.md  → /docs/the-cascade-rule
  // ./button.md                    → /docs/button
  return content.replace(
    /\]\((\.\.?\/)?(?:[\w-]+\/)?([\w-]+)\.md(#[\w-]+)?\)/g,
    (_, _prefix, slug, hash) => `](/docs/${slug}${hash ?? ''})`,
  );
}

async function upsertCategory(name) {
  const existing = await api('GET', `/categories?perPage=100`);
  const found = (existing ?? []).find((c) => c.slug === slugify(name));
  if (found) return found;
  console.log(`+ category ${name}`);
  return api('POST', '/categories', { title: name, type: 'guide' });
}

async function upsertDoc(catId, doc) {
  const body = {
    title: doc.title,
    slug: doc.slug,
    category: catId,
    body: rewriteLinks(doc.content),
    type: 'basic',
  };
  // Try PUT (update) first; if 404, POST (create).
  try {
    await api('PUT', `/docs/${doc.slug}`, body);
    console.log(`↑ updated ${doc.category}/${doc.slug}`);
  } catch (err) {
    if (String(err.message).includes(': 404')) {
      await api('POST', '/docs', body);
      console.log(`+ created ${doc.category}/${doc.slug}`);
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log(`Reading from ${relative(process.cwd(), DOCS_ROOT)}`);
  if (dryRun) console.log('(dry run — no writes)\n');
  const docs = await readDocs();
  console.log(`Found ${docs.length} docs across ${new Set(docs.map((d) => d.category)).size} categories.\n`);

  const catIds = new Map();
  for (const cat of new Set(docs.map((d) => d.category))) {
    const c = await upsertCategory(cat);
    catIds.set(cat, c.id ?? c._id);
  }

  for (const doc of docs) {
    await upsertDoc(catIds.get(doc.category), doc);
  }

  console.log(`\nDone. ${docs.length} doc${docs.length === 1 ? '' : 's'} synced.`);
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
