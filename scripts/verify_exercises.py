import argparse
import json
from pathlib import Path
import re
from typing import Iterable

HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)


def _load_manifest(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _headings(text: str) -> list[str]:
    return [match.group(2) for match in HEADING_RE.finditer(text)]


def _iter_docs(items: Iterable) -> Iterable[dict]:
    for item in items:
        if isinstance(item, str):
            yield {"path": item, "requiredSections": []}
        else:
            yield item


def verify(root: str) -> list[str]:
    root_path = Path(root)
    errors: list[str] = []

    base_path = root_path / "docs" / "exercises"
    if not base_path.exists():
        return [f"{root_path}: missing docs/exercises"]

    for manifest_path in base_path.rglob("*.manifest.json"):
        try:
            manifest = _load_manifest(manifest_path)
        except json.JSONDecodeError as exc:
            errors.append(f"{manifest_path}: invalid JSON ({exc.msg} at line {exc.lineno})")
            continue

        for doc in _iter_docs(manifest.get("docs", [])):
            doc_path = root_path / doc.get("path", "")
            if not doc_path.exists():
                errors.append(f"{manifest_path}: missing doc {doc.get('path')}")
                continue
            headings = _headings(doc_path.read_text(encoding="utf-8"))
            for section in doc.get("requiredSections", []):
                if section not in headings:
                    errors.append(
                        f"{manifest_path}: missing heading '{section}' in {doc.get('path')}"
                    )

        for ref in manifest.get("references", []):
            if not (root_path / ref).exists():
                errors.append(f"{manifest_path}: missing reference {ref}")

        for output in manifest.get("outputs", []):
            fixture = output.get("fixture")
            if not fixture:
                continue
            fixture_path = root_path / fixture
            if not fixture_path.exists():
                errors.append(f"{manifest_path}: missing fixture {fixture}")
                continue
            headings = _headings(fixture_path.read_text(encoding="utf-8"))
            for section in output.get("requiredSections", []):
                if section not in headings:
                    errors.append(
                        f"{manifest_path}: missing heading '{section}' in {fixture}"
                    )

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
