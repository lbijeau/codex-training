# Test-Driven Development Example

This example demonstrates the RED-GREEN-REFACTOR cycle.

## Scenario

Implement a function to validate email addresses.

## Step 1: RED (Write Failing Test)

First, write the test:

```javascript
// email-validator.test.js
const { isValidEmail } = require('./email-validator');

describe('isValidEmail', () => {
  test('accepts valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  test('rejects email without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  test('rejects email without domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  test('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).toBe(true);
  });
});
```

Run test:
```bash
npm test
```

Result: **FAILS** (function doesn't exist yet) ✅ This is what we want!

## Step 2: GREEN (Minimal Implementation)

Now implement just enough to pass:

```javascript
// email-validator.js
function isValidEmail(email) {
  // Minimal implementation to pass tests
  if (typeof email !== 'string') return false;
  if (!email.includes('@')) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;
  if (parts[1].length === 0) return false;

  return true;
}

module.exports = { isValidEmail };
```

Run test:
```bash
npm test
```

Result: **PASSES** ✅

## Step 3: REFACTOR (Improve Code)

Now make it better while keeping tests green:

```javascript
// email-validator.js
function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }

  // Use regex for more robust validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
}

module.exports = { isValidEmail };
```

Run test:
```bash
npm test
```

Result: **STILL PASSES** ✅

## Try It Yourself

### Setup

```bash
cd practice/scratch
npm init -y
npm install --save-dev jest
```

Update `package.json`:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Exercise: Add More Tests

Following TDD:

1. **RED**: Write test for a new case (e.g., "email with plus sign")
2. Run test → Should FAIL
3. **GREEN**: Update implementation to pass
4. Run test → Should PASS
5. **REFACTOR**: Improve if needed
6. Run test → Should STILL PASS

### New Test Cases to Try

```javascript
test('accepts email with plus sign', () => {
  expect(isValidEmail('user+tag@example.com')).toBe(true);
});

test('rejects email with spaces', () => {
  expect(isValidEmail('user @example.com')).toBe(false);
});

test('rejects email with multiple @', () => {
  expect(isValidEmail('user@@example.com')).toBe(false);
});
```

## Key Principles

1. **Always see the test FAIL first** (proves it tests something)
2. **Minimal implementation** (just enough to pass)
3. **Refactor with confidence** (tests catch regressions)
4. **One test at a time** (small steps)

## Common Mistakes

❌ **Writing implementation before test**
- Defeats the purpose
- Test may not actually test anything

❌ **Not seeing test fail**
- Test might always pass
- Not actually testing the requirement

❌ **Adding features during refactor**
- Refactor = improve code, not add features
- New features = new test first

## Related Pattern

See: [docs/maintainers/patterns/quality/tdd-workflow.md](../../docs/maintainers/patterns/quality/tdd-workflow.md)
