# Docs Site Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a VitePress docs site and align content structure, navigation, and link
hygiene with a consistent public docs standard while staying relevant to
codex-training.

**Architecture:** Use VitePress with Mermaid support rooted at `docs/`, add a minimal landing page and recipe index that link into existing content, then update navigation, links, and repo hygiene to support a public GitHub Pages site.

**Tech Stack:** VitePress, vitepress-plugin-mermaid, Mermaid, Node.js (npm)

### Task 1: Review existing structure and align targets

**Files:**
- Review: `README.md`
- Review: `GETTING_STARTED.md`
- Review: `docs/modules/01-getting-started.md`
- Review: `docs/exercises/01-getting-started/README.md`
- Review: `docs/training/codex-cli-hands-on/README.md`
- Review: `docs/maintainers/README.md`

**Step 1: Inspect existing codex-training entry points**

Open the listed codex-training markdown files to understand current navigation and labels.

**Step 2: Inspect target site structure**

Review the target VitePress layout patterns to mirror in codex-training.

**Step 3: Capture navigation mapping**

Write a short mapping of top-level nav items (Home, Getting Started, Modules, Exercises, Training, Maintainers, Recipes, Support) to specific codex-training paths.

**Step 4: Commit notes**

No commit for this task.

---

### Task 2: Add VitePress tooling and site config

**Files:**
- Create: `package.json`
- Create (generated): `package-lock.json`
- Create: `docs/.vitepress/config.mts`
- Modify: `.gitignore`

**Step 1: Create `package.json`**

```json
{
  "name": "codex-training",
  "version": "1.0.0",
  "type": "module",
  "description": "Codex CLI training materials and documentation",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "mermaid": "^11.12.2",
    "vitepress": "^1.6.4",
    "vitepress-plugin-mermaid": "^2.0.17",
    "vue": "^3.5.26"
  }
}
```

**Step 2: Install dependencies**

Run: `npm install`
Expected: package-lock.json created with VitePress and Mermaid dependencies.

**Step 3: Update `.gitignore` to track lockfile and ignore VitePress output**

Update `.gitignore` to stop ignoring `package-lock.json` and add:

```
docs/.vitepress/cache/
docs/.vitepress/dist/
```

**Step 4: Create VitePress config**

Create `docs/.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const isProd = process.env.NODE_ENV === 'production'

export default withMermaid(defineConfig({
  base: isProd ? '/codex-training/' : '/',
  title: 'Codex Training [Alpha]',
  description: 'Master the Codex CLI for software engineering',
  ignoreDeadLinks: true,
  outDir: '.vitepress/dist',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Modules', link: '/modules/01-getting-started' },
      { text: 'Exercises', link: '/exercises/01-getting-started/README' },
      { text: 'Training', link: '/training/codex-cli-hands-on/README' },
      { text: 'Maintainers', link: '/maintainers/README' },
      { text: 'Recipes', link: '/recipes/README' }
    ],
    sidebar: [
      {
        text: 'Modules',
        collapsed: false,
        items: [
          { text: '01. Getting Started', link: '/modules/01-getting-started' },
          { text: '02. Skills & Workflows', link: '/modules/02-skills' },
          { text: '03. Speed & Efficiency', link: '/modules/03-speed' },
          { text: '04. Planning & Execution', link: '/modules/04-planning' },
          { text: '05. Quality & Verification', link: '/modules/05-quality' },
          { text: '06. Domain Patterns', link: '/modules/06-domain' },
          { text: '07. Advanced Integration', link: '/modules/07-integration' },
          { text: '08. API Internals', link: '/modules/08-api-internals' },
          { text: '09. API Customization', link: '/modules/09-api-customization' }
        ]
      },
      {
        text: 'Exercises',
        collapsed: false,
        items: [
          { text: '01. Getting Started', link: '/exercises/01-getting-started/README' },
          { text: '02. Skills', link: '/exercises/02-skills/README' },
          { text: '03. Speed', link: '/exercises/03-speed/README' },
          { text: '04. Planning', link: '/exercises/04-planning/README' },
          { text: '05. Quality', link: '/exercises/05-quality/README' },
          { text: '06. Domain', link: '/exercises/06-domain/README' },
          { text: '07. Integration', link: '/exercises/07-integration/README' },
          { text: '08. API Internals', link: '/exercises/08-api-internals/README' },
          { text: '09. API Customization', link: '/exercises/09-api-customization/README' },
          { text: 'PM PRD Clinic', link: '/exercises/pm-prd/README' }
        ]
      },
      {
        text: 'Training',
        collapsed: true,
        items: [
          { text: 'Codex CLI Hands-on', link: '/training/codex-cli-hands-on/README' }
        ]
      },
      {
        text: 'Maintainers',
        collapsed: true,
        items: [
          { text: 'Maintainer Guide', link: '/maintainers/README' },
          { text: 'Patterns', link: '/maintainers/patterns/README' },
          { text: 'Playbook', link: '/maintainers/playbook/scenarios' },
          { text: 'Prompt Templates', link: '/maintainers/prompt_templates/README' }
        ]
      },
      {
        text: 'Recipes',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/recipes/README' },
          { text: 'Planning', link: '/recipes/planning' },
          { text: 'Quality', link: '/recipes/quality' },
          { text: 'Speed', link: '/recipes/speed' },
          { text: 'Debugging', link: '/recipes/debugging' },
          { text: 'Integration', link: '/recipes/integration' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lbijeau/codex-training' }
    ],
    footer: {
      message: 'Independent community project in Alpha. Not affiliated with or endorsed by OpenAI.',
      copyright: 'Copyright © 2026-present Luc Bijeau.'
    }
  }
}))
```

