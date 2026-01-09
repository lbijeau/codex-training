# Exercise 5: Complete Customization Integration

## Objective

Integrate all customization elements into a cohesive, team-ready Codex workflow.

## Background

The previous exercises covered individual customization components. This exercise brings them together into a complete, portable system that can be adopted by a team.

## Part A: Create a Complete Configuration Package

**Task**: Build a self-contained customization package.

1. Create the package structure:
   ```
   codex-config/
   ├── README.md
   ├── setup.sh
   ├── AGENTS.md
   ├── config/
   │   └── config.toml
   ├── git-hooks/
   │   └── pre-commit
   ├── scripts/
   │   ├── session_start.sh
   │   ├── session_end.sh
   │   ├── validate.py
   │   └── feature_workflow.sh
   └── docs/
       ├── prompt_templates/
       │   ├── README.md
       │   ├── feature_plan.md
       │   └── bug_investigation.md
       └── patterns/
           └── README.md
   ```

2. Create the README:
   ```markdown
   # Codex Configuration Package

   Complete Codex customization for [Team/Project Name].

   ## Quick Start

   ```bash
   ./setup.sh
   ```

   This will:
   1. Copy AGENTS.md and scripts into your project
   2. Install a `config.toml` template to `~/.codex/config.toml`
   3. Set up Git hooks
   4. Create necessary directories

   ## What's Included

   ### AGENTS.md
   Project-specific instructions that shape Codex behavior:
   - Code conventions
   - Team workflows
   - Security requirements

   ### Config (config/config.toml)
   Shared defaults and profiles:
   - Approval policy and sandbox defaults
   - Feature flags (e.g., `skills`)
   - MCP server configuration

   ### Git Hooks
   Automated checks before commits:
   - `pre-commit`: Run lint/test gates

   ### Scripts
   Workflow automation:
   - `session_start.sh`: Gather context
   - `session_end.sh`: Verify and summarize
   - `validate.py`: Quality checks
   - `feature_workflow.sh`: Complete feature workflow

   ### MCP Servers
   Extended capabilities:
   - GitHub integration
   - Database access
   - Custom team tools

   ## Customization

   See docs/maintainers/patterns/README.md for customization guidelines.

   ## Updates

   To update to the latest version:
   ```bash
   git pull origin main
   ./setup.sh --update
   ```
   ```

