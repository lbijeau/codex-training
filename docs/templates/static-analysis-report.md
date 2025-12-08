# Static Analysis Report Template

**Session date:**
**Repo snapshot:**

## Duplicate Blocks
- Findings: (paste output from `node scripts/check_duplicates.js`)
- Action: (describe deduplication or refactoring idea)

## Complexity Deltas
- Findings: (paste warnings from `node scripts/report_complexity_diff.js`)
- Action: (note which functions to simplify, split, or test)

## Cross-Layer Imports
- Findings: (copy problematic imports from `node scripts/check_cross_layer_imports.js`)
- Action: (describe how to enforce boundaries or move code)

## Summary for Codex
1. Highlights before requesting Codex (helpers already run)
2. Constraints: avoid touching certain layers or reorganize abstractions
3. Follow-up prompt fragment: "With the static check findings above, rewrite X ..."
