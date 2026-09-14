#!/bin/bash
# Container entrypoint. Launches every session in claude-sessions.conf
# (staggered, so ~20 sessions don't all hit the API in the same second and
# trip a rate limit), then loops forever re-running the same launch sweep.
#
# launch-session.sh is itself idempotent (see its header comment), so this
# loop doesn't need its own liveness bookkeeping — it just calls
# launch-session.sh for every configured line on every tick, and it no-ops
# for anything already alive.
#
# CHECK_INTERVAL default (5 min) is chosen to sit comfortably under Remote
# Control's ~30 min heartbeat timeout and ~4h reconnect window (see
# README.md) — a single missed tick still leaves multiple retries before a
# disconnected session's history would actually be at risk.
set -uo pipefail

CONF="${SESSIONS_CONF:-/app/claude-sessions.conf}"
LOG_DIR="${LOG_DIR:-/data/logs}"
CHECK_INTERVAL="${CHECK_INTERVAL:-300}"
STAGGER_SECONDS="${STAGGER_SECONDS:-20}"

mkdir -p "$LOG_DIR"

if [ ! -f "$CONF" ]; then
  echo "$(date -Is) FATAL: $CONF not found — copy claude-sessions.conf.example to claude-sessions.conf and fill it in" \
    | tee -a "$LOG_DIR/supervisor.log"
  exit 1
fi

sweep() {
  while IFS='|' read -r name project_dir uuid; do
    [[ "$name" =~ ^#.*$ || -z "$name" ]] && continue
    ./launch-session.sh "$name" "$project_dir" "$uuid"
    sleep "$STAGGER_SECONDS"
  done < "$CONF"
}

echo "$(date -Is) supervisor starting" >> "$LOG_DIR/supervisor.log"
sweep

while true; do
  sleep "$CHECK_INTERVAL"
  echo "$(date -Is) health-check sweep" >> "$LOG_DIR/supervisor.log"
  sweep
done