3. Create the setup script:
   ```bash
   #!/bin/bash
   # setup.sh - Install Codex configuration

   set -e

   SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
   TARGET_DIR="${1:-.}"

   echo "Installing Codex configuration..."
   echo ""

   # Check for existing configuration
   if [ -f "$TARGET_DIR/AGENTS.md" ] && [ "$2" != "--update" ]; then
       read -p "AGENTS.md exists. Overwrite? (y/n) " -n 1 -r
       echo ""
       if [[ ! $REPLY =~ ^[Yy]$ ]]; then
           echo "Keeping existing AGENTS.md"
           KEEP_AGENTS=true
       fi
   fi

   # Create directories
   echo "Creating directories..."
   mkdir -p "$HOME/.codex"
   mkdir -p "$TARGET_DIR/scripts"
   mkdir -p "$TARGET_DIR/docs/maintainers/prompt_templates"
   mkdir -p "$TARGET_DIR/docs/maintainers/patterns"

   # Copy AGENTS.md
   if [ "$KEEP_AGENTS" != true ]; then
       cp "$SCRIPT_DIR/AGENTS.md" "$TARGET_DIR/"
       echo "✅ Installed AGENTS.md"
   fi

   # Copy config template
   CONFIG_FILE="$HOME/.codex/config.toml"
   if [ -f "$CONFIG_FILE" ] && [ "$2" != "--update" ]; then
       read -p "config.toml exists at ~/.codex. Back up and overwrite? (y/n) " -n 1 -r
       echo ""
       if [[ ! $REPLY =~ ^[Yy]$ ]]; then
           echo "Keeping existing config.toml"
           KEEP_CONFIG=true
       fi
   fi

   if [ "$KEEP_CONFIG" != true ]; then
       if [ -f "$CONFIG_FILE" ]; then
           BACKUP_FILE="$CONFIG_FILE.bak.$(date +%Y%m%d%H%M%S)"
           cp "$CONFIG_FILE" "$BACKUP_FILE"
           echo "✅ Backed up config to $BACKUP_FILE"
       fi
       cp "$SCRIPT_DIR/config/config.toml" "$CONFIG_FILE"
       echo "✅ Installed ~/.codex/config.toml"
   fi

   # Copy scripts
   cp "$SCRIPT_DIR/scripts/"* "$TARGET_DIR/scripts/"
   chmod +x "$TARGET_DIR/scripts/"*.sh
   chmod +x "$TARGET_DIR/scripts/"*.py 2>/dev/null || true
   echo "✅ Installed scripts"

   # Copy prompt templates
   cp -r "$SCRIPT_DIR/docs/maintainers/prompt_templates/"* "$TARGET_DIR/docs/maintainers/prompt_templates/"
   echo "✅ Installed prompt templates"

   # Copy patterns
   cp -r "$SCRIPT_DIR/docs/maintainers/patterns/"* "$TARGET_DIR/docs/maintainers/patterns/"
   echo "✅ Installed patterns documentation"

   # Set up Git hooks
   if [ -d "$TARGET_DIR/.git" ]; then
       cp "$SCRIPT_DIR/git-hooks/pre-commit" "$TARGET_DIR/.git/hooks/pre-commit"
       chmod +x "$TARGET_DIR/.git/hooks/pre-commit"
       echo "✅ Installed Git pre-commit hook"
   fi

   echo ""
   echo "═══════════════════════════════════════════════════════════════"
   echo "✅ Installation complete!"
   echo ""
   echo "Next steps:"
   echo "1. Review and customize AGENTS.md for your project"
   echo "2. Review ~/.codex/config.toml and adjust defaults"
   echo "3. Run ./scripts/session_start.sh to verify setup"
   echo "═══════════════════════════════════════════════════════════════"
   ```

## Part B: Create Team Onboarding Guide

**Task**: Document how new team members adopt the configuration.

