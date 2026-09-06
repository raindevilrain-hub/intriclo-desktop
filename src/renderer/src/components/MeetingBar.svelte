<script lang="ts">
  // 별도 always-on-top 바 창. 녹음은 메인 창에서 돌고, 여기선 경과시간만
  // 비추고 펼치기/종료 신호를 메인 프로세스로 되돌린다. (승인된 미리보기
  // 디자인 그대로 — 인앱 최소화 바 마크업과 동일한 색/구조)
  const api = window.meetingBarAPI

  let elapsed = $state(0)
  let phase = $state('recording')

  api?.onUpdate((d) => {
    elapsed = d.elapsed
    phase = d.phase
  })

  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  // 프레임 없는 창을 좌표로 직접 이동(VoiceInput 창과 동일 방식). 드래그는
  // 좌측 정보 영역에서만 시작해 버튼 클릭과 섞이지 않게 한다.
  let dragging = false
  let dragStart = { mx: 0, my: 0, wx: 0, wy: 0 }
  const onMouseDown = (e: MouseEvent): void => {
    dragging = true
    dragStart = { mx: e.screenX, my: e.screenY, wx: window.screenX, wy: window.screenY }
  }
  const onMouseMove = (e: MouseEvent): void => {
    if (!dragging) return
    window.moveTo(
      dragStart.wx + (e.screenX - dragStart.mx),
      dragStart.wy + (e.screenY - dragStart.my)
    )
  }
  const onMouseUp = (): void => {
    dragging = false
  }
</script>

<svelte:window onmousemove={onMouseMove} onmouseup={onMouseUp} />

<div class="bar">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="drag" onmousedown={onMouseDown}>
    <span class="dot">
      <span class="ping"></span>
      <span class="core"></span>
    </span>
    <div class="info">
      <div class="time">{formatTime(elapsed)}</div>
      <div class="sub">녹음 중 · 자막 기록 중</div>
    </div>
  </div>

  <button class="expand" title="펼치기" aria-label="펼치기" onclick={() => api?.expand()}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  </button>

  <button class="stop" title="녹음 종료" onclick={() => api?.stop()}>
    <span class="stop-icon"></span>
    종료
  </button>
</div>

<style>
  :global(*) { margin: 0; padding: 0; box-sizing: border-box; }
  :global(html), :global(body), :global(#app) {
    height: 100%;
    width: 100%;
    background: transparent;
    overflow: hidden;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 44px;
    margin: 6px;
    padding: 0 8px 0 14px;
    border-radius: 9999px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }

  .drag {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    height: 100%;
    cursor: grab;
  }

  .dot {
    position: relative;
    display: inline-flex;
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }
  .ping {
    position: absolute;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
    background: #ef4444;
    opacity: 0.6;
    animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .core {
    position: relative;
    display: inline-flex;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ef4444;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  .info { line-height: 1.15; }
  .time {
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #1d1d1f;
  }
  .sub {
    font-size: 11px;
    margin-top: 1px;
    color: rgba(29, 29, 31, 0.4);
    white-space: nowrap;
  }

  .expand {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: #1d1d1f;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s;
  }
  .expand:hover { opacity: 1; background: rgba(0, 0, 0, 0.06); }
  .expand svg { width: 16px; height: 16px; }

  .stop {
    height: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    border: none;
    border-radius: 9999px;
    background: #ef4444;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: filter 0.15s;
  }
  .stop:hover { filter: brightness(0.95); }
  .stop-icon {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .bar {
      background: #030712;
      border-color: rgba(255, 255, 255, 0.1);
    }
    .time { color: #fafafa; }
    .sub { color: rgba(250, 250, 250, 0.4); }
    .expand { color: #fafafa; }
    .expand:hover { background: rgba(255, 255, 255, 0.08); }
  }
</style>