**Step 5: Run docs build**

Run: `npm run docs:build`
Expected: Exit code 0, output in `docs/.vitepress/dist`.

**Step 6: Commit**

```bash
git add package.json package-lock.json docs/.vitepress/config.mts .gitignore
git commit -m "build: add VitePress docs tooling"
```

---

### Task 3: Add docs site entry points and recipes

**Files:**
- Create: `docs/index.md`
- Create: `docs/README.md`
- Create: `docs/recipes/README.md`
- Create: `docs/recipes/planning.md`
- Create: `docs/recipes/quality.md`
- Create: `docs/recipes/speed.md`
- Create: `docs/recipes/debugging.md`
- Create: `docs/recipes/integration.md`
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`

**Step 1: Create landing page**

```md
---
layout: home

hero:
  name: "Codex Training (Alpha)"
  text: "Master the Codex CLI"
  tagline: "Practical guidance for AI-powered software engineering"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View Modules
      link: /modules/01-getting-started
    - theme: alt
      text: Get Help
      link: https://github.com/lbijeau/codex-training/issues/new/choose

features:
  - title: Skills and Workflows
    details: Build durable workflows, skill libraries, and safe execution habits.
    link: /modules/02-skills
  - title: Planning and Quality
    details: Move from intent to verified implementation with clear plans.
    link: /modules/04-planning
  - title: Speed and Efficiency
    details: Learn the batching and context tactics that accelerate delivery.
    link: /modules/03-speed
  - title: Integration Patterns
    details: Connect Codex to GitHub, CI, and team workflows.
    link: /modules/07-integration
  - title: API Internals
    details: Understand the Codex request model and tooling surfaces.
    link: /modules/08-api-internals
  - title: Recipe Index
    details: Quick prompts and checklists to apply the material fast.
    link: /recipes/README
---

<div style="text-align: center; margin-top: 2rem; opacity: 0.6; font-size: 0.9rem;">
  <p>Independent community project in Alpha. Not affiliated with or endorsed by OpenAI.</p>
</div>
```

**Step 2: Create docs site README**

```md
# Codex Training Docs Site

This site is built with VitePress and uses the content under `docs/`.

## Local Development

```bash
npm install
npm run docs:dev
```

Open http://localhost:5173 to view the site.
```

**Step 3: Create recipes index**

```md
# Codex CLI Cookbook

Short, outcome-focused guides that point into the core modules and exercises.
Use these when you need a quick prompt or checklist rather than a full lesson.

## Available Recipes

- [Planning](./planning.md) - from intent to a focused implementation plan
- [Quality](./quality.md) - review, testing, and verification workflows
- [Speed](./speed.md) - faster iterations with structured prompts
- [Debugging](./debugging.md) - systematic root cause analysis
- [Integration](./integration.md) - connect Codex to team systems
```

**Step 4: Create recipe pages**

`docs/recipes/planning.md`:

```md
# Planning Recipe

