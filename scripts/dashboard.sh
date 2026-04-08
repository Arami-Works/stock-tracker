#!/usr/bin/env bash
set -euo pipefail

# stock-tracker — Local Dev Dashboard
# Shows live status of dev services, connected devices, running processes, and service logs.
# Usage: ./scripts/dashboard.sh [--once]

INTERVAL=5
ONCE=false
[[ "${1:-}" == "--once" ]] && ONCE=true

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
DIM='\033[2m'
BOLD='\033[1m'
RESET='\033[0m'

check_port() {
  lsof -iTCP:"$1" -sTCP:LISTEN -P >/dev/null 2>&1
}

check_process() {
  pgrep -f "$1" >/dev/null 2>&1
}

status_dot() {
  if "$1"; then
    printf "${GREEN}●${RESET}"
  else
    printf "${DIM}○${RESET}"
  fi
}

render() {
  clear
  printf "${BOLD}stock-tracker — Local Dev Dashboard${RESET}\n"
  printf "${DIM}%s · refreshing every %ds${RESET}\n\n" "$(date '+%H:%M:%S')" "$INTERVAL"

  # --- Services ---
  printf "${CYAN}Services${RESET}\n"

  local api_running=false subgraph_running=false router_running=false ios_running=false android_running=false web_running=false storybook_running=false
  check_port 4010 && api_running=true
  check_port 4011 && subgraph_running=true
  check_port 4012 && router_running=true
  check_port 8092 && ios_running=true
  check_port 8093 && android_running=true
  check_port 8094 && web_running=true
  check_port 6006 && storybook_running=true

  printf "  %s  tRPC API               %s\n" "$(status_dot $api_running)" "$( $api_running && echo ':4010' || echo '--' )"
  printf "  %s  Subgraph (tracker)     %s\n" "$(status_dot $subgraph_running)" "$( $subgraph_running && echo ':4011' || echo '--' )"
  printf "  %s  Apollo Router          %s\n" "$(status_dot $router_running)" "$( $router_running && echo ':4012' || echo '--' )"
  printf "  %s  Expo iOS               %s\n" "$(status_dot $ios_running)" "$( $ios_running && echo ':8092' || echo '--' )"
  printf "  %s  Expo Android           %s\n" "$(status_dot $android_running)" "$( $android_running && echo ':8093' || echo '--' )"
  printf "  %s  Expo Web               %s\n" "$(status_dot $web_running)" "$( $web_running && echo ':8094' || echo '--' )"
  printf "  %s  Storybook              %s\n" "$(status_dot $storybook_running)" "$( $storybook_running && echo ':6006' || echo '--' )"
  echo

  # --- Devices ---
  printf "${CYAN}Devices${RESET}\n"

  # Android
  if command -v adb >/dev/null 2>&1; then
    local android_devices
    android_devices=$(adb devices 2>/dev/null | tail -n +2 | grep -w "device" || true)
    if [[ -n "$android_devices" ]]; then
      while IFS= read -r line; do
        local serial model
        serial=$(echo "$line" | awk '{print $1}')
        model=$(adb -s "$serial" shell getprop ro.product.model 2>/dev/null || echo "$serial")
        printf "  ${GREEN}●${RESET}  Android  %s\n" "$model"
      done <<< "$android_devices"
    else
      printf "  ${DIM}○${RESET}  Android  ${DIM}no device${RESET}\n"
    fi
  else
    printf "  ${YELLOW}○${RESET}  Android  ${DIM}adb not found${RESET}\n"
  fi

  # iOS
  if command -v xcrun >/dev/null 2>&1; then
    local ios_devices
    ios_devices=$(xcrun xctrace list devices 2>/dev/null | sed -n '/== Devices ==/,/== Simulators ==/p' | grep -v "^==" | grep -v "^$" || true)
    local physical_count=0
    if [[ -n "$ios_devices" ]]; then
      while IFS= read -r line; do
        [[ -z "$line" ]] && continue
        if echo "$line" | grep -qi "mac\|macbook\|mac studio\|mac mini\|mac pro\|iMac"; then
          continue
        fi
        printf "  ${GREEN}●${RESET}  iOS      %s\n" "$(echo "$line" | sed 's/ ([A-F0-9-]*)$//')"
        physical_count=$((physical_count + 1))
      done <<< "$ios_devices"
    fi
    if [[ $physical_count -eq 0 ]]; then
      printf "  ${DIM}○${RESET}  iOS      ${DIM}no device${RESET}\n"
    fi
  else
    printf "  ${YELLOW}○${RESET}  iOS      ${DIM}xcrun not found${RESET}\n"
  fi
  echo

  # --- Processes ---
  printf "${CYAN}Processes${RESET}\n"

  local jest_running=false maestro_running=false lint_running=false tsc_running=false
  check_process "jest.*stock-tracker" && jest_running=true
  check_process "maestro" && maestro_running=true
  check_process "eslint" && lint_running=true
  check_process "tsc.*noEmit" && tsc_running=true

  printf "  %s  Jest                   %s\n" "$(status_dot $jest_running)" "$( $jest_running && echo 'running' || echo '--' )"
  printf "  %s  Maestro E2E            %s\n" "$(status_dot $maestro_running)" "$( $maestro_running && echo 'running' || echo '--' )"
  printf "  %s  ESLint                 %s\n" "$(status_dot $lint_running)" "$( $lint_running && echo 'running' || echo '--' )"
  printf "  %s  TypeScript             %s\n" "$(status_dot $tsc_running)" "$( $tsc_running && echo 'running' || echo '--' )"
  echo

  # --- Logs ---
  local script_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  local logs_dir
  logs_dir="$(cd "$script_dir/.." && pwd)/logs"

  printf "${CYAN}Logs${RESET}\n"

  local has_logs=false
  for logfile in api subgraph router ios android web storybook; do
    local path="$logs_dir/${logfile}.log"
    if [[ -f "$path" ]]; then
      has_logs=true
      printf "  ${DIM}── %s ──${RESET}\n" "$logfile"
      tail -n 4 "$path" 2>/dev/null | while IFS= read -r line; do
        printf "  ${DIM}%s${RESET}\n" "$line"
      done
    fi
  done

  if ! $has_logs; then
    printf "  ${DIM}No logs yet — run ./scripts/start.sh to capture service output${RESET}\n"
  fi
  echo

  printf "${DIM}Press Ctrl+C to exit${RESET}\n"
}

if $ONCE; then
  render
  exit 0
fi

trap 'printf "\n"; exit 0' INT TERM
while true; do
  render
  sleep "$INTERVAL"
done
