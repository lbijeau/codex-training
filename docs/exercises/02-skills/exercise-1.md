# Exercise 1: Install and Bootstrap Superpowers

## Objective

Set up the superpowers skill library and verify it's working correctly.

## Background

Superpowers is a curated library of skills for common development tasks. Before you can use skills, you need to install and bootstrap the library.

## Part A: Install Superpowers

**Task**: Clone and set up the superpowers repository.

1. Create the superpowers directory:
   ```bash
   mkdir -p ~/.codex/superpowers
   cd ~/.codex/superpowers
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/obra/superpowers.git .
   ```

3. Create your personal skills directory:
   ```bash
   mkdir -p ~/.codex/skills
   ```

**Verification**:
- Run `ls ~/.codex/superpowers` - you should see the cloned repo contents
- Run `ls ~/.codex/skills` - you should see an empty directory

## Part B: Configure AGENTS.md

**Task**: Add superpowers to your Codex configuration.

1. Open or create `~/.codex/AGENTS.md`

2. Add this section:
   ```markdown
   # Superpowers

   You have superpowers. Superpowers teach you new skills and capabilities.

   Run `~/.codex/superpowers/.codex/superpowers-codex bootstrap` and follow the instructions.
   ```

3. Save the file

**Verification**:
- Run `cat ~/.codex/AGENTS.md` and confirm the superpowers section exists

## Part C: Bootstrap and Verify

**Task**: Run the bootstrap command and verify skills are available.

1. Run the bootstrap:
   ```bash
   ~/.codex/superpowers/.codex/superpowers-codex bootstrap
   ```

2. Start a new Codex session:
   ```bash
   codex
   ```

3. Ask Codex: "What superpowers skills are available?"

**Questions to Answer**:
- Did the bootstrap complete successfully?
- Can you see a list of available skills?
- What categories of skills are available (planning, debugging, quality, etc.)?

---

## Hints

<details>
<summary>Hint 1: If clone fails</summary>

Check your internet connection and that git is installed:
```bash
git --version
```

If behind a firewall, you may need to configure git proxy settings.
</details>

<details>
<summary>Hint 2: If bootstrap fails</summary>

Ensure the script has execute permissions:
```bash
chmod +x ~/.codex/superpowers/.codex/superpowers-codex
```
</details>

<details>
<summary>Hint 3: If skills don't appear</summary>

Make sure AGENTS.md is in the correct location (`~/.codex/AGENTS.md`) and restart your Codex session.
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Expected Directory Structure

After installation, you should have:
```
~/.codex/
├── AGENTS.md              # Configuration with superpowers section
├── superpowers/           # Cloned superpowers repo
│   └── .codex/
│       └── superpowers-codex  # Bootstrap script
└── skills/                # Your custom skills (empty for now)
```

### Available Skills

You should see skills in categories like:
- **Planning**: `brainstorming`, `writing-plans`, `executing-plans`
- **Quality**: `test-driven-development`, `verification-before-completion`
- **Debugging**: `systematic-debugging`
- **Workflow**: `receiving-code-review`, `requesting-code-review`

### Common Issues

1. **AGENTS.md not found**: Must be at `~/.codex/AGENTS.md` (global) or `.codex/AGENTS.md` (project)
2. **Skills not loading**: Restart Codex session after adding AGENTS.md configuration
3. **Permission denied**: Run `chmod +x` on the bootstrap script

### Key Insight

Skills are loaded when Codex starts a session. Changes to AGENTS.md require a session restart to take effect.

</details>

---

## Reflection Questions

1. Why do you think skills are configured through AGENTS.md rather than a separate config file?
2. What's the benefit of having a central superpowers repository vs. individual skill files?
3. How might you update superpowers when new skills are released?

---

**Next**: [Exercise 2: Invoke Skills for Planning](exercise-2.md)
