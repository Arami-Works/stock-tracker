#!/usr/bin/env bash
# scripts/dev-dashboard.sh
# Launch a tmux dashboard with all local dev services.
#
# Usage:
#   ./scripts/dev-dashboard.sh             # native npm dev servers (default)
#   ./scripts/dev-dashboard.sh --docker    # backend via Docker Compose
#
# Layouts:
#
#   Native mode (5 panes):
#   ┌───────────────────────┬─────────────────────┐
#   │  📱 EXPO              │  📚 STORYBOOK        │
#   │  android · ios · web  │  port 6006           │
#   ├───────────────────────┼─────────────────────┤
#   │  🔌 API               │  🔗 SUBGRAPH         │
#   │  port 4000            │  port 4001           │
#   ├───────────────────────┴─────────────────────┤
#   │              🌐 ROUTER                       │
#   └─────────────────────────────────────────────┘
#
#   Docker mode (4 panes):
#   ┌───────────────────────┬─────────────────────┐
#   │  📱 EXPO              │  📚 STORYBOOK        │
#   │  android · ios · web  │  port 6006           │
#   ├───────────────────────┼─────────────────────┤
#   │  🐋 DOCKER            │  🌐 ROUTER           │
#   │  api:4000 · sub:4001  │                      │
#   └───────────────────────┴─────────────────────┘

set -euo pipefail

SESSION="stock-tracker"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCKER_MODE=false

for arg in "$@"; do
  [[ "$arg" == "--docker" ]] && DOCKER_MODE=true
done

# Check dependencies
if ! command -v tmux &>/dev/null; then
  echo "tmux is required — install with: brew install tmux" >&2
  exit 1
fi

if [[ "$DOCKER_MODE" == "true" ]] && ! command -v docker &>/dev/null; then
  echo "docker is required for --docker mode" >&2
  exit 1
fi

# Kill existing session if it exists
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Create new session, starting in the project root
tmux new-session -d -s "$SESSION" -n "dev" -c "$ROOT"

# Enable pane border titles
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format "#{?pane_active,#[bold fg=colour39],#[fg=colour240]} #{pane_title} #[default]"

# Helper: set title on the last-created (currently active) pane
set_title() {
  tmux select-pane -T "$1"
}

if [[ "$DOCKER_MODE" == "true" ]]; then
  # ── Docker mode: 2×2 grid ────────────────────────────────────────────────────
  # Step 1: Split window left / right
  # pane 0 = left, pane 1 = right
  tmux split-window -t "$SESSION:0.0" -h -p 45

  # Step 2: Split left column top / bottom → EXPO (top) + DOCKER (bottom)
  tmux select-pane -t "$SESSION:0.0"
  tmux split-window -t "$SESSION:0.0" -v -p 45
  # pane 0 = top-left (EXPO), pane 2 = bottom-left (DOCKER), pane 1 = right

  # Step 3: Split right column top / bottom → STORYBOOK (top) + ROUTER (bottom)
  tmux select-pane -t "$SESSION:0.1"
  tmux split-window -t "$SESSION:0.1" -v -p 45
  # pane 0 = EXPO, pane 2 = DOCKER, pane 1 = STORYBOOK, pane 3 = ROUTER

  # Send commands
  tmux select-pane -t "$SESSION:0.0"
  set_title "📱 EXPO  android · ios · web"
  tmux send-keys -t "$SESSION:0.0" "npm run dev:mobile" C-m

  tmux select-pane -t "$SESSION:0.1"
  set_title "📚 STORYBOOK  port 6006"
  tmux send-keys -t "$SESSION:0.1" "npm run dev:storybook" C-m

  tmux select-pane -t "$SESSION:0.2"
  set_title "🐋 DOCKER  api:4000 · subgraph:4001"
  tmux send-keys -t "$SESSION:0.2" "doppler run --config develop -- docker compose -f docker-compose.local.yml up --build" C-m

  tmux select-pane -t "$SESSION:0.3"
  set_title "🌐 ROUTER"
  tmux send-keys -t "$SESSION:0.3" "npm run dev:router" C-m

else
  # ── Native mode: 2×2 grid + full-width bottom row ────────────────────────────
  # Step 1: Reserve a full-width bottom strip for Router (20% of window height)
  tmux split-window -t "$SESSION:0.0" -v -p 20
  # pane 0 = top 80%, pane 1 = bottom 20% (ROUTER)

  # Step 2: Split the top area left / right
  tmux select-pane -t "$SESSION:0.0"
  tmux split-window -t "$SESSION:0.0" -h -p 45
  # pane 0 = top-left, pane 1 = bottom (ROUTER), pane 2 = top-right

  # Step 3: Split top-left into EXPO (top) + API (bottom)
  tmux select-pane -t "$SESSION:0.0"
  tmux split-window -t "$SESSION:0.0" -v -p 45
  # pane 0 = EXPO, pane 1 = ROUTER, pane 2 = top-right, pane 3 = API

  # Step 4: Split top-right into STORYBOOK (top) + SUBGRAPH (bottom)
  tmux select-pane -t "$SESSION:0.2"
  tmux split-window -t "$SESSION:0.2" -v -p 45
  # pane 0 = EXPO, pane 1 = ROUTER, pane 2 = STORYBOOK, pane 3 = API, pane 4 = SUBGRAPH

  # Send commands
  tmux select-pane -t "$SESSION:0.0"
  set_title "📱 EXPO  android · ios · web"
  tmux send-keys -t "$SESSION:0.0" "npm run dev:mobile" C-m

  tmux select-pane -t "$SESSION:0.2"
  set_title "📚 STORYBOOK  port 6006"
  tmux send-keys -t "$SESSION:0.2" "npm run dev:storybook" C-m

  tmux select-pane -t "$SESSION:0.3"
  set_title "🔌 API  port 4000"
  tmux send-keys -t "$SESSION:0.3" "npm run dev:api" C-m

  tmux select-pane -t "$SESSION:0.4"
  set_title "🔗 SUBGRAPH  port 4001"
  tmux send-keys -t "$SESSION:0.4" "npm run dev:subgraph" C-m

  tmux select-pane -t "$SESSION:0.1"
  set_title "🌐 ROUTER"
  tmux send-keys -t "$SESSION:0.1" "npm run dev:router" C-m
fi

# Focus Expo pane
tmux select-pane -t "$SESSION:0.0"

# Attach or switch to session
if [[ -n "${TMUX:-}" ]]; then
  tmux switch-client -t "$SESSION"
else
  tmux attach-session -t "$SESSION"
fi
