---
name: lint-commit-pr
description: Lint local changes, auto-fix, conventional commit, and optionally create PR
---

# Lint, Commit and Create PR

Lint local changes, auto-fix issues, generate conventional commit message based on monorepo changes, and optionally create a PR.

**Parameters**: `$ARGUMENTS`
- `pr` - Force create PR even if one exists
- `no-pr` - Skip PR creation, only commit and push
- `pr-only` - Only create/update PR, skip lint and commit steps
- If no parameter provided, auto-detect if PR exists

## Steps

1. **Handle `pr-only` mode** (if specified):
   - Skip to step 11 (PR creation/update)
   - Use existing commits for PR description

2. **Check git status** to identify modified files and ensure there are changes to commit

3. **Run linter with auto-fix on affected projects only**:
   - Run `pnpm nx affected -t lint --fix` to lint only projects with changes
   - This uses NX's affected graph to skip unchanged projects

4. **Verify lint passed** - if there are remaining lint errors that couldn't be auto-fixed, report them and stop

5. **Stage all changes** using `git add -A` to ensure all modifications (including lint fixes) are staged

6. **Analyze the changes**:
   - Use `git diff --staged` to review all staged modifications
   - Identify which workspace(s) were affected (packages/*, apps/*, tools/*)
   - Determine the type of change (feat, fix, chore, docs, refactor, test, style, perf)

7. **Generate conventional commit message** following this format:
   - `<type>(<scope>): <description>` where scope is the package/app name
   - Examples:
     - `fix(core): resolve memory leak in dispose method`
     - `feat(cientos): add new OrbitControls component`
     - `docs(playground): update examples with new API`
     - `chore(docs): update navigation structure`
   - If changes span multiple packages, use the primary affected package or use `monorepo`
   - Keep description concise and in imperative mood

8. **Show the commit message** to the user and ask for confirmation

9. **Commit** the staged changes with the approved message

10. **Push to remote** using `git push -u origin HEAD`

11. **Handle PR creation** based on parameter:
    - If `no-pr` parameter: Stop here, changes are pushed
    - Otherwise, check if PR exists using `gh pr view` (will fail if no PR exists)
    - If PR exists and no `pr` parameter: Skip PR creation, inform user PR will auto-update
    - If no PR exists OR `pr` parameter provided: Create PR using `gh pr create` with:
      - Title: same as commit message (or summarize recent commits if `pr-only` mode)
      - Body: A structured summary including:
        - ## Summary: bullet points of what changed
        - ## Changes: list of modified files/areas
        - ## Test plan: how to verify the changes work

## Examples

```bash
# Auto-detect (default behavior)
/lint-commit-pr
# Lints, commits, pushes
# Checks if PR exists with: gh pr view
# If PR exists: "✓ Changes pushed. Existing PR will update automatically"
# If no PR: Creates new PR

# Skip PR creation
/lint-commit-pr no-pr

# Force create PR
/lint-commit-pr pr

# Update existing PR only (skip lint/commit)
/lint-commit-pr pr-only
```

## Commit Message Examples

```
# Single package fix
packages/core/src/useRenderer.ts modified
→ fix(core): prevent renderer disposal on component unmount

# Feature in cientos
packages/cientos/src/components/Stars.vue added
→ feat(cientos): add Stars component for particle effects

# Documentation update
apps/docs/content/guide/getting-started.md modified
→ docs(docs): clarify installation instructions

# Multiple packages
packages/core and packages/cientos modified
→ feat(monorepo): add shared composable for camera controls
```

## Considerations

- Always run `pnpm nx affected -t lint --fix` before committing
- Never commit if there are unfixable lint errors
- Use conventional commit types: feat, fix, chore, docs, refactor, test, style, perf, ci
- Scope should match package/app name from package.json (e.g., `core`, `cientos`, `docs`)
- Commit description: concise, imperative mood, lowercase
- Always ask for user confirmation before committing and pushing
- Use `-u` flag for first-time pushes
- Use `gh pr view` to check if PR exists (exit code 0 = exists)
- If PR exists, inform: "✓ Changes pushed. Existing PR #{number} will update automatically: {url}"
