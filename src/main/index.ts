// @ts-nocheck

import {
  app,
  shell,
  session,
  clipboard,
  nativeImage,
  desktopCapturer,
  systemPreferences,
  BrowserWindow,
  globalShortcut,
  MessageChannelMain,
  Notification,
  Menu,
  ipcMain,
  Tray,
  dialog,
  safeStorage
} from 'electron'
import path, { join } from 'path'
import { readFile, writeFile, unlink, statfs } from 'fs/promises'

import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import {
  getLogFilePath,
  checkUrlAndOpen,
  clearAllServerLogs,
  getConfig,
  getUserDataPath,
  getInstallDir,
  getServerLog,
  getServerPIDs,
  getServerPty,
  installPackage,
  installPython,
  isPackageInstalled,
  isPythonInstalled,
  getPackageVersion,
  uninstallPackage,
  isUvInstalled,
  openUrl,
  resetApp,
  resolveNasHost,
  setConfig,
  startServer,
  stopAllServers,
  uninstallPython,
  validateRemoteUrl,
  isPrivateHost,
  isPrivateUrl,
  type AppConfig,
  type Connection
} from './utils'

import {
  expandBounds,
  collapseBounds,
  snapXToNearestEdge,
  defaultWidgetPosition,
  WIDGET_ICON_SIZE
} from './utils/widget-geometry'

import {
  startOpenTerminal,
  stopOpenTerminal,
  getOpenTerminalInfo,
  getOpenTerminalPty,
  getOpenTerminalLog,
  validateOpenTerminalProcess
} from './utils/open-terminal'

import {
  setupLlamaCpp,
  startLlamaCpp,
  stopLlamaCpp,
  getLlamaCppInfo,
  getLlamaCppLog,
  getLlamaCppPty,
  validateLlamaCppProcess,
  checkLlamaCppUpdate,
  updateLlamaCpp,
  uninstallLlamaCpp
} from './utils/llamacpp'

import {
  listModels,
  downloadModel,
  deleteModel,
  cancelDownload,
  getModelsDir,
  searchModels,
  getRepoFiles
} from './utils/huggingface'

import { initUpdater, checkForUpdates, downloadUpdate, installUpdate } from './updater'

import log from 'electron-log'
log.transports.file.resolvePathFn = () => getLogFilePath('main')

import icon from '../../resources/icon.png?asset'

import { existsSync, writeFileSync, unlinkSync } from 'fs'

if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox')

  // Work around /dev/shm access failures in AppImage and other containerised
  // environments.  AppImage's FUSE mount can restrict child-process access to
  // /dev/shm even when --no-sandbox is set, causing FATAL crashes in the
  // Chromium zygote/renderer with "Unable to access(W_OK|X_OK) /dev/shm".
  // This flag tells Chromium to use /tmp for shared memory instead (#136).
  app.commandLine.appendSwitch('disable-dev-shm-usage')

  // Use the native Wayland backend when available instead of XWayland.
  // This is required for xdg-desktop-portal features like GlobalShortcuts
  // to work (the portal is enabled by default in Chromium 134+ / Electron 33+).
  app.commandLine.appendSwitch('ozone-platform-hint', 'auto')

  // Force software GL rendering via SwiftShader.  The out-of-process GPU
  // crashes on Ubuntu 24.04+, certain Wayland compositors, and AppArmor-
  // restricted environments due to shared-memory allocation failures in
  // /dev/shm or /tmp (#119, #157).
  //
  // --disable-gpu kills the display compositor so <webview> guest surfaces
  // are never painted (#178).  --in-process-gpu breaks <webview> guest
  // compositing entirely (blank webviews on all Linux).
  //
  // SwiftShader keeps the GPU process out-of-process (required for
  // <webview> compositing) while using software rendering to avoid
  // driver-level crashes.
  app.commandLine.appendSwitch('use-gl', 'angle')
  app.commandLine.appendSwitch('use-angle', 'swiftshader')

  // Disable the GPU sandbox — the sandbox setup triggers shared-memory
  // allocation failures in /dev/shm.  The browser process is already
  // un-sandboxed (--no-sandbox above).
  app.commandLine.appendSwitch('disable-gpu-sandbox')
}

// ─── GPU Crash Recovery ─────────────────────────────────
// When the GPU process crashes fatally (common on certain NVIDIA/Intel
// driver + Windows combos), we write a marker file and relaunch with
// --disable-gpu-sandbox so the user doesn't have to manually edit
// shortcut properties. On the next launch the marker is detected and
// the switch is applied preemptively.

const gpuCrashMarkerPath = join(app.getPath('userData'), '.gpu-sandbox-disabled')
const gpuSandboxDisabled = existsSync(gpuCrashMarkerPath)

if (gpuSandboxDisabled) {
  log.info('GPU sandbox disabled due to previous GPU process crash')
  app.commandLine.appendSwitch('disable-gpu-sandbox')
}

// Prevent Chromium from permanently blocking WebGL / 3-D APIs after
// repeated GPU process crashes within the same session.
app.disableDomainBlockingFor3DAPIs()

// ─── State ──────────────────────────────────────────────

let mainWindow: BrowserWindow | null = null
let contentWindow: BrowserWindow | null = null
let spotlightWindow: BrowserWindow | null = null
let voiceInputWindow: BrowserWindow | null = null
let widgetWindow: BrowserWindow | null = null
let widgetExpanded = false
let tray: Tray | null = null
let isQuiting = false

let CONFIG: AppConfig | null = null
let SERVER_URL: string | null = null
let SERVER_STATUS: string | null = null
let SERVER_REACHABLE = false
let SERVER_PID: number | null = null
let AUTH_TOKEN: string | null = null
let voiceInputRecording = false

// ─── Global Shortcuts ───────────────────────────────────

/**
 * Check whether the current environment supports Electron's globalShortcut
 * API.  Since Chromium 134+ (Electron 33+) the GlobalShortcutsPortal
 * feature is enabled by default, which lets `globalShortcut.register()`
 * work transparently on Wayland via `xdg-desktop-portal`.  Combined with
 * `--ozone-platform-hint=auto` (set above for Linux), shortcuts should
 * "just work" on most modern desktops.
 *
 * We only bail out when we can positively detect an environment where
 * neither X11 key-grabs nor the portal will succeed (e.g. an older
 * Flatpak base app that doesn't expose the portal D-Bus name).
 */
function isGlobalShortcutSupported(): boolean {
  if (process.platform !== 'linux') return true

  // On Wayland the portal handles registration.  On X11 the classic
  // key-grab path is used.  Both should work, so we optimistically
  // return true and let tryRegisterShortcut surface per-shortcut
  // failures via notifications.
  return true
}

/**
 * Try to register a single global shortcut.  Returns true on success.
 * On failure a user-facing notification is shown (unless `silent` is set).
 */
function tryRegisterShortcut(
  accel: string,
  label: string,
  callback: () => void,
  silent = false
): boolean {
  try {
    const ok = globalShortcut.register(accel, callback)
    if (ok) {
      log.info(`${label} shortcut "${accel}" registered`)
      return true
    }
    log.warn(`${label} shortcut "${accel}" could not be registered (returned false)`)
    if (!silent) {
      new Notification({
        title: label,
        body: `Could not register shortcut "${accel}". It may be in use by another application.`
      }).show()
    }
    return false
  } catch (error) {
    log.warn(`${label} shortcut "${accel}" registration threw:`, error)
    if (!silent) {
      new Notification({
        title: label,
        body: `Failed to register shortcut "${accel}". It may conflict with another application.`
      }).show()
    }
    return false
  }
}

const registerShortcuts = (globalAccel?: string, spotlightAccel?: string, voiceInputAccel?: string, callAccel?: string): void => {
  globalShortcut.unregisterAll()

  // On Wayland / Flatpak global shortcuts are unsupported — skip silently.
  if (!isGlobalShortcutSupported()) {
    log.info(
      'Global shortcut registration skipped — unsupported environment ' +
      `(XDG_SESSION_TYPE=${process.env['XDG_SESSION_TYPE'] ?? '(unset)'}, ` +
      `FLATPAK_ID=${process.env['FLATPAK_ID'] ?? '(unset)'})`
    )
    return
  }

  // Global shortcut – bring main window to foreground
  if (globalAccel) {
    tryRegisterShortcut(globalAccel, '인트리클로 AI', () => {
      if (mainWindow) {
        mainWindow.show()
        mainWindow.focus()
      } else {
        createMainWindow()
      }
    })
  }

  // Spotlight shortcut – toggle the spotlight input bar
  if (spotlightAccel) {
    tryRegisterShortcut(spotlightAccel, 'Spotlight', () => {
      const text = CONFIG?.spotlightClipboardPaste !== false
        ? (clipboard.readText()?.trim() || '')
        : ''
      toggleSpotlight(text)
    })
  }

  // Voice input shortcut – toggle microphone recording
  if (voiceInputAccel && CONFIG?.voiceInputEnabled !== false) {
    tryRegisterShortcut(voiceInputAccel, 'Voice Input', () => {
      toggleVoiceInput()
    })
  } else {
    log.info(`Voice input shortcut skipped — accel="${voiceInputAccel}", enabled=${CONFIG?.voiceInputEnabled}`)
  }

  // Call shortcut – open the voice/video call overlay
  if (callAccel && CONFIG?.callEnabled !== false) {
    tryRegisterShortcut(callAccel, 'Call', () => {
      toggleCall()
    })
  } else {
    log.info(`Call shortcut skipped — accel="${callAccel}", enabled=${CONFIG?.callEnabled}`)
  }
}

// ─── Spotlight Window ───────────────────────────────────
// Bar position within the fullscreen window (persisted to config).
let spotlightBarOffset: { x: number; y: number } | null = null

function loadSpotlightPosition(): void {
  if (CONFIG?.spotlightPosition) {
    spotlightBarOffset = { ...CONFIG.spotlightPosition }
  }
}

