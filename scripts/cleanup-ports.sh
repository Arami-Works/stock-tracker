#!/usr/bin/env bash

# stock-tracker — Kill dev processes and free ports
# Runs automatically after mprocs exits.

PORTS=(4010 4011 4012 8092 8093 8094 6006)

pkill -f "rover dev" 2>/dev/null && printf "\033[0;36m[cleanup]\033[0m Killed rover processes\n"
rm -f /tmp/supergraph-*.sock 2>/dev/null && printf "\033[0;36m[cleanup]\033[0m Removed rover session sockets\n"

for port in "${PORTS[@]}"; do
  pid=$(lsof -iTCP:"$port" -sTCP:LISTEN -P -t 2>/dev/null)
  if [[ -n "$pid" ]]; then
    printf "\033[0;36m[cleanup]\033[0m Killing port %s (pid %s)\n" "$port" "$pid"
    kill "$pid" 2>/dev/null || true
  fi
done

sleep 1

for port in "${PORTS[@]}"; do
  pid=$(lsof -iTCP:"$port" -sTCP:LISTEN -P -t 2>/dev/null)
  if [[ -n "$pid" ]]; then
    kill -9 "$pid" 2>/dev/null || true
  fi
done

printf "\033[0;36m[cleanup]\033[0m All dev ports cleared\n"
