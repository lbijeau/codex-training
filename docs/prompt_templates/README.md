# Prompt Templates

Templates live under this directory with placeholders like `{{task}}`.

Use `scripts/template_builder.py` to render them for a session:

```bash
python scripts/template_builder.py docs/prompt_templates/feature-plan.md \
  --set task="audit the login flow" \
  --helpers list_todos,run_tests \
  --output practice/session_prompt.md
```

The script outputs the rendered prompt plus a header listing available helpers, ensuring every session starts with a known instruction set.