1. Create the onboarding document:
   ```markdown
   <!-- docs/onboarding.md -->
   # Codex Onboarding Guide

   Welcome! This guide will help you set up Codex for our team's workflow.

   ## Prerequisites

   - [ ] Git installed and configured
   - [ ] Node.js 18+ installed
   - [ ] GitHub CLI authenticated (`gh auth login`)
   - [ ] Codex installed

   ## Setup Steps

   ### 1. Clone the Configuration

   ```bash
   git clone https://github.com/our-team/codex-config
   ```

   ### 2. Install in Your Project

   ```bash
   cd your-project
   ../codex-config/setup.sh
   ```

   ### 3. Customize AGENTS.md

   Edit `AGENTS.md` with project-specific details:
   - Project description
   - Tech stack specifics
   - Team conventions

   ### 4. Configure MCP Servers (Optional)

   If you need GitHub or database access:

   ```bash
   # Add to ~/.codex/config.toml
   [mcp_servers.github]
   command = "npx"
   args = ["-y", "@modelcontextprotocol/server-github"]
   env_vars = ["GITHUB_TOKEN"]
   ```

   ### 5. Verify Setup

   ```bash
   ./scripts/session_start.sh
   ```

   You should see:
   - Git status
   - Test status
   - Code quality metrics

   ## Daily Workflow

   ### Starting Work

   ```bash
   ./scripts/session_start.sh
   ```

   ### During Development

   Work with Codex normally. The Git pre-commit hook will:
   - Run lint/test gates
   - Block commits on failures

   ### Completing Work

   ```bash
   ./scripts/session_end.sh
   ```

   ### Feature Workflow

   For new features:
   ```bash
   ./scripts/feature_workflow.sh "my feature name"
   # ... work with Codex ...
   ./scripts/feature_workflow.sh "my feature name" --complete
   ```

   ## Troubleshooting

   ### Scripts not running
   ```bash
   chmod +x scripts/*.sh
   ```

   ### Git hook blocking commits
   Re-run the failing command locally or edit `.git/hooks/pre-commit` to adjust the checks.

   ### MCP server issues
   ```bash
   # Test server directly
   npx @modelcontextprotocol/server-github
   ```

   ## Getting Help

   - Check `docs/maintainers/patterns/` for common patterns
   - Ask in #codex-help Slack channel
   - Create an issue in the codex-config repo
   ```

## Part C: Test the Complete Integration

**Task**: Verify all components work together.

1. Create a test checklist:
   ```markdown
   ## Integration Test Checklist

   ### Configuration
   - [ ] AGENTS.md is read by Codex
   - [ ] Profile defaults apply (approval_policy, sandbox, features)
   - [ ] MCP servers work (if configured)

   ### Git Hooks
   - [ ] Pre-commit hook runs lint/tests
   - [ ] Hook blocks commits on failures

   ### Scripts
   - [ ] session_start.sh displays context
   - [ ] session_end.sh shows summary
   - [ ] validate.py runs all checks
   - [ ] feature_workflow.sh completes cycle

   ### MCP Servers
   - [ ] GitHub tools available
   - [ ] Database queries work
   - [ ] Custom tools respond

   ### Workflow
   - [ ] Full feature workflow works end-to-end
   - [ ] Quality gates prevent bad commits
   - [ ] Documentation is helpful
   ```

2. Run the integration test:
   ```bash
   #!/bin/bash
   # test_integration.sh

   set -e

   echo "Running integration tests..."

   # Test 1: Session start
   echo "Test 1: Session start script"
   ./scripts/session_start.sh > /dev/null 2>&1
   echo "  ✅ Passed"

   # Test 2: Git hook exists and is executable
   echo "Test 2: Git hook configuration"
   test -x .git/hooks/pre-commit
   echo "  ✅ Passed"

   # Test 3: Validation script
   echo "Test 3: Validation script"
   python3 scripts/validate.py > /dev/null 2>&1 || true
   echo "  ✅ Passed (validation ran)"

   # Test 4: Session end
   echo "Test 4: Session end script"
   ./scripts/session_end.sh > /dev/null 2>&1
   echo "  ✅ Passed"

   # Test 5: Configuration files
   echo "Test 5: Configuration files"
   test -f AGENTS.md
   test -f ~/.codex/config.toml
   echo "  ✅ Passed"

   echo ""
   echo "All integration tests passed!"
   ```

## Part D: Document Maintenance Procedures

**Task**: Create procedures for maintaining the configuration.

1. Create maintenance documentation:
   ```markdown
   <!-- docs/maintenance.md -->
   # Configuration Maintenance

   ## Version Control

   The configuration is versioned in Git. Tag releases:
   ```bash
   git tag -a v1.0.0 -m "Initial release"
   git push origin v1.0.0
   ```

   ## Updating Projects

   When the configuration is updated:

   1. Update the central repository
   2. Notify team via Slack
   3. Team members run:
      ```bash
      cd codex-config && git pull
      cd ../my-project && ../codex-config/setup.sh --update
      ```

   ## Adding New Components

   ### New Git Hook
   1. Create hook in `git-hooks/`
   2. Test locally
   3. Update setup.sh to copy it
   4. Document in README.md

   ### New Script
   1. Create script in `scripts/`
   2. Make executable
   3. Add to setup.sh
   4. Document usage

   ### New MCP Server
   1. Test server standalone
   2. Add to config.toml template
   3. Document setup steps
   4. Add to onboarding guide

   ## Troubleshooting Guide

   ### Configuration not loading
   - Check file permissions
   - Verify file locations
   - Check for syntax errors

   ### Git hook not running
   - Verify `.git/hooks/pre-commit` is executable
   - Run the hook script manually to see errors

   ### Quality issues not caught
   - Update validation script
   - Add new checks to the pre-commit hook
   - Strengthen AGENTS.md guidance

   ## Deprecation Policy

   When deprecating a component:
   1. Add deprecation notice for 2 releases
   2. Provide migration path
   3. Remove in next major version
   ```

---

## Hints

<details>
<summary>Hint 1: Testing the full stack</summary>

Create a test project to verify everything:
```bash
mkdir test-project
cd test-project
git init
npm init -y

# Install configuration
../codex-config/setup.sh

# Verify
./scripts/session_start.sh
```
</details>

<details>
<summary>Hint 2: Version compatibility</summary>

Track compatibility in the README:
```markdown
## Compatibility

| Config Version | Codex Version | Node Version |
|----------------|---------------|--------------|
| 1.0.0 | 1.0+ | 18+ |
| 1.1.0 | 1.2+ | 20+ |
```
</details>

<details>
<summary>Hint 3: Rollback procedures</summary>

Always have a rollback plan:
```bash
# Backup current config
cp ~/.codex/config.toml ~/.codex/config.toml.bak
cp AGENTS.md AGENTS.md.bak

# Install new config
../codex-config/setup.sh

# If issues, rollback
mv ~/.codex/config.toml.bak ~/.codex/config.toml
mv AGENTS.md.bak AGENTS.md
```
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete Integration Architecture

```
Team Repository: codex-config/
├── Core Configuration
│   ├── AGENTS.md         # Project instructions
│   └── config/           # config.toml template
├── Automation
│   ├── git-hooks/        # Pre-commit automation
│   └── scripts/          # Workflow scripts
├── Knowledge
│   ├── prompt_templates/ # Tested prompts
│   └── patterns/         # Best practices
└── Deployment
    ├── setup.sh          # Installation
    └── docs/             # Documentation

Project Repository: my-project/
├── AGENTS.md             # From codex-config
├── scripts/              # From codex-config
└── docs/                 # From codex-config + project-specific
```

### Integration Flow

```
Setup
  │
  ▼
┌─────────────────┐
│  setup.sh run   │ ──→ Install configuration
└────────┬────────┘
         ▼
┌─────────────────┐
│ Customize files │ ──→ Project-specific tweaks
└────────┬────────┘
         ▼
┌─────────────────┐
│ Verify setup    │ ──→ Run session_start.sh
└────────┬────────┘
         ▼
Daily Use
  │
  ▼
┌─────────────────┐
│ session_start   │ ──→ Context loading
└────────┬────────┘
         ▼
┌─────────────────┐
│ Codex + git hook│ ──→ Automated quality
└────────┬────────┘
         ▼
┌─────────────────┐
│  session_end    │ ──→ Verification
└─────────────────┘
```

### Key Success Factors

1. **Easy installation**: Single command setup
2. **Clear documentation**: Onboarding guide
3. **Automated quality**: Git hooks enforce standards
4. **Maintainability**: Version control and updates
5. **Team adoption**: Low friction, high value

### Customization Pattern

```
1. Start with base configuration
   ↓
2. Customize AGENTS.md for project
   ↓
3. Adjust git hooks for team needs
   ↓
4. Add project-specific scripts
   ↓
5. Document customizations
   ↓
6. Share learnings back to team
```

</details>

---

## Reflection Questions

1. How would you measure the success of this configuration?
2. What would make team adoption easier?
3. How often should the configuration be updated?

---

## Module 9 Complete!

You've learned:
- AGENTS.md for project instructions
- Config and permission management
- Git hooks and scripts for automation
- MCP servers for extended capabilities
- Complete integration and team adoption

**Congratulations!** You've completed the Codex CLI Training curriculum!
