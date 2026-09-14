FROM node:20-slim

# tini reaps zombie processes from the background `claude` sessions we spawn;
# jq parses `claude agents --json` in the health-check loop; git is required
# by Claude Code itself for repo-aware sessions.
RUN apt-get update && apt-get install -y --no-install-recommends \
      tini \
      jq \
      git \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app
COPY launch-session.sh supervisor.sh ./
RUN chmod +x launch-session.sh supervisor.sh

ENV HOME=/root

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["./supervisor.sh"]
