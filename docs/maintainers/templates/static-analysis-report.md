# Static Analysis Report Template

**Session date:**
**Repo snapshot:**

## Duplicate Blocks
- Findings: (describe any duplicated logic found during review)
- Action: (describe deduplication or refactoring idea)

## Complexity Deltas
- Findings: (note any functions with high complexity or significant changes)
- Action: (note which functions to simplify, split, or test)

## Cross-Layer Imports
- Findings: (list any problematic imports that cross architectural boundaries)
- Action: (describe how to enforce boundaries or move code)

## Summary for Codex
1. Highlights before requesting Codex (helpers already run)
2. Constraints: avoid touching certain layers or reorganize abstractions
3. Follow-up prompt fragment: "With the static check findings above, rewrite X ..."
