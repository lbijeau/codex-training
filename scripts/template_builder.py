#!/usr/bin/env python3
import argparse
from pathlib import Path

def render(template_path, replacements):
    text = Path(template_path).read_text()
    for key, value in replacements.items():
        text = text.replace(f"{{{{{key}}}}}", value)
    return text

def main():
    parser = argparse.ArgumentParser(description="Render a prompt template")
    parser.add_argument("template", help="Path to template file")
    parser.add_argument("--set", action="append", default=[], help="key=value replacements")
    parser.add_argument("--helpers", help="Comma-separated helper list", default="")
    parser.add_argument("--output", help="Path to write result")
    args = parser.parse_args()
    replacements = {k: v for pair in args.set for k, v in [pair.split("=", 1)]}
    rendered = render(args.template, replacements)
    header = "Available helpers: " + (args.helpers or "none")
    output = f"# Rendered template\n{header}\n\n{rendered}"
    if args.output:
        Path(args.output).write_text(output)
        print(f"Rendered template saved to {args.output}")
    else:
        print(output)

if __name__ == "__main__":
    main()
