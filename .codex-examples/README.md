# Sample .codex Configuration

This directory contains example Codex Code configuration files you can use as a starting point.

## Files

-- `config.json` - Example configuration with hooks and helper scripts
- `context.md` - Sample project context file
- `skills/project-conventions.md` - Training program conventions skill
- `commands/review.md` - Quick code review slash command
- `commands/extract-pattern.md` - Pattern documentation helper

## How to Use

### Option 1: Copy to Your Project

```bash
# From the codex-training directory:
cp -r .codex-examples/ .codex/
```

Then customize for your needs.

### Option 2: Copy Individual Files

```bash
# Copy just what you need:
cp .codex-examples/config.json .codex/
cp .codex-examples/context.md .codex/
# etc.
```

### Option 3: Reference as Examples

Keep these as examples and create your own `.codex/` from scratch using these as reference.

## Customization

### config.json

**Helper Scripts**:
- Register the helper scripts you expose via `functions.json`
- Configure environment variables (API keys, paths) outside the prompt
- Keep logging scripts simple so they can run in any session

**Hooks**:
- `SessionStart:Callback`: Runs when conversation starts
- `Write:Callback`: Runs after writing files
- `Bash:Validate`: Can block bash commands

Customize hooks for your workflow (auto-format, linting, etc.)

### context.md

Update with your specific project context:
- What you're working on
- Current module/exercise
- Key conventions
- Project-specific notes

This gets loaded at session start if you have the hook configured.

### Prompt Templates & Helpers

Create reusable assets for:
- Project-specific conventions (e.g., `skills/project-conventions.md` → convert to prompt template)
- Common workflows (template + helper combination)
- Domain knowledge (context files, instructions)
- Checklists and processes (scripts or prompt fragments)

See Module 2 for detailed prompt/helper guidance.

## Tips

1. **Start Simple**: Begin with just context.md, add complexity as needed
2. **Hooks**: Keep hooks fast (<100ms) to avoid slowing down workflow
3. **Skills**: Document patterns you use frequently
4. **Commands**: Create shortcuts for repetitive prompts
5. **Iterate**: Evolve your configuration as you learn

## Security

**Never commit**:
- API keys or secrets
- Personal access tokens
- Private data

Use environment variables for sensitive data in config.json.

## See Also

- [Module 2: Advanced Customization](../docs/modules/02-customization.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [Codex Code Documentation](https://platform.openai.com/docs/guides/codex)
