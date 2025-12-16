# Module 7: Domain-Specific Patterns

## Overview

Master patterns for common software development scenarios: refactoring, architecture exploration, legacy code, performance, and security.

**Learning Objectives**:
- Navigate and refactor large codebases
- Explore and understand architecture
- Work effectively with legacy code
- Optimize performance systematically
- Review security comprehensively

**Time**: 3-4 hours

---

## 1. Refactoring Large Codebases

### Refactoring Principles with Codex

1. **Understand Before Changing**: Explore first, refactor second
2. **Test Safety Net**: Tests must pass before and after
3. **Incremental Changes**: Small, verifiable steps
4. **Commit Often**: Each step is a commit

### Refactoring Workflow

**Phase 1: Understanding**
```bash
codex "Explore this codebase and document:
1. Map current structure
2. Identify patterns and anti-patterns
3. Find similar code (duplication)
4. Understand dependencies
5. Document current architecture"
```

**Phase 2: Planning**
```
1. Define refactoring goals
2. Identify breaking points
3. Plan incremental steps
4. Define validation strategy
5. Write IMPLEMENTATION_PLAN.md
```

**Phase 3: Execution**
```
For each step:
1. Run tests (baseline)
2. Make focused change
3. Run tests (verify)
4. Commit
5. Move to next step
```

### Refactoring Patterns

**Pattern: Extract Function**
```
Process:
1. Identify code to extract
2. Analyze dependencies (params, return)
3. Create new function
4. Replace original code
5. Run tests
6. Commit
```

**Pattern: Rename for Clarity**
```
Process:
1. Grep for all usages
2. Rename systematically (use Edit with replace_all)
3. Run tests
4. Commit
```

**Pattern: Move to Module**
```
Process:
1. Identify related functions
2. Create new module
3. Move functions incrementally
4. Update imports
5. Run tests after each move
6. Commit each move
```

**Pattern: Extract Interface**
```
Process:
1. Identify concrete dependency
2. Define interface
3. Update consumers to use interface
4. Run tests
5. Create alternative implementations if needed
```

---

## 2. Architecture Exploration

### Exploring Unfamiliar Codebases

**Strategy: Breadth-First Exploration**
```
1. High-level structure
   - README, package.json, directory layout

2. Entry points
   - Main files, routes, CLI commands

3. Core abstractions
   - Key classes, modules, interfaces

4. Data flow
   - How data moves through the system

5. Testing approach
   - Test structure, coverage, patterns
```

### Using Codex for Exploration

```bash
# Map the directory structure and understand architecture
codex "Explore this codebase:
- Map the directory structure
- Identify main entry points
- Find core abstractions
- Understand data flow patterns
- Summarize the architecture"

# Save findings for later use
codex exec "Summarize the codebase architecture in bullet points" > contexts/architecture.md
```

### Architecture Mapping Patterns

**Pattern: Feature Tracing**
```
Task: Understand how authentication works

Process:
1. Grep for "auth", "login", "authenticate"
2. Identify entry point (route/handler)
3. Trace execution flow
4. Map dependencies
5. Document the flow
```

**Pattern: Dependency Mapping**
```
Task: Understand module relationships

Process:
1. Glob for all source files
2. Grep for import statements
3. Build dependency graph
4. Identify core modules
5. Identify leaf modules
6. Document architecture
```

**Pattern: Data Flow Analysis**
```
Task: Understand how data transforms

Process:
1. Identify data sources (DB, API, files)
2. Find where data is consumed (UI, reports)
3. Trace transformation steps
4. Document data pipeline
```

---

## 3. Working with Legacy Code

### Legacy Code Principles

1. **Characterization Tests**: Understand behavior before changing
2. **Seams**: Find safe points to make changes
3. **Incremental Improvement**: Leave code better than you found it
4. **Document As You Learn**: Future you will thank you

### Legacy Code Workflow

