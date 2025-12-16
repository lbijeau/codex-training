# Module 9: Advanced Integration

## Overview

Integrate OpenAI Codex into real-world workflows: coordinate multiple helpers, link into CI/CD, transfer knowledge between projects, and contribute reusable patterns back to the community.

**Learning Objectives**:
- Design composite workflows that orchestrate prompt templates, function wrappers, and validation scripts
- Plug Codex into CI/CD pipelines and automation tooling
- Keep knowledge portable so future projects can reuse helpers and prompts
- Document and share your integrations so the wider community benefits

**Time**: 3-4 hours

---

## 1. Multi-Tool Workflows

### Workflow ingredients
A Codex-driven workflow typically coordinates:
- **Prompt templates** (`docs/prompt_templates/feature_plan.md`) to capture intent
- **Helper functions** (`codex_helpers/`) that read files, run tests, gather metrics
- **Validation scripts** (`scripts/validate.sh`) that ensure safety before accepting output
- **Logging hooks** that archive every session for traceability

### Example workflow: Feature delivery
```
1. Start session with a template that describes the new feature and available helpers
2. Codex runs functions:
   - `read_file` to grab relevant files
   - `grep` to spot mentions of the feature
   - `run_tests` to ensure the suite is green
3. Codex returns a plan + diff
4. You run `scripts/verify_diff.py` to ensure no sensitive files were touched
5. Commit the change + log metadata
6. Ask Codex to summarize the changelog and include it in the PR description
```
Each helper returns JSON so Codex can reason about structured data instead of raw text.

### Orchestrating multiple tools
Combine helper outputs manually:
1. Ask helper A for architecture stats
2. Ask helper B for test results
3. Feed both results into a follow-up prompt that stitches the insights together
This imitates parallel investigation without spawning multiple agents—just multiple prompts with curated inputs.

### Automation tips
- Build small wrappers for each helper so you can call them from the CLI and from your code
- Keep helper schemas in `codex_helpers/functions.json` so registering them with OpenAI is declarative
- Use logging imports to keep a chronological trace of which helper ran when

---

## 2. CI/CD Integration

### Principle
Let Codex prepare the change; let your CI validate it. The model should never be the only gatekeeper—CI ensures repeatability.

### Pre-commit automation
Wrap your workflow in scripts that run before you call Codex or commit:
- `scripts/session_start.sh` gathers git status, tests coverage, open issues
- `scripts/validate_diff.py` rejects risky modifications (e.g., editing production config)
- `scripts/run_helpers.py` exposes helper metadata for function calling

### Sample GitHub Actions snippet
```yaml
name: Codex Workflow
on: [pull_request]
jobs:
  codex:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run helpers
        run: |
          python codex_helpers/list_todos.py
          python scripts/validate_diff.py --diff origin/main
      - name: Run tests
        run: pytest
      - name: Run linter
        run: flake8
```
Codex prepares the description, but CI validates before merging.

### PR composition workflow
1. Use Codex to generate a changelog (summary + list of tests)
2. Add the summary to your PR template
3. Let CI run the same tests Codex suggested (mirrors the function calls)
4. If CI fails, send the test output back to Codex for a follow-up fix prompt

---

## 3. Knowledge Transfer

### Portable prompt library
Store prompts that worked well in `docs/prompt_templates/` with metadata:
```
- prompt_name: feature_plan
  purpose: plan new feature rollout
  helpers: [read_file, run_tests]
  constraints: must mention security considerations
```
When starting a new repository, copy the prompts, tweak the `system` message, and reuse the helper manifest.

### Helper reuse
Structure `codex_helpers/` so functions are agnostic to the repo:
- Accept file paths relative to root
- Return JSON with `success`, `details`, `tokens`
- Log input arguments for auditing

Maintain README sections describing how to add new helpers and register them in `functions.json` so teammates build consistent tooling.

### Cross-project onboarding
For every new project:
1. Copy `codex_helpers/` and update the manifest
2. Import prompt templates for common workflows (bug triage, release notes)
3. Document the helper names and their expected roles in `docs/playbook/scenarios.md`
4. Run `scripts/session_start.sh` to emit a quick status summary so each Codex session begins with baseline context

---

## 4. Community Contribution

### Share your helpers
Publish your helper catalog on GitHub:
- Include usage examples, input/output schemas, and sample logs
- Tag contributions as `codex-helper` or `codex-prompt`
- Encourage others to fork the manifest and adapt it

### Pattern sharing
Write about integration patterns in `docs/patterns/` or blog posts:
- “How we coordinate prompt batches for feature delivery”
- “Function catalogs we trust for CI safety”
- “Session orchestration for multi-step investigations”

### Open-source strategy
If you publish `codex_helpers`, include tests, docs, and license. Ask: Does it help other teams integrate Codex with their pipelines?

---

## Next Steps
1. Build a helper, register it via `functions.json`, and use it in a Codex session
2. Update your CI workflow to reflect the same helpers (e.g., call the helper after tests)
3. Document the story in `docs/playbook/scenarios.md`
4. Share the pattern with others (Docs, README, blog snippet)
