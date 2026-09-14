#!/bin/bash
# Start or resume ONE managed Claude Code background session.
#
# Idempotent: if the session (identified by its permanent session_uuid) is
# already alive, this is a no-op. That's what lets supervisor.sh call this
# unconditionally on every health-check tick instead of tracking liveness
# itself.
#
# First launch vs. resume is decided by a marker file rather than by probing
# `claude --resume <uuid>` on an id that has never been used — that behavior
# isn't something we could verify against a live Remote Control connection
# from here, so we sidestep it: a session only ever gets `--resume`'d after
# we know (from having launched it ourselves) that a conversation exists
# under that id.
set -euo pipefail

name="$1"
project_dir="$2"
uuid="$3"

run_dir="${RUN_DIR:-/data/run}"
log_dir="${LOG_DIR:-/data/logs}"
mkdir -p "$run_dir" "$log_dir"

marker="$run_dir/$name.launched"
log_file="$log_dir/$name.log"

if [ ! -d "$project_dir" ]; then
  echo "$(date -Is) [$name] project dir not found: $project_dir" >> "$log_file"
  exit 1
fi

cd "$project_dir"

alive=$(claude agents --json --all 2>/dev/null \
  | jq --arg id "$uuid" 'any(.[]?; .sessionId == $id and .status != "exited")' 2>/dev/null)
alive="${alive:-false}"

if [ "$alive" = "true" ]; then
  echo "$(date -Is) [$name] already running ($uuid) — skip" >> "$log_file"
  exit 0
fi

if [ -f "$marker" ]; then
  echo "$(date -Is) [$name] not running — resuming ($uuid)" >> "$log_file"
  claude --resume "$uuid" --bg >> "$log_file" 2>&1
else
  echo "$(date -Is) [$name] first launch, enabling remote control ($uuid)" >> "$log_file"
  claude --remote-control "$name" --session-id "$uuid" --bg >> "$log_file" 2>&1
  touch "$marker"
fi
