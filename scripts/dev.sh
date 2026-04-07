#!/usr/bin/env bash
set -euo pipefail

# stock-tracker — Dev launcher
# Sets up a tmux session with:
#   top pane  (~70%): dashboard + logs
#   bottom pane (~30%): free (Claude Code, shell, etc.)
#
# Usage: ./scripts/dev.sh [--attach-only]
# Re-running attaches to the existing session if it's alive.

SESSION="stock-tracker-dev"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v tmux >/dev/null 2>&1; then
  echo "tmux not found. Install with: brew install tmux"
  exit 1
fi

# Attach if session already exists
if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "Attaching to existing session: $SESSION"
  exec tmux attach-session -t "$SESSION"
fi

if [[ "${1:-}" == "--attach-only" ]]; then
  echo "No session found. Run ./scripts/dev.sh to start one."
  exit 1
fi

# Create log directory
mkdir -p "$REPO_ROOT/logs"

# Create new session, start dashboard in top pane
tmux new-session -d -s "$SESSION" -x "$(tput cols)" -y "$(tput lines)"

# Set top pane to 70% height, run dashboard
tmux send-keys -t "$SESSION:0.0" "cd '$REPO_ROOT' && ./scripts/dashboard.sh" Enter

# Split horizontally — bottom pane gets remaining 30%
tmux split-window -t "$SESSION:0.0" -v -p 30

# Bottom pane: cd to repo root, ready for use
tmux send-keys -t "$SESSION:0.1" "cd '$REPO_ROOT'" Enter

# Focus bottom pane (where the user will type)
tmux select-pane -t "$SESSION:0.1"

exec tmux attach-session -t "$SESSION"
