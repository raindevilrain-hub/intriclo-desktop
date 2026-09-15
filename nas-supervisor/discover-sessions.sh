#!/bin/bash
# One-time bootstrap: prints one project directory per line — most recently
# active project first — for every project this account has ever run Claude
# Code in. Redirect into claude-sessions.conf, then delete any lines for
# projects you don't want the supervisor to keep alive:
#
#   ./discover-sessions.sh > claude-sessions.conf
#
# Must run as (or with $HOME pointed at) the same account that actually runs
# your `claude --remote-control` sessions on this NAS — it reads straight
# out of that account's ~/.claude/projects, the same place `claude` itself
# stores every session transcript.
#
# Why this works without decoding anything: Claude Code names each project's
# folder by taking its working directory and turning every "/" into "-"
# (verified directly against this tool's own ~/.claude/projects layout — see
# README.md). Going that direction (path -> folder name) is what
# launch-session.sh needs and is unambiguous. Going backwards would not be,
# so this script sidesteps it entirely: it reads the original path straight
# out of the "cwd" field every session transcript already carries, instead
# of trying to reverse the folder name.
set -eu

base="${HOME}/.claude/projects"
if [ ! -d "$base" ]; then
  echo "$base not found — run this as the account whose \$HOME is used to launch claude on this NAS" >&2
  exit 1
fi

for dir in "$base"/*/; do
  latest=$(ls -t "$dir"*.jsonl 2>/dev/null | head -1) || true
  [ -z "${latest:-}" ] && continue
  cwd=$(grep -m1 -o '"cwd":"[^"]*"' "$latest" | sed -e 's/"cwd":"//' -e 's/"$//')
  [ -z "$cwd" ] && continue
  mtime=$(stat -c %Y "$latest" 2>/dev/null || stat -f %m "$latest" 2>/dev/null || echo 0)
  printf '%s\t%s\n' "$mtime" "$cwd"
done | sort -rn | cut -f2- | awk '!seen[$0]++'
