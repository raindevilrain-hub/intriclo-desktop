<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { onMount } from 'svelte'

  interface Person {
    id: string
    name: string
    email: string
  }

  interface Props {
    onCancel: () => void
  }

  let { onCancel }: Props = $props()

  let loading = $state(true)
  let needsSso = $state(false)
  let teamId = $state('')
  let members = $state<Person[]>([])
  let query = $state('')

  const filtered = $derived(
    query.trim()
      ? members.filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.email.toLowerCase().includes(query.toLowerCase())
        )
      : members
  )

  onMount(async () => {
    const result = await window.electronAPI.slackGetMembers?.()
    needsSso = result?.needsSso ?? false
    teamId = result?.teamId ?? ''
    members = (result?.members ?? []).sort((a: Person, b: Person) => a.name.localeCompare(b.name, 'ko'))
    loading = false
  })

  const openDm = (person: Person) => {
    // team 파라미터 없이도 마지막에 쓰던 워크스페이스 기준으로 열리지만,
    // 팀 id가 있으면 명시해서 여러 워크스페이스에 걸쳐 있어도 헷갈리지 않게 한다.
    const url = teamId
      ? `slack://user?team=${teamId}&id=${person.id}`
      : `slack://user?id=${person.id}`
    window.electronAPI.openExternal(url)
    onCancel()
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 z-[100] flex items-center justify-center"
  transition:fade={{ duration: 150 }}
  onmousedown={onCancel}
>
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <div
    class="relative mx-4 w-full max-w-sm max-h-[70vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-950"
    transition:scale={{ start: 0.97, duration: 180 }}
    onmousedown={(e) => e.stopPropagation()}
  >
    <div class="px-5 pt-5 pb-3">
      <h2 class="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#fafafa]">슬랙 DM 열기</h2>
      <input
        type="text"
        bind:value={query}
        placeholder="이름 또는 이메일로 검색"
        class="w-full mt-3 py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-30 outline-none bg-black/[0.04] dark:bg-white/[0.06] border-none rounded-xl px-3"
      />
    </div>

    <div class="flex-1 overflow-y-auto px-2 pb-3">
      {#if loading}
        <div class="py-8 text-center text-[12px] opacity-40">불러오는 중…</div>
      {:else if needsSso}
        <div class="py-8 px-4 text-center text-[12px] opacity-50">
          Settings &gt; 회사 계정 자동 로그인을 먼저 저장해야 인원 목록을 불러올 수 있어요.
        </div>
      {:else if filtered.length === 0}
        <div class="py-8 text-center text-[12px] opacity-40">결과 없음</div>
      {:else}
        {#each filtered as person (person.id)}
          <button
            class="w-full flex flex-col items-start px-3 py-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-left bg-transparent border-none cursor-pointer"
            onclick={() => openDm(person)}
          >
            <span class="text-[13px] text-[#1d1d1f] dark:text-[#fafafa]">{person.name}</span>
            {#if person.email}
              <span class="text-[11px] opacity-40">{person.email}</span>
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  </div>
</div>
