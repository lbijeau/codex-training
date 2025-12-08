#!/usr/bin/env python3
import argparse
import sys
import pathlib
import json

def read_input(path):
    if path:
        return pathlib.Path(path).read_text().splitlines()
    return [line.rstrip('\n') for line in sys.stdin]

def check_lines(lines):
    warnings = []
    for line in lines:
        if 'rm -rf' in line:
            warnings.append({'level': 'error', 'message': 'Avoid rm -rf operations', 'detail': line})
        if line.strip().startswith('/') and not line.strip().startswith('/Users/'):
            warnings.append({'level': 'warning', 'message': 'Editing system path', 'detail': line})
    return warnings

def main():
    parser = argparse.ArgumentParser(description='Validate proposed edit ranges')
    parser.add_argument('--diff-file', help='Path to a diff or snippet'),
    args = parser.parse_args()
    lines = read_input(args.diff_file)
    warnings = check_lines(lines)
    print(json.dumps({'warnings': warnings}, ensure_ascii=False, indent=2))
    if any(w['level'] == 'error' for w in warnings):
        sys.exit(1)

if __name__ == '__main__':
    main()
