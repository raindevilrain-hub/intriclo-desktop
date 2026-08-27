// Minimal self-check for widget-geometry.ts — no test framework, just
// assert(). Run with: npx esbuild --bundle --platform=node --format=cjs
// src/main/utils/widget-geometry.test.ts | node
import assert from 'assert'
import {
  expandBounds,
  collapseBounds,
  snapXToNearestEdge,
  defaultWidgetPosition,
  WIDGET_ICON_SIZE,
  WIDGET_PANEL_WIDTH,
  WIDGET_PANEL_HEIGHT,
  type Rect
} from './widget-geometry'

const primaryWorkArea: Rect = { x: 0, y: 0, width: 1920, height: 1080 }

// ── expandBounds / collapseBounds round-trip (bottom-right anchored) ──
const icon: Rect = { x: 1836, y: 996, width: WIDGET_ICON_SIZE, height: WIDGET_ICON_SIZE }
const panel = expandBounds(icon, primaryWorkArea)
assert.strictEqual(panel.width, WIDGET_PANEL_WIDTH)
assert.strictEqual(panel.height, WIDGET_PANEL_HEIGHT)
// bottom-right corner must stay fixed when growing
assert.strictEqual(panel.x + panel.width, icon.x + icon.width)
assert.strictEqual(panel.y + panel.height, icon.y + icon.height)

const backToIcon = collapseBounds(panel)
assert.deepStrictEqual(backToIcon, icon, 'expand→collapse must round-trip to the original icon rect')

// collapseBounds on an already icon-sized rect is a no-op (identity)
assert.deepStrictEqual(collapseBounds(icon), icon)

// ── expandBounds clamps to the work area near a screen edge ──
const iconNearTopLeft: Rect = { x: 0, y: 0, width: WIDGET_ICON_SIZE, height: WIDGET_ICON_SIZE }
const clampedPanel = expandBounds(iconNearTopLeft, primaryWorkArea)
assert.ok(clampedPanel.x >= primaryWorkArea.x, 'panel must not go off-screen left')
assert.ok(clampedPanel.y >= primaryWorkArea.y, 'panel must not go off-screen top')
assert.strictEqual(clampedPanel.x, primaryWorkArea.x)
assert.strictEqual(clampedPanel.y, primaryWorkArea.y)

// ── snapXToNearestEdge: left half → left edge, right half → right edge ──
assert.strictEqual(snapXToNearestEdge(10, WIDGET_ICON_SIZE, primaryWorkArea), primaryWorkArea.x)
assert.strictEqual(
  snapXToNearestEdge(1800, WIDGET_ICON_SIZE, primaryWorkArea),
  primaryWorkArea.x + primaryWorkArea.width - WIDGET_ICON_SIZE
)
// exact center counts as the right half (center < workAreaCenter is false at equality)
const centerX = primaryWorkArea.width / 2 - WIDGET_ICON_SIZE / 2
assert.strictEqual(
  snapXToNearestEdge(centerX, WIDGET_ICON_SIZE, primaryWorkArea),
  primaryWorkArea.x + primaryWorkArea.width - WIDGET_ICON_SIZE
)

// ── snapXToNearestEdge on a secondary monitor (non-zero-origin work area) ──
const secondMonitor: Rect = { x: 1920, y: 0, width: 1280, height: 800 }
assert.strictEqual(snapXToNearestEdge(1930, WIDGET_ICON_SIZE, secondMonitor), secondMonitor.x)
assert.strictEqual(
  snapXToNearestEdge(3100, WIDGET_ICON_SIZE, secondMonitor),
  secondMonitor.x + secondMonitor.width - WIDGET_ICON_SIZE
)

// ── defaultWidgetPosition sits inside the bottom-right of the work area ──
const def = defaultWidgetPosition(primaryWorkArea)
assert.ok(def.x + WIDGET_ICON_SIZE <= primaryWorkArea.x + primaryWorkArea.width)
assert.ok(def.y + WIDGET_ICON_SIZE <= primaryWorkArea.y + primaryWorkArea.height)

console.log('widget-geometry self-check: OK')
