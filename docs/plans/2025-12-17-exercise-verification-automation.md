# Exercise Verification Automation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a CI-friendly verification script and manifests to validate all exercise docs and fixtures without interactive steps.

**Architecture:** A Python script (`scripts/verify_exercises.py`) scans JSON manifests in `docs/exercises/` to validate required sections, referenced files, and optional fixtures. Manifests list exercise markdown files, required headings, and fixture expectations. A small unittest suite validates parsing and heading detection.

**Tech Stack:** Python 3 (stdlib `json`, `argparse`, `pathlib`, `unittest`), Markdown files, JSON manifests.

### Task 1: Add verifier tests and fixtures

**Files:**
- Create: `tests/test_verify_exercises.py`
- Create: `tests/fixtures/exercises/docs/exercises/sample/exercise-1.md`
- Create: `tests/fixtures/exercises/docs/exercises/sample/README.md`
- Create: `tests/fixtures/exercises/docs/exercises/sample/fixtures/output.md`
- Create: `tests/fixtures/exercises/docs/exercises/sample/exercise.manifest.json`

**Step 1: Write the failing test**

```python
import unittest
from scripts import verify_exercises

class TestVerifyExercises(unittest.TestCase):
    def test_manifest_validation_reports_missing_heading(self):
        root = "tests/fixtures/exercises"
        errors = verify_exercises.verify(root)
        self.assertIn(
            "missing heading 'Objective'",
            "\n".join(errors),
        )
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: FAIL with `ModuleNotFoundError` or missing function

**Step 3: Write minimal fixtures**

Create fixture markdown and manifest files in `tests/fixtures/exercises/...` with one missing heading so the test asserts an error message.

**Step 4: Run test to verify it fails for the right reason**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: FAIL with missing implementation, not file-not-found errors

**Step 5: Commit**

```bash
git add tests/test_verify_exercises.py tests/fixtures/exercises
git commit -m "test: add verifier fixtures"
```

### Task 2: Implement the verifier script

**Files:**
- Create: `scripts/verify_exercises.py`

**Step 1: Write the failing test**

```python
class TestVerifyExercises(unittest.TestCase):
    def test_manifest_validation_reports_missing_heading(self):
        root = "tests/fixtures/exercises"
        errors = verify_exercises.verify(root)
        self.assertTrue(any("missing heading 'Objective'" in e for e in errors))
```

**Step 2: Run test to verify it fails**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: FAIL with `AttributeError: module has no attribute verify`

**Step 3: Write minimal implementation**

```python
# scripts/verify_exercises.py
import argparse
import json
from pathlib import Path
import re

HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


def _load_manifest(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _headings(text: str) -> list[str]:
    return [m.group(2) for m in HEADING_RE.finditer(text)]


def verify(root: str) -> list[str]:
    root_path = Path(root)
    manifests = list(root_path.rglob("*.manifest.json"))
    errors = []
    for manifest_path in manifests:
        manifest = _load_manifest(manifest_path)
        for doc in manifest.get("docs", []):
            doc_path = root_path / doc["path"]
            if not doc_path.exists():
                errors.append(f"{manifest_path}: missing doc {doc['path']}")
                continue
            headings = _headings(doc_path.read_text(encoding="utf-8"))
            if not any(h.startswith("#") is False for h in []):
                if not any(h for h in headings if h and doc_path.read_text()):
                    errors.append(f"{manifest_path}: missing H1 in {doc['path']}")
            for section in doc.get("requiredSections", []):
                if section not in headings:
                    errors.append(f"{manifest_path}: missing heading '{section}' in {doc['path']}")
        for ref in manifest.get("references", []):
            if not (root_path / ref).exists():
                errors.append(f"{manifest_path}: missing reference {ref}")
        for output in manifest.get("outputs", []):
            fixture = output.get("fixture")
            if fixture:
                fixture_path = root_path / fixture
                if not fixture_path.exists():
                    errors.append(f"{manifest_path}: missing fixture {fixture}")
                    continue
                headings = _headings(fixture_path.read_text(encoding="utf-8"))
                for section in output.get("requiredSections", []):
                    if section not in headings:
                        errors.append(f"{manifest_path}: missing heading '{section}' in {fixture}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    args = parser.parse_args()
    errors = verify(args.root)
    if errors:
        for error in errors:
            print(error)
        return 1
    print("Exercise verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

**Step 4: Run test to verify it passes**

Run: `python3 -m unittest tests/test_verify_exercises.py -v`
Expected: PASS

**Step 5: Commit**

```bash
git add scripts/verify_exercises.py
git commit -m "feat: add exercise verifier"
```

### Task 3: Add exercise manifests and fixtures

**Files:**
- Create: `docs/exercises/exercises.manifest.json`
- Create: `docs/exercises/pm-prd/fixtures/prd.md`

**Step 1: Write the failing test**

Run: `python3 scripts/verify_exercises.py`
Expected: FAIL with missing manifest

**Step 2: Write minimal implementation**

Create `docs/exercises/exercises.manifest.json` listing all exercise markdown files under `docs/exercises/` and their required sections (empty for README files). Include a `references` list for the PM/PO PRD clinic inputs and template. Add an `outputs` entry pointing to `docs/exercises/pm-prd/fixtures/prd.md` with required headings.

**Step 3: Add fixture**

Create `docs/exercises/pm-prd/fixtures/prd.md` containing headings:
- Problem Statement
- Goals
- Non-Goals
- Constraints
- Scope
- Acceptance Criteria
- Risks and Dependencies
- Open Questions
- Evidence / Sources

**Step 4: Run verifier to confirm it passes**

Run: `python3 scripts/verify_exercises.py`
Expected: `Exercise verification passed`

**Step 5: Commit**

```bash
git add docs/exercises/exercises.manifest.json docs/exercises/pm-prd/fixtures/prd.md
git commit -m "docs: add exercise manifests and fixtures"
```

### Task 4: Documentation hook

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**

```bash
rg -n "verify_exercises" README.md
```
Expected: no matches

**Step 2: Update README**

Add a short "Exercise Verification" note with the command `python3 scripts/verify_exercises.py`.

**Step 3: Verify**

```bash
rg -n "verify_exercises" README.md
```
Expected: match

**Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add exercise verification command"
```