**Step 1: Characterization**
```
1. Identify the code you need to change
2. Write tests that describe current behavior
3. Even if behavior is wrong, test it as-is
4. Now you have safety net
```

**Step 2: Make Change Safe**
```
1. Find seam (boundary where you can test)
2. Extract dependencies
3. Add tests at seam
4. Now you can change internal implementation
```

**Step 3: Refactor**
```
1. Make change with tests passing
2. Incrementally improve structure
3. Tests catch regressions
4. Stop when good enough (don't perfect legacy code)
```

### Legacy Code Patterns

**Pattern: Sprout Method**
```
Need to add new feature to legacy method:

1. Create new method with new feature
2. Add tests for new method
3. Call new method from legacy method
4. Leave legacy method mostly untouched
```

**Pattern: Wrap Method**
```
Need to add behavior around legacy method:

1. Rename legacy method (e.g., doWorkCore)
2. Create new method with original name
3. New method calls renamed method + new behavior
4. Add tests for new wrapper
```

**Pattern: Extract and Override**
```
Need to test legacy method with dependency:

1. Extract dependency call to separate method
2. In test, subclass and override extracted method
3. Now you can test without real dependency
```

---

## 4. Performance Optimization

### Performance Workflow

**Phase 1: Measure**
```
1. Define performance goals (e.g., "API response < 200ms")
2. Set up profiling
3. Measure current performance
4. Identify bottlenecks
5. Prioritize by impact
```

**Phase 2: Analyze**
```
For each bottleneck:
1. Understand why it's slow
2. Identify optimization opportunities
3. Estimate improvement potential
4. Consider trade-offs
```

**Phase 3: Optimize**
```
1. Implement optimization
2. Measure improvement
3. Verify correctness (tests pass)
4. If goal met, done
5. If not, continue with next bottleneck
```

**Phase 4: Validate**
```
1. Run full test suite
2. Load test if applicable
3. Monitor in production
4. Ensure no regressions
```

### Performance Patterns

**Pattern: Database Query Optimization**
```
Process:
1. Enable query logging
2. Identify N+1 queries
3. Add eager loading
4. Add indexes
5. Measure improvement
```

**Pattern: Caching Strategy**
```
Levels:
1. HTTP caching (browser, CDN)
2. Application caching (Redis, Memcached)
3. Database query caching
4. Computed value caching

Choose based on:
- Data volatility
- Read/write ratio
- Consistency requirements
```

**Pattern: Bundle Size Optimization**
```
Process:
1. Analyze bundle (webpack-bundle-analyzer)
2. Identify large dependencies
3. Use dynamic imports (code splitting)
4. Remove unused code (tree shaking)
5. Measure improvement
```

**Pattern: Algorithmic Optimization**
```
Process:
1. Profile to find hot path
2. Analyze time complexity
3. Find better algorithm (O(n²) → O(n log n))
4. Implement and test
5. Measure improvement
```

### Coordinating Performance Investigation

Run parallel investigations for each area, then synthesize the results:

```bash
# Run investigations concurrently in the background
codex exec "Profile API endpoints in api/ and describe latency hotspots" > perf-api.txt &
codex exec "Analyze database queries in db/ for missing indexes" > perf-db.txt &
codex exec "Analyze bundle size using webpack-bundle-analyzer output" > perf-bundle.txt &
codex exec "Review caching strategy and TTLs in config/" > perf-cache.txt &
wait

# Synthesize findings
codex "Performance investigation results:
API: $(cat perf-api.txt)
Database: $(cat perf-db.txt)
Bundle: $(cat perf-bundle.txt)
Cache: $(cat perf-cache.txt)

Rank the top 3 optimizations by impact and propose a plan."
```

Each investigation runs independently. The final prompt synthesizes all findings into actionable recommendations.

---

## 5. Security Review

### Security Review Framework

