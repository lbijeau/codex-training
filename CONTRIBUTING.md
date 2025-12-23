# Contributing to Codex Code Mastery Program

Thank you for your interest in contributing to the Codex Code Mastery Program! This document provides guidelines for contributing to this educational resource.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Style Guidelines](#style-guidelines)
- [Adding Content](#adding-content)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- **Be Respectful**: Treat all contributors with respect and professionalism
- **Be Inclusive**: Welcome contributors of all backgrounds and experience levels
- **Be Constructive**: Provide helpful feedback and accept criticism gracefully
- **Be Collaborative**: Work together to improve the learning experience

---

## How Can I Contribute?

### Reporting Issues

If you find bugs, errors, or areas for improvement:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** using the appropriate template
3. **Fill out all required fields** - this helps LLMs and humans alike

### Issue Workflow

Issues follow a deterministic workflow. Status transitions:

```
Backlog → Ready
  when: problem is clear and scoped

Ready → In Progress
  when: someone assigns themselves

In Progress → In Review
  when: PR is opened

In Review → Done
  when: PR is merged

Any → Blocked
  when: state:blocked label is applied
```

### Labels

We use structured labels for machine-readability:

| Namespace | Examples | Purpose |
|-----------|----------|---------|
| `type:` | bug, feature, chore, spike | What kind of work |
| `state:` | blocked, needs-info | Current blockers |
| `area:` | modules, exercises, docs, video | Where in the codebase |
| `priority:` | p0, p1, p2 | Urgency (p0 = critical) |

### Suggesting Enhancements

Have ideas for new content or improvements?

1. **Open a discussion or issue** describing your suggestion
2. **Explain the benefit** to learners
3. **Provide examples** if possible

### Contributing Content

You can contribute:

- **New patterns** for the pattern library
- **Exercises** for existing or new modules
- **Module improvements** (clarifications, examples, corrections)
- **Playbook entries** (scenarios, checklists)
- **Code examples** demonstrating concepts
- **Documentation improvements**

---

## Getting Started

### Prerequisites

- Git for version control
- A text editor (VS Code, Vim, etc.)
- Familiarity with Markdown
- Basic understanding of Codex Code concepts (read Module 1 first)

### Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/codex-training.git
cd codex-training
```

---

## Development Setup

This is primarily a documentation/educational repository. No special build tools are required.

### Directory Structure

```
codex-training/
├── docs/
│   ├── modules/          # Core learning content
│   ├── exercises/        # Hands-on practice
│   ├── plans/            # Design documents
│   └── maintainers/      # Patterns, playbook, templates, and prompt templates
├── examples/             # Code examples
├── practice/             # Practice workspace
└── .codex-examples/      # Sample workspace configuration
```

### Validation (Optional)

If you want to validate your Markdown:

```bash
# Install markdownlint (optional)
npm install -g markdownlint-cli

# Check markdown files
markdownlint docs/**/*.md
```

---

## Contribution Workflow

### 1. Create a Branch

```bash
git checkout -b feature/add-new-pattern
# or
git checkout -b fix/correct-module-typo
```

**Branch naming conventions**:
- `feature/description` - New content or features
- `fix/description` - Bug fixes or corrections
- `docs/description` - Documentation improvements
- `refactor/description` - Restructuring without changing content

### 2. Make Your Changes

- Follow the [Style Guidelines](#style-guidelines)
- Keep commits focused and atomic
- Write clear commit messages

### 3. Test Your Changes

- Verify Markdown renders correctly
- Check all links work
- Ensure code examples are valid (if applicable)

### 4. Submit a Pull Request

```bash
git push origin feature/add-new-pattern
```

Then create a Pull Request on GitHub.

---

## Style Guidelines

### Markdown

- Use ATX-style headers (`#`, `##`, `###`)
- Use fenced code blocks with language specifiers
- Keep lines under 100 characters when practical
- Use consistent list formatting (either `-` or `*`, not mixed)
- Include blank lines before and after headers and code blocks

### File Naming

- Use lowercase with hyphens: `my-new-pattern.md`
- Be descriptive but concise
- Follow existing naming conventions in each directory

### Content Style

- Write in clear, accessible language
- Use active voice when possible
- Include practical examples
- Link to related content
- Define acronyms on first use

---

## Adding Content

### Adding Patterns

Patterns go in `docs/maintainers/patterns/` organized by category:

| Category | Directory | Description |
|----------|-----------|-------------|
| Speed | `docs/maintainers/patterns/speed/` | Performance and efficiency |
| Quality | `docs/maintainers/patterns/quality/` | Code quality and verification |
| Debugging | `docs/maintainers/patterns/debugging/` | Problem-solving approaches |
| Planning | `docs/maintainers/patterns/planning/` | Task decomposition and execution |
| Architecture | `docs/maintainers/patterns/architecture/` | Design and exploration |

**Pattern Template**:

```markdown
# Pattern Name

## Context
What situation does this pattern address?

## Problem
What specific problem does it solve?

## Solution
How do you apply this pattern?

## Trade-offs

**Pros**:
- Benefits

**Cons**:
- Limitations

**Alternatives**:
- Other approaches

## Examples
Real-world scenarios where this pattern applies

## Related Patterns
- [Other Pattern](../category/pattern.md)
```

**Good pattern names**:
- `parallel-execution.md`
- `context-optimization.md`
- `root-cause-tracing.md`

### Adding Exercises

Exercises go in `docs/exercises/[module-number]-[module-name]/`:

```markdown
# Exercise N: [Name]

## Objective
What learners will accomplish

## Prerequisites
- Required knowledge or completed exercises

## Task
Clear instructions for what to do

## Hints
<details>
<summary>Hint 1</summary>
First hint content
</details>

<details>
<summary>Hint 2</summary>
Second hint content
</details>

## Solution Discussion
<details>
<summary>Solution</summary>
Explanation of the solution approach
</details>

## Key Takeaways
- What learners should remember
```

### Adding Playbook Entries

**Scenarios** (`docs/maintainers/playbook/scenarios.md`):

```markdown
**Scenario**: [What you're trying to do]
**Approach**: [Quick guidance]
**Why**: [Reasoning]
**See**: [Link to pattern or module]
```

**Checklists** (`docs/maintainers/playbook/checklists.md`):

```markdown
## [Workflow Name]

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

**When to use**: [Situation]
```

### Adding Examples

Code examples go in `examples/[category]/`:

- Include clear comments
- Show both input and expected output
- Demonstrate the concept concisely
- Add a README if needed for context

---

## Pull Request Process

### Before Submitting

- [ ] Read and follow the contribution guidelines
- [ ] Ensure your changes follow the style guidelines
- [ ] Test that Markdown renders correctly
- [ ] Verify all links work
- [ ] Write a clear PR description

### PR Description Template

```markdown
## Summary
Brief description of the changes

## Type of Change
- [ ] New content (pattern, exercise, example)
- [ ] Bug fix / correction
- [ ] Documentation improvement
- [ ] Restructuring / refactoring

## Related Issues
Fixes #(issue number)

## Checklist
- [ ] I have read the contributing guidelines
- [ ] My changes follow the style guidelines
- [ ] I have tested my changes locally
- [ ] I have updated related documentation if needed
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged

### Commit Message Guidelines

Write clear, descriptive commit messages:

```
Add pattern: parallel-grep-then-read

Discovered while working on large codebase exploration.
Combines Grep for discovery with targeted Read.
Reduces context consumption by focusing on relevant files.
```

**Format**:
- First line: Brief summary (50 chars or less)
- Blank line
- Body: Detailed explanation (wrap at 72 chars)

---

## Quality Standards

### For Patterns

- Specific and actionable
- Based on real experience
- Includes practical examples
- Documents trade-offs
- Links to related patterns

### For Exercises

- Clear learning objectives
- Progressive difficulty
- Includes hints for struggling learners
- Has solution discussion
- Tests specific concepts

### For Playbook Entries

- Quick to scan
- Scenario-based
- Links to detailed content
- Actionable guidance

### For Examples

- Runnable code (where applicable)
- Clear purpose stated
- Well-commented
- Demonstrates pattern effectively

---

## Maintenance

### For Repository Maintainers

#### Weekly Tasks

- [ ] Review and triage new issues
- [ ] Review pending pull requests
- [ ] Add patterns discovered during the week
- [ ] Update playbook with new scenarios

#### Monthly Tasks

- [ ] Review pattern library organization
- [ ] Update progress metrics in documentation
- [ ] Archive outdated design docs
- [ ] Check for broken links
- [ ] Review and update module content if needed

### Archiving Content

When content becomes outdated:

1. **Don't delete it** - maintain history
2. Add `[DEPRECATED]` to the title
3. Add a note at the top explaining why
4. Link to the replacement content
5. Move to an `archive/` folder if appropriate

Example:
```markdown
# [DEPRECATED] Old Pattern Name

> **Note**: This pattern has been superseded by [New Pattern](path/to/new-pattern.md).
> Reason: [Brief explanation of why this changed]

[Original content below for reference]
```

---

## Community

### Questions and Discussions

- Open an issue for questions about contributing
- Use GitHub Discussions (if enabled) for broader topics
- Be patient and respectful with responses

### Recognition

All contributors are valued! Significant contributions will be recognized in project documentation.

### Sharing Your Learning

If you've built something great using this program:

- Share your experience in discussions
- Consider contributing patterns you've discovered
- Help others in their learning journey

---

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## Thank You!

Every contribution helps make this learning resource better for everyone. Whether you're fixing a typo, adding a pattern, or creating new exercises, your efforts are appreciated!

---

*Questions about contributing? Open an issue and we'll help you get started.*
