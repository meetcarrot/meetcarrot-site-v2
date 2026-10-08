#!/usr/bin/env bash
# Run the CI checks (.github/workflows/ci.yml) locally, the way CI runs them:
# a fresh checkout of the committed HEAD, `npm ci`, then lint, type check and
# build. Uncommitted changes, .env files and a stale .next/ are not included,
# because CI doesn't have them either.
#
# Usage: npm run ci:local (also runs from the pre-push hook)
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

want_node="$(cat .nvmrc 2>/dev/null || echo 24)"
have_node="$(node -p 'process.versions.node.split(".")[0]')"
if [[ "$have_node" != "$want_node" ]]; then
  echo "ci-local: Node $have_node is active, but CI uses Node $want_node (.nvmrc)." >&2
  echo "ci-local: run 'nvm use' (or equivalent) first so the results match CI." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ci-local: note: uncommitted changes are not checked; CI only sees commits."
fi

workdir="$(mktemp -d "${TMPDIR:-/tmp}/ci-local.XXXXXX")"
cleanup() {
  git -C "$repo_root" worktree remove --force "$workdir" >/dev/null 2>&1 || true
  rm -rf "$workdir"
}
trap cleanup EXIT

echo "ci-local: checking out $(git rev-parse --short HEAD) into $workdir"
git worktree add --detach --quiet "$workdir" HEAD
cd "$workdir"

step() {
  echo
  echo "==> $*"
  "$@"
}

step npm ci
step npm run lint
step npm run typecheck
step npm run build

echo
echo "ci-local: all CI checks passed."
