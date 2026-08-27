<script lang="ts">
  import logoImage from '../lib/assets/images/splash.png'

  // Collapsed (icon) vs expanded (panel) — always starts collapsed; the
  // main process never persists the expanded state, only the docked
  // (icon) position (see widget:toggle in src/main/index.ts).
  let expanded = $state(false)
  let url = $state<string | null>(null)

  const api = window.widgetAPI

  const toggle = async () => {
    const result = await api?.toggle()
    if (result) {
      expanded = result.expanded
      url = result.url
    }
  }
</script>

{#if expanded}
  <div class="panel">
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="panel-header" onclick={toggle}>
      <img class="panel-logo" src={logoImage} alt="" />
      <span>인트리클로 AI</span>
    </div>
    <div class="panel-body">
      {#if url}
        <webview src={url} class="webview" partition="persist:widget"></webview>
      {:else}
        <div class="empty">No connection configured yet. Open the main window to set one up.</div>
      {/if}
    </div>
  </div>
{:else}
  <button class="icon" onclick={toggle} aria-label="Open 인트리클로 AI widget">
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
    -webkit-app-region: drag;
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
    -webkit-app-region: drag;
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
