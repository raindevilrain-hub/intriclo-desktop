// ─── Floating Widget Geometry ───────────────────────────
// Pure, Electron-free helpers for the floating widget window (icon ⇄ panel
// size/position transitions and edge-snapping). Kept dependency-free so they
// can be unit-tested with plain `node` — see widget-geometry.test.ts.

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export const WIDGET_ICON_SIZE = 64
export const WIDGET_PANEL_WIDTH = 360
export const WIDGET_PANEL_HEIGHT = 520
export const WIDGET_EDGE_MARGIN = 20

/**
 * Expands an icon-sized rect into the panel-sized rect, anchored on the
 * icon's bottom-right corner (like a chat widget growing up-and-left).
 * When `workArea` is given, the result is clamped so the panel stays fully
 * on-screen (relevant when the icon is docked near a screen edge).
 */
export function expandBounds(iconBounds: Rect, workArea?: Rect): Rect {
  const right = iconBounds.x + iconBounds.width
  const bottom = iconBounds.y + iconBounds.height
  let x = right - WIDGET_PANEL_WIDTH
  let y = bottom - WIDGET_PANEL_HEIGHT
  if (workArea) {
    x = Math.min(Math.max(x, workArea.x), workArea.x + workArea.width - WIDGET_PANEL_WIDTH)
    y = Math.min(Math.max(y, workArea.y), workArea.y + workArea.height - WIDGET_PANEL_HEIGHT)
  }
  return { x, y, width: WIDGET_PANEL_WIDTH, height: WIDGET_PANEL_HEIGHT }
}

/**
 * Collapses any rect back to icon size, anchored on its bottom-right corner.
 * Applying this to an already icon-sized rect is a no-op (identity) — this
 * lets callers use it unconditionally to derive the "docked" icon position
 * regardless of whether the widget is currently expanded or collapsed.
 */
export function collapseBounds(bounds: Rect): Rect {
  const right = bounds.x + bounds.width
  const bottom = bounds.y + bounds.height
  return {
    x: right - WIDGET_ICON_SIZE,
    y: bottom - WIDGET_ICON_SIZE,
    width: WIDGET_ICON_SIZE,
    height: WIDGET_ICON_SIZE
  }
}

/**
 * Snaps a window's x-coordinate to the nearest horizontal edge (left/right)
 * of the given work area, based on which half the window's center currently
 * falls in. Y is intentionally left untouched by design (only horizontal
 * snapping is requested).
 */
export function snapXToNearestEdge(winX: number, winWidth: number, workArea: Rect): number {
  const centerX = winX + winWidth / 2
  const workAreaCenterX = workArea.x + workArea.width / 2
  return centerX < workAreaCenterX ? workArea.x : workArea.x + workArea.width - winWidth
}

/** Default docked position: bottom-right corner of the given work area. */
export function defaultWidgetPosition(workArea: Rect): { x: number; y: number } {
  return {
    x: workArea.x + workArea.width - WIDGET_ICON_SIZE - WIDGET_EDGE_MARGIN,
    y: workArea.y + workArea.height - WIDGET_ICON_SIZE - WIDGET_EDGE_MARGIN
  }
}
