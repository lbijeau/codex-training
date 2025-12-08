#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const LAYER_RULES = [
  {
    layer: 'ui',
    segment: 'ui/',
    forbidden: ['db', 'backend', 'server'],
  },
  {
    layer: 'db',
    segment: 'db/',
    forbidden: ['ui', 'components', 'frontend'],
  },
];

const TARGET_EXTENSIONS = ['.js', '.ts', '.tsx'];

async function collect(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(resolved)));
    } else if (TARGET_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(resolved);
    }
  }
  return files;
}

function parseImports(text) {
  const imports = [];
  const importRegex = /import\s+[^'";]+['"]([^'"]+)['"]/g;
  const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
  let match;
  while ((match = importRegex.exec(text)) !== null) {
    imports.push(match[1]);
  }
  while ((match = requireRegex.exec(text)) !== null) {
    imports.push(match[1]);
  }
  return imports;
}

function checkLayer(filePath, importPath) {
  const pathLower = filePath.toLowerCase();
  const importLower = importPath.toLowerCase();
  for (const rule of LAYER_RULES) {
    if (pathLower.includes(`/${rule.segment}`) || pathLower.includes(`${rule.segment}/`)) {
      for (const forbidden of rule.forbidden) {
        if (importLower.includes(`/${forbidden}`) || importLower.includes(`${forbidden}/`)) {
          return {
            file: filePath,
            import: importPath,
            layer: rule.layer,
            forbidden,
          };
        }
      }
    }
  }
  return null;
}

async function main() {
  const target = process.argv[2] || '.';
  const files = await collect(target);
  const violations = [];
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const imports = parseImports(content);
    for (const imp of imports) {
      const violation = checkLayer(file, imp);
      if (violation) {
        violations.push(violation);
      }
    }
  }

  if (violations.length === 0) {
    console.log('No cross-layer imports found.');
    process.exit(0);
  }

  for (const violation of violations) {
    console.log(
      `Cross-layer import detected: ${violation.file} imports ${violation.import} (layer ${violation.layer} forbids ${violation.forbidden})`
    );
  }
  process.exit(1);
}

main().catch((error) => {
  console.error('Error checking imports:', error);
  process.exit(1);
});
