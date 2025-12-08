#!/usr/bin/env node
const { execSync } = require('child_process');

const LINE_THRESHOLD = 30;
const DEPTH_THRESHOLD = 4;

function extractFunctionName(lines) {
  for (const raw of lines) {
    const line = raw.replace(/^[-+ ]/, '').trim();
    let match = line.match(/function\s+([$_\w]+)/);
    if (match) return match[1];
    match = line.match(/const\s+([$_\w]+)\s*=\s*\(/);
    if (match) return match[1];
    match = line.match(/class\s+([$_\w]+)/);
    if (match) return match[1];
  }
  return '<unknown-function>';
}

function analyzeDiff(diff) {
  const warnings = [];
  const sections = diff.split('diff --git ').slice(1);

  for (const section of sections) {
    const lines = section.split('\n');
    if (lines.length === 0) continue;
    const fileToken = lines[0].split(' b/')[1];
    if (!fileToken) continue;
    const filePath = fileToken.trim();

    const chunkRegex = /@@[\s\S]*?@@([\s\S]*?)(?=@@|$)/g;
    let chunkMatch;

    while ((chunkMatch = chunkRegex.exec(section)) !== null) {
      const chunkText = chunkMatch[1];
      const addedLines = chunkText
        .split('\n')
        .filter((line) => line.startsWith('+') && !line.startsWith('+++'));
      if (addedLines.length === 0) continue;

      let depth = 0;
      let maxDepth = 0;
      for (const line of addedLines) {
        for (const char of line) {
          if (char === '{') {
            depth += 1;
            maxDepth = Math.max(maxDepth, depth);
          } else if (char === '}') {
            depth = Math.max(0, depth - 1);
          }
        }
      }

      if (addedLines.length >= LINE_THRESHOLD || maxDepth >= DEPTH_THRESHOLD) {
        const contextLines = chunkText.split('\n').filter((line) => !line.startsWith('+') && !line.startsWith('-'));
        const name = extractFunctionName(contextLines);
        warnings.push({
          file: filePath,
          lines: addedLines.length,
          depth: maxDepth,
          name,
        });
      }
    }
  }
  return warnings;
}

function main() {
  const diff = execSync('git diff --unified=0 HEAD', { encoding: 'utf8' });
  if (!diff.trim()) {
    console.log('No differences detected.');
    process.exit(0);
  }
  const warnings = analyzeDiff(diff);
  if (warnings.length === 0) {
    console.log('No complexity deltas exceeding thresholds.');
    process.exit(0);
  }
  for (const warn of warnings) {
    console.log(
      `High complexity delta: ${warn.file} (${warn.name}) +${warn.lines} LOC, depth ${warn.depth}`
    );
  }
  process.exit(1);
}

main();
