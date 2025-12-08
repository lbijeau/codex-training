# Resources & References

Curated resources for deepening your Codex Code mastery and AI-assisted development skills.

---

## Official Documentation

### OpenAI Codex
- **Platform Guide**: https://platform.openai.com/docs/guides/codex
- **API Reference**: https://platform.openai.com/docs/api-reference/introduction
- **Examples & Tutorials**: https://platform.openai.com/examples (filter for Codex/prompt-heavy workflows)
- **Release Notes**: Keep an eye on the OpenAI status and change-log pages for updates

### OpenAI API (Codex Workflows)
- **API Documentation**: https://platform.openai.com/docs
- **SDKs**: Official OpenAI SDKs for Python and TypeScript/JavaScript
- **Function Calling Guide**: https://platform.openai.com/docs/guides/gpt/function-calling
- **Rate Limits & Best Practices**: https://platform.openai.com/docs/guides/rate-limits

### Superpowers Plugin
- **Repository**: https://github.com/superpowers-marketplace/superpowers
- **Skills Marketplace**: Browse community-contributed skills
- **Contributing**: How to submit your own skills
- **Skill Development**: Guide to creating skills

---

## Function Calling & Helper Automation

### Official Guides
- **Function Calling Guide**: https://platform.openai.com/docs/guides/gpt/function-calling
- **Retrieval-Augmented Generation**: https://platform.openai.com/docs/guides/retrieval
- **OpenAI Cookbook**: https://platform.openai.com/examples?filter_codex_api

### Helper Development
- **OpenAI CLI and SDK docs**: https://platform.openai.com/docs/api-reference
- **Maintain structured helpers**: Document helper schemas in `codex_helpers/functions.json` and log every invocation
- **Automation patterns**:
  - Write lightweight scripts that run before/after sessions (`scripts/session_start.sh`, `scripts/validate_ranges.py`)
  - Use JSON results so Codex can reason over helpers
  - Keep environment secrets in `.env`, not prompts

---

## Learning Resources

### Prompt Engineering
- **Anthropic Prompt Engineering Guide**: Best practices for Codex
- **Prompt Engineering Guide**: https://www.promptingguide.ai/
- **OpenAI Cookbook**: Examples (many apply to Codex)

### AI-Assisted Development
- **GitHub Copilot Docs**: Patterns (applicable to Codex Code)
- **Cursor AI Blog**: AI-assisted development insights
- **Software Engineering with LLMs**: Research and best practices

### Test-Driven Development
- **TDD by Example** (Kent Beck): Classic TDD book
- **Growing Object-Oriented Software** (Freeman & Pryce): TDD + design
- **Testing JavaScript**: Modern JS testing practices

### Software Architecture
- **Clean Architecture** (Robert Martin): Layered architecture
- **Domain-Driven Design** (Eric Evans): Modeling complex domains
- **Refactoring** (Martin Fowler): Improving code design

---

## Community Resources

### Forums & Discussions
- **Codex Code GitHub Discussions**: Ask questions, share tips
- **Anthropic Discord**: Community discussions (if available)
- **Reddit**: r/CodexAI, r/LLMDevs

### Blogs & Articles
- **Anthropic Blog**: https://www.anthropic.com/blog
- **Simon Willison's Blog**: AI and LLM insights
- **Hacker News**: Search for "Codex" or "Codex Code"

### Video Content
- **YouTube**: Search "Codex Code tutorial"
- **Conference Talks**: AI-assisted development presentations
- **Livestreams**: Developers coding with Codex

---

## Tools & Extensions

### Development Tools
- **Prettier**: Code formatting (works with hooks)
- **ESLint**: JavaScript/TypeScript linting
- **Jest**: JavaScript testing framework
- **pytest**: Python testing framework

### Git & GitHub
- **GitHub CLI (gh)**: Command-line GitHub operations
- **Git Documentation**: https://git-scm.com/doc
- **Conventional Commits**: Commit message standard

### Productivity
- **ripgrep (rg)**: Fast code search
- **fzf**: Fuzzy finder
- **bat**: Better `cat` with syntax highlighting
- **jq**: JSON processor for command line

---

## Pattern Libraries

### Software Design Patterns
- **Refactoring Guru**: https://refactoring.guru/design-patterns
- **Patterns.dev**: Modern web development patterns
- **Source Making**: Software design patterns

### Workflow Patterns
- **Atlassian Agile Guide**: Agile methodologies
- **Trunk Based Development**: Git workflow patterns
- **DevOps Patterns**: Deployment and operations

---

## Books

### Essential Reading
1. **The Pragmatic Programmer** (Thomas & Hunt)
   - Timeless software development wisdom
   - Applicable to AI-assisted development

2. **Clean Code** (Robert Martin)
   - Writing maintainable code
   - Principles apply regardless of how code is written

3. **Working Effectively with Legacy Code** (Michael Feathers)
   - Dealing with existing codebases
   - Critical for real-world work

4. **Refactoring** (Martin Fowler)
   - Improving code design
   - Catalog of refactoring patterns

### AI & LLMs
1. **AI Engineering** (Chip Huyen)
   - Building AI systems
   - Production considerations

2. **Designing Data-Intensive Applications** (Martin Kleppmann)
   - System design
   - Understanding complex systems

---

## Research Papers

### LLMs & Code Generation
- **Codex Paper** (OpenAI): Early code generation research
- **AlphaCode** (DeepMind): Competitive programming with LLMs
- **Code Review with LLMs**: Research on AI code review

### Tool Use & Agents
- **ReAct** (Yao et al.): Reasoning + Acting with LLMs
- **Toolformer** (Meta): Teaching LLMs to use tools
- **AutoGPT**: Autonomous agents research

---

## Practice Platforms

### Coding Challenges
- **LeetCode**: Algorithmic problems
- **Project Euler**: Mathematical/programming challenges
- **Exercism**: Practice with mentorship

### Real Projects
- **Open Source**: Contribute to projects
- **Personal Projects**: Build something useful
- **Code Katas**: Deliberate practice exercises

---

## Superpowers Skills

### Must-Try Skills
- `superpowers:test-driven-development`: TDD workflow
- `superpowers:systematic-debugging`: Debug methodically
- `superpowers:brainstorming`: Refine ideas into designs
- `superpowers:writing-plans`: Create implementation plans
- `superpowers:executing-plans`: Execute in batches

### Exploring Skills
```bash
# List all available skills
ls ~/.codex/plugins/cache/superpowers/skills/

# Read a skill to understand it
cat ~/.codex/plugins/cache/superpowers/skills/[skill-name]/skill.md
```

---

## Your Resources

As you discover useful resources, add them here:

### Articles I Found Helpful
- [Title](URL) - Why it was helpful
-

### Videos I Recommend
- [Title](URL) - Key takeaways
-

### Tools I Use
- [Tool Name](URL) - How I use it
-

### People to Follow
- [Name](URL) - Why follow
-

---

## Contributing

Found a great resource? Add it to this file!

Guidelines:
- ✅ Directly relevant to Codex Code or AI-assisted development
- ✅ High quality and reputable
- ✅ Available and accessible
- ✅ Include brief description

---

## Keep Learning

This training program is just the beginning. Continue to:
- Follow Codex Code updates
- Try new superpowers skills
- Build and share helper scripts and prompt templates
- Contribute patterns back
- Teach others what you've learned

**The best way to master Codex Code is to use it daily on real projects.**

---

**Last Updated**: 2025-12-07
