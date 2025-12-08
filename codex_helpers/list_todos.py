#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

def capture_todos(paths):
    todos = []
    for path_str in paths:
        for path in Path('.').glob(path_str):
            if not path.is_file():
                continue
            for lineno, line in enumerate(path.read_text().splitlines(), start=1):
                if 'TODO' in line:
                    todos.append({
                        'path': str(path),
                        'line': lineno,
                        'text': line.strip()
                    })
    return todos

def main():
    parser = argparse.ArgumentParser(description='List TODO comments')
    parser.add_argument('--paths', nargs='+', required=True, help='File globs to search')
    args = parser.parse_args()
    todos = capture_todos(args.paths)
    print(json.dumps({'todos': todos}, ensure_ascii=False))

if __name__ == '__main__':
    main()
