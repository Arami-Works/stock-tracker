#!/usr/bin/env bash
set -euo pipefail

# stock-tracker — mprocs wrapper
# 1. Cleans up leftover processes/sockets from previous sessions
# 2. Builds shared packages so backend services can start
# 3. Launches mprocs
# 4. Cleans up on exit (quit, Ctrl+C, pane close)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cleanup() {
  "$SCRIPT_DIR/cleanup-ports.sh"
}

log() { printf "\033[0;36m[dev]\033[0m %s\n" "$*"; }

trap cleanup EXIT HUP INT TERM

cd "$REPO_ROOT"

log "Cleaning up previous session..."
cleanup

log "Building shared packages..."
npx turbo run build --filter='./packages/*' --log-prefix=none 2>&1 | tail -3

log "Starting mprocs..."
mprocs
