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
        text: 'Recipes',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/recipes/README' },
          { text: 'RAG & Infinite Context', link: '/recipes/rag' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lbijeau/codex-training' }
    ],
    footer: {
      message: 'Independent community project in Alpha. Not affiliated with or endorsed by OpenAI.',
      copyright: 'Copyright (c) 2026-present Luc Bijeau.'
    }
  }
}))
