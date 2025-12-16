# Exercise 1: Multi-Layer Review Workflow

## Objective

Practice using multiple specialized review agents to catch different types of issues.

## Background

No single review catches everything. Multi-layer review uses specialized agents that each focus on specific issue types: code quality, security, performance, test coverage, etc.

## Part A: Understand Review Layers

**Task**: Map issue types to review layers.

| Issue Type | Best Caught By |
|------------|----------------|
| Logic errors | Code reviewer |
| Security vulnerabilities | Security reviewer |
| Missing test coverage | Test analyzer |
| Silent failures | Error handling reviewer |
| Type design problems | Type analyzer |
| Performance issues | Performance reviewer |

**Questions to Answer**:
- Why separate reviewers instead of one comprehensive review?
- What issues might fall between reviewers?
- How do you prioritize which reviews to run?

## Part B: Run Layered Reviews

**Task**: Practice sequential specialized reviews.

1. Create a file with multiple issue types:

   ```javascript
   // practice/scratch/userService.js
   async function createUser(data) {
     try {
       // No input validation
       const user = await db.users.create({
         email: data.email,
         password: data.password, // Storing plaintext password!
         role: data.role || 'admin' // Dangerous default
       });
       return user;
     } catch (e) {
       // Silent failure - no logging
       return null;
     }
   }

   async function getUser(id) {
     // No type checking on id
     // SQL injection possible if id is user input
     return db.query(`SELECT * FROM users WHERE id = ${id}`);
   }

   module.exports = { createUser, getUser };
   ```

2. Run code review:
   ```
   "Review practice/scratch/userService.js for bugs and logic errors"
   ```

3. Run security review:
   ```
   "Review practice/scratch/userService.js for security vulnerabilities"
   ```

4. Run error handling review:
   ```
   "Review practice/scratch/userService.js for silent failures
   and inadequate error handling"
   ```

## Part C: Synthesize Findings

**Task**: Combine findings into prioritized action.

Create a synthesis table:

| Issue | Severity | Category | Fix Effort |
|-------|----------|----------|------------|
| Plaintext password | Critical | Security | Medium |
| SQL injection | Critical | Security | Low |
| Silent failure | High | Error handling | Low |
| No input validation | Medium | Code quality | Medium |
| Dangerous role default | High | Security | Low |

**Prioritize**:
1. Which fixes are non-negotiable before merge?
2. Which can be done post-merge?
3. Which need more investigation?

## Part D: Create Review Checklist

**Task**: Build a reusable review checklist for your projects.

```markdown
## Pre-Merge Review Checklist

### Code Quality Review
- [ ] Logic errors identified and fixed
- [ ] Edge cases handled
- [ ] No unused code or imports

### Security Review
- [ ] Input validation present
- [ ] No credential exposure
- [ ] No SQL/command injection
- [ ] Proper authorization checks

### Error Handling Review
- [ ] No silent failures
- [ ] Errors logged with context
- [ ] User-facing errors are friendly

### Test Coverage Review
- [ ] New code has tests
- [ ] Edge cases tested
- [ ] Error paths tested
```

---

## Hints

<details>
<summary>Hint 1: Running specialized reviews</summary>

Be specific about what to look for:
- "Review for security vulnerabilities including SQL injection, XSS, and credential exposure"
- "Review for silent failures and error handling gaps"
</details>

<details>
<summary>Hint 2: Prioritizing findings</summary>

Severity levels:
- **Critical**: Security breach or data loss possible
- **High**: Significant user impact or data corruption
- **Medium**: Degraded experience or maintenance burden
- **Low**: Nice to fix, not urgent
</details>

<details>
<summary>Hint 3: The right order</summary>

Review order by impact:
1. Security (blocks release)
2. Error handling (prevents silent failures)
3. Code quality (maintainability)
4. Performance (unless critical path)
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Issues in Sample Code

**Security Issues**:
1. **Plaintext password** (Critical): Passwords must be hashed
2. **SQL injection** (Critical): Use parameterized queries
3. **Dangerous default role** (High): Default should be lowest privilege

**Error Handling Issues**:
1. **Silent catch** (High): Error swallowed, returns null silently
2. **No logging** (Medium): Can't debug production issues
3. **No error context** (Medium): Null return doesn't explain failure

**Code Quality Issues**:
1. **No input validation** (Medium): Should validate email, check required fields
2. **No type checking** (Low): id could be anything

### Prioritized Fix Plan

```markdown
## Fix Priority

### Before Merge (Critical/High)
1. Hash passwords before storing
2. Use parameterized queries
3. Change default role to 'user'
4. Add error logging in catch block

### After Merge (Medium)
5. Add input validation
6. Add type checking on id
7. Return error objects instead of null
```

### Fixed Code

```javascript
async function createUser(data) {
  // Input validation
  if (!data.email || !data.password) {
    throw new ValidationError('Email and password required');
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await db.users.create({
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user' // Safe default
    });
    return user;
  } catch (error) {
    logger.error('User creation failed', { email: data.email, error });
    throw error; // Re-throw for caller to handle
  }
}

async function getUser(id) {
  if (typeof id !== 'number') {
    throw new ValidationError('Invalid user ID');
  }
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
}
```

### Key Insight

Each review layer catches what others miss:
- Code reviewer might miss security implications
- Security reviewer might miss logic errors
- Error handling reviewer focuses on failure paths

Together, they provide comprehensive coverage.

</details>

---

## Reflection Questions

1. How much time did multi-layer review add vs. single review?
2. What issues would a single review have missed?
3. How would you automate parts of this workflow?

---

**Next**: [Exercise 2: Test-Driven Development Practice](exercise-2.md)