function createSpotlightWindow(): BrowserWindow {
  const { screen } = require('electron')
  const cursorPoint = screen.getCursorScreenPoint()
  const activeDisplay = screen.getDisplayNearestPoint(cursorPoint)
  const { x: sx, y: sy, width: sw, height: sh } = activeDisplay.bounds

  spotlightWindow = new BrowserWindow({
    x: sx,
    y: sy,
    width: sw,
    height: sh,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    show: false,
    focusable: true,
    // Ensure the window appears on whichever Space/desktop the user is
    // currently on, rather than pulling them back to the primary Space.
    visibleOnAllWorkspaces: true,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/spotlight-preload.js'),
      sandbox: false,
      webviewTag: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    spotlightWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/spotlight.html`)
  } else {
    spotlightWindow.loadFile(join(__dirname, '../renderer/spotlight.html'))
  }

  // Hide on blur — but only when the window was truly visible and settled.
  let blurArmed = false
  spotlightWindow.on('focus', () => {
    blurArmed = false
    setTimeout(() => {
      blurArmed = true
    }, 200)
  })
  spotlightWindow.on('blur', () => {
    if (blurArmed) {
      spotlightWindow?.hide()
    }
  })

  spotlightWindow.on('closed', () => {
    spotlightWindow = null
  })

  return spotlightWindow
}

function showAndFocusSpotlight(win: BrowserWindow, initialQuery?: string): void {
  // On macOS, avoid `app.focus({ steal: true })` — it activates the whole
  // application and causes the window manager to switch back to whichever
  // Space the app was originally launched on (#179).  Instead, ensure the
  // window is visible on all workspaces and focus it directly.
  if (process.platform === 'darwin') {
    win.setVisibleOnAllWorkspaces(true, { skipTransformProcessType: true })
  }

  // Reposition fullscreen window to the active display
  const { screen } = require('electron')
  const cursorPoint = screen.getCursorScreenPoint()
  const activeDisplay = screen.getDisplayNearestPoint(cursorPoint)
  const { x: sx, y: sy, width: sw, height: sh } = activeDisplay.bounds
  win.setBounds({ x: sx, y: sy, width: sw, height: sh })

  // Hide main window so it doesn't appear behind the transparent overlay
  if (mainWindow && !mainWindow.isDestroyed() && mainWindow.isVisible()) {
    mainWindow.hide()
  }

  win.show()
  win.focus()
  win.webContents.focus()

  // Send initial data to the renderer (bar offset + optional query)
  win.webContents.send('spotlight:init', {
    barOffset: spotlightBarOffset,
    screenSize: { width: sw, height: sh },
    query: initialQuery || ''
  })
}

function toggleSpotlight(selectedText?: string): void {
  if (spotlightWindow && !spotlightWindow.isDestroyed()) {
    if (spotlightWindow.isVisible()) {
      spotlightWindow.hide()
    } else {
      showAndFocusSpotlight(spotlightWindow, selectedText)
    }
  } else {
    const win = createSpotlightWindow()
    win.once('ready-to-show', () => {
      showAndFocusSpotlight(win, selectedText)
    })
  }
}

// ─── Voice Input Window ─────────────────────────────────

function createVoiceInputWindow(): BrowserWindow {
  const { screen } = require('electron')
  const cursorPoint = screen.getCursorScreenPoint()
  const activeDisplay = screen.getDisplayNearestPoint(cursorPoint)
  const { x: sx, y: sy, width: sw } = activeDisplay.bounds

  const winW = 340
  const winH = 72

  voiceInputWindow = new BrowserWindow({
    x: sx + Math.round((sw - winW) / 2),
    y: sy + 120,
    width: winW,
    height: winH,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    show: false,
    focusable: true,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/voice-input-preload.js'),
      sandbox: false,
      webviewTag: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  })

  // Grant microphone permission for the voice input window
  voiceInputWindow.webContents.session.setPermissionRequestHandler(
    (_webContents, permission, callback) => {
      callback(permission === 'media')
    }
  )

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    voiceInputWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/voice-input.html`)
  } else {
    voiceInputWindow.loadFile(join(__dirname, '../renderer/voice-input.html'))
  }

  voiceInputWindow.on('closed', () => {
    voiceInputWindow = null
    voiceInputRecording = false
  })

  return voiceInputWindow
}

function playChime(ascending: boolean): Promise<void> {
  return new Promise((resolve) => {
    const { execFile } = require('child_process')
    const fs = require('fs')
    const file = ascending ? 'chime-start.wav' : 'chime-stop.wav'
    const soundPath = app.isPackaged
      ? join(process.resourcesPath, 'app.asar.unpacked', 'resources', 'sounds', file)
      : join(app.getAppPath(), 'resources', 'sounds', file)

    const exists = fs.existsSync(soundPath)
    log.info(`playChime: ${ascending ? 'start' : 'stop'}, path=${soundPath}, exists=${exists}`)

    if (!exists) { resolve(); return }

    if (process.platform === 'darwin') {
      execFile('afplay', [soundPath], (err, stdout, stderr) => {
        if (err) log.warn('afplay error:', err.message, stderr)
        resolve()
      })
    } else if (process.platform === 'win32') {
      execFile('powershell', ['-NoProfile', '-Command',
        `(New-Object Media.SoundPlayer '${soundPath}').PlaySync()`
      ], () => resolve())
    } else {
      execFile('paplay', [soundPath], (err) => {
        if (err) execFile('aplay', [soundPath], () => resolve())
        else resolve()
      })
    }
  })
}

async function toggleVoiceInput(): Promise<void> {
  if (voiceInputRecording) {
    // Stop recording — chime plays in done/close handler after mic is released
    voiceInputRecording = false
    if (voiceInputWindow && !voiceInputWindow.isDestroyed()) {
      voiceInputWindow.webContents.send('voiceInput:state', { recording: false })
    }
    return
  }

  // Pre-flight: check microphone permission on macOS
  if (process.platform === 'darwin') {
    const micStatus = systemPreferences.getMediaAccessStatus('microphone')
    if (micStatus !== 'granted') {
      const granted = await systemPreferences.askForMediaAccess('microphone')
      if (!granted) {
        log.warn('Voice input: microphone permission denied')
        new Notification({
          title: 'Voice Input',
          body: 'Microphone access denied. Enable it in System Settings → Privacy & Security → Microphone, then restart the app.'
        }).show()
        return
      }
    }
  }

  // Pre-flight: check a connection is configured
  try {
    const conn = await getDefaultConnection()
    if (!conn) {
      log.warn('Voice input: no connection configured')
      new Notification({
        title: 'Voice Input',
        body: 'No connection configured. Set up a connection in Settings before using voice input.'
      }).show()
      return
    }
  } catch (err: any) {
    log.warn('Voice input: config check failed:', err)
  }

  // Start recording — chime plays concurrently (separate audio output path from mic input)
  voiceInputRecording = true
  playChime(true)

  if (voiceInputWindow && !voiceInputWindow.isDestroyed()) {
    voiceInputWindow.show()
    voiceInputWindow.focus()
    voiceInputWindow.webContents.send('voiceInput:state', { recording: true })
  } else {
    const win = createVoiceInputWindow()
    win.once('ready-to-show', () => {
      win.show()
      win.focus()
      setTimeout(() => {
        win.webContents.send('voiceInput:state', { recording: true })
      }, 100)
    })
  }
}

// ─── Call Shortcut ──────────────────────────────────────

async function toggleCall(): Promise<void> {
  // Pre-flight: check a connection is configured
  try {
    const conn = await getDefaultConnection()
    if (!conn) {
      log.warn('Call: no connection configured')
      new Notification({
        title: 'Call',
        body: 'No connection configured. Set up a connection in Settings before using the call shortcut.'
      }).show()
      return
    }

    const url = resolveConnectionUrl(conn)
    sendToRenderer('call', { connectionId: conn.id, url })

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show()
      mainWindow.focus()
    }
  } catch (err: any) {
    log.warn('Call: config check failed:', err)
  }
}

// ─── Floating Widget ────────────────────────────────────
// A small always-on-top circular icon (docked to a screen edge) that
// expands into a panel showing the default connection, similar to a
// customer-support chat bubble. This is an additional, opt-in mode
// (toggled from the tray) — it never replaces the normal window flow.

const WIDGET_MOVE_DEBOUNCE_MS = 500

function createWidgetWindow(): BrowserWindow {
  const { screen } = require('electron')
  const primaryWorkArea = screen.getPrimaryDisplay().workArea
  const saved = CONFIG?.widgetPosition
  const pos =
    saved && isBoundsOnVisibleDisplay(saved) ? saved : defaultWidgetPosition(primaryWorkArea)

  widgetExpanded = false

  widgetWindow = new BrowserWindow({
    x: pos.x,
    y: pos.y,
    width: WIDGET_ICON_SIZE,
    height: WIDGET_ICON_SIZE,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    show: false,
    focusable: true,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/widget-preload.js'),
      sandbox: false,
      webviewTag: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    widgetWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/widget.html`)
  } else {
    widgetWindow.loadFile(join(__dirname, '../renderer/widget.html'))
  }

  widgetWindow.on('ready-to-show', () => {
    widgetWindow?.show()
  })

  // Debounced drag-end handling: once the window settles after a drag,
  // snap it horizontally to the nearest screen edge and persist the
  // resulting docked (icon) position — mirrors debounceSaveWindowBounds
  // above for the main window.
  let widgetMoveTimer: ReturnType<typeof setTimeout> | null = null
  widgetWindow.on('move', () => {
    if (widgetMoveTimer) clearTimeout(widgetMoveTimer)
    widgetMoveTimer = setTimeout(() => {
      if (!widgetWindow || widgetWindow.isDestroyed()) return
      const bounds = widgetWindow.getBounds()
      const display = screen.getDisplayNearestPoint({
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2
      })
      const snappedX = snapXToNearestEdge(bounds.x, bounds.width, display.workArea)
      if (snappedX !== bounds.x) {
        widgetWindow.setPosition(snappedX, bounds.y)
      }
      // collapseBounds derives the docked icon anchor from any rect's
      // bottom-right corner — a no-op when already icon-sized, so this
      // works whether the widget is currently collapsed or expanded.
      const iconPos = collapseBounds({ ...bounds, x: snappedX })
      setConfig({ widgetPosition: { x: iconPos.x, y: iconPos.y } }).catch((err) =>
        log.warn('Failed to save widget position:', err)
      )
    }, WIDGET_MOVE_DEBOUNCE_MS)
  })

  widgetWindow.on('closed', () => {
    widgetWindow = null
  })

  return widgetWindow
}

function showWidget(): void {
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    widgetWindow.show()
    return
  }
  createWidgetWindow()
}

async function toggleWidgetMode(): Promise<void> {
  const enabled = !(CONFIG?.widgetMode === true)
  await setConfig({ widgetMode: enabled })
  CONFIG = await getConfig()
  if (enabled) {
    showWidget()
  } else if (widgetWindow && !widgetWindow.isDestroyed()) {
    widgetWindow.close()
  }
  updateTray()
}

// ─── Windows ────────────────────────────────────────────

const DEFAULT_WINDOW_WIDTH = 1280
const DEFAULT_WINDOW_HEIGHT = 800
const MIN_WINDOW_WIDTH = 480
const MIN_WINDOW_HEIGHT = 360
const BOUNDS_SAVE_DEBOUNCE_MS = 500
const MIN_VISIBLE_OVERLAP_PX = 100

/** Last known non-maximized bounds, used to preserve restore geometry. */
let lastNormalBounds: Electron.Rectangle | null = null

/** Debounced persistence of the current window geometry to config. */
let boundsDebounceTimer: ReturnType<typeof setTimeout> | null = null

function debounceSaveWindowBounds(win: BrowserWindow): void {
  if (boundsDebounceTimer) clearTimeout(boundsDebounceTimer)
  boundsDebounceTimer = setTimeout(() => {
    if (win.isDestroyed()) return
    const maximized = win.isMaximized()
    const bounds = maximized ? (lastNormalBounds ?? win.getNormalBounds()) : win.getBounds()
    setConfig({ windowBounds: bounds, windowMaximized: maximized }).catch((err) =>
      log.warn('Failed to save window bounds:', err)
    )
  }, BOUNDS_SAVE_DEBOUNCE_MS)
}

/**
 * Returns true when at least `MIN_VISIBLE_OVERLAP_PX` of the saved
 * rectangle would be visible on one of the connected displays.
 */
function isBoundsOnVisibleDisplay(bounds: { x: number; y: number }): boolean {
  const { screen } = require('electron')
  const targetPoint = { x: bounds.x + MIN_VISIBLE_OVERLAP_PX / 2, y: bounds.y + MIN_VISIBLE_OVERLAP_PX / 2 }
  const display = screen.getDisplayNearestPoint(targetPoint)
  const { x, y, width, height } = display.workArea
  return (
    bounds.x + MIN_VISIBLE_OVERLAP_PX > x &&
    bounds.x < x + width &&
    bounds.y + MIN_VISIBLE_OVERLAP_PX > y &&
    bounds.y < y + height
  )
}

function trackNormalBounds(win: BrowserWindow): void {
  if (!win.isDestroyed() && !win.isMaximized()) {
    lastNormalBounds = win.getBounds()
  }
}

function createMainWindow(show = true): void {
  const saved = CONFIG?.windowBounds
  const windowOpts: Electron.BrowserWindowConstructorOptions = {
    width: saved?.width ?? DEFAULT_WINDOW_WIDTH,
    height: saved?.height ?? DEFAULT_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    minHeight: MIN_WINDOW_HEIGHT,
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false,
    titleBarStyle: process.platform === 'win32' ? 'default' : 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    autoHideMenuBar: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundColor: '#00000000',
    ...(process.platform === 'win32' ? { frame: true } : {}),
    ...(process.platform === 'linux' ? { icon } : {}),
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webviewTag: true
    }
  }

  // Restore position only when the saved location is still on a visible display
  // (e.g. an external monitor may have been disconnected since last session).
  if (saved?.x != null && saved?.y != null && isBoundsOnVisibleDisplay(saved)) {
    windowOpts.x = saved.x
    windowOpts.y = saved.y
  }

  mainWindow = new BrowserWindow(windowOpts)
  mainWindow.setIcon(icon)

  if (CONFIG?.windowMaximized) {
    mainWindow.maximize()
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }

  if (show) {
    mainWindow.on('ready-to-show', () => {
      mainWindow?.show()
    })
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    openUrl(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // ── Persist window bounds on geometry changes ──
  const onBoundsChanged = (): void => {
    if (!mainWindow || mainWindow.isDestroyed()) return
    trackNormalBounds(mainWindow)
    debounceSaveWindowBounds(mainWindow)
  }
  mainWindow.on('resize', onBoundsChanged)
  mainWindow.on('move', onBoundsChanged)
  mainWindow.on('maximize', onBoundsChanged)
  mainWindow.on('unmaximize', onBoundsChanged)

  mainWindow.on('close', (event) => {
    if (!isQuiting) {
      if (CONFIG?.runInBackground === false) {
        isQuiting = true
        app.quit()
      } else {
        event.preventDefault()
        mainWindow?.hide()
      }
    }
  })
}

function createContentWindow(url: string, connectionId: string): BrowserWindow {
  if (contentWindow && !contentWindow.isDestroyed()) {
    contentWindow.loadURL(url)
    contentWindow.show()
    return contentWindow
  }

  contentWindow = new BrowserWindow({
    width: DEFAULT_WINDOW_WIDTH,
    height: DEFAULT_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    minHeight: MIN_WINDOW_HEIGHT,
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false,
    titleBarStyle: process.platform === 'win32' ? 'default' : 'hidden',
    trafficLightPosition: { x: 16, y: 16 },
    autoHideMenuBar: true,
    ...(process.platform === 'win32' ? { frame: true } : {}),
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
      partition: `persist:connection-${connectionId}`
    }
  })

  // Enable media capture
  session
    .fromPartition(`persist:connection-${connectionId}`)
    .setPermissionRequestHandler((_webContents, permission, callback) => {
      const allowedPermissions = ['media', 'mediaKeySystem', 'notifications', 'clipboard-sanitized-write']
      callback(allowedPermissions.includes(permission))
    })

  contentWindow.on('ready-to-show', () => {
    contentWindow?.show()
  })

  contentWindow.webContents.setWindowOpenHandler((details) => {
    openUrl(details.url)
    return { action: 'deny' }
  })

  contentWindow.loadURL(url)

  contentWindow.on('close', (event) => {
    if (!isQuiting) {
      if (CONFIG?.runInBackground === false) {
        isQuiting = true
        app.quit()
      } else {
        event.preventDefault()
        contentWindow?.hide()
      }
    }
  })

  contentWindow.on('closed', () => {
    contentWindow = null
  })

  return contentWindow
}

// ─── Tray ───────────────────────────────────────────────

const updateTray = () => {
  if (!tray || !CONFIG) return

  // Remote connections from config
  const remoteItems = (CONFIG.connections || []).map((conn) => ({
    label: `${conn.id === CONFIG.defaultConnectionId ? '★ ' : ''}${conn.name}`,
    sublabel: conn.url,
    click: async () => {
      const result = await connectTo(conn)
      if (result) sendToRenderer('connection:open', result)
    }
  }))

  // Virtual local connection (when package is installed)
  const localItem = isPackageInstalled('open-webui')
    ? [{
        label: `${CONFIG.defaultConnectionId === 'local' ? '★ ' : ''}Open WebUI (Local)`,
        sublabel: SERVER_URL || `http://127.0.0.1:${CONFIG.localServer?.port ?? 8080}`,
        click: async () => {
          const result = await connectTo(buildLocalConnection())
          if (result) sendToRenderer('connection:open', result)
        }
      }]
    : []

  const allItems = [...localItem, ...remoteItems]

  const trayMenuTemplate = [
    {
      label: 'Show 인트리클로 AI',
      click: () => {
        mainWindow?.show()
        mainWindow?.focus()
      }
    },
    {
      label: 'Floating Widget',
      type: 'checkbox',
      checked: CONFIG.widgetMode === true,
      click: () => {
        toggleWidgetMode()
      }
    },
    { type: 'separator' },
    ...(allItems.length > 0
      ? [
          { label: 'Connections', enabled: false },
          ...allItems,
          { type: 'separator' }
        ]
      : []),
    ...(SERVER_STATUS === 'started' && SERVER_URL
      ? [
          {
            label: `Local: ${SERVER_URL}`,
            click: () => {
              if (SERVER_URL) clipboard.writeText(SERVER_URL)
            }
          },
          { type: 'separator' }
        ]
      : []),
    {
      label: 'Quit 인트리클로 AI',
      accelerator: 'CommandOrControl+Q',
      click: async () => {
        await stopServerHandler()
        isQuiting = true
        app.quit()
      }
    }
  ]

  const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
  tray?.setContextMenu(trayMenu)
}

