#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const WINDOW_SIZE = 8;
const TARGET_EXTENSIONS = ['.js', '.ts', '.tsx'];

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(resolved)));
    } else if (TARGET_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(resolved);
    }
  }
  return files;
}

function normalizeLine(line) {
  return line.replace(/\/\/.*$/g, '').trim().replace(/\s+/g, ' ');
}

async function main() {
  const target = process.argv[2] || '.';
  const files = await collectFiles(target);
  const duplicates = [];
  const seen = new Map();
  const reported = new Set();
  const reportedPairs = new Set();

  for (const file of files) {
    const text = await fs.readFile(file, 'utf8');
    const rawLines = text.split('\n');
    const normalized = rawLines.map(normalizeLine);
    for (let idx = 0; idx + WINDOW_SIZE <= rawLines.length; idx += 1) {
      const chunkLines = normalized.slice(idx, idx + WINDOW_SIZE);
      if (chunkLines.every((line) => line === '')) continue;
      const key = chunkLines.join('|').replace(/\s+/g, ' ');
      if (!key.trim()) continue;
      if (seen.has(key) && !reported.has(key)) {
        const first = seen.get(key);
        const start = idx + 1;
        const pairKey = [first.file, file].sort().join('|');
        if (reportedPairs.has(pairKey)) {
          reported.add(key);
          continue;
        }
        duplicates.push({
          first: {
            file: first.file,
            range: `${first.start}-${first.end}`,
          },
          second: {
            file,
            range: `${start}-${start + WINDOW_SIZE - 1}`,
          },
        });
        reportedPairs.add(pairKey);
        reported.add(key);
      } else {
        seen.set(key, {
          file,
          start: idx + 1,
          end: idx + WINDOW_SIZE,
        });
      }
    }
  }

  if (duplicates.length === 0) {
    console.log('No duplicate blocks detected.');
    process.exit(0);
  }

  for (const dup of duplicates) {
    console.log(
      `Duplicate block detected: ${dup.first.file}@${dup.first.range} ≈ ${dup.second.file}@${dup.second.range}`
    );
  }
  process.exit(1);
}

main().catch((error) => {
  console.error('Error scanning duplicates:', error);
  process.exit(1);
});
