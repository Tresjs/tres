#!/usr/bin/env bash
# Runs lint:fix and typecheck (if available) for the package containing the edited file

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data.get('tool_input', {}).get('file_path', ''))
" 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only run for TS/Vue/JS files
case "$FILE_PATH" in
  *.ts|*.tsx|*.vue|*.js|*.jsx) ;;
  *) exit 0 ;;
esac

# Find nearest package.json directory
DIR=$(dirname "$FILE_PATH")
PACKAGE_DIR=""
while [ "$DIR" != "/" ]; do
  if [ -f "$DIR/package.json" ]; then
    PACKAGE_DIR="$DIR"
    break
  fi
  DIR=$(dirname "$DIR")
done

if [ -z "$PACKAGE_DIR" ]; then
  exit 0
fi

cd "$PACKAGE_DIR" || exit 0

# Run lint:fix if script exists
HAS_LINT_FIX=$(node -e "const p=require('./package.json'); console.log(p.scripts?.['lint:fix'] ? 'yes' : 'no')" 2>/dev/null)
if [ "$HAS_LINT_FIX" = "yes" ]; then
  echo "Running lint:fix in $PACKAGE_DIR..."
  pnpm lint:fix 2>&1
fi

# Run typecheck if script exists
HAS_TYPECHECK=$(node -e "const p=require('./package.json'); console.log(p.scripts?.['typecheck'] ? 'yes' : 'no')" 2>/dev/null)
if [ "$HAS_TYPECHECK" = "yes" ]; then
  echo "Running typecheck in $PACKAGE_DIR..."
  pnpm typecheck 2>&1
fi

echo "✅ lint-and-typecheck hook completed for $FILE_PATH" >&2
exit 0