## Goal
Turn a vague request into a concrete, testable implementation plan.

## Prompt
Ask Codex to produce a staged plan with explicit file paths and tests.

## Next Steps
- Read [Module 4: Planning](../modules/04-planning.md)
- Practice in [Planning Exercises](../exercises/04-planning/README.md)
```

`docs/recipes/quality.md`:

```md
# Quality Recipe

## Goal
Run a layered review that catches regressions and missing tests.

## Prompt
Ask Codex to review the diff, enumerate risks, and suggest targeted tests.

## Next Steps
- Read [Module 5: Quality](../modules/05-quality.md)
- Practice in [Quality Exercises](../exercises/05-quality/README.md)
```

`docs/recipes/speed.md`:

```md
# Speed Recipe

## Goal
Reduce cycle time by batching tasks and tightening feedback loops.

## Prompt
Ask Codex to propose a parallelized execution plan and use todo tracking.

## Next Steps
- Read [Module 3: Speed](../modules/03-speed.md)
- Practice in [Speed Exercises](../exercises/03-speed/README.md)
```

`docs/recipes/debugging.md`:

```md
# Debugging Recipe

## Goal
Find the root cause without guessing.

## Prompt
Ask Codex to gather evidence, form hypotheses, and verify with tests.

## Next Steps
- Read [Debugging Patterns](../maintainers/patterns/debugging/README.md)
- Practice in [Quality Exercises](../exercises/05-quality/README.md)
```

`docs/recipes/integration.md`:

```md
# Integration Recipe

## Goal
Connect Codex to team tooling and deployment workflows.

## Prompt
Ask Codex to design an integration flow and list required permissions.

## Next Steps
- Read [Module 7: Integration](../modules/07-integration.md)
- Practice in [Integration Exercises](../exercises/07-integration/README.md)
```

**Step 5: Update README entry points for docs site**

Add a short "Docs Site" note and link to `/docs/index.md` with local dev instructions.

**Step 6: Update GETTING_STARTED links to match docs site routing**

Ensure module and exercise links remain consistent and user-friendly.

**Step 7: Run docs build**

Run: `npm run docs:build`
Expected: Exit code 0.

**Step 8: Commit**

```bash
git add docs/index.md docs/README.md docs/recipes README.md GETTING_STARTED.md
git commit -m "docs: add VitePress landing page and recipes"
```

---

### Task 4: Add GitHub Pages workflow and issue template alignment

**Files:**
- Create: `.github/workflows/deploy-docs.yml`
- Modify: `.github/ISSUE_TEMPLATE/config.yml` (if needed)
- Create: `.github/ISSUE_TEMPLATE/exercise_help.yml` (if missing)
- Create: `.github/ISSUE_TEMPLATE/suggestion.yml` (if missing)
- Create: `.github/ISSUE_TEMPLATE/content_bug.yml` (if missing)

**Step 1: Add docs deploy workflow**

```yaml
name: Deploy Docs site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Add student-facing issue templates if missing**

Add three student-facing templates and adjust wording for Codex.

**Step 3: Commit**

```bash
git add .github/workflows/deploy-docs.yml .github/ISSUE_TEMPLATE
git commit -m "ci: add docs site deployment workflow"
```

---

### Task 5: Link hygiene and verification sweep

**Files:**
- Modify: `README.md`
- Modify: `GETTING_STARTED.md`
- Modify: `docs/modules/01-getting-started.md`
- Modify: `docs/modules/02-skills.md`
- Modify: `docs/modules/07-integration.md`

**Step 1: Find raw filename references**

Run: `rg -n "\\.md\\)" docs README.md GETTING_STARTED.md`
Expected: list of markdown links to evaluate.

**Step 2: Replace raw file name references with user-friendly labels**

Update the listed files, keeping the same link targets.

**Step 3: Run docs build**

Run: `npm run docs:build`
Expected: Exit code 0.

**Step 4: Commit**

```bash
git add README.md GETTING_STARTED.md docs/modules/01-getting-started.md docs/modules/02-skills.md docs/modules/07-integration.md
git commit -m "docs: align links for site navigation"
```
