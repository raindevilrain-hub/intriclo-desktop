#!/bin/bash
# Resume ONE project's most recent Claude Code session if it isn't currently
# running. Never starts a session that never existed — a project only
# becomes "managed" here after a human has run `claude --remote-control` (or
# plain `claude`) in it at least once; this script's only job is noticing
# that conversation died and reviving it, never inventing a new one.
#
# How it finds "the session for this project": Claude Code stores every
# session at ~/.claude/projects/<project_dir, slashes turned into dashes>/
# <session-id>.jsonl. That encoding is verified against this very tool's own
# project storage (see README.md), so recomputing it here from a known
# project_dir is exact — no session ID needs to be hardcoded anywhere.
# Picking the most-recently-modified .jsonl in that folder is "whichever
# conversation is currently in progress" for this project.
#
# Idempotent: if the session is already alive, this is a no-op. That's what
# lets supervisor.sh call this unconditionally on every health-check tick
# instead of tracking liveness itself.
set -euo pipefail

project_dir="$1"

log_dir="${LOG_DIR:-/data/logs}"
mkdir -p "$log_dir"

name="$(basename "$project_dir")"
log_file="$log_dir/$name.log"

if [ ! -d "$project_dir" ]; then
  echo "$(date -Is) [$name] project dir not found: $project_dir" >> "$log_file"
  exit 1
fi

encoded="$(echo "$project_dir" | sed 's/\//-/g')"
claude_project_dir="$HOME/.claude/projects/$encoded"

latest_jsonl="$(ls -t "$claude_project_dir"/*.jsonl 2>/dev/null | head -1 || true)"
if [ -z "$latest_jsonl" ]; then
  echo "$(date -Is) [$name] no existing session under $claude_project_dir — run 'claude --remote-control' here once by hand first, then the supervisor takes over" >> "$log_file"
  exit 0
fi

session_id="$(basename "$latest_jsonl" .jsonl)"

alive=$(claude agents --json --all 2>/dev/null \
  | jq --arg id "$session_id" 'any(.[]?; .sessionId == $id and .status != "exited")' 2>/dev/null)
alive="${alive:-false}"

if [ "$alive" = "true" ]; then
  echo "$(date -Is) [$name] already running ($session_id) — skip" >> "$log_file"
  exit 0
fi

echo "$(date -Is) [$name] not running — resuming ($session_id)" >> "$log_file"
cd "$project_dir"
claude --resume "$session_id" --bg >> "$log_file" 2>&1
