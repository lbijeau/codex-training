#!/usr/bin/env python3
import argparse
import json
import subprocess

def main():
    parser = argparse.ArgumentParser(description='Run pytest suite or subset')
    parser.add_argument('--target', default=None, help='Path or test marker to run')
    args = parser.parse_args()
    cmd = ['pytest']
    if args.target:
        cmd.append(args.target)
    process = subprocess.run(cmd, capture_output=True, text=True)
    result = {
        'return_code': process.returncode,
        'stdout': process.stdout,
        'stderr': process.stderr
    }
    print(json.dumps(result))
    if process.returncode != 0:
        raise SystemExit(process.returncode)

if __name__ == '__main__':
    main()