**OWASP Top 10 Checklist**:
```
- [ ] Injection (SQL, NoSQL, Command)
- [ ] Broken Authentication
- [ ] Sensitive Data Exposure
- [ ] XML External Entities (XXE)
- [ ] Broken Access Control
- [ ] Security Misconfiguration
- [ ] Cross-Site Scripting (XSS)
- [ ] Insecure Deserialization
- [ ] Using Components with Known Vulnerabilities
- [ ] Insufficient Logging & Monitoring
```

### Security Review Patterns

**Pattern: Input Validation Review**
```
1. Find all user input points
2. Check validation
3. Check sanitization
4. Check encoding on output
5. Test with malicious inputs
```

**Pattern: Authentication & Authorization**
```
1. Review authentication mechanism
2. Check password storage (hashed? salted?)
3. Check session management
4. Review authorization checks
5. Test privilege escalation scenarios
```

**Pattern: Data Protection**
```
1. Identify sensitive data
2. Check encryption at rest
3. Check encryption in transit
4. Review access controls
5. Check for exposure in logs
```

**Pattern: Dependency Security**
```
1. Run npm audit / pip check
2. Review vulnerable dependencies
3. Update or find alternatives
4. Document accepted risks
```

### Using Codex for Security Review

```bash
# Request a focused security review
codex "Review the authentication module (src/auth/) for security issues:
- Injection vulnerabilities (SQL, command, NoSQL)
- Broken authentication (password storage, session handling)
- Sensitive data exposure (logging, error messages)
- XSS vulnerabilities (input sanitization, output encoding)

For each finding, provide:
1. Severity (Critical/High/Medium/Low)
2. Location (file and line)
3. Recommended fix"

# Save findings for tracking
codex exec "List all security findings from the auth review as a markdown checklist" > security-findings.md
```

---

## 6. Domain Pattern Library

### Pattern: Strangler Fig Refactoring

**When**: Replacing large legacy system

**Process**:
```
1. Build new system alongside old
2. Route new features to new system
3. Incrementally migrate old features
4. Eventually retire old system
```

### Pattern: Branch by Abstraction

**When**: Refactoring with no downtime

**Process**:
```
1. Create abstraction over current implementation
2. Update all callers to use abstraction
3. Create new implementation behind abstraction
4. Switch to new implementation
5. Remove old implementation
```

### Pattern: Dependency Inversion

**When**: Breaking tight coupling

**Process**:
```
1. Define interface for dependency
2. Update consumer to depend on interface
3. Update provider to implement interface
4. Now can swap implementations
```

### Pattern: Performance Budget

**When**: Preventing performance regression

**Process**:
```
1. Define budgets (e.g., "bundle < 200KB")
2. Measure in CI
3. Fail if budget exceeded
4. Forces conscious decisions
```

---

## Key Takeaways

1. **Refactoring**: Understand, plan, execute incrementally
2. **Architecture**: Explore breadth-first, trace key features
3. **Legacy Code**: Characterize, make safe, improve incrementally
4. **Performance**: Measure, analyze, optimize, validate
5. **Security**: Systematic review, OWASP Top 10, automated tools

---

## Next Steps

1. Complete [Module 7 Exercises](../exercises/07-domain/)
2. Practice architecture exploration on unfamiliar code
3. Refactor a piece of legacy code safely
4. Conduct security review on a module

---

## Quick Reference

### Refactoring
- Tests first
- Incremental changes
- Commit often
- Verify at each step

### Architecture Exploration
- Breadth-first
- Feature tracing
- Dependency mapping
- Save findings to `contexts/`

### Legacy Code
- Characterization tests
- Find seams
- Sprout/Wrap methods
- Incremental improvement

### Performance
- Measure first
- Profile bottlenecks
- Optimize high-impact
- Validate improvements

### Security
- OWASP Top 10
- Input validation
- Authentication review
- Dependency scanning

---

**Master the domains!** Head to [Exercise 1](../exercises/07-domain/exercise-1.md)
