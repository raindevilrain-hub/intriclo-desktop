<script lang="ts">
  import { connections, config } from '../../../stores'
  import i18n from '../../../i18n'

  let mailAssistantUrl = $state('')
  let slackUrl = $state('')

  $effect(() => {
    mailAssistantUrl = $config?.mailAssistantUrl ?? ''
    slackUrl = $config?.slackUrl ?? ''
  })

  const remove = async (id: string) => {
    await window.electronAPI.removeConnection(id)
    config.set(await window.electronAPI.getConfig())
  }

  const saveMailAssistantUrl = async () => {
    await window.electronAPI.setConfig({ mailAssistantUrl: mailAssistantUrl.trim() })
    config.set(await window.electronAPI.getConfig())
  }

  // Mail Assistant is just a second Connection (own webview partition ⇒
  // own login/session, isolated from Open WebUI) pointed at the URL
  // configured above — no new sidebar/webview plumbing needed.
  const mailAssistantAdded = $derived(
    ($connections ?? []).some((c) => c.url === mailAssistantUrl && mailAssistantUrl !== '')
  )

  const addMailAssistant = async () => {
    if (!mailAssistantUrl.trim() || mailAssistantAdded) return
    await window.electronAPI.addConnection({
      id: crypto.randomUUID(),
      name: 'Mail Assistant',
      type: 'remote',
      url: mailAssistantUrl.trim()
    })
    config.set(await window.electronAPI.getConfig())
  }

  const saveSlackUrl = async () => {
    await window.electronAPI.setConfig({ slackUrl: slackUrl.trim() })
    config.set(await window.electronAPI.getConfig())
  }

  // Slack DM is also just a second/third Connection (own webview partition ⇒
  // own login/session) pointed at the URL configured above — same pattern
  // as Mail Assistant, no new sidebar/webview plumbing needed.
  const slackAdded = $derived(($connections ?? []).some((c) => c.url === slackUrl && slackUrl !== ''))

  const addSlack = async () => {
    if (!slackUrl.trim() || slackAdded) return
    await window.electronAPI.addConnection({
      id: crypto.randomUUID(),
      name: 'Slack',
      type: 'remote',
      url: slackUrl.trim()
    })
    config.set(await window.electronAPI.getConfig())
  }
</script>

<div class="pb-4 mb-1 border-b border-white/[0.04]">
  <label class="block text-[11px] text-gray-400 dark:text-gray-500 mb-1.5"
    >{$i18n.t('settings.connections.mailAssistantUrl')}</label
  >
  <div class="flex items-center gap-2">
    <input
      type="text"
      bind:value={mailAssistantUrl}
      onblur={saveMailAssistantUrl}
      onkeydown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
      placeholder={$i18n.t('settings.connections.mailAssistantUrlPlaceholder')}
      class="flex-1 py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-20 outline-none bg-transparent border-none border-b border-black/[0.08] dark:border-white/[0.08]"
    />
    <button
      class="shrink-0 text-[11px] px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] opacity-60 hover:opacity-90 transition border-none text-[#1d1d1f] dark:text-[#fafafa] cursor-pointer disabled:opacity-20 disabled:cursor-default"
      onclick={addMailAssistant}
      disabled={!mailAssistantUrl.trim() || mailAssistantAdded}
    >
      {mailAssistantAdded
        ? $i18n.t('settings.connections.mailAssistantAdded')
        : $i18n.t('settings.connections.addMailAssistant')}
    </button>
  </div>
</div>

<div class="pb-4 mb-1 border-b border-white/[0.04]">
  <label class="block text-[11px] text-gray-400 dark:text-gray-500 mb-1.5"
    >{$i18n.t('settings.connections.slackUrl')}</label
  >
  <div class="flex items-center gap-2">
    <input
      type="text"
      bind:value={slackUrl}
      onblur={saveSlackUrl}
      onkeydown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
      placeholder={$i18n.t('settings.connections.slackUrlPlaceholder')}
      class="flex-1 py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-20 outline-none bg-transparent border-none border-b border-black/[0.08] dark:border-white/[0.08]"
    />
    <button
      class="shrink-0 text-[11px] px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] opacity-60 hover:opacity-90 transition border-none text-[#1d1d1f] dark:text-[#fafafa] cursor-pointer disabled:opacity-20 disabled:cursor-default"
      onclick={addSlack}
      disabled={!slackUrl.trim() || slackAdded}
    >
      {slackAdded ? $i18n.t('settings.connections.slackAdded') : $i18n.t('settings.connections.addSlack')}
    </button>
  </div>
</div>

<div class="flex flex-col divide-y divide-white/[0.04]">
  {#each $connections as conn}
    <div class="py-3 flex items-center justify-between">
      <div class="flex items-center gap-2.5 min-w-0">
        <svg
          class="w-[14px] h-[14px] shrink-0 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          {#if conn.type === 'local'}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"
            />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          {/if}
        </svg>
        <div class="min-w-0">
          <div class="text-[13px] opacity-70 truncate">{conn.name}</div>
          <div class="text-[11px] opacity-25 truncate mt-0.5">{conn.url}</div>
        </div>
      </div>
      <button
        class="text-[11px] opacity-30 hover:opacity-60 px-2 py-1 bg-transparent transition border-none text-[#1d1d1f] dark:text-[#fafafa] shrink-0"
        onclick={() => remove(conn.id)}
      >
        {$i18n.t('common.remove')}
      </button>
    </div>
  {/each}

  {#if ($connections ?? []).length === 0}
    <div class="py-6 text-[12px] opacity-20 text-center">{$i18n.t('settings.connections.noConnections')}</div>
  {/if}
</div>