// ─── Connection Management ──────────────────────────────

// Build a virtual local connection object from current config.
// The local server is never stored in the connections array — it's
// implicit when the open-webui package is installed.
const buildLocalConnection = (): Connection => {
  const port = CONFIG?.localServer?.port ?? 8080
  return {
    id: 'local',
    name: 'Open WebUI',
    type: 'local',
    url: SERVER_URL || `http://127.0.0.1:${port}`
  }
}

// Resolve the default connection.  'local' is a virtual ID that
// synthesises a Connection on the fly; everything else is looked
// up in the persisted connections array (remote only).
const getDefaultConnection = async (): Promise<Connection | null> => {
  const config = await getConfig()
  if (!config.defaultConnectionId) return null
  if (config.defaultConnectionId === 'local') return buildLocalConnection()
  return config.connections.find((c) => c.id === config.defaultConnectionId) ?? null
}

// Resolve the URL for a connection, preferring the live SERVER_URL
// for local connections and normalising 0.0.0.0 to localhost.
const resolveConnectionUrl = (conn: Connection): string => {
  let url = conn.url
  if (conn.type === 'local' && SERVER_URL) url = SERVER_URL
  if (url.startsWith('http://0.0.0.0')) url = url.replace('http://0.0.0.0', 'http://localhost')
  return url
}

const connectTo = async (connection: Connection) => {
  let url = connection.url

  if (connection.type === 'local') {
    // Start local server if needed
    if (SERVER_STATUS !== 'started') {
      const started = await startServerHandler()
      if (!started) return null
    }
    url = SERVER_URL || connection.url

    // Wait for the server to actually be reachable before opening the view.
    // startServerHandler returns as soon as the process spawns, but the HTTP
    // endpoint might not be ready yet (especially on first launch).
    if (!SERVER_REACHABLE) {
      const maxWait = 120_000
      const poll = 2_000
      const t0 = Date.now()
      while (!SERVER_REACHABLE && Date.now() - t0 < maxWait) {
        await new Promise((r) => setTimeout(r, poll))
      }
      if (!SERVER_REACHABLE) {
        log.warn('connectTo: server did not become reachable within timeout')
        return null
      }
    }
  }

  // Normalize URL
  if (url.startsWith('http://0.0.0.0')) {
    url = url.replace('http://0.0.0.0', 'http://localhost')
  }

  return { url, connectionId: connection.id }
}

// ─── Server Lifecycle ───────────────────────────────────

// Active PTY data listener — when a MessagePort is connected, PTY data
// flows to the port. This disposable gets replaced on each pty:connect.
let activePtyDataDisposable: { dispose: () => void } | null = null

const startServerHandler = async (): Promise<boolean> => {
  if (SERVER_STATUS === 'starting' || SERVER_STATUS === 'started') {
    log.info('[server] Already running or starting, skipping duplicate start')
    return true
  }
  await stopServerHandler()
  SERVER_STATUS = 'starting'
  sendToRenderer('status:server', SERVER_STATUS)

  try {
    CONFIG = await getConfig()

    // Auto-update the open-webui pip package to latest before starting.
    // Only when autoUpdate is enabled (default) and no version pin is set.
    const autoUpdate = CONFIG?.localServer?.autoUpdate !== false
    const versionPin = CONFIG?.localServer?.version
    if (autoUpdate && !versionPin && isPackageInstalled('open-webui')) {
      try {
        log.info('[server] Auto-updating open-webui package to latest…')
        sendToRenderer('status:install', 'Updating Open WebUI…')
        await installPackage('open-webui', undefined, (status: string) => {
          sendToRenderer('status:install', status)
        })
        sendToRenderer('status:install', '')
        log.info('[server] Auto-update complete')
      } catch (e) {
        // Non-fatal — start the existing version if upgrade fails
        log.warn('[server] Auto-update failed, starting existing version:', e)
        sendToRenderer('status:install', '')
      }
    }

    const { url, pid } = await startServer(
      CONFIG?.localServer?.serveOnLocalNetwork ?? false,
      CONFIG?.localServer?.port ?? null
    )
    SERVER_URL = url
    SERVER_PID = pid
    SERVER_STATUS = 'started'
    log.info('Server started:', SERVER_URL, SERVER_PID)
    sendToRenderer('status:server', SERVER_STATUS)

    // Auto-push PTY port so an already-open log panel picks up live output
    connectPtyPort(pid)
    updateTray()

    checkUrlAndOpen(SERVER_URL, async () => {
      SERVER_REACHABLE = true
      sendToRenderer('server:ready', { url: SERVER_URL })
      updateTray()
    })

    return true
  } catch (error) {
    log.error('Failed to start server:', error)
    SERVER_STATUS = 'failed'
    sendToRenderer('status:server', SERVER_STATUS)
    sendToRenderer('error', { message: `Failed to start server: ${error?.message}` })
    updateTray()
    return false
  }
}

// Active PTY data listeners — one per PID, replaced on each pty:connect for that PID
const activePtyDisposables: Map<number, { dispose: () => void }> = new Map()

/**
 * Creates a MessagePort-based channel between a PTY process and the renderer.
 * Supports multiple concurrent PTYs — each identified by PID.
 *
 * Flow:
 *   PTY stdout → port1.postMessage → [transfer] → port2 (renderer) → xterm.write
 *   xterm.onData → port2.postMessage → [transfer] → port1 (main) → PTY.write
 */
const connectPtyPort = (pid?: number): void => {
  const targetPid = pid ?? SERVER_PID
  if (!mainWindow) return

  const { port1, port2 } = new MessageChannelMain()

  if (!targetPid) {
    if (SERVER_STATUS === 'starting') {
      log.info('pty:connect — server is starting, no PID yet')
    } else {
      log.info('pty:connect — no active server')
      port1.postMessage({ type: 'output', data: '[No active server process]\r\n' })
    }
    mainWindow.webContents.postMessage('pty:port', { pid: 0 }, [port2])
    return
  }

  // Clean up previous connection for this PID
  activePtyDisposables.get(targetPid)?.dispose()
  activePtyDisposables.delete(targetPid)

  const ptyProcess = getServerPty(targetPid)
  log.info(`pty:connect — PID ${targetPid}, pty exists: ${!!ptyProcess}`)

  // Replay buffered output so renderer sees full history
  const buffer = getServerLog(targetPid)
  if (buffer?.length) {
    for (const chunk of buffer) {
      port1.postMessage({ type: 'output', data: chunk })
    }
  }

  // PTY → port1 → renderer
  if (ptyProcess) {
    const disposable = ptyProcess.onData((data: string) => {
      port1.postMessage({ type: 'output', data })
    })
    activePtyDisposables.set(targetPid, disposable)

    // Renderer → port1 → PTY (interactive input)
    port1.on('message', (event) => {
      const msg = event.data
      if (msg.type === 'input') {
        ptyProcess.write(msg.data)
      } else if (msg.type === 'resize') {
        ptyProcess.resize(msg.cols, msg.rows)
      }
    })
    port1.start()
  }

  // Transfer port2 to the renderer
  mainWindow.webContents.postMessage('pty:port', { pid: targetPid }, [port2])
}

