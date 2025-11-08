#!/usr/bin/env node
/**
 * scanTextWhite.js
 * Simple regression helper: lists occurrences of `text-white` in frontend source files
 * excluding lines that already provide a dark: variant or are clearly inside gradient/CTA sections.
 * Heuristic only – manual review still required.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const EXCLUDE_DIRS = new Set(['__tests__']);

function walk(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.') || EXCLUDE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(js|jsx|ts|tsx)$/.test(e.name)) acc.push(full);
  }
  return acc;
}

function analyzeFile(file) {
  const content = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const findings = [];
  content.forEach((line, idx) => {
    if (line.includes('text-white')) {
      // Skip if line already uses dark: variant pattern (e.g., text-gray-900 dark:text-white)
      if (/dark:text-white/.test(line)) return;
      // Skip if clearly intentional on colored/gradient backgrounds (rough heuristic)
      if (/bg-gradient|bg-primary|bg-secondary|bg-indigo|bg-teal|bg-purple|bg-slate-950/.test(line)) return;
      findings.push({ line: idx + 1, text: line.trim().slice(0, 220) });
    }
  });
  return findings;
}

function run() {
  const files = walk(SRC_DIR, []);
  const report = [];
  files.forEach(f => {
    const fFindings = analyzeFile(f);
    if (fFindings.length) report.push({ file: f, occurrences: fFindings });
  });

  if (!report.length) {
    console.log('✅ No raw text-white occurrences needing review (excluding allowed contexts).');
    return;
  }

  console.log('⚠️ Potential text-white issues (manual review recommended):');
  report.forEach(r => {
    console.log('\n' + path.relative(SRC_DIR, r.file));
    r.occurrences.forEach(o => console.log(`  ${o.line}: ${o.text}`));
  });
  console.log('\nTotal files with potential issues:', report.length);
}

run();
