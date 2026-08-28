<script lang="ts">
  import logoImage from '../lib/assets/images/splash.png'
  import { getConnectionPartition } from '../lib/connectionPartition'

  // Collapsed (icon) vs expanded (panel) — always starts collapsed; the
  // main process never persists the expanded state, only the docked
  // (icon) position (see widget:toggle in src/main/index.ts).
  let expanded = $state(false)
  let url = $state<string | null>(null)
  let partition = $state('persist:widget')

  const api = window.widgetAPI

  const toggle = async () => {
    const result = await api?.toggle()
    if (result) {
      expanded = result.expanded
      url = result.url
      // 메인 창의 같은 연결과 동일한 파티션을 써야 거기서 로그인한 세션을
      // 그대로 이어받는다 — 안 그러면 열 때마다 로그인 안 된 빈 세션이 뜬다.
      if (result.connectionId) {
        partition = getConnectionPartition(result.connectionId, result.connectionName)
      }
    }
  }

  // -webkit-app-region: drag 를 썼더니 Windows에서 마우스 이벤트 자체를
  // 창 시스템이 가로채서(OS 타이틀바 드래그처럼 처리) 렌더러 JS로 안
  // 넘어왔다 — 그래서 드래그(OS가 직접 처리)는 됐는데 클릭(JS 필요)은
  // 전혀 반응이 없었다. app-region은 아예 안 쓰고, 좌표 계산 + 창 이동을
  // 전부 여기서 직접 한다: pointerdown~up 사이 이동량이 작으면 클릭으로
  // 보고 toggle(), 크면 드래그로 보고 그동안 계속 widget:setPosition 호출.
  const CLICK_MOVE_THRESHOLD = 4
  let dragging = false
  let moved = false
  let dragStartScreenX = 0
  let dragStartScreenY = 0
  let winStartX = 0
  let winStartY = 0

  const handlePointerDown = async (e: PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    dragStartScreenX = e.screenX
    dragStartScreenY = e.screenY
    moved = false
    const pos = await api?.getPosition()
    winStartX = pos?.x ?? 0
    winStartY = pos?.y ?? 0
    dragging = true
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragging) return
    const dx = e.screenX - dragStartScreenX
    const dy = e.screenY - dragStartScreenY
    if (Math.abs(dx) >= CLICK_MOVE_THRESHOLD || Math.abs(dy) >= CLICK_MOVE_THRESHOLD) {
      moved = true
    }
    if (moved) {
      api?.setPosition(winStartX + dx, winStartY + dy)
    }
  }

  const handlePointerUp = () => {
    if (dragging && !moved) {
      toggle()
    }
    dragging = false
  }
</script>

{#if expanded}
  <div class="panel">
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
      class="panel-header"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
    >
      <img class="panel-logo" src={logoImage} alt="" />
      <span>인트리클로 AI</span>
    </div>
    <div class="panel-body">
      {#if url}
        <webview src={url} class="webview" {partition}></webview>
      {:else}
        <div class="empty">No connection configured yet. Open the main window to set one up.</div>
      {/if}
    </div>
  </div>
{:else}
  <button
    class="icon"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    aria-label="Open 인트리클로 AI widget"
  >
    <img src={logoImage} alt="" />
  </button>
{/if}

<style>
  :global(*) { margin: 0; padding: 0; box-sizing: border-box; }
  :global(html), :global(body), :global(#app) {
    height: 100%;
    width: 100%;
    background: transparent;
    overflow: hidden;
    user-select: none;
  }

  .icon {
    width: 64px;
    height: 64px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1d1d1f;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .icon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    pointer-events: none;
  }

  .panel {
    width: 360px;
    height: 520px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .panel-header {
    flex-shrink: 0;
    height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    cursor: pointer;
    background: #1d1d1f;
    color: #fafafa;
    font-size: 13px;
    font-weight: 600;
  }

  .panel-logo {
    width: 18px;
    height: 18px;
    object-fit: contain;
    pointer-events: none;
  }

  .panel-body {
    -webkit-app-region: no-drag;
    flex: 1;
    min-height: 0;
  }

  .webview {
    width: 100%;
    height: 100%;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 24px;
    text-align: center;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }
</style>