/**
 * MessagePort channel for the Open Terminal PTY — read-only log viewer.
 */
let activeOpenTerminalDisposable: { dispose: () => void } | null = null

const connectOpenTerminalPtyPort = (): void => {
  if (!mainWindow) return

  const { port1, port2 } = new MessageChannelMain()

  const otPty = getOpenTerminalPty()
  if (!otPty) {
    port1.postMessage({ type: 'output', data: '[Open Terminal is not running]\r\n' })
    mainWindow.webContents.postMessage('open-terminal:pty:port', null, [port2])
    return
  }

  // Clean up previous
  activeOpenTerminalDisposable?.dispose()

  // Replay log buffer
  const buffer = getOpenTerminalLog()
  for (const chunk of buffer) {
    port1.postMessage({ type: 'output', data: chunk })
  }

  // Live data
  const disposable = otPty.onData((data: string) => {
    port1.postMessage({ type: 'output', data })
  })
  activeOpenTerminalDisposable = disposable

  port1.start()
  mainWindow.webContents.postMessage('open-terminal:pty:port', null, [port2])
}

/**
 * MessagePort channel for the llamacpp PTY — log viewer.
 */
let activeLlamaCppDisposable: { dispose: () => void } | null = null

const connectLlamaCppPtyPort = (): void => {
  if (!mainWindow) return

  const { port1, port2 } = new MessageChannelMain()

  const lsPty = getLlamaCppPty()
  if (!lsPty) {
    port1.postMessage({ type: 'output', data: '[llamacpp is not running]\r\n' })
    mainWindow.webContents.postMessage('llamacpp:pty:port', null, [port2])
    return
  }

  // Clean up previous
  activeLlamaCppDisposable?.dispose()

  // Replay log buffer
  const buffer = getLlamaCppLog()
  for (const chunk of buffer) {
    port1.postMessage({ type: 'output', data: chunk })
  }

  // Live data
  const disposable = lsPty.onData((data: string) => {
    port1.postMessage({ type: 'output', data })
  })
  activeLlamaCppDisposable = disposable

  port1.start()
  mainWindow.webContents.postMessage('llamacpp:pty:port', null, [port2])
}

const stopServerHandler = async (): Promise<boolean> => {
  try {
    await stopAllServers()
    if (SERVER_STATUS) {
      SERVER_STATUS = 'stopped'
      updateTray()
    }
    SERVER_REACHABLE = false
    SERVER_URL = null
    sendToRenderer('status:server', SERVER_STATUS)
    return true
  } catch (error) {
    log.error('Failed to stop server:', error)
    return false
  }
}

