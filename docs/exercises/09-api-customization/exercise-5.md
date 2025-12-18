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
   ├── .codex/
   │   ├── settings.json
   │   ├── config.toml
   │   └── hooks/
   │       ├── pre-tool-use.sh
   │       └── post-tool-use.sh
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
   1. Copy configuration files to your project
   2. Set up Git hooks
   3. Configure MCP servers
   4. Create necessary directories

   ## What's Included

   ### AGENTS.md
   Project-specific instructions that shape Codex behavior:
   - Code conventions
   - Team workflows
   - Security requirements

   ### Hooks
   Automated validation and quality checks:
   - `pre-tool-use.sh`: Block dangerous operations
   - `post-tool-use.sh`: Auto-format and test

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
   mkdir -p "$TARGET_DIR/.codex/hooks"
   mkdir -p "$TARGET_DIR/.codex/logs"
   mkdir -p "$TARGET_DIR/scripts"
   mkdir -p "$TARGET_DIR/docs/maintainers/prompt_templates"
   mkdir -p "$TARGET_DIR/docs/maintainers/patterns"

   # Copy AGENTS.md
   if [ "$KEEP_AGENTS" != true ]; then
       cp "$SCRIPT_DIR/AGENTS.md" "$TARGET_DIR/"
       echo "✅ Installed AGENTS.md"
   fi

   # Copy .codex settings
   cp "$SCRIPT_DIR/.codex/settings.json" "$TARGET_DIR/.codex/"
   echo "✅ Installed .codex/settings.json"

   # Copy hooks
   cp "$SCRIPT_DIR/.codex/hooks/"*.sh "$TARGET_DIR/.codex/hooks/"
   chmod +x "$TARGET_DIR/.codex/hooks/"*.sh
   echo "✅ Installed hooks"

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
       cp "$SCRIPT_DIR/.codex/hooks/pre-tool-use.sh" "$TARGET_DIR/.git/hooks/pre-commit"
       chmod +x "$TARGET_DIR/.git/hooks/pre-commit"
       echo "✅ Installed Git pre-commit hook"
   fi

   echo ""
   echo "═══════════════════════════════════════════════════════════════"
   echo "✅ Installation complete!"
   echo ""
   echo "Next steps:"
   echo "1. Review and customize AGENTS.md for your project"
   echo "2. Update .codex/settings.json with your preferences"
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

   Work with Codex normally. The hooks will:
   - Log all tool usage
   - Block dangerous operations
   - Auto-format code changes

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

   ### Hooks blocking operations
   Check `.codex/logs/tool-usage.log` for details.

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
   - [ ] Settings take effect
   - [ ] Ignore patterns work

   ### Hooks
   - [ ] Pre-tool hook logs operations
   - [ ] Pre-tool hook blocks dangerous commands
   - [ ] Post-tool hook formats code
   - [ ] Post-tool hook runs tests

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

   # Test 2: Hooks exist and are executable
   echo "Test 2: Hooks configuration"
   test -x .codex/hooks/pre-tool-use.sh
   test -x .codex/hooks/post-tool-use.sh
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
   test -f .codex/settings.json
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

   ### New Hook
   1. Create hook in `.codex/hooks/`
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

   ### Hooks not running
   - Verify hook is executable
   - Check hook output in logs
   - Test hook manually

   ### Quality issues not caught
   - Update validation script
   - Add new patterns to hooks
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
cp -r .codex .codex.bak
cp AGENTS.md AGENTS.md.bak

# Install new config
../codex-config/setup.sh

# If issues, rollback
rm -rf .codex && mv .codex.bak .codex
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
│   └── .codex/           # Technical config
├── Automation
│   ├── hooks/            # Pre/post automation
│   └── scripts/          # Workflow scripts
├── Knowledge
│   ├── prompt_templates/ # Tested prompts
│   └── patterns/         # Best practices
└── Deployment
    ├── setup.sh          # Installation
    └── docs/             # Documentation

Project Repository: my-project/
├── AGENTS.md             # From codex-config
├── .codex/               # From codex-config
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
│ Codex + hooks   │ ──→ Automated quality
└────────┬────────┘
         ▼
┌─────────────────┐
│  session_end    │ ──→ Verification
└─────────────────┘
```

### Key Success Factors

1. **Easy installation**: Single command setup
2. **Clear documentation**: Onboarding guide
3. **Automated quality**: Hooks enforce standards
4. **Maintainability**: Version control and updates
5. **Team adoption**: Low friction, high value

### Customization Pattern

```
1. Start with base configuration
   ↓
2. Customize AGENTS.md for project
   ↓
3. Adjust hooks for team needs
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
- Settings and permission management
- Hooks for pre/post automation
- MCP servers for extended capabilities
- Complete integration and team adoption

**Congratulations!** You've completed the Codex CLI Training curriculum!
