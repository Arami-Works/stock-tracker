#!/usr/bin/env bash
set -euo pipefail

# stock-tracker — Service launcher
# Starts dev services in the background with Doppler env injection
# and pipes output to logs/*.log so the dashboard can tail them.
#
# Usage:
#   ./scripts/start.sh api            # tRPC service
#   ./scripts/start.sh subgraph       # Apollo subgraph
#   ./scripts/start.sh router         # Apollo Router (rover dev)
#   ./scripts/start.sh mobile         # Expo dev server
#   ./scripts/start.sh storybook      # Storybook web
#   ./scripts/start.sh backend        # api + subgraph + router
#   ./scripts/start.sh all            # Everything
#   ./scripts/start.sh stop           # Kill all managed services

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOGS_DIR="$REPO_ROOT/logs"
PIDS_DIR="$REPO_ROOT/logs/pids"
DOPPLER="doppler run --project stock-tracker --config local --"

mkdir -p "$LOGS_DIR" "$PIDS_DIR"

log() { printf "\033[0;36m[start]\033[0m %s\n" "$*"; }
err() { printf "\033[0;31m[start]\033[0m %s\n" "$*" >&2; }

start_service() {
  local name="$1"
  local cmd="$2"
  local logfile="$LOGS_DIR/${name}.log"
  local pidfile="$PIDS_DIR/${name}.pid"

  if [[ -f "$pidfile" ]]; then
    local existing_pid
    existing_pid=$(cat "$pidfile")
    if kill -0 "$existing_pid" 2>/dev/null; then
      log "$name already running (pid $existing_pid)"
      return
    fi
    rm -f "$pidfile"
  fi

  log "Starting $name → logs/${name}.log"
  : > "$logfile"
  bash -c "cd '$REPO_ROOT' && $cmd" >> "$logfile" 2>&1 &
  echo $! > "$pidfile"
  log "$name started (pid $!)"
}

stop_service() {
  local name="$1"
  local pidfile="$PIDS_DIR/${name}.pid"

  if [[ ! -f "$pidfile" ]]; then
    return
  fi

  local pid
  pid=$(cat "$pidfile")
  if kill -0 "$pid" 2>/dev/null; then
    log "Stopping $name (pid $pid)"
    kill "$pid" 2>/dev/null || true
    sleep 1
    kill -9 "$pid" 2>/dev/null || true
  fi
  rm -f "$pidfile"
}

ALL_SERVICES="api subgraph router mobile storybook"

cmd="${1:-all}"

case "$cmd" in
  api)
    start_service "api" "$DOPPLER npm run dev:api"
    ;;
  subgraph)
    start_service "subgraph" "$DOPPLER npm run dev:subgraph"
    ;;
  router)
    start_service "router" "$DOPPLER npm run dev:router"
    ;;
  mobile)
    start_service "mobile" "$DOPPLER npm run dev:mobile"
    ;;
  storybook)
    start_service "storybook" "$DOPPLER npm run dev:storybook"
    ;;
  backend)
    start_service "api" "$DOPPLER npm run dev:api"
    start_service "subgraph" "$DOPPLER npm run dev:subgraph"
    start_service "router" "$DOPPLER npm run dev:router"
    ;;
  all)
    start_service "api" "$DOPPLER npm run dev:api"
    start_service "subgraph" "$DOPPLER npm run dev:subgraph"
    start_service "router" "$DOPPLER npm run dev:router"
    start_service "mobile" "$DOPPLER npm run dev:mobile"
    start_service "storybook" "$DOPPLER npm run dev:storybook"
    ;;
  stop)
    for svc in $ALL_SERVICES; do
      stop_service "$svc"
    done
    log "All services stopped"
    ;;
  *)
    err "Unknown command: $cmd"
    echo "Usage: $0 [api|subgraph|router|mobile|storybook|backend|all|stop]"
    exit 1
    ;;
esac
