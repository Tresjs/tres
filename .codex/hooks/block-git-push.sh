#!/usr/bin/env bash
# Intercepts git push commands and requires explicit approval

python3 -c "
import sys, json
data = json.load(sys.stdin)
cmd = data.get('tool_input', {}).get('command', '')
if 'git push' in cmd:
    print('Git push intercepted - explicit approval required.', file=sys.stderr)
    sys.exit(2)
"
