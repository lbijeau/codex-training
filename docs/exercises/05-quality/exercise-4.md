# Exercise 4: Quality Gates Implementation

## Objective

Set up quality gates that prevent bad code from reaching production.

## Background

Quality gates are checkpoints that code must pass before proceeding. They catch issues automatically, reducing reliance on manual review.

## Part A: Define Quality Criteria

**Task**: Establish what "passing" means for your project.

**Quality Dimensions**:

| Dimension | Gate | Tool |
|-----------|------|------|
| Tests pass | 100% pass rate | npm test |
| Linting | 0 errors | npm run lint |
| Type safety | 0 type errors | npm run typecheck |
| Coverage | >80% lines | coverage report |
| Security | 0 critical vulns | npm audit |
| Bundle size | <200kb | size-limit |

**Task**: Create a quality gate script:

```bash
#!/bin/bash
# practice/scratch/quality-gate.sh

echo "Running Quality Gates..."

# Gate 1: Tests
echo "Gate 1: Running tests..."
npm test || { echo "FAILED: Tests"; exit 1; }

# Gate 2: Linting
echo "Gate 2: Running linter..."
npm run lint || { echo "FAILED: Lint"; exit 1; }

# Gate 3: Type Check
echo "Gate 3: Running type check..."
npm run typecheck || { echo "FAILED: Types"; exit 1; }

echo "All gates passed!"
```

## Part B: Integrate with Workflow

**Task**: Add gates at strategic points.

**Pre-Commit Gate**:
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run typecheck"
    }
  }
}
```

**Pre-Push Gate**:
```json
{
  "husky": {
    "hooks": {
      "pre-push": "npm test"
    }
  }
}
```

**PR Gate** (CI/CD):
```yaml
# .github/workflows/quality.yml
on: pull_request
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run typecheck
```

## Part C: Use Verification Skill

**Task**: Practice the verification-before-completion skill.

1. Make some changes to practice files

2. Before committing, run:
   ```
   "Use superpowers:verification-before-completion to check if
   my changes are ready to commit."
   ```

3. Observe the verification checklist:
   - Does it check tests?
   - Does it check linting?
   - Does it check for TODOs?
   - Does it check for console.logs?

4. Fix any issues surfaced

## Part D: Create Custom Gate

**Task**: Build a project-specific quality gate.

Create a gate that checks for common issues in your codebase:

```javascript
// practice/scratch/custom-gate.js
const fs = require('fs');
const path = require('path');

const issues = [];

// Gate: No TODO without issue number
function checkTodos(files) {
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('TODO') && !line.match(/TODO\s*#\d+/)) {
        issues.push(`${file}:${i + 1}: TODO without issue number`);
      }
    });
  });
}

// Gate: No console.log in src (except debug files)
function checkConsoleLogs(files) {
  files.forEach(file => {
    if (file.includes('debug')) return;
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('console.log')) {
      issues.push(`${file}: console.log found`);
    }
  });
}

// Gate: No hardcoded secrets
function checkSecrets(files) {
  const patterns = [
    /password\s*=\s*['"][^'"]+['"]/i,
    /api_key\s*=\s*['"][^'"]+['"]/i,
    /secret\s*=\s*['"][^'"]+['"]/i,
  ];
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    patterns.forEach(pattern => {
      if (pattern.test(content)) {
        issues.push(`${file}: Possible hardcoded secret`);
      }
    });
  });
}

// Run gates
const files = process.argv.slice(2);
checkTodos(files);
checkConsoleLogs(files);
checkSecrets(files);

if (issues.length > 0) {
  console.log('Quality gate failed:');
  issues.forEach(i => console.log(`  ${i}`));
  process.exit(1);
} else {
  console.log('Custom quality gate passed!');
}
```

---

## Hints

<details>
<summary>Hint 1: Gate placement</summary>

Gates should be placed where:
- Early enough to catch issues fast
- Late enough to not block exploration
- Automated to not require memory

Pre-commit: Fast checks (lint, types)
Pre-push: Slower checks (tests)
CI: Comprehensive checks (coverage, security)
</details>

<details>
<summary>Hint 2: Gate failures</summary>

When a gate fails:
- Message should be clear
- Fix should be obvious
- Escape hatch exists for emergencies
- But escape is audited
</details>

<details>
<summary>Hint 3: Gate balance</summary>

Too strict: Developers circumvent
Too loose: Issues slip through

Start strict, loosen if pain exceeds value.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Quality Gate Architecture

```
Developer → Pre-commit → Pre-push → CI → Deploy
              │            │         │
              ▼            ▼         ▼
           Lint/Type    Tests     Full suite
           (fast)      (medium)   (comprehensive)
```

### Why Layered Gates

| Gate | Speed | Coverage | Blocks |
|------|-------|----------|--------|
| Pre-commit | <5s | Syntax | Commit |
| Pre-push | <60s | Behavior | Push |
| CI | 5-10min | Everything | Merge |

Fast feedback at commit, comprehensive at merge.

### Verification Skill Checklist

The verification-before-completion skill checks:
- [ ] All tests passing
- [ ] No linting errors
- [ ] No type errors
- [ ] No TODO without tickets
- [ ] No console.log
- [ ] No commented-out code
- [ ] Commit message clear

### Custom Gate Patterns

**Good custom gates**:
- Project-specific conventions
- Business rules in code
- Team agreements

**Examples**:
- No direct DB queries outside repository layer
- All API endpoints have rate limiting
- All user inputs are validated
- All errors are logged

### Key Insight

Gates should be:
1. **Automatic**: Don't rely on memory
2. **Fast**: Don't block workflow
3. **Clear**: Explain what's wrong
4. **Escapable**: For genuine emergencies
5. **Audited**: Know when gates were bypassed

### Pattern: Progressive Gates

```
Quick feedback → Developer confidence → Comprehensive check → Ship
   (local)          (local)              (CI)            (deploy)
```

</details>

---

## Reflection Questions

1. What quality issues slip through in your current workflow?
2. Which gates would have the highest impact for your team?
3. How do you balance gate strictness with developer velocity?

---

**Next**: [Exercise 5: Root Cause Analysis](exercise-5.md)
