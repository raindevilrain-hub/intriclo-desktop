<script lang="ts">
  import { fade, scale } from 'svelte/transition'

  interface Props {
    onClose: () => void
  }

  let { onClose }: Props = $props()

  type Phase = 'idle' | 'recording' | 'uploading' | 'done' | 'error'

  let phase = $state<Phase>('idle')
  let title = $state('')
  let elapsedSec = $state(0)
  let errorMsg = $state('')
  let result = $state<{ summary?: string; saved_to_kb?: boolean; slack_dm_sent?: boolean } | null>(null)

  let mediaRecorder: MediaRecorder | null = null
  let chunks: Blob[] = []
  let allStreams: MediaStream[] = []
  let audioContext: AudioContext | null = null
  let timerHandle: ReturnType<typeof setInterval> | null = null

  const stopAllTracks = () => {
    for (const s of allStreams) {
      for (const t of s.getTracks()) t.stop()
    }
    allStreams = []
    audioContext?.close().catch(() => {})
    audioContext = null
  }

  const startRecording = async () => {
    errorMsg = ''
    try {
      // 마이크(내 목소리)와 시스템 오디오 루프백(상대방 목소리 등 스피커로
      // 나가는 소리)를 각각 잡아서 Web Audio API로 하나로 섞는다. 시스템
      // 오디오 쪽은 main 프로세스의 setDisplayMediaRequestHandler 가 화면
      // 선택 UI 없이 바로 응답해준다(Windows 전용).
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      let systemStream: MediaStream | null = null
      try {
        systemStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: false } as any)
      } catch (e) {
        console.warn('시스템 오디오 캡처 실패 (마이크만으로 계속):', e)
      }
      allStreams = systemStream ? [micStream, systemStream] : [micStream]

      audioContext = new AudioContext()
      const dest = audioContext.createMediaStreamDestination()
      for (const s of allStreams) {
        if (s.getAudioTracks().length === 0) continue
        audioContext.createMediaStreamSource(s).connect(dest)
      }

      chunks = []
      mediaRecorder = new MediaRecorder(dest.stream, { mimeType: 'audio/webm;codecs=opus' })
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }
      mediaRecorder.start(1000)

      phase = 'recording'
      elapsedSec = 0
      timerHandle = setInterval(() => (elapsedSec += 1), 1000)
    } catch (e: any) {
      errorMsg = '녹음을 시작하지 못했습니다: ' + (e?.message ?? e)
      phase = 'error'
      stopAllTracks()
    }
  }

  const stopRecording = async () => {
    if (!mediaRecorder) return
    if (timerHandle) clearInterval(timerHandle)

    const stopped = new Promise<void>((resolve) => {
      mediaRecorder!.onstop = () => resolve()
    })
    mediaRecorder.stop()
    await stopped
    stopAllTracks()

    phase = 'uploading'
    try {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const buf = await blob.arrayBuffer()
      const res = await window.electronAPI.meetingUpload(title, buf, 'audio/webm')
      if (res?.ok) {
        result = res
        phase = 'done'
      } else {
        errorMsg = res?.error || '알 수 없는 오류'
        phase = 'error'
      }
    } catch (e: any) {
      errorMsg = String(e?.message ?? e)
      phase = 'error'
    }
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const close = () => {
    if (phase === 'recording') {
      if (!confirm('녹음 중입니다. 저장하지 않고 닫을까요?')) return
      mediaRecorder?.stop()
      stopAllTracks()
      if (timerHandle) clearInterval(timerHandle)
    }
    onClose()
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 z-[100] flex items-center justify-center"
  transition:fade={{ duration: 150 }}
  onmousedown={phase === 'idle' || phase === 'done' || phase === 'error' ? close : undefined}
>
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <div
    class="relative mx-4 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-950 px-6 py-6"
    transition:scale={{ start: 0.97, duration: 180 }}
    onmousedown={(e) => e.stopPropagation()}
  >
    <h2 class="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#fafafa]">회의 녹음</h2>

    {#if phase === 'idle'}
      <p class="mt-1 text-[11px] opacity-40">내 마이크 + 시스템 오디오를 함께 녹음합니다.</p>
      <input
        type="text"
        bind:value={title}
        placeholder="회의 제목 (선택)"
        class="w-full mt-4 py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-30 outline-none bg-black/[0.04] dark:bg-white/[0.06] border-none rounded-xl px-3"
      />
      <button
        class="w-full mt-4 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 transition-all active:scale-[0.98] border-none cursor-pointer"
        onclick={startRecording}
      >
        녹음 시작
      </button>
    {:else if phase === 'recording'}
      <div class="mt-6 flex flex-col items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <div class="text-2xl font-mono text-[#1d1d1f] dark:text-[#fafafa]">{formatTime(elapsedSec)}</div>
        <button
          class="w-full mt-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-[0.98] border-none cursor-pointer"
          onclick={stopRecording}
        >
          녹음 종료 및 정리
        </button>
      </div>
    {:else if phase === 'uploading'}
      <div class="mt-6 flex flex-col items-center gap-3 py-4">
        <span
          class="w-6 h-6 rounded-full border-2 border-black/10 dark:border-white/10 border-t-black/60 dark:border-t-white/60 animate-spin inline-block"
        ></span>
        <p class="text-[12px] opacity-50">전사하고 정리하는 중… (몇 분 걸릴 수 있어요)</p>
      </div>
    {:else if phase === 'done'}
      <div class="mt-4">
        <p class="text-[12px] text-green-600 dark:text-green-400">
          완료됐어요{result?.slack_dm_sent ? ' — 슬랙 DM으로 보냈어요' : ''}{result?.saved_to_kb
            ? ', 지식베이스에도 저장했어요'
            : ''}.
        </p>
        {#if result?.summary}
          <pre class="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap text-[12px] opacity-70 bg-black/[0.03] dark:bg-white/[0.04] rounded-xl p-3">{result.summary}</pre>
        {/if}
        <button
          class="w-full mt-4 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] px-4 py-2 text-sm opacity-70 transition-all border-none cursor-pointer"
          onclick={close}
        >
          닫기
        </button>
      </div>
    {:else if phase === 'error'}
      <div class="mt-4">
        <p class="text-[12px] text-red-500">{errorMsg}</p>
        <button
          class="w-full mt-4 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] px-4 py-2 text-sm opacity-70 transition-all border-none cursor-pointer"
          onclick={close}
        >
          닫기
        </button>
      </div>
    {/if}
  </div>
</div>
