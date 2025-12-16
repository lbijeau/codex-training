# Exercise 5: Security Review

## Objective

Practice identifying common security vulnerabilities in code.

## Background

Security vulnerabilities are often introduced unintentionally. This exercise develops the habit of security-aware code review.

## Part A: Identify OWASP Top 10 Issues

**Task**: Find vulnerabilities in this code.

```javascript
// practice/scratch/vulnerable.js

// 1. SQL Injection
async function getUser(id) {
  return db.query(`SELECT * FROM users WHERE id = '${id}'`);
}

// 2. XSS
function renderComment(comment) {
  return `<div class="comment">${comment.text}</div>`;
}

// 3. Insecure Direct Object Reference
async function getDocument(req) {
  const docId = req.params.id;
  return db.documents.findById(docId);
  // No check if user owns this document!
}

// 4. Sensitive Data Exposure
function logUserAction(user, action) {
  console.log(`User ${user.email} (pwd: ${user.password}) did ${action}`);
}

// 5. Security Misconfiguration
const corsOptions = {
  origin: '*',
  credentials: true
};

// 6. Broken Authentication
function createToken(user) {
  return jwt.sign({ id: user.id }, 'hardcoded-secret');
}

// 7. Broken Access Control
function isAdmin(user) {
  return user.role === 'admin';
  // But role comes from client-controlled data!
}
```

For each vulnerability:
1. Explain the risk
2. Describe how it could be exploited
3. Provide the fix

## Part B: Security Checklist Development

**Task**: Create a security review checklist.

```markdown
## Security Review Checklist

### Input Handling
- [ ] All user input is validated
- [ ] No SQL queries built with string concatenation
- [ ] HTML output is escaped/sanitized
- [ ] File paths are validated (no path traversal)

### Authentication
- [ ] Passwords are hashed (bcrypt/argon2)
- [ ] Tokens use environment secrets
- [ ] Session management is secure
- [ ] Rate limiting on auth endpoints

### Authorization
- [ ] Every endpoint checks permissions
- [ ] User can only access their own data
- [ ] Admin functions properly protected
- [ ] API keys are validated server-side

### Data Protection
- [ ] Sensitive data not in logs
- [ ] PII encrypted at rest
- [ ] Secure transmission (HTTPS)
- [ ] No secrets in code or version control

### Configuration
- [ ] CORS properly configured
- [ ] Security headers set
- [ ] Debug mode disabled in production
- [ ] Error messages don't leak info
```

## Part C: Automated Security Scanning

**Task**: Use tools to find vulnerabilities.

1. Run npm audit:
   ```bash
   npm audit
   ```

2. Use Codex for security review:
   ```
   "Review this code for security vulnerabilities. Focus on
   OWASP Top 10 issues. For each issue found, explain the
   risk and provide a fix."
   ```

3. Document findings:
   | Issue | Severity | File:Line | Fix |
   |-------|----------|-----------|-----|
   | SQL Injection | Critical | vulnerable.js:3 | Parameterized query |
   | ... | ... | ... | ... |

## Part D: Fix Vulnerabilities

**Task**: Apply secure coding fixes.

```javascript
// Fixed versions

// 1. SQL Injection - Use parameterized queries
async function getUser(id) {
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
}

// 2. XSS - Escape output
function renderComment(comment) {
  return `<div class="comment">${escapeHtml(comment.text)}</div>`;
}

// 3. IDOR - Check ownership
async function getDocument(req) {
  const doc = await db.documents.findById(req.params.id);
  if (doc.ownerId !== req.user.id) {
    throw new ForbiddenError();
  }
  return doc;
}

// 4. Sensitive data - Redact in logs
function logUserAction(user, action) {
  console.log(`User ${user.id} did ${action}`);
  // Never log passwords or PII
}

// 5. CORS - Restrict origins
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
};

// 6. Auth - Use environment secret
function createToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// 7. Access control - Verify from database
async function isAdmin(userId) {
  const user = await db.users.findById(userId);
  return user.role === 'admin';
}
```

---

## Hints

<details>
<summary>Hint 1: Common vulnerability patterns</summary>

Watch for:
- String concatenation in queries
- User input in HTML without escaping
- Missing authorization checks
- Hardcoded credentials
- Sensitive data in logs/errors
- Overly permissive configurations
</details>

<details>
<summary>Hint 2: Security review approach</summary>

1. Follow data from input to output
2. Assume all input is malicious
3. Verify authorization at every step
4. Check what gets logged
5. Review configuration files
</details>

<details>
<summary>Hint 3: Severity assessment</summary>

Critical: Remote code execution, authentication bypass
High: Data breach, privilege escalation
Medium: Information disclosure, DoS
Low: Minor information leak, best practice violation
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Vulnerability Analysis

| # | Vulnerability | OWASP | Severity | Exploitation |
|---|--------------|-------|----------|--------------|
| 1 | SQL Injection | A03 | Critical | `id = "'; DROP TABLE users--"` |
| 2 | XSS | A03 | High | `text = "<script>steal()</script>"` |
| 3 | IDOR | A01 | High | Access any doc by guessing ID |
| 4 | Data Exposure | A02 | High | Passwords in log files |
| 5 | Misconfiguration | A05 | Medium | Cross-origin attacks enabled |
| 6 | Weak Auth | A02 | High | Sign tokens with known secret |
| 7 | Broken Access | A01 | High | Client can claim admin role |

### Secure Coding Principles

1. **Never trust input**
   - Validate all input
   - Parameterize all queries
   - Escape all output

2. **Least privilege**
   - Only grant needed permissions
   - Check authorization on every request
   - Default to deny

3. **Defense in depth**
   - Multiple layers of security
   - Don't rely on single control
   - Fail securely

4. **Secure defaults**
   - Restrictive configurations
   - Opt-in, not opt-out
   - Environment-specific secrets

### Security Review Pattern

```
1. Map all inputs and outputs
2. Check each input validation
3. Verify authorization at each step
4. Review logging for leaks
5. Check configuration security
6. Run automated scanners
7. Document all findings
8. Prioritize by severity
9. Fix and verify
```

### Key Insight

Security is not a feature - it's a constraint on all features.

Every code review should include:
- Where does data come from?
- Is it validated?
- Is access authorized?
- What could go wrong?

</details>

---

## Reflection Questions

1. Which vulnerabilities surprised you?
2. How would you integrate security review into your workflow?
3. What's the balance between security and usability?

---

## Module 6 Complete!

You've learned:
- Architecture exploration techniques
- Safe refactoring practices
- Legacy code handling
- Performance investigation
- Security review patterns

**Next Module**: [Module 7: Advanced Integration](../../modules/07-integration.md)
