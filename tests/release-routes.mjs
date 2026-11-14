import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
assert.ok(existsSync(dist), 'Run npm run build before the release route audit');

const routes = [
  'index.html', 'auth.html', 'account.html', 'admin.html',
  'profile.html', 'practice.html', 'tutor.html', 'questions.html',
  'courses/introduction.html', 'courses/excel.html', 'courses/sql.html',
  'courses/powerbi.html', 'courses/tableau.html', 'courses/powerquery.html',
  'courses/statistics.html', 'courses/python.html', 'courses/ai.html',
];
for (const route of routes) {
  const file = join(dist, route);
  assert.ok(existsSync(file), `Published route missing: ${route}`);
  const html = readFileSync(file, 'utf8');
  assert.match(html, /<!doctype html|<html\b/i, `Invalid HTML document: ${route}`);
}
for (const retired of ['catalog.html', 'overview.html', 'progress.html']) {
  assert.ok(!existsSync(join(dist, retired)), `Retired page unexpectedly published: ${retired}`);
}
for (const legacy of ['courses/ai-extension.html', 'courses/python-extension.html']) {
  assert.ok(!existsSync(join(dist, legacy)), `Legacy course page unexpectedly published: ${legacy}`);
}
console.log(`PASS release routes: ${routes.length} published pages and 3 retired-page exclusions`);
