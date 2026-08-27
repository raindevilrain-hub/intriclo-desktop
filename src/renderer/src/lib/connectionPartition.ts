// AI 챗봇(default-nas) / Mail Assistant / Slack DM connections all log in
// through the same company Slack OIDC app. Giving their webviews the same
// Electron session partition means slack.com's login cookie is shared
// between them — log into Slack once in any of the three and the others
// pick up the same session (auto-login or a single approve click) instead
// of asking to log in again. Every other (custom, user-added) connection
// keeps its own isolated partition, unchanged.
const SHARED_PARTITION = 'persist:intriclo-shared'

// Fixed ids for the two default connections shipped in DEFAULT_CONFIG.
const SHARED_IDS = new Set(['default-nas', 'default-mail-assistant'])

// Mail Assistant / Slack connections added later via Settings get a random
// id (crypto.randomUUID()), so fall back to matching the exact name used
// when Settings > Connections creates them (see Settings/Connections.svelte).
const SHARED_NAMES = new Set(['Mail Assistant', 'Slack'])

export const getConnectionPartition = (id: string, name?: string | null): string =>
  SHARED_IDS.has(id) || (!!name && SHARED_NAMES.has(name)) ? SHARED_PARTITION : `persist:connection-${id}`
