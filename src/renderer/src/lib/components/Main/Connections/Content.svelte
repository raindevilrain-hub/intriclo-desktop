<script lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { config, serverInfo, appState } from '../../../stores'
  import i18n from '../../../i18n'
  import LocalInstall from '../../Setup/LocalInstall.svelte'
  import GetStartedModal from './GetStartedModal.svelte'
  import AddConnectionModal from './AddConnectionModal.svelte'
  import landingVideo from '../../../../assets/landing.mp4'
  import { getConnectionPartition } from '../../../connectionPartition'

  interface Props {
    sidebarOpen: boolean
    view: string
    activeConnectionId: string
    connectingId: string
    openConnections: Map<string, string>
    localConn: any
    localInstalled: boolean
    remoteConnections: any[]
    installPhase: string
    installError: string
    installStatus: string
    toastVisible: boolean
    url: string
    connecting: boolean
    error: string
    autoInstall: boolean
    onStartInstall: (options?: { installOpenTerminal?: boolean; installLlamaCpp?: boolean; installDir?: string }) => void
    onAddConnection: () => void
    onSetView: (v: string) => void
    showAddConnectionModal: boolean
    pendingAdminTab?: boolean
    nasAuthenticated?: boolean
    mailAuthenticated?: boolean
    onSsoLoggedIn?: () => void
  }

  let {
    sidebarOpen,
    view,
    activeConnectionId,
    connectingId,
    openConnections,
    localConn,
    localInstalled,
    remoteConnections,
    installPhase = $bindable('idle'),
    installError = $bindable(''),
    installStatus = $bindable(''),
    toastVisible = $bindable(false),
    url = $bindable(''),
    connecting = $bindable(false),
    error = $bindable(''),
    autoInstall = $bindable(false),
    onStartInstall,
    onAddConnection,
    onSetView,
    showAddConnectionModal = $bindable(false),
    pendingAdminTab = $bindable(false),
    nasAuthenticated = $bindable(false),
    mailAuthenticated = $bindable(false),
    onSsoLoggedIn
  }: Props = $props()

  // 시작 화면에 회사 계정 로그인을 바로 보여준다 — 설정 안에 묻혀 있어서
  // 못 찾는다는 피드백이 있어서, 아직 저장 안 됐으면 여기서 먼저 뜬다.
  let ssoSaved = $state<boolean | null>(null)
  let welcomeEmail = $state('')
  let welcomePassword = $state('')
  let welcomeSaving = $state(false)
  let welcomeError = $state('')

  // dom-ready 리스너(위)가 소비하는 일회성 값 — UI에 안 쓰이므로 $state 아님.
  let pendingNasToken: string | null = null

  onMount(async () => {
    try {
      const status = await window.electronAPI.ssoStatus?.()
      ssoSaved = status?.saved ?? false
    } catch {
      ssoSaved = false
    }
    // 저장된 자격증명이 있으면 조용히(폼 없이) 한 번 로그인을 시도해서
    // 두 서버 세션을 미리 만들어둔다 — 성공하면 사이드바 연결 클릭이 바로
    // 통한다. 실패하면(비번이 틀렸거나 등) 폼을 보여줘서 다시 입력받는다.
    if (ssoSaved) {
      try {
        const result = await window.electronAPI.ssoLoginSaved?.()
        applyLoginResult(result, true)
      } catch {
        welcomeError = '저장된 계정으로 로그인이 안 됐습니다. 아래에 다시 입력해주세요.'
      }
    }
  })

  // 둘 중 하나라도 실패하면 전체를 실패로 취급한다 — AI챗봇만 되고
  // Mail Assistant는 안 되는(또는 반대) 애매한 상태로 두지 않는다.
  const applyLoginResult = (result: any, silent: boolean) => {
    if (result?.nasToken && result?.mailOk) {
      pendingNasToken = result.nasToken
      nasAuthenticated = true
      mailAuthenticated = true
      welcomeError = ''
      return true
    }
    nasAuthenticated = false
    mailAuthenticated = false
    if (!result?.nasToken && !result?.mailOk) {
      welcomeError = silent
        ? '저장된 계정으로 로그인이 안 됐습니다. 아래에 다시 입력해주세요.'
        : '로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.'
    } else if (!result?.nasToken) {
      welcomeError = 'AI챗봇 로그인이 실패해서 전체 로그인을 취소했습니다(Mail Assistant는 정상이었음).'
    } else {
      welcomeError = 'Mail Assistant 로그인이 실패해서 전체 로그인을 취소했습니다(AI챗봇은 정상이었음).'
    }
    return false
  }

  const submitWelcomeLogin = async () => {
    if (!welcomeEmail.trim() || !welcomePassword) {
      welcomeError = '이메일과 비밀번호를 입력하세요.'
      return
    }
    welcomeSaving = true
    welcomeError = ''
    try {
      const result = await window.electronAPI.ssoLoginBoth(welcomeEmail.trim(), welcomePassword)
      welcomeEmail = ''
      welcomePassword = ''
      ssoSaved = true
      if (applyLoginResult(result, false)) {
        onSsoLoggedIn?.()
      }
    } catch (e: any) {
      welcomeError = '로그인 실패: ' + (e?.message ?? e)
    } finally {
      welcomeSaving = false
    }
  }

  // Mail Assistant 웹뷰에서 "관리자" 탭을 클릭하는 스크립트. 버튼이 없는
  // 일반 계정이면 querySelector가 null이라 조용히 무시된다.
  const ADMIN_TAB_CLICK_SCRIPT = `document.querySelector('.tab-btn[data-tab="admin"]')?.click()`

  // AI챗봇의 "Slack로 로그인" 버튼은 이 앱의 내장 웹뷰 안에서는 막다른 길이다
  // (Slack이 임베드된 창을 감지해서 로그인 화면에서 못 넘어가는 문제 — Slack DM을
  // 웹뷰 대신 slack:// 딥링크로 뺀 것과 같은 이유). 실수로 누르는 일이 없게
  // 아예 숨긴다. 이메일/비밀번호 로그인(SSO 자동 로그인 포함)은 영향 없음.
  const HIDE_SLACK_LOGIN_BUTTON_SCRIPT = `
    (function () {
      // 로그인 전(토큰 없음)에만 동작 — 로그인 후에는 손대지 않는다(앱 안 다른
      // 곳에 "Slack" 텍스트가 들어간 정상 버튼을 실수로 숨기지 않기 위함).
      const hide = () => {
        if (localStorage.getItem('token')) {
          window.__intricloHideSlackObserver?.disconnect()
          return
        }
        document.querySelectorAll('button, a').forEach((el) => {
          if (el.textContent && el.textContent.includes('Slack')) el.style.display = 'none'
        })
      }
      hide()
      if (!window.__intricloHideSlackObserver) {
        window.__intricloHideSlackObserver = new MutationObserver(hide)
        window.__intricloHideSlackObserver.observe(document.body, { childList: true, subtree: true })
      }
    })()
  `

  let showGetStartedModal = $state(false)

  // ── 회사 계정 자동 로그인 (SSO) ──────────────────────────────────
  // Settings 에서 이메일+비밀번호를 한 번 저장해두면, AI챗봇/Mail
  // Assistant 웹뷰가 로그인 페이지로 뜰 때마다 대신 채워서 제출한다.
  // 두 서버 모두 오늘 같은 이메일+비밀번호 계정으로 만들었기 때문에
  // 하나의 자격증명으로 양쪽 다 커버된다.
  // Returns the resolved SSO script result ('ok' means a reload/navigation
  // was just triggered) so callers can tell whether the page is about to
  // reload — or undefined if SSO didn't apply / wasn't attempted.
  async function attemptSsoLogin(wv: any, connId: string): Promise<string | undefined> {
    if (connId !== 'default-nas' && connId !== 'default-mail-assistant') return
    const creds = await window.electronAPI.ssoGetCredentials?.()
    if (!creds?.email || !creds?.password) return

    if (connId === 'default-nas') {
      const script = `
        (async () => {
          if (localStorage.getItem('token')) return 'already'
          try {
            const r = await fetch('/api/v1/auths/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: ${JSON.stringify(creds.email)}, password: ${JSON.stringify(creds.password)} })
            })
            if (!r.ok) return 'signin-failed:' + r.status
            const data = await r.json()
            if (!data.token) return 'no-token'
            localStorage.setItem('token', data.token)
            location.reload()
            return 'ok'
          } catch (e) { return 'error:' + e.message }
        })()
      `
      return wv.executeJavaScript(script).catch((e: any) => {
        console.warn('SSO(AI챗봇) 실패:', e)
        return undefined
      })
    } else {
      const script = `
        (async () => {
          if (!location.pathname.startsWith('/login')) return 'not-login-page'
          try {
            const r = await fetch('/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'same-origin',
              body: JSON.stringify({ username: ${JSON.stringify(creds.email)}, password: ${JSON.stringify(creds.password)} })
            })
            const data = await r.json()
            if (data.ok) { location.href = data.redirect || '/'; return 'ok' }
            return 'login-failed:' + (data.error || '')
          } catch (e) { return 'error:' + e.message }
        })()
      `
      return wv.executeJavaScript(script).catch((e: any) => {
        console.warn('SSO(Mail Assistant) 실패:', e)
        return undefined
      })
    }
  }

  const isInitializing = $derived($appState === 'initializing')
  const insufficientStorage = $derived(
    $appState?.startsWith('insufficient-storage:')
      ? $appState.split(':')[1]
      : null
  )
  const installFailed = $derived(
    $appState?.startsWith('install-failed:')
      ? $appState.substring('install-failed:'.length)
      : null
  )


  // Track webview loading per connection
  let webviewLoading: Map<string, boolean> = $state(new Map())

  // Track webview load errors per connection
  let webviewErrors: Map<string, { code: number; description: string; url: string }> = $state(new Map())

  // Content preload path for webview bridge
  let contentPreloadPath: string = $state('')

  // Electron's default webview UA includes "Electron/x.y.z" (and this app's
  // name/version), which some sites — e.g. Slack's OIDC login — treat as an
  // automation signal and respond to with an endless captcha/login loop.
  // Override with a plain desktop Chrome UA matching this Electron build's
  // actual Chromium version so the webview looks like a normal browser.
  const WEBVIEW_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.265 Safari/537.36'

  // Server is starting up (local)
  const serverStarting = $derived(
    localInstalled && (
      $serverInfo?.status === 'starting' ||
      ($serverInfo?.status === 'running' && !$serverInfo?.reachable)
    )
  )

  const activeWebviewError = $derived(
    view === 'connected' && activeConnectionId
      ? webviewErrors.get(activeConnectionId) ?? null
      : null
  )

  const isLoading = $derived(
    connectingId !== '' ||
    (serverStarting && activeConnectionId === 'local') ||
    (view === 'connected' && !activeWebviewError && webviewLoading.get(activeConnectionId) === true)
  )

  const retryActiveWebview = () => {
    const wv = document.querySelector(
      `webview[data-conn-id="${activeConnectionId}"]`
    ) as any
    if (wv?.reload) {
      webviewErrors.delete(activeConnectionId)
      webviewErrors = new Map(webviewErrors)
      wv.reload()
    }
  }

  const openActiveInBrowser = () => {
    const connUrl = openConnections.get(activeConnectionId)
    if (connUrl) {
      window.electronAPI.openInBrowser(connUrl)
    }
  }

  // Attach load event listeners and IPC forwarding to webviews
  onMount(async () => {
    // Fetch the content preload path once
    contentPreloadPath = await window.electronAPI.getContentPreloadPath()

    const observer = new MutationObserver(() => {
      const container = document.querySelector('.content-webview-container')
      if (!container) return
      const webviews = container.querySelectorAll('webview')
      webviews.forEach((wv: any) => {
        if (wv._loadListenerAttached) return
        wv._loadListenerAttached = true
        const connId = wv.getAttribute('data-conn-id') ?? ''
        if (!connId) return

        // Mark loading when navigation starts
        wv.addEventListener('did-start-loading', () => {
          webviewLoading.set(connId, true)
          webviewLoading = new Map(webviewLoading)
        })

        // Clear loading when done
        wv.addEventListener('did-stop-loading', () => {
          webviewLoading.set(connId, false)
          webviewLoading = new Map(webviewLoading)
        })

        // 시작화면 "한 번에 로그인"으로 미리 받아둔 AI챗봇 토큰을, 화면이
        // 그려지기 전(dom-ready — did-finish-load보다 이름) 시점에 넣어둔다.
        // 로그인 페이지가 아예 뜨는 일 없이 바로 로그인된 화면으로 열린다.
        if (connId === 'default-nas') {
          wv.addEventListener('dom-ready', () => {
            if (!pendingNasToken) return
            const token = pendingNasToken
            pendingNasToken = null
            wv.executeJavaScript(
              `localStorage.setItem('token', ${JSON.stringify(token)})`
            ).catch(() => {})
          })
        }

        // 메인 프레임 로드가 끝날 때마다 저장된 자격증명으로 자동 로그인을
        // 시도한다(이미 로그인돼 있으면 스크립트 안에서 조용히 스킵).
        // did-finish-load 는 did-stop-loading과 달리 실패한 로드에는 안 걸린다.
        wv.addEventListener('did-finish-load', async () => {
          if (connId === 'default-nas') {
            wv.executeJavaScript(HIDE_SLACK_LOGIN_BUTTON_SCRIPT).catch(() => {})
          }
          const ssoResult = await attemptSsoLogin(wv, connId)
          // 사이드바 "관리자" 버튼으로 열었을 때만 세팅되는 플래그. ssoResult
          // === 'ok' 면 로그인 성공 직후 페이지가 다시 이동(reload/redirect)
          // 중이라 지금 클릭해도 소용없다 — 그 다음 did-finish-load를 기다린다.
          if (connId === 'default-mail-assistant' && pendingAdminTab && ssoResult !== 'ok') {
            pendingAdminTab = false
            wv.executeJavaScript(ADMIN_TAB_CLICK_SCRIPT).catch(() => {})
          }
        })

        // Track load failures so we can show an error overlay
        wv.addEventListener('did-fail-load', (event: any) => {
          // Ignore sub-resource failures and aborted navigations (-3)
          if (event.errorCode === -3 || event.isMainFrame === false) return
          webviewErrors.set(connId, {
            code: event.errorCode,
            description: event.errorDescription || 'Unknown error',
            url: event.validatedURL || ''
          })
          webviewErrors = new Map(webviewErrors)
        })

        // Clear error when a navigation succeeds (retry, redirect, etc.)
        wv.addEventListener('did-navigate', () => {
          if (webviewErrors.has(connId)) {
            webviewErrors.delete(connId)
            webviewErrors = new Map(webviewErrors)
          }
        })

        // Renderer process crash
        wv.addEventListener('crashed', () => {
          webviewErrors.set(connId, {
            code: -1,
            description: 'crashed',
            url: ''
          })
          webviewErrors = new Map(webviewErrors)
        })

        // Log guest page console messages for debugging blank-page issues (#124)
        wv.addEventListener('console-message', (event: any) => {
          if (event.level >= 2) { // warnings and errors only
            console.warn(`[webview:${connId}]`, event.message)
          }
        })

        // If this webview was created before the preload path resolved
        // (race between auto-connect and async IPC), the preload didn't
        // attach.  Force a reload now so it picks up the correct preload.
        if (contentPreloadPath && wv.getAttribute('preload') !== contentPreloadPath) {
          wv.setAttribute('preload', contentPreloadPath)
          wv.reload()
        }

        // Handle IPC messages from the webview guest (Open WebUI → desktop)
        wv.addEventListener('ipc-message', async (event: any) => {
          if (event.channel === 'webview:send') {
            const requestData = event.args?.[0]
            if (!requestData) return

            // Handle auth token relay from webview
            if (requestData.type === 'token:update' && requestData.token) {
              window.electronAPI.setAuthToken?.(requestData.token)
              return
            }

            try {
              const response = await window.electronAPI[requestData.type]?.(requestData)
              if (requestData._requestId) {
                wv.send('desktop:response', {
                  _responseId: requestData._requestId,
                  data: response
                })
              }
            } catch (e) {
              console.error('webview:send handler error:', e)
            }
          } else if (event.channel === 'webview:load') {
            const page = event.args?.[0]
            if (page) onSetView(page === 'home' ? 'welcome' : page)
          } else if (event.channel === 'webview:event') {
            const payload = event.args?.[0]
            if (!payload?.type) return

            if (payload.type === 'theme:update') {
              const webuiTheme = payload.data?.theme ?? 'system'

              // Map Open WebUI theme names to desktop-compatible values
              let desktopTheme: string
              if (webuiTheme === 'system') {
                desktopTheme = 'system'
              } else if (webuiTheme.includes('dark')) {
                desktopTheme = 'dark'
              } else {
                desktopTheme = 'light'
              }

              // Resolve and apply CSS class
              let resolved = desktopTheme
              if (desktopTheme === 'system') {
                resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
              }
              document.documentElement.classList.remove('light', 'dark')
              document.documentElement.classList.add(resolved)

              // Persist to desktop config
              await window.electronAPI.setConfig({ theme: desktopTheme })
              config.set(await window.electronAPI.getConfig())
            }
          }
        })
      })
    })

    const target = document.querySelector('.content-webview-container')
    if (target) {
      observer.observe(target, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  })
</script>

<div
  class="flex-1 flex flex-col min-w-0 overflow-clip bg-[#eee] dark:bg-[#111] border-t relative content-webview-container {sidebarOpen
    ? 'border-l border-black/[0.08] dark:border-white/[0.08] rounded-tl-xl'
    : 'border-black/[0.08] dark:border-white/[0.10]'}"
>
  <!-- Webviews — all open connections stay alive, only active one visible -->
  {#each [...openConnections] as [connId, connUrl] (connId)}
    <webview
      src={connUrl}
      class="flex-1 min-h-0 border-none"
      style="display: {view === 'connected' && activeConnectionId === connId ? 'flex' : 'none'}"
      data-conn-id={connId}
      partition={getConnectionPartition(connId, remoteConnections.find((c) => c.id === connId)?.name)}
      preload={contentPreloadPath}
      useragent={WEBVIEW_USER_AGENT}
      allowpopups
    ></webview>
  {/each}

  <!-- Error overlay when webview fails to load -->
  {#if activeWebviewError}
    <div class="absolute inset-0 z-20 flex items-center justify-center bg-[#eee] dark:bg-[#111]" transition:fade={{ duration: 200 }}>
      <div class="text-center max-w-sm px-6">
        <div class="mx-auto mb-4 w-10 h-10 rounded-full bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center">
          {#if activeWebviewError.code === -1}
            <svg class="w-5 h-5 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          {:else}
            <svg class="w-5 h-5 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          {/if}
        </div>
        <div class="text-[14px] font-medium mb-1 opacity-80">
          {activeWebviewError.code === -1 ? $i18n.t('setup.pageCrashed') : $i18n.t('setup.couldNotLoadPage')}
        </div>
        <div class="text-[12px] opacity-30 mb-1">{activeWebviewError.description}</div>
        {#if activeWebviewError.url}
          <div class="text-[11px] opacity-20 mb-6 break-all font-mono">{activeWebviewError.url}</div>
        {:else}
          <div class="mb-6"></div>
        {/if}
        <div class="flex gap-2 justify-center">
          <button
            class="px-4 py-2 rounded-xl text-[13px] font-medium bg-black dark:bg-white text-white dark:text-black border-none cursor-pointer transition hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-[0.98]"
            onclick={retryActiveWebview}
          >
            {$i18n.t('common.retry')}
          </button>
          <button
            class="px-4 py-2 rounded-xl text-[13px] bg-black/[0.04] dark:bg-white/[0.06] text-[#1d1d1f] dark:text-[#fafafa] border-none cursor-pointer opacity-60 hover:opacity-90 transition active:scale-[0.98]"
            onclick={openActiveInBrowser}
          >
            {$i18n.t('setup.openInBrowser')}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Loading overlay for webview -->
  {#if isLoading}
    <div class="absolute inset-0 z-10 flex items-center justify-center bg-[#eee] dark:bg-[#111]" transition:fade={{ duration: 200 }}>
      <div class="flex flex-col items-center gap-3">
        <div class="w-6 h-6 rounded-full border-2 border-black/10 dark:border-white/15 border-t-black/50 dark:border-t-white/50 animate-spin"></div>
        <span class="text-[11px] opacity-30">{$i18n.t('common.loading')}</span>
      </div>
    </div>
  {/if}

  {#if view !== 'connected'}
    {#if insufficientStorage}
      <div class="px-5 py-2.5 flex items-center gap-3 bg-red-500/[0.06] border-b border-red-500/10">
        <div class="flex-1">
          <div class="text-[12px] text-red-400 font-medium">{$i18n.t('main.notEnoughDiskSpace')}</div>
          <div class="text-[11px] opacity-40 mt-0.5">
            {$i18n.t('main.diskSpaceRequired', { available: insufficientStorage })}
          </div>
        </div>
        <button
          class="shrink-0 text-[11px] px-3 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] opacity-60 hover:opacity-90 transition border-none text-[#1d1d1f] dark:text-[#fafafa] cursor-pointer"
          onclick={async () => {
            const MINIMUM_DISK_BYTES = 5 * 1024 * 1024 * 1024
            const disk = await window.electronAPI.getDiskSpace()
            if (disk?.free >= 0 && disk.free < MINIMUM_DISK_BYTES) {
              const gb = (disk.free / (1024 * 1024 * 1024)).toFixed(1)
              appState.set(`insufficient-storage:${gb}`)
              return
            }
            appState.set('initializing')
            window.electronAPI.installPython().then(() => appState.set('ready')).catch((e: any) => {
              appState.set(`install-failed:${e?.message || 'Python installation failed. Please try again.'}`)
            })
          }}
        >
          {$i18n.t('common.retry')}
        </button>
      </div>
    {:else if installFailed}
      <div class="px-5 py-2.5 flex items-center gap-3 bg-red-500/[0.06] border-b border-red-500/10">
        <div class="flex-1">
          <div class="text-[12px] text-red-400 font-medium">{$i18n.t('error.installFailedGeneric')}</div>
          <div class="text-[11px] opacity-40 mt-0.5 line-clamp-2">
            {installFailed}
          </div>
        </div>
        <button
          class="shrink-0 text-[11px] px-3 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] opacity-60 hover:opacity-90 transition border-none text-[#1d1d1f] dark:text-[#fafafa] cursor-pointer"
          onclick={async () => {
            const MINIMUM_DISK_BYTES = 5 * 1024 * 1024 * 1024
            const disk = await window.electronAPI.getDiskSpace()
            if (disk?.free >= 0 && disk.free < MINIMUM_DISK_BYTES) {
              const gb = (disk.free / (1024 * 1024 * 1024)).toFixed(1)
              appState.set(`insufficient-storage:${gb}`)
              return
            }
            appState.set('initializing')
            window.electronAPI.installPython().then(() => appState.set('ready')).catch((e: any) => {
              appState.set(`install-failed:${e?.message || 'Python installation failed. Please try again.'}`)
            })
          }}
        >
          {$i18n.t('common.retry')}
        </button>
      </div>
    {:else if isInitializing}
      <div class="px-5 py-1.5 text-[11px] opacity-25">
        {$i18n.t('setup.settingUp')}{$serverInfo?.status ? ` ${$serverInfo.status}` : ''}
      </div>
    {/if}

    <div class="flex-1 flex items-center justify-center px-6 relative overflow-hidden">
      {#if view === 'welcome'}
        {#if remoteConnections.length > 0 || localInstalled}
          <div class="text-center max-w-[320px]" in:fade={{ duration: 200 }}>
            <div class="text-lg opacity-80 mb-1.5">{$i18n.t('app.name')}</div>

            {#if ssoSaved !== null}
              <div class="text-left mt-3 mb-6 p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
                <div class="text-[13px] font-medium">회사 계정으로 한 번에 로그인</div>
                <div class="text-[11px] opacity-40 mt-0.5 mb-3">
                  AI챗봇 + Mail Assistant 둘 다 자동으로 로그인됩니다.
                </div>
                {#if ssoSaved}
                  <div class="text-[11px] opacity-40 mb-2">
                    저장된 계정이 있지만, 로그인이 안 되면 아래에 다시 입력하고 눌러주세요(기존 정보를 덮어씁니다).
                  </div>
                {/if}
                <form
                  class="flex flex-col gap-2"
                  onsubmit={(e) => {
                    e.preventDefault()
                    submitWelcomeLogin()
                  }}
                >
                  <input
                    type="email"
                    placeholder="이메일"
                    autocomplete="username"
                    bind:value={welcomeEmail}
                    class="bg-black/[0.04] dark:bg-white/[0.06] text-[12px] px-3 py-1.5 border-none outline-none rounded-xl"
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    autocomplete="current-password"
                    bind:value={welcomePassword}
                    class="bg-black/[0.04] dark:bg-white/[0.06] text-[12px] px-3 py-1.5 border-none outline-none rounded-xl"
                  />
                  {#if welcomeError}
                    <div class="text-[11px] text-red-400">{welcomeError}</div>
                  {/if}
                  <button
                    type="submit"
                    disabled={welcomeSaving}
                    class="px-3 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[12px] disabled:opacity-40 border-none"
                  >
                    {welcomeSaving ? '로그인 중…' : '로그인'}
                  </button>
                </form>
              </div>
            {:else}
              <div class="text-[12px] opacity-30 mb-6">
                {$i18n.t('main.selectConnection')}
              </div>
            {/if}
          </div>
        {:else}
          <!-- Theme-responsive hero section -->
          <div class="absolute inset-0 bg-[#fafafa] dark:bg-[#111]">
            <!-- Video background -->
            <video
              autoplay
              muted
              loop
              playsinline
              class="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-40 pointer-events-none"
            >
              <source src={landingVideo} type="video/mp4" />
            </video>

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#fafafa] dark:from-[#111] via-[#fafafa]/30 dark:via-[#111]/30 to-transparent pointer-events-none"></div>

            <!-- Content positioned bottom-left -->
            <div class="absolute bottom-0 left-0 right-0 p-10" in:fade={{ duration: 300 }}>
              <div class="max-w-sm">
                <div class="text-3xl font-medium mb-3 tracking-tight text-[#1d1d1f] dark:text-[#fafafa]">{$i18n.t('app.name')}</div>
                <div class="text-base opacity-50 mb-8 leading-relaxed text-[#1d1d1f] dark:text-[#fafafa]">
                  {$i18n.t('main.heroDescription')}
                </div>

                {#if !localInstalled}
                  <button
                    class="inline-flex items-center gap-2 bg-black dark:bg-white px-6 py-2 rounded-xl text-white dark:text-black text-[13px] transition hover:bg-gray-800 dark:hover:bg-gray-100 border-none disabled:opacity-50"
                    onclick={() => {
                      if (installPhase === 'error') {
                        onStartInstall()
                      } else {
                        showGetStartedModal = true
                      }
                    }}
                    disabled={installPhase === 'working'}
                  >
                    {#if installPhase === 'working'}
                      <div class="w-3.5 h-3.5 rounded-full border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black animate-spin"></div>
                      {$i18n.t('common.installing')}
                    {:else if installPhase === 'error'}
                      {$i18n.t('common.retry')}
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M20.015 4.356v4.992m0 0h-4.992m4.993 0l-3.181-3.183a8.25 8.25 0 00-13.803 3.7" />
                      </svg>
                    {:else}
                      {$i18n.t('main.getStarted')}
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    {/if}
                  </button>

                  {#if installPhase === 'working' && installStatus}
                    <div class="mt-3 text-[12px] opacity-40 font-mono line-clamp-1" in:fade={{ duration: 200 }}>
                      {installStatus}
                    </div>
                  {/if}
                {/if}

                {#if installPhase !== 'working'}
                <div class="mt-6">
                  <button
                    class="text-sm opacity-40 hover:opacity-70 transition bg-transparent border-none text-[#1d1d1f] dark:text-[#fafafa]"
                    onclick={() => { showAddConnectionModal = true }}
                  >
                    {$i18n.t('setup.connectToServer')}
                  </button>
                </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}

        <!-- Error toast -->
        {#if toastVisible && installError}
          <div
            class="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 backdrop-blur-sm text-white text-[12px] px-4 py-2 rounded-xl shadow-lg"
            in:fly={{ y: -10, duration: 200 }}
            out:fade={{ duration: 150 }}
          >
            {installError}
          </div>
        {/if}
      {:else if view === 'install'}
        <div class="w-full max-w-[260px]">
          <LocalInstall
            autoStart={autoInstall}
            onBack={() => { autoInstall = false; onSetView('welcome') }}
            onComplete={async () => {
              config.set(await window.electronAPI.getConfig())
              onSetView('welcome')
            }}
          />
        </div>
      {/if}
    </div>
  {/if}

  {#if showGetStartedModal}
    <GetStartedModal
      onContinue={(options) => {
        showGetStartedModal = false
        onStartInstall(options)
      }}
      onCancel={() => { showGetStartedModal = false }}
    />
  {/if}

  {#if showAddConnectionModal}
    <AddConnectionModal
      bind:url
      bind:connecting
      bind:error
      onConnect={() => {
        onAddConnection()
      }}
      onCancel={() => {
        showAddConnectionModal = false
        error = ''
      }}
    />
  {/if}
</div>