const resetAppHandler = async () => {
  try {
    await stopServerHandler()
    SERVER_STATUS = null
    // Stop Open Terminal if running
    try {
      await stopOpenTerminal()
      sendToRenderer('status:open-terminal', null)
    } catch (e) {
      log.warn('Failed to stop Open Terminal during reset:', e)
    }
    // Stop and uninstall llama.cpp if running
    try {
      await uninstallLlamaCpp()
      sendToRenderer('status:llamacpp', null)
    } catch (e) {
      log.warn('Failed to uninstall llama.cpp during reset:', e)
    }
    // Remove GPU crash marker so sandbox is re-tested on next launch
    try {
      if (existsSync(gpuCrashMarkerPath)) {
        unlinkSync(gpuCrashMarkerPath)
        log.info('GPU crash marker removed during reset')
      }
    } catch (e) {
      log.warn('Failed to remove GPU crash marker during reset:', e)
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await resetApp()
    CONFIG = await getConfig() // reload from defaults since config.json was deleted
    new Notification({ title: '인트리클로 AI', body: 'Application has been reset.' }).show()
  } catch (error) {
    log.error('Failed to reset:', error)
    new Notification({ title: '인트리클로 AI', body: `Reset failed: ${error.message}` }).show()
  }
}

// ─── Helpers ────────────────────────────────────────────

const sendToRenderer = (type: string, data?: any) => {
  mainWindow?.webContents.send('main:data', { type, data })
}

// ─── App Lifecycle ──────────────────────────────────────

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  app.setAboutPanelOptions({
    applicationName: '인트리클로 AI',
    iconPath: icon,
    applicationVersion: app.getVersion(),
    version: app.getVersion(),
    website: 'https://openwebui.com',
    copyright: `© ${new Date().getFullYear()} 인트리클로 AI`
  })

  app.whenReady().then(async () => {
    CONFIG = await getConfig()
    loadSpotlightPosition()
    log.info('Config:', CONFIG)

    // ── 회의 녹음: 시스템 오디오 루프백 ──────────────────────────
    // getDisplayMedia 로 시스템 오디오(상대방 목소리 등 스피커로 나가는 소리)를
    // 잡으려면 Electron 39+ 는 화면 선택 UI 대신 이 핸들러가 직접 응답해야
    // 한다. video 는 요청 안 하므로 audio: 'loopback' 만 돌려준다
    // (Windows 전용 -- Electron 문서에 명시됨, 이 회사는 전부 Windows라 문제없음).
    session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
      if (request.audioRequested) {
        callback({ audio: 'loopback' })
      } else {
        callback({})
      }
    })

    // ── Bitwarden 확장 로드 (진짜 자동입력) ──────────────────────
    // AI챗봇/Mail Assistant/Slack 웹뷰가 공유하는 세션 파티션에 로드한다
    // (connectionPartition.ts 의 SHARED_PARTITION 과 반드시 같은 문자열이어야
    // 함 — 렌더러 전용 모듈이라 여기서 import 할 수 없어 값만 복제).
    // Chrome 웹스토어의 압축판(.crx)은 못 쓰므로 bitwarden/clients 오픈소스를
    // 직접 빌드해 resources/bitwarden-extension 에 넣어뒀다. Electron이 크롬
    // 확장 API를 전부 지원하지는 않아 일부 기능(생체인증 등)은 안 될 수 있음.
    try {
      const extPath =
        process.env.NODE_ENV === 'development' || is.dev
          ? join(app.getAppPath(), 'resources', 'bitwarden-extension')
          : join(process.resourcesPath, 'app.asar.unpacked', 'resources', 'bitwarden-extension')
      const sharedSession = session.fromPartition('persist:intriclo-shared')
      await sharedSession.extensions.loadExtension(extPath, { allowFileAccess: true })
      log.info('Bitwarden 확장 로드 완료')
    } catch (err) {
      log.warn('Bitwarden 확장 로드 실패:', err)
    }

    // ponytail: app.name은 userData 경로(%APPDATA%\<app.name>) 등 내부 경로 계산에
    // 쓰이는 기술 식별자라서 한글로 바꾸지 않는다(한글 경로에서 config.json을 못 찾거나
    // 매 실행마다 경로가 달라지는 버그로 이어짐 - 실사용자 실측으로 확인됨). 화면에 보이는
    // "인트리클로 AI" 표시는 About 패널/트레이 텍스트 등 별도 필드로 이미 처리돼 있음.
    if (process.platform === 'darwin' && app.dock) {
      app.dock.setIcon(icon)
    }
    electronApp.setAppUserModelId('com.openwebui.desktop')

    // ─── GPU Process Crash Recovery ──────────────────
    // If the GPU process exits fatally (e.g. sandbox init failure on
    // certain NVIDIA/Intel drivers), write a marker and relaunch with
    // --disable-gpu-sandbox so the user doesn't have to manually edit
    // shortcut targets (see issue #110).
    app.on('child-process-gone', (_event, details) => {
      if (details.type === 'GPU') {
        log.error(
          `GPU process gone: reason=${details.reason}, exitCode=${details.exitCode}`
        )

        // Only auto-recover from fatal crashes, not normal/clean exits
        if (
          details.reason === 'crashed' ||
          details.reason === 'launch-failed' ||
          details.reason === 'abnormal-exit'
        ) {
          if (!gpuSandboxDisabled) {
            log.info('Writing GPU crash marker and relaunching with --disable-gpu-sandbox')
            try {
              writeFileSync(gpuCrashMarkerPath, new Date().toISOString(), 'utf-8')
            } catch (e) {
              log.warn('Failed to write GPU crash marker:', e)
            }
            app.relaunch({ args: [...process.argv.slice(1), '--disable-gpu-sandbox'] })
            app.exit(0)
          }
        }
      }
    })

    // If we previously set the GPU sandbox marker and this session
    // started successfully, log it so it's visible in diagnostics.
    if (gpuSandboxDisabled) {
      log.info('Running with GPU sandbox disabled (marker file present)')
    }

    // ─── Self-Signed / Untrusted Certificate Support ─
    // Allow connections to Open WebUI instances that use self-signed or
    // otherwise untrusted SSL certificates (issue #108) — but only on the
    // local network. Public hosts keep normal validation: the update feed
    // (github.com) and the Slack login page must not be MITM-able, and
    // trusting everything would make an unsigned auto-update installable
    // by anyone on the path.
    app.on('certificate-error', (event, _webContents, url, error, certificate, callback) => {
      const allow = isPrivateUrl(url)
      log.warn(
        `Certificate error: ${error} for ${url} ` +
        `(subject: ${certificate.subjectName}, issuer: ${certificate.issuerName}) ` +
        `→ ${allow ? 'allowed (private network)' : 'rejected'}`
      )
      if (!allow) return // leave it to Chromium: the request fails
      event.preventDefault()
      callback(true)
    })

    // Same rule for the default session (used by net.fetch() in
    // validateRemoteUrl / checkUrlAndOpen).
    session.defaultSession.setCertificateVerifyProc((request, callback) => {
      // 0 = trust it anyway, -3 = use Chromium's own verification result
      callback(isPrivateHost(request.hostname) ? 0 : -3)
    })

    // Webviews use partitioned sessions (persist:connection-*), and
    // electron-updater creates its own session too — this hook covers
    // both, so the private-host rule has to hold here as well.
    app.on('session-created', (newSession) => {
      newSession.setCertificateVerifyProc((request, callback) => {
        callback(isPrivateHost(request.hostname) ? 0 : -3)
      })

      // Grant media / notification permissions for webview partition sessions
      // so that auth flows, media capture, and notifications work correctly.
      newSession.setPermissionRequestHandler((_webContents, permission, callback) => {
        const allowed = ['media', 'mediaKeySystem', 'notifications', 'clipboard-read', 'clipboard-sanitized-write']
        callback(allowed.includes(permission))
      })
    })

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)

      // Auto-reload when the renderer process dies so the user doesn't
      // see a permanent blank/grey screen.
      window.webContents.on('render-process-gone', (_event, details) => {
        log.error(
          `Renderer process gone: reason=${details.reason}, exitCode=${details.exitCode}`
        )
        if (details.reason !== 'clean-exit') {
          window.webContents.reload()
        }
      })
    })

    // Log webview guest renderer crashes for diagnostics — the existing
    // 'crashed' listener in Content.svelte surfaces these to the user.
    //
    // For webview guests we also intercept navigation and popup events
    // so that external links open in the user's default browser instead
    // of navigating the webview or spawning a new Electron window (#165).
    app.on('web-contents-created', (_event, contents) => {
      contents.on('render-process-gone', (_e, details) => {
        if (details.reason !== 'clean-exit') {
          log.error(
            `WebContents render-process-gone: type=${contents.getType()}, ` +
            `reason=${details.reason}, exitCode=${details.exitCode}`
          )
        }
      })

      if (contents.getType() === 'webview') {
        // ── Popups (target="_blank" links) → open in default browser ──
        contents.setWindowOpenHandler(({ url }) => {
          openUrl(url)
          return { action: 'deny' }
        })

        // ── In-page navigation to a different origin → open externally ──
        // This catches regular link clicks (no target) that would navigate
        // the webview away from the Open WebUI instance.
        contents.on('will-navigate', (event, url) => {
          try {
            const currentOrigin = new URL(contents.getURL()).origin
            const targetOrigin = new URL(url).origin
            if (targetOrigin !== currentOrigin) {
              event.preventDefault()
              openUrl(url)
            }
          } catch {
            // Malformed URL — let it through so Chromium can handle/reject it
          }
        })

        // ── Native right-click context menu (#161) ──────────────────
        // Electron <webview> guests don't show a context menu by default,
        // which blocks right-click → Paste / Autofill / password-manager
        // integration on login pages.  Build a native menu with standard
        // editing actions, spell-check suggestions, and link handling.
        contents.on('context-menu', (_event, params) => {
          const menuItems: Electron.MenuItemConstructorOptions[] = []

          // Spell-check suggestions (if any)
          if (params.misspelledWord && params.dictionarySuggestions?.length) {
            for (const suggestion of params.dictionarySuggestions) {
              menuItems.push({
                label: suggestion,
                click: () => contents.replaceMisspelling(suggestion)
              })
            }
            menuItems.push({ type: 'separator' })
          }

          // Link handling
          if (params.linkURL) {
            menuItems.push({
              label: 'Open Link in Browser',
              click: () => openUrl(params.linkURL)
            })
            menuItems.push({
              label: 'Copy Link',
              click: () => clipboard.writeText(params.linkURL)
            })
            menuItems.push({ type: 'separator' })
          }

          // Editable field actions (input, textarea, contenteditable)
          if (params.isEditable) {
            menuItems.push(
              { label: 'Undo', role: 'undo', enabled: params.editFlags.canUndo },
              { label: 'Redo', role: 'redo', enabled: params.editFlags.canRedo },
              { type: 'separator' },
              { label: 'Cut', role: 'cut', enabled: params.editFlags.canCut },
              { label: 'Copy', role: 'copy', enabled: params.editFlags.canCopy },
              { label: 'Paste', role: 'paste', enabled: params.editFlags.canPaste },
              { label: 'Select All', role: 'selectAll', enabled: params.editFlags.canSelectAll }
            )
          } else if (params.selectionText) {
            // Non-editable text selection
            menuItems.push(
              { label: 'Copy', role: 'copy', enabled: params.editFlags.canCopy }
            )
          }

          if (menuItems.length > 0) {
            Menu.buildFromTemplate(menuItems).popup()
          }
        })
      }
    })

    // ─── IPC Handlers ─────────────────────────────────

    ipcMain.handle('get:version', () => app.getVersion())

    ipcMain.handle('app:info', () => ({
      version: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
      username: require('os').userInfo().username,
      gpuSandboxDisabled
    }))

    ipcMain.handle('app:contentPreloadPath', () => {
      return `file://${join(__dirname, '../preload/content-preload.js')}`
    })

    ipcMain.handle('app:defaultDataPath', () => {
      return join(getUserDataPath(), 'data')
    })

    ipcMain.handle('app:installDir', () => {
      return getInstallDir()
    })

    ipcMain.handle('system:diskSpace', async () => {
      try {
        const stats = await statfs(getUserDataPath())
        return { free: stats.bavail * stats.bsize }
      } catch (error) {
        log.error('Failed to check disk space:', error)
        return { free: -1 }
      }
    })

    ipcMain.handle('get:config', () => getConfig())
    ipcMain.handle('set:config', async (_event, config) => {
      await setConfig(config)
      CONFIG = await getConfig()
      updateTray()
      voiceInputRecording = false
      registerShortcuts(CONFIG.globalShortcut, CONFIG.spotlightShortcut, CONFIG.voiceInputShortcut, CONFIG.callShortcut)
    })

    // Python/uv
    ipcMain.handle('install:python', async () => {
      try {
        sendToRenderer('status:install', 'Downloading Python…')
        const res = await installPython(undefined, (status: string) => {
          sendToRenderer('status:install', status)
        })
        sendToRenderer('status:python', res)
        return res
      } catch (error) {
        sendToRenderer('status:python', false)
        sendToRenderer('error', { message: error?.message ?? 'Python installation failed. Please check your internet connection and try again.' })
        return false
      }
    })

    ipcMain.handle('status:python', async () => {
      return (await isPythonInstalled()) && (await isUvInstalled())
    })

    // Package
    ipcMain.handle('install:package', async () => {
      try {
        CONFIG = await getConfig()
        const owuiVersion = CONFIG?.localServer?.version || undefined
        const otVersion = CONFIG?.openTerminal?.version || undefined

        sendToRenderer('status:install', 'Installing Open WebUI…')
        await installPackage('open-webui', owuiVersion, (status: string) => {
          sendToRenderer('status:install', status)
        })
        sendToRenderer('status:install', 'Installing Open Terminal…')
        await installPackage('open-terminal', otVersion, (status: string) => {
          sendToRenderer('status:install', status)
        }).catch((e) =>
          log.warn('open-terminal install failed (non-fatal):', e)
        )
        sendToRenderer('status:package', true)
        // Notify renderer of install state change
        sendToRenderer('packages:changed', {
          'open-webui': isPackageInstalled('open-webui')
        })
        // Auto-set local as default if no default configured
        const cfg = await getConfig()
        if (!cfg.defaultConnectionId) {
          cfg.defaultConnectionId = 'local'
          await setConfig(cfg)
          CONFIG = cfg
        }
        updateTray()
        return true
      } catch (error) {
        sendToRenderer('status:package', false)
        sendToRenderer('error', { message: error?.message ?? 'Package installation failed. Please check your internet connection and try again.' })
        return false
      }
    })

    ipcMain.handle('status:package', async () => isPackageInstalled('open-webui'))

    // Server
    ipcMain.handle('server:start', () => startServerHandler())
    ipcMain.handle('server:stop', () => stopServerHandler())
    ipcMain.handle('server:restart', async () => {
      await stopServerHandler()
      return startServerHandler()
    })
    ipcMain.handle('server:logs', () => (SERVER_PID ? getServerLog(SERVER_PID) : []))
    ipcMain.handle('server:logs:clear', () => clearAllServerLogs())

    // PTY MessagePort channel
    ipcMain.handle('pty:list', () => getServerPIDs())
    ipcMain.handle('pty:connect', (_event, pid?: number) => connectPtyPort(pid))
    ipcMain.handle('server:info', () => ({
      url: SERVER_URL,
      status: SERVER_STATUS,
      pid: SERVER_PID,
      reachable: SERVER_REACHABLE
    }))

    // Connections (remote only — local is virtual)
    ipcMain.handle('connections:list', async () => {
      const config = await getConfig()
      return config.connections
    })

    ipcMain.handle('connections:add', async (_event, connection: Connection) => {
      const config = await getConfig()
      config.connections.push(connection)
      if (!config.defaultConnectionId) {
        config.defaultConnectionId = connection.id
      }
      await setConfig(config)
      CONFIG = config
      updateTray()
      sendToRenderer('connections:changed', config.connections)
      return config.connections
    })

    ipcMain.handle('connections:remove', async (_event, id: string) => {
      const config = await getConfig()
      config.connections = config.connections.filter((c) => c.id !== id)
      if (config.defaultConnectionId === id) {
        config.defaultConnectionId = config.connections[0]?.id || 'local'
      }
      await setConfig(config)
      CONFIG = config
      updateTray()
      sendToRenderer('connections:changed', config.connections)
      return config.connections
    })

    ipcMain.handle('connections:update', async (_event, id: string, updates: Partial<Connection>) => {
      const config = await getConfig()
      const idx = config.connections.findIndex((c) => c.id === id)
      if (idx !== -1) {
        config.connections[idx] = { ...config.connections[idx], ...updates }
        await setConfig(config)
        CONFIG = config
        updateTray()
        sendToRenderer('connections:changed', config.connections)
      }
      return config.connections
    })

    ipcMain.handle('connections:setDefault', async (_event, id: string) => {
      const config = await getConfig()
      config.defaultConnectionId = id
      await setConfig(config)
      CONFIG = config
      updateTray()
    })

    ipcMain.handle('connections:connect', async (_event, id: string) => {
      // 'local' is a virtual connection — synthesize it
      if (id === 'local') {
        return await connectTo(buildLocalConnection())
      }
      const config = await getConfig()
      const conn = config.connections.find((c) => c.id === id)
      if (conn) {
        return await connectTo(conn)
      }
      return null
    })

    ipcMain.handle('validate:url', async (_event, url: string) => {
      return await validateRemoteUrl(url)
    })

    // ── 회사 계정 자동 로그인 (SSO) ──────────────────────────────
    // AI챗봇(Open WebUI)과 Mail Assistant 는 같은 이메일+비밀번호 계정을
    // 쓰도록 만들어졌다(오늘 계정 생성 작업). 여기 한 번 저장해두면
    // Content.svelte 가 두 웹뷰의 로그인 페이지에 이 값을 대신 넣어준다.
    // OS 키체인 기반 암호화(safeStorage)로 저장 — 평문으로 디스크에 안 남는다.
    const ssoCredsPath = () => join(app.getPath('userData'), 'sso-creds.enc')

    ipcMain.handle('sso:save', async (_event, email: string, password: string) => {
      if (!safeStorage.isEncryptionAvailable()) {
        throw new Error('이 시스템에서는 자격증명 암호화를 쓸 수 없습니다.')
      }
      const encrypted = safeStorage.encryptString(JSON.stringify({ email, password }))
      await writeFile(ssoCredsPath(), encrypted)
    })

    ipcMain.handle('sso:clear', async () => {
      await unlink(ssoCredsPath()).catch(() => {})
    })

    // 저장 여부 + 이메일만 반환 (렌더러가 항상 볼 수 있어도 되는 정보).
    ipcMain.handle('sso:status', async () => {
      try {
        const raw = await readFile(ssoCredsPath())
        const { email } = JSON.parse(safeStorage.decryptString(raw))
        return { saved: true, email }
      } catch {
        return { saved: false, email: '' }
      }
    })

    // 비밀번호까지 필요한 건 로그인 주입 시점뿐이라, 그때만 호출해서 쓰고
    // 렌더러가 따로 들고 있지 않게 한다.
    ipcMain.handle('sso:getCredentials', async () => {
      try {
        const raw = await readFile(ssoCredsPath())
        return JSON.parse(safeStorage.decryptString(raw))
      } catch {
        return null
      }
    })

    // 웹뷰 임베드로는 못 여는 URL(슬랙 등)을 대신 열 때 쓴다. shell.openExternal
    // 은 slack:// 같은 커스텀 프로토콜도 http(s):// 와 동일하게 OS 등록 핸들러로
    // 넘겨준다.
    ipcMain.handle('connections:openExternal', (_event, url: string) => {
      openUrl(url)
    })

    // 저장된 SSO 자격증명으로 Mail Assistant 에 직접 로그인해서(웹뷰 없이)
    // 세션 쿠키를 얻는다. slack:getMembers 와 meeting:upload 가 공유해서 쓴다.
    const loginToMailAssistant = async (): Promise<{ base: string; cookie: string } | null> => {
      let creds: any
      try {
        const raw = await readFile(ssoCredsPath())
        creds = JSON.parse(safeStorage.decryptString(raw))
      } catch {
        return null
      }
      if (!creds?.email || !creds?.password) return null

      const cfg = await getConfig()
      // cfg.mailAssistantUrl는 예전에 config 생성 시점에만 한 번 박히는
      // 별도 필드라 실제 커넥션 목록(cfg.connections)과 어긋날 수 있다
      // (실측: 이 필드로 만든 요청이 서버에 아예 도달하지 못했다 — URL이
      // 죽어 있었다는 뜻). 웹뷰가 실제로 쓰는 것과 같은 소스(connections
      // 배열)에서 가져오는 걸로 통일한다.
      const mailUrl =
        cfg.connections.find((c: any) => c.id === 'default-mail-assistant')?.url ??
        cfg.mailAssistantUrl
      if (!mailUrl) return null
      const base = mailUrl.replace(/\/$/, '')

      const loginRes = await fetch(`${base}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: creds.email, password: creds.password })
      })
      const setCookie = loginRes.headers.get('set-cookie')
      const loginData = await loginRes.json().catch(() => null)
      if (!loginData?.ok || !setCookie) return null
      return { base, cookie: setCookie.split(';')[0] }
    }

    // 사람별 슬랙 DM 바로가기용 사내 인원 목록. 별도 토큰을 앱에 심지 않고,
    // 이미 있는 SSO 자격증명을 그대로 써서 /api/slack/members 를 부른다.
    ipcMain.handle('slack:getMembers', async () => {
      try {
        const session = await loginToMailAssistant()
        if (!session) return { needsSso: true, teamId: '', members: [] }
        const listRes = await fetch(`${session.base}/api/slack/members`, {
          headers: { Cookie: session.cookie }
        })
        const data = await listRes.json()
        return { needsSso: false, teamId: data.team_id || '', members: data.members || [] }
      } catch (err: any) {
        log.warn('slack:getMembers 실패:', err)
        return { needsSso: false, teamId: '', members: [] }
      }
    })

    // 시작화면 "회사 계정으로 한 번에 로그인" 전용. 예전 방식(웹뷰가 뜬 뒤
    // 로그인 페이지를 찾아서 JS로 대신 채워 넣기)은 웹뷰 로딩 타이밍과
    // 페이지 구조에 따라 조용히 실패하기 쉬웠다 — 대신 여기서 서버에 직접
    // 로그인해서 얻은 세션 쿠키/토큰을 웹뷰가 뜨기도 전에 미리 심어둔다.
    // Mail Assistant는 쿠키 기반이라 세션에 쿠키를 넣어두면 그걸로 끝(웹뷰가
    // 로그인 페이지 자체를 볼 일이 없음). AI챗봇(Open WebUI)은 localStorage
    // 토큰 기반이라 쿠키 주입이 안 통해서, 발급받은 토큰을 렌더러로 돌려주면
    // 렌더러가 웹뷰 dom-ready 시점(화면 그려지기 전)에 넣어준다.
    // 저장된 자격증명(디스크의 sso-creds.enc)으로 두 서버에 로그인해서 세션을
    // 미리 심어둔다. sso:loginBoth(새로 입력한 자격증명 저장 후)와
    // sso:loginSaved(이미 저장된 걸로 조용히 재시도, 앱 시작 시 사용) 둘 다
    // 이걸 공유한다.
    const performLoginBoth = async (
      email: string,
      password: string
    ): Promise<{ nasToken: string | null; mailOk: boolean }> => {
      const cfg = await getConfig()
      let nasToken: string | null = null
      const nasConn = cfg.connections.find((c: any) => c.id === 'default-nas')
      if (nasConn?.url) {
        try {
          const r = await fetch(`${nasConn.url.replace(/\/$/, '')}/api/v1/auths/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          if (r.ok) {
            const data = await r.json()
            nasToken = data?.token ?? null
          } else {
            log.warn('performLoginBoth — AI챗봇 로그인 실패:', r.status, await r.text().catch(() => ''))
          }
        } catch (err) {
          log.warn('performLoginBoth — AI챗봇 로그인 오류:', err)
        }
      }

      let mailOk = false
      const mailSession = await loginToMailAssistant()
      if (mailSession) {
        const pair = mailSession.cookie
        const eq = pair.indexOf('=')
        if (eq > 0) {
          try {
            await session.fromPartition('persist:intriclo-shared').cookies.set({
              url: mailSession.base,
              name: pair.slice(0, eq),
              value: pair.slice(eq + 1),
              path: '/'
            })
            mailOk = true
          } catch (err) {
            log.warn('performLoginBoth — Mail Assistant 쿠키 주입 실패:', err)
          }
        }
      } else {
        log.warn('performLoginBoth — Mail Assistant 로그인 실패')
      }

      return { nasToken, mailOk }
    }

    ipcMain.handle('sso:loginBoth', async (_event, email: string, password: string) => {
      if (!safeStorage.isEncryptionAvailable()) {
        throw new Error('이 시스템에서는 자격증명 암호화를 쓸 수 없습니다.')
      }
      await writeFile(ssoCredsPath(), safeStorage.encryptString(JSON.stringify({ email, password })))
      return performLoginBoth(email, password)
    })

    // 앱 시작 시 시작화면에서 조용히 한 번 시도해보는 용도 — 이미 저장된
    // 자격증명이 있고 그걸로 로그인이 되면, 사용자가 다시 입력할 필요 없이
    // 바로 연결들을 쓸 수 있다. 저장된 게 없거나 실패하면 null.
    ipcMain.handle('sso:loginSaved', async () => {
      let creds: any
      try {
        const raw = await readFile(ssoCredsPath())
        creds = JSON.parse(safeStorage.decryptString(raw))
      } catch {
        return null
      }
      if (!creds?.email || !creds?.password) return null
      return performLoginBoth(creds.email, creds.password)
    })

    // "Slack으로 로그인"은 두 서버가 각자 자기 도메인에 세션 쿠키를 심는
    // 방식이라, 자격증명이 디스크에 남지 않는다. 대신 공유 파티션
    // (persist:intriclo-shared)의 쿠키가 아직 유효한지를 물어보면 된다 —
    // 재시작 시 "이미 로그인돼 있음"을 판정하는 유일한 근거이고, Slack 로그인
    // 진행 중에는 각 단계가 끝났는지 판정하는 근거이기도 하다.
    // (URL만으로는 판정 못 한다: Open WebUI는 성공도 실패도 /auth 로 돌아온다.)
    const checkSharedSession = async (base: string, path: string): Promise<boolean> => {
      if (!base) return false
      const url = base.replace(/\/$/, '')
      try {
        const cookies = await session.fromPartition('persist:intriclo-shared').cookies.get({ url })
        if (cookies.length === 0) return false
        const res = await fetch(`${url}${path}`, {
          headers: { Cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; ') }
        })
        return res.ok
      } catch (err) {
        log.warn('sso:checkSession 확인 실패:', url + path, err)
        return false
      }
    }

    ipcMain.handle('sso:checkSession', async () => {
      const cfg = await getConfig()
      const conns = cfg.connections ?? []
      const nasUrl = conns.find((c: any) => c.id === 'default-nas')?.url ?? ''
      const mailUrl =
        conns.find((c: any) => c.id === 'default-mail-assistant')?.url ?? cfg.mailAssistantUrl ?? ''
      // 둘 다 로그인 안 됐으면 401, 됐으면 200 인 엔드포인트(실측 확인함).
      const [nas, mail] = await Promise.all([
        checkSharedSession(nasUrl, '/api/v1/auths/'),
        checkSharedSession(mailUrl, '/api/me')
      ])
      return { nas, mail }
    })

    // 사이드바 "관리자" 줄을 관리자 계정에게만 보여주기 위한 확인.
    // Mail Assistant의 /api/me 가 로그인한 계정의 is_admin 을 갖고 있다.
    ipcMain.handle('admin:isAdmin', async () => {
      try {
        const session = await loginToMailAssistant()
        if (!session) return false
        const res = await fetch(`${session.base}/api/me`, { headers: { Cookie: session.cookie } })
        const data = await res.json().catch(() => null)
        return Boolean(data?.is_admin)
      } catch (err: any) {
        log.warn('admin:isAdmin 실패:', err)
        return false
      }
    })

    // 회의 녹음본을 Mail Assistant 로 올려 전사+요약+저장+DM 을 맡긴다.
    // audioBuffer 는 렌더러가 MediaRecorder 로 만든 webm Blob 을 ArrayBuffer 로
    // 바꿔 넘긴 것.
    ipcMain.handle(
      'meeting:upload',
      async (_event, title: string, audioBuffer: ArrayBuffer, mimeType: string) => {
        const session = await loginToMailAssistant()
        if (!session) return { ok: false, error: 'SSO 로그인 정보를 먼저 저장해주세요 (Settings).' }

        const form = new FormData()
        const ext = mimeType.includes('webm') ? 'webm' : 'ogg'
        form.append('audio', new Blob([audioBuffer], { type: mimeType }), `meeting.${ext}`)
        form.append('title', title || '')

        try {
          const res = await fetch(`${session.base}/api/meeting/transcribe`, {
            method: 'POST',
            headers: { Cookie: session.cookie },
            body: form
          })
          return await res.json()
        } catch (err: any) {
          log.warn('meeting:upload 실패:', err)
          return { ok: false, error: String(err?.message ?? err) }
        }
      }
    )

    // 녹음 중 실시간 자막용. 12초쯤마다 완결된 webm 조각이 하나씩 들어오는데,
    // 그때마다 로그인하면 회의 한 시간에 수백 번이 되므로 세션을 잠깐 캐시한다.
    // 쿠키가 먼저 죽으면 응답이 non-ok 로 오니 그때 캐시를 버리고 다음 조각에서
    // 다시 로그인한다.
    let segmentSession: { base: string; cookie: string; at: number } | null = null
    ipcMain.handle(
      'meeting:transcribeSegment',
      async (_event, audioBuffer: ArrayBuffer, mimeType: string) => {
        try {
          if (!segmentSession || Date.now() - segmentSession.at > 5 * 60 * 1000) {
            const s = await loginToMailAssistant()
            if (!s) return { ok: false, text: '' }
            segmentSession = { ...s, at: Date.now() }
          }

          const form = new FormData()
          const ext = mimeType.includes('webm') ? 'webm' : 'ogg'
          form.append('audio', new Blob([audioBuffer], { type: mimeType }), `segment.${ext}`)

          const res = await fetch(`${segmentSession.base}/api/meeting/transcribe-segment`, {
            method: 'POST',
            headers: { Cookie: segmentSession.cookie },
            body: form
          })
          if (!res.ok) {
            segmentSession = null
            return { ok: false, text: '' }
          }
          const data = await res.json()
          return { ok: Boolean(data?.ok), text: String(data?.text ?? '') }
        } catch (err: any) {
          // 자막이 실패해도 녹음 자체는 계속되어야 하니 조용히 넘긴다.
          log.warn('meeting:transcribeSegment 실패:', err)
          return { ok: false, text: '' }
        }
      }
    )

    // Updater
    ipcMain.handle('updater:check', () => checkForUpdates())
    ipcMain.handle('updater:download', () => downloadUpdate())
    ipcMain.handle('updater:install', () => installUpdate())

    // Changelog
    ipcMain.handle('app:changelog', async () => {
      try {
        const changelogPath = app.isPackaged
          ? join(process.resourcesPath, 'CHANGELOG.md')
          : join(app.getAppPath(), 'CHANGELOG.md')
        return await readFile(changelogPath, 'utf-8')
      } catch {
        return null
      }
    })

    // Auth token relay from webview
    ipcMain.handle('app:setAuthToken', (_event, token: string) => {
      AUTH_TOKEN = token || null
      log.info('Auth token updated from webview')
    })

    // Misc
    ipcMain.handle('app:reset', () => resetAppHandler())

    // Spotlight
    ipcMain.handle('spotlight:submit', async (_event, query: string, images?: string[]) => {
      const conn = await getDefaultConnection()
      if (!conn) {
        mainWindow?.show()
        mainWindow?.focus()
        return
      }

      const url = resolveConnectionUrl(conn)

      // Build files payload from screenshot images
      const files = images?.map((dataUrl, i) => ({
        name: `screenshot-${Date.now()}-${i + 1}.png`,
        mimeType: 'image/png',
        dataUrl
      }))

      sendToRenderer('query', { query, connectionId: conn.id, url, files })

      spotlightWindow?.hide()
      // Show main window so it can receive and display the submitted query
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show()
        mainWindow.focus()
      }
    })
    ipcMain.handle('spotlight:close', () => {
      spotlightWindow?.hide()
    })

    // Persist bar offset within the fullscreen spotlight window
    ipcMain.handle('spotlight:savePosition', async (_event, offset: { x: number; y: number }) => {
      spotlightBarOffset = offset
      setConfig({ spotlightPosition: offset }).catch((err) =>
        log.warn('Failed to persist spotlight bar position:', err)
      )
    })

    // 위젯 아이콘/헤더에 CSS app-region:drag를 걸면 Windows에서 클릭
    // 이벤트 자체를 안 보내주는 경우가 있어서(=드래그는 되는데 눌러도
    // 반응이 없던 원인) app-region은 안 쓰고 렌더러가 직접 좌표를 계산해
    // 이 두 IPC로 창을 옮긴다.
    ipcMain.handle('widget:getPosition', () => {
      if (!widgetWindow || widgetWindow.isDestroyed()) return { x: 0, y: 0 }
      const [x, y] = widgetWindow.getPosition()
      return { x, y }
    })

    ipcMain.on('widget:setPosition', (_event, x: number, y: number) => {
      if (!widgetWindow || widgetWindow.isDestroyed()) return
      widgetWindow.setPosition(Math.round(x), Math.round(y))
    })

    // Floating widget: toggle between the docked icon and the expanded
    // panel. Resizes the window in place and (only when expanding) resolves
    // the current default connection URL for the renderer's <webview>.
    ipcMain.handle('widget:toggle', async () => {
      if (!widgetWindow || widgetWindow.isDestroyed()) {
        return { expanded: false, url: null }
      }
      const { screen } = require('electron')
      const currentBounds = widgetWindow.getBounds()
      const display = screen.getDisplayNearestPoint({
        x: currentBounds.x + currentBounds.width / 2,
        y: currentBounds.y + currentBounds.height / 2
      })

      widgetExpanded = !widgetExpanded
      const newBounds = widgetExpanded
        ? expandBounds(currentBounds, display.workArea)
        : collapseBounds(currentBounds)
      widgetWindow.setBounds(newBounds)

      // Persist the docked (icon) anchor regardless of state.
      const iconPos = collapseBounds(newBounds)
      setConfig({ widgetPosition: { x: iconPos.x, y: iconPos.y } }).catch((err) =>
        log.warn('Failed to save widget position:', err)
      )

      let url: string | null = null
      let connectionId: string | null = null
      let connectionName: string | null = null
      if (widgetExpanded) {
        try {
          // 위젯은 항상 AI챗봇을 기본으로 연다 — Mail Assistant는 메인
          // 창용 넓은 화면으로 만들어진 대시보드라 위젯의 좁은 패널에서는
          // 레이아웃이 깨진다. getDefaultConnection()(마지막으로 클릭한
          // 연결)을 그대로 쓰면 메인 창에서 Mail Assistant를 열었다가
          // 위젯을 펼쳤을 때도 깨진 화면이 뜨는 문제가 있었다.
          const cfg = await getConfig()
          const conn =
            cfg.connections.find((c: any) => c.id === 'default-nas') ?? (await getDefaultConnection())
          if (conn) {
            url = resolveConnectionUrl(conn)
            connectionId = conn.id
            connectionName = conn.name
          }
        } catch (err: any) {
          log.warn('widget:toggle — failed to resolve default connection:', err)
        }
      }

      return { expanded: widgetExpanded, url, connectionId, connectionName }
    })

    // Capture a region of the screen (called from Spotlight renderer after drag)
    ipcMain.handle(
      'spotlight:captureRegion',
      async (_event, rect: { x: number; y: number; width: number; height: number }) => {
        try {
          // ── Permission check (macOS) ──
          if (process.platform === 'darwin') {
            const status = systemPreferences.getMediaAccessStatus('screen')
            if (status !== 'granted') {
              log.warn(`spotlight:captureRegion — screen recording permission: ${status}`)
              new Notification({
                title: 'Screen Recording Permission Required',
                body: '인트리클로 AI needs Screen Recording access to capture screenshots. Please enable it in System Settings → Privacy & Security → Screen Recording, then restart the app.'
              }).show()
              // Open the correct System Preferences pane
              shell.openExternal(
                'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture'
              ).catch(() => {})
              return 'no-permission'
            }
          }

          // Make spotlight invisible (but don't hide it — hiding triggers macOS
          // window activation which brings up the main window behind it)
          spotlightWindow?.setOpacity(0)
          // Small delay to let the window fully disappear before capture
          await new Promise((r) => setTimeout(r, 150))

          const { screen } = require('electron')
          const cursorPoint = screen.getCursorScreenPoint()
          const display = screen.getDisplayNearestPoint(cursorPoint)
          const scaleFactor = display.scaleFactor || 1

          const sources = await desktopCapturer.getSources({
            types: ['screen'],
            thumbnailSize: {
              width: Math.round(display.bounds.width * scaleFactor),
              height: Math.round(display.bounds.height * scaleFactor)
            }
          })

          // Find the source matching this display
          const source =
            sources.find((s) => s.display_id === String(display.id)) || sources[0]
          if (!source) {
            spotlightWindow?.setOpacity(1)
            return null
          }

          const fullImage = source.thumbnail
          // Validate thumbnail is not empty (can happen without permission)
          if (fullImage.isEmpty()) {
            log.warn('spotlight:captureRegion — captured thumbnail is empty (likely no permission)')
            spotlightWindow?.setOpacity(1)
            return null
          }

          const cropped = fullImage.crop({
            x: Math.round(rect.x * scaleFactor),
            y: Math.round(rect.y * scaleFactor),
            width: Math.round(rect.width * scaleFactor),
            height: Math.round(rect.height * scaleFactor)
          })

          // Restore spotlight visibility
          if (spotlightWindow && !spotlightWindow.isDestroyed()) {
            spotlightWindow.setOpacity(1)
          }

          return cropped.toDataURL()
        } catch (err) {
          log.error('spotlight:captureRegion failed:', err)
          // Restore spotlight on error
          spotlightWindow?.setOpacity(1)
          return null
        }
      }
    )

    // ── Voice Input ─────────────────────────────────────

    // Check microphone permission (macOS)
    ipcMain.handle('voiceInput:micPermission', async () => {
      if (process.platform === 'darwin') {
        const status = systemPreferences.getMediaAccessStatus('microphone')
        if (status !== 'granted') {
          const granted = await systemPreferences.askForMediaAccess('microphone')
          return granted ? 'granted' : 'denied'
        }
        return 'granted'
      }
      return 'granted' // Windows/Linux don't need explicit permission
    })

    // Transcribe audio via the connected server's STT endpoint
    ipcMain.handle('voiceInput:transcribe', async (_event, audioBuffer: ArrayBuffer, rendererToken?: string) => {
      try {
        const conn = await getDefaultConnection()
        if (!conn) throw new Error('No connection configured. Set up a connection in Settings first.')

        const url = resolveConnectionUrl(conn)

        // Use stored auth token (relayed from webview), fall back to renderer-provided or contentWindow
        let token = AUTH_TOKEN || rendererToken || ''
        if (!token) {
          // Scan all webContents to find the Open WebUI webview and read its token
          try {
            const { webContents: wc } = require('electron')
            const allContents = wc.getAllWebContents()
            for (const contents of allContents) {
              try {
                if (contents.getType() === 'webview' && !contents.isDestroyed()) {
                  const t = await contents.executeJavaScript(
                    `localStorage.getItem('token') || ''`
                  )
                  if (t) { token = t; break }
                }
              } catch {
                // Skip inaccessible webContents
              }
            }
          } catch {
            log.warn('voiceInput:transcribe — could not extract token from webviews')
          }
        }

        if (!token) {
          throw new Error('Not authenticated. Open a connection and sign in before using voice input.')
        }

        // Build multipart form data manually using Node.js
        const boundary = '----VoiceInput' + Date.now()
        const buffer = Buffer.from(audioBuffer)
        const filename = `recording-${Date.now()}.wav`

        const header = [
          `--${boundary}`,
          `Content-Disposition: form-data; name="file"; filename="${filename}"`,
          `Content-Type: audio/wav`,
          '',
          ''
        ].join('\r\n')

        const footer = `\r\n--${boundary}--\r\n`
        const headerBuf = Buffer.from(header, 'utf-8')
        const footerBuf = Buffer.from(footer, 'utf-8')
        const body = Buffer.concat([headerBuf, buffer, footerBuf])

        const response = await fetch(`${url}/api/v1/audio/transcriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `multipart/form-data; boundary=${boundary}`
          },
          body
        })

        if (!response.ok) {
          const text = await response.text().catch(() => '')
          throw new Error(`Transcription failed (HTTP ${response.status}). ${text || 'Check that your server has Speech-to-Text configured.'}`)
        }

        const result = await response.json()
        return result
      } catch (error: any) {
        log.error('voiceInput:transcribe failed:', error)
        new Notification({
          title: 'Voice Input Failed',
          body: error?.message || 'Transcription failed. Check logs for details.'
        }).show()
        throw error
      }
    })

    // Voice input completed — deliver text to chat
    ipcMain.handle('voiceInput:done', async (_event, text: string) => {
      voiceInputRecording = false
      playChime(false)
      if (voiceInputWindow && !voiceInputWindow.isDestroyed()) {
        voiceInputWindow.hide()
      }

      if (!text?.trim()) return

      // Deliver text through the same path as Spotlight
      const conn = await getDefaultConnection()
      if (!conn) {
        mainWindow?.show()
        mainWindow?.focus()
        return
      }

      const url = resolveConnectionUrl(conn)
      sendToRenderer('query', { query: text.trim(), connectionId: conn.id, url })

      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show()
        mainWindow.focus()
      }
    })

    // Voice input window requests close
    ipcMain.handle('voiceInput:close', () => {
      voiceInputRecording = false
      playChime(false)
      if (voiceInputWindow && !voiceInputWindow.isDestroyed()) {
        voiceInputWindow.hide()
      }
    })

    // Voice input error
    ipcMain.handle('voiceInput:error', (_event, message: string) => {
      log.warn('Voice input error:', message)
      voiceInputRecording = false
      new Notification({
        title: 'Voice Input Error',
        body: message || 'An unknown error occurred with voice input.'
      }).show()
    })

    // Open Terminal
    ipcMain.handle('open-terminal:start', async () => {
      try {
        sendToRenderer('status:open-terminal', 'starting')
        const result = await startOpenTerminal(CONFIG?.openTerminal?.port ?? null, (status) => {
          sendToRenderer('status:open-terminal-setup', status)
        })
        sendToRenderer('status:open-terminal', 'started')
        sendToRenderer('open-terminal:ready', result)
        // Notify webview to register terminal server at system level
        sendToRenderer('connections:terminal', {
          action: 'add',
          url: result.url,
          key: result.apiKey
        })
        return result
      } catch (error) {
        log.error('Failed to start Open Terminal:', error)
        sendToRenderer('status:open-terminal', 'failed')
        sendToRenderer('error', { message: `Open Terminal failed: ${error?.message}` })
        return null
      }
    })

    ipcMain.handle('open-terminal:stop', async () => {
      try {
        const info = getOpenTerminalInfo()
        await stopOpenTerminal()
        sendToRenderer('status:open-terminal', 'stopped')
        // Notify webview to unregister terminal server
        if (info.url) {
          sendToRenderer('connections:terminal', {
            action: 'remove',
            url: info.url
          })
        }

        return true
      } catch (error) {
        log.error('Failed to stop Open Terminal:', error)
        return false
      }
    })

    ipcMain.handle('open-terminal:info', () => getOpenTerminalInfo())
    ipcMain.handle('open-terminal:status', () => isPackageInstalled('open-terminal'))
    ipcMain.handle('open-terminal:pty:connect', () => connectOpenTerminalPtyPort())

    // llama.cpp
    ipcMain.handle('llamacpp:setup', async () => {
      try {
        sendToRenderer('status:llamacpp', 'setting-up')
        const binary = await setupLlamaCpp((status) => {
          sendToRenderer('status:llamacpp-setup', status)
        })
        sendToRenderer('status:llamacpp', 'ready')
        return binary
      } catch (error) {
        log.error('Failed to setup llamacpp:', error)
        sendToRenderer('status:llamacpp', 'failed')
        sendToRenderer('error', { message: `llamacpp setup failed: ${error?.message}` })
        return null
      }
    })

    ipcMain.handle('llamacpp:start', async () => {
      try {
        sendToRenderer('status:llamacpp', 'starting')
        const result = await startLlamaCpp((status) => {
          sendToRenderer('status:llamacpp-setup', status)
        })
        sendToRenderer('status:llamacpp', 'started')
        sendToRenderer('llamacpp:ready', result)
        // Notify webview to register llama-server as OpenAI endpoint
        if (result.url) {
          sendToRenderer('connections:openai', {
            action: 'add',
            url: `${result.url}/v1`,
            config: { provider: 'llama.cpp', connection_type: 'local' }
          })
          // Refresh model list after backend registers the endpoint
          setTimeout(() => sendToRenderer('models:refresh'), 1000)
        }

        return result
      } catch (error) {
        log.error('Failed to start llamacpp:', error)
        sendToRenderer('status:llamacpp', 'failed')
        sendToRenderer('error', { message: `llamacpp failed: ${error?.message}` })
        return null
      }
    })

    ipcMain.handle('llamacpp:stop', async () => {
      try {
        const info = getLlamaCppInfo()
        await stopLlamaCpp()
        sendToRenderer('status:llamacpp', 'stopped')
        // Notify webview to unregister llama-server
        if (info.url) {
          sendToRenderer('connections:openai', {
            action: 'remove',
            url: `${info.url}/v1`
          })
          // Refresh model list after removing endpoint
          setTimeout(() => sendToRenderer('models:refresh'), 500)
        }

        return true
      } catch (error) {
        log.error('Failed to stop llamacpp:', error)
        return false
      }
    })

    ipcMain.handle('llamacpp:info', () => getLlamaCppInfo())
    ipcMain.handle('llamacpp:logs', () => getLlamaCppLog())
    ipcMain.handle('llamacpp:pty:connect', () => connectLlamaCppPtyPort())

    ipcMain.handle('llamacpp:uninstall', async () => {
      try {
        const info = getLlamaCppInfo()
        await uninstallLlamaCpp()
        sendToRenderer('status:llamacpp', null)
        // Unregister OpenAI endpoint if it was running
        if (info.url) {
          sendToRenderer('connections:openai', {
            action: 'remove',
            url: `${info.url}/v1`
          })
          setTimeout(() => sendToRenderer('models:refresh'), 500)
        }
        await setConfig({ llamaCpp: { ...CONFIG?.llamaCpp, enabled: false } })
        CONFIG = await getConfig()
        return true
      } catch (error) {
        log.error('Failed to uninstall llamacpp:', error)
        return false
      }
    })

    // Hugging Face models
    ipcMain.handle('huggingface:models:list', () => listModels())
    ipcMain.handle('huggingface:models:dir', () => getModelsDir())
    ipcMain.handle('huggingface:models:delete', (_event, repo: string, filename: string) => {
      return deleteModel(repo, filename)
    })
    ipcMain.handle('huggingface:models:cancel', (_event, repo?: string, filename?: string) => {
      cancelDownload(repo, filename)
      return true
    })
    ipcMain.handle('huggingface:search', async (_event, query: string, token?: string) => {
      return searchModels(query, token)
    })
    ipcMain.handle('huggingface:repo:files', async (_event, repo: string, token?: string) => {
      return getRepoFiles(repo, token)
    })
    ipcMain.handle('huggingface:models:download', async (_event, repo: string, filename: string, token?: string, expectedSize?: number) => {
      try {
        sendToRenderer('status:huggingface-download', { repo, filename, status: 'downloading', percent: 0 })
        const filepath = await downloadModel(repo, filename, (progress) => {
          sendToRenderer('status:huggingface-download', {
            repo, filename,
            status: 'downloading',
            percent: progress.percent,
            downloadedBytes: progress.downloadedBytes,
            totalBytes: progress.totalBytes
          })
        }, token, expectedSize)
        sendToRenderer('status:huggingface-download', { repo, filename, status: 'done', filepath })
        return filepath
      } catch (error) {
        log.error('Failed to download model:', error)
        sendToRenderer('status:huggingface-download', { repo, filename, status: 'failed', error: error?.message })
        sendToRenderer('error', { message: `Model download failed: ${error?.message}` })
        return null
      }
    })

    ipcMain.handle('package:version', (_event, packageName: string) => getPackageVersion(packageName))
    ipcMain.handle('package:uninstall', async (_event, packageName: string) => {
      const result = uninstallPackage(packageName)
      // Notify renderer of install state change
      sendToRenderer('packages:changed', {
        'open-webui': isPackageInstalled('open-webui')
      })
      updateTray()
      return result
    })

    ipcMain.handle('dialog:selectFolder', async () => {
      const result = await dialog.showOpenDialog(mainWindow!, {
        properties: ['openDirectory']
      })
      return result.canceled ? null : result.filePaths[0] ?? null
    })

    ipcMain.handle('app:launchAtLogin:get', () => {
      return app.getLoginItemSettings().openAtLogin
    })
    ipcMain.handle('app:launchAtLogin:set', (_event, enabled: boolean) => {
      app.setLoginItemSettings({ openAtLogin: enabled })
    })

    ipcMain.handle('open:browser', async (_event, { url }) => {
      if (!url) throw new Error('No URL provided')
      let normalizedUrl = url
      if (normalizedUrl.startsWith('http://0.0.0.0')) {
        normalizedUrl = normalizedUrl.replace('http://0.0.0.0', 'http://localhost')
      }
      await openUrl(normalizedUrl)
    })

    ipcMain.handle('open:path', async (_event, folderPath: string) => {
      if (!folderPath) throw new Error('No path provided')
      await shell.openPath(folderPath)
    })

    ipcMain.handle('notification', async (_event, { title, body }) => {
      new Notification({ title, body }).show()
    })

    ipcMain.handle('llamacpp:check-update', async () => {
      try {
        return await checkLlamaCppUpdate()
      } catch (error) {
        log.error('Failed to check llamacpp update:', error)
        throw error
      }
    })

    ipcMain.handle('llamacpp:update', async () => {
      try {
        sendToRenderer('status:llamacpp', 'setting-up')
        const result = await updateLlamaCpp((status) => {
          sendToRenderer('status:llamacpp-setup', status)
        })
        sendToRenderer('status:llamacpp', 'ready')
        return result
      } catch (error) {
        log.error('Failed to update llamacpp:', error)
        sendToRenderer('status:llamacpp', 'failed')
        sendToRenderer('error', { message: `llamacpp update failed: ${error?.message}` })
        throw error
      }
    })

    // ─── Startup ──────────────────────────────────────

    // Create tray
    const trayIcon = nativeImage.createFromPath(icon)
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }))
    tray.setToolTip('인트리클로 AI')
    updateTray()



    // Global shortcut
    registerShortcuts(CONFIG.globalShortcut, CONFIG.spotlightShortcut, CONFIG.voiceInputShortcut, CONFIG.callShortcut)

    // Enable screen capture
    session.defaultSession.setDisplayMediaRequestHandler(
      (request, callback) => {
        desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
          callback({ video: sources[0], audio: 'loopback' })
        })
      },
      { useSystemPicker: true }
    )

    // Validate stale PIDs from previous crash
    validateOpenTerminalProcess()
    validateLlamaCppProcess()

    // Auto-start Open Terminal if previously enabled
    if (CONFIG?.openTerminal?.enabled) {
      try {
        sendToRenderer('status:open-terminal', 'starting')
        const result = await startOpenTerminal(CONFIG?.openTerminal?.port ?? null, (status) => {
          sendToRenderer('status:open-terminal-setup', status)
        })
        sendToRenderer('status:open-terminal', 'started')
        sendToRenderer('open-terminal:ready', result)
      } catch (error) {
        log.error('Auto-start Open Terminal failed:', error)
        sendToRenderer('status:open-terminal', 'failed')
      }
    }

    // Auto-start llama.cpp if previously enabled
    if (CONFIG?.llamaCpp?.enabled) {
      try {
        sendToRenderer('status:llamacpp', 'starting')
        const result = await startLlamaCpp((status) => {
          sendToRenderer('status:llamacpp-setup', status)
        })
        sendToRenderer('status:llamacpp', 'started')
        sendToRenderer('llamacpp:ready', result)
      } catch (error) {
        log.error('Auto-start llama.cpp failed:', error)
        sendToRenderer('status:llamacpp', 'failed')
      }
    }

    // Migrate legacy local connection entries out of the connections array
    if (CONFIG.connections.some((c) => c.type === 'local')) {
      CONFIG.connections = CONFIG.connections.filter((c) => c.type !== 'local')
      // Preserve 'local' as default if it was the default
      if (!CONFIG.defaultConnectionId || CONFIG.defaultConnectionId === 'local') {
        CONFIG.defaultConnectionId = 'local'
      }
      await setConfig(CONFIG)
      log.info('Migrated legacy local connection entry from connections array')
    }

    // 예전엔 여기서 마지막으로 쓰던 연결을 자동으로 다시 열었는데, 그러면
    // 시작화면(맨 처음 로그인 화면)을 매번 건너뛰고 곧장 그 연결의 (로그인
    // 안 된) 페이지로 가버렸다 — "왜 자꾸 각자 로그인 화면이 뜨냐"는 반복
    // 신고의 실제 원인. 이제 시작할 땐 항상 시작화면부터 보여준다(이미
    // SSO 자격증명이 저장돼 있으면 시작화면이 알아서 로그인 폼 대신
    // "연결을 선택하세요"만 보여주고, 실제 연결은 사이드바 클릭 한 번으로
    // 열림 — 그때도 이미 로그인된 세션이라 로그인 화면이 안 뜬다).
    //
    // 창을 띄우기 전에, 지금 사무실 안인지 밖인지 확인해서 NAS 주소를
    // 사내망/Tailscale 중 닿는 쪽으로 맞춰둔다(밖에서도 그대로 쓰려면 필요).
    // 최대 5초(2.5초 x 2) 걸리지만 그 뒤 모든 로그인/연결이 옳은 주소를 쓴다.
    await resolveNasHost().catch((err) => log.warn('resolveNasHost 실패:', err))
    CONFIG = await getConfig()
    createMainWindow()

    // Initialize auto-updater
    if (mainWindow) {
      initUpdater(mainWindow)
    }

    // Resume floating widget mode if it was enabled last session
    if (CONFIG.widgetMode) {
      showWidget()
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
      else {
        mainWindow?.show()
        mainWindow?.focus()
      }
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('before-quit', async () => {
    isQuiting = true
    await stopLlamaCpp()
    await stopOpenTerminal()
    await stopServerHandler()
    globalShortcut.unregisterAll()
    mainWindow = null
    contentWindow = null
    if (spotlightWindow && !spotlightWindow.isDestroyed()) {
      spotlightWindow.destroy()
    }
    spotlightWindow = null
    if (voiceInputWindow && !voiceInputWindow.isDestroyed()) {
      voiceInputWindow.destroy()
    }
    voiceInputWindow = null
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.destroy()
    }
    widgetWindow = null
    tray?.destroy()
    tray = null
  })
}
