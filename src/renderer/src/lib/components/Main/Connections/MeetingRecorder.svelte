<script lang="ts">
  import { tick, onDestroy } from 'svelte'
  import { fade, scale } from 'svelte/transition'

  interface Props {
    onClose: () => void
  }

  let { onClose }: Props = $props()

  // idle → recording → options(정리 옵션) → uploading → done  (error 는 어디서든)
  type Phase = 'idle' | 'recording' | 'options' | 'uploading' | 'done' | 'error'

  let phase = $state<Phase>('idle')
  let title = $state('')
  let elapsedSec = $state(0)
  let errorMsg = $state('')
  let result = $state<{
    summary?: string
    saved_to_kb?: boolean
    slack_dm_sent?: boolean
    audio_saved?: boolean
    email_sent?: boolean
    slack_channel_sent?: boolean
  } | null>(null)

  // 정리 옵션(정지 직전 단계에서 받는 공유 설정)
  let saveAudio = $state(false)
  let emails = $state('')
  let slackChannel = $state('')

  let minimized = $state(false)
  let transcript = $state<string[]>([])
  let transcriptEl = $state<HTMLDivElement | null>(null)

  let mediaRecorder: MediaRecorder | null = null
  let chunks: Blob[] = []
  let allStreams: MediaStream[] = []
  let audioContext: AudioContext | null = null
  let timerHandle: ReturnType<typeof setInterval> | null = null

  // 실시간 자막용 두 번째 레코더. webm/opus 는 첫 청크에만 헤더가 있어서
  // 전체 녹음용 레코더의 중간 청크만 떼면 단독 디코딩이 안 된다. 그래서 같은
  // 믹싱 스트림에 레코더를 하나 더 붙여 SEGMENT_MS 마다 stop→start 를 반복해
  // 매번 완결된 webm 파일을 만든다. 최종 업로드/요약은 여전히 첫 번째 레코더의
  // 전체 녹음본만 쓴다 — 아래 자막은 화면 표시 전용.
  const SEGMENT_MS = 12000
  let segRecorder: MediaRecorder | null = null
  let segChunks: Blob[] = []
  let segTimer: ReturnType<typeof setTimeout> | null = null
  let segActive = false
  let segInFlight = false

  const transcribeSegment = async (blob: Blob) => {
    // 이미 전사 중이면 그 조각은 버린다. 큐에 쌓기 시작하면 계속 밀린다.
    if (segInFlight || blob.size < 2000) return
    segInFlight = true
    try {
      const res = await window.electronAPI.meetingTranscribeSegment(
        await blob.arrayBuffer(),
        'audio/webm'
      )
      const text = String(res?.text ?? '').trim()
      if (text) {
        transcript = [...transcript, text]
        await tick()
        transcriptEl?.scrollTo({ top: transcriptEl.scrollHeight })
      }
    } catch (e) {
      // 자막 실패가 녹음을 망치면 안 된다.
      console.warn('실시간 자막 조각 전사 실패:', e)
    } finally {
      segInFlight = false
    }
  }

  const startSegmentRecorder = (stream: MediaStream) => {
    if (!segActive) return
    segChunks = []
    segRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
    segRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) segChunks.push(e.data)
    }
    segRecorder.onstop = () => {
      const blob = new Blob(segChunks, { type: 'audio/webm' })
      segChunks = []
      void transcribeSegment(blob)
      startSegmentRecorder(stream) // segActive 가 false 면 여기서 멈춘다
    }
    segRecorder.start()
    segTimer = setTimeout(() => segRecorder?.stop(), SEGMENT_MS)
  }

  const stopSegmentRecorder = () => {
    segActive = false
    if (segTimer) clearTimeout(segTimer)
    segTimer = null
    if (segRecorder && segRecorder.state !== 'inactive') segRecorder.stop()
    segRecorder = null
  }

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
      // 마이크(내 목소리)와 시스템 오디오(상대방 목소리) 둘 다 선택사항으로
      // 잡는다. 마이크 없는 PC(데스크톱 등)에서도 시스템 오디오만으로 회의가
      // 녹음돼야 하므로, 각각 실패해도 넘어가고 둘 다 없을 때만 에러를 낸다.
      let micStream: MediaStream | null = null
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      } catch (e) {
        console.warn('마이크 캡처 실패 (시스템 오디오만으로 계속):', e)
      }
      let systemStream: MediaStream | null = null
      try {
        systemStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: false } as any)
      } catch (e) {
        console.warn('시스템 오디오 캡처 실패 (마이크만으로 계속):', e)
      }
      allStreams = [micStream, systemStream].filter((s): s is MediaStream => s !== null)
      if (allStreams.every((s) => s.getAudioTracks().length === 0)) {
        throw new Error(
          '마이크와 시스템 오디오를 모두 사용할 수 없습니다. 마이크를 연결하거나 오디오 권한을 확인해주세요.'
        )
      }

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

      transcript = []
      segActive = true
      startSegmentRecorder(dest.stream)

      phase = 'recording'
      elapsedSec = 0
      timerHandle = setInterval(() => {
        elapsedSec += 1
        // 플로팅 바가 떠 있는 동안만 경과시간을 바 창으로 보낸다.
        if (minimized) window.electronAPI.meetingBarUpdate(elapsedSec, phase)
      }, 1000)
      // 노션처럼: 녹음이 시작되면 곧바로 플로팅 바로 접어, 큰 모달이 앱을 막지
      // 않게 한다. 메인 창은 숨기지 않으므로(메인 프로세스에서 hide 제거) 인트리클로
      // 다른 기능을 계속 쓰면서 녹음할 수 있다. 자막/정지는 바를 펼치면 나온다.
      minimize()
    } catch (e: any) {
      errorMsg = '녹음을 시작하지 못했습니다: ' + (e?.message ?? e)
      phase = 'error'
      stopSegmentRecorder()
      stopAllTracks()
    }
  }

  const defaultTitle = () => {
    const d = new Date()
    const p = (n: number) => String(n).padStart(2, '0')
    return `회의 ${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
  }

  // 녹음 정지 → 곧장 업로드하지 않고 '정리 옵션' 단계로. 스트림/레코더는 여기서
  // 완전히 정리하고, 모아둔 chunks 는 startUpload 에서 blob 으로 합친다.
  const stopToOptions = async () => {
    if (!mediaRecorder) return
    if (timerHandle) clearInterval(timerHandle)
    minimized = false
    window.electronAPI.meetingBarHide()
    stopSegmentRecorder()

    const stopped = new Promise<void>((resolve) => {
      mediaRecorder!.onstop = () => resolve()
    })
    mediaRecorder.stop()
    await stopped
    stopAllTracks()

    if (!title.trim()) title = defaultTitle()
    phase = 'options'
  }

  const startUpload = async () => {
    phase = 'uploading'
    try {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const buf = await blob.arrayBuffer()
      const res = await window.electronAPI.meetingUpload(title.trim() || defaultTitle(), buf, 'audio/webm', {
        saveAudio,
        emails: emails.trim(),
        slackChannel: slackChannel.trim()
      })
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

  // 최소화 = 앱 창을 내리고, 항상 위에 뜨는 별도 플로팅 바 창을 띄운다.
  // 녹음은 이 컴포넌트(=메인 렌더러)에서 계속 돈다 → 메인 창은 hide 만.
  const minimize = () => {
    minimized = true
    window.electronAPI.meetingBarShow()
    window.electronAPI.meetingBarUpdate(elapsedSec, phase) // 1초 기다리지 않고 즉시 표시
  }

  // 바 창에서 온 신호: 펼치기 → 다시 큰 화면, 종료 → 정지(옵션 단계로).
  // (메인 프로세스가 이미 메인 창 show 와 바 닫기는 처리했다.)
  const offBarExpand = window.electronAPI.onMeetingBarExpand(() => {
    minimized = false
  })
  const offBarStop = window.electronAPI.onMeetingBarStop(() => {
    void stopToOptions()
  })

  // 컴포넌트가 사라지면 고아 바 창을 반드시 닫는다.
  onDestroy(() => {
    offBarExpand?.()
    offBarStop?.()
    window.electronAPI.meetingBarHide()
  })

  const close = () => {
    if (phase === 'recording') {
      // 녹음 중 닫기/오버레이 클릭은 종료가 아니라 최소화 — 실수로 닫아도
      // 녹음이 끊기지 않게. 진짜 종료는 명시적 '정지' 버튼(stopToOptions)으로만.
      minimize()
      return
    }
    if (phase === 'uploading') {
      if (!confirm('정리하는 중이에요. 닫을까요?')) return
    } else if (phase === 'options') {
      if (!confirm('아직 정리를 시작하지 않았어요. 이 녹음을 버리고 닫을까요?')) return
    }
    onClose()
  }

  // summary 는 마크다운(요약/주요논의/결정사항/액션아이템). 별도 라이브러리 없이
  // 줄 단위로 헤딩/불릿/문단만 구분해 노션식 위계로 렌더한다.
  const parsed = $derived.by(() => {
    const md = result?.summary ?? ''
    return md.split('\n').map((raw) => {
      const l = raw.trim()
      if (!l) return { kind: 'space' as const, text: '' }
      if (l.startsWith('#')) return { kind: 'h' as const, text: l.replace(/^#+\s*/, '') }
      if (/^([-*•]|\d+\.)\s/.test(l)) return { kind: 'li' as const, text: l.replace(/^([-*•]|\d+\.)\s+/, '') }
      return { kind: 'p' as const, text: l }
    })
  })

  // 완료 화면에서 무엇이 전송/저장됐는지 체크로 요약.
  const shareStatus = $derived.by(() => {
    const r = result
    if (!r) return [] as string[]
    return (
      [
        [r.saved_to_kb, '지식베이스에 저장'],
        [r.audio_saved, '음성 원본 저장'],
        [r.email_sent, '이메일 전송'],
        [r.slack_channel_sent, '슬랙 채널 공유'],
        [r.slack_dm_sent, '슬랙 DM 전송']
      ] as const
    )
      .filter(([ok]) => ok)
      .map(([, label]) => label)
  })
</script>

<!-- **볼드** 만 안전하게(문자열 분할, {@html} 미사용) 인라인 강조 -->
{#snippet inline(text: string)}{#each text.split('**') as seg, i}<span class:font-semibold={i % 2 === 1}>{seg}</span>{/each}{/snippet}

{#if minimized && phase === 'recording'}
  <!-- 최소화 시 UI 는 별도 always-on-top 플로팅 바 창(meeting-bar)이 담당한다.
       메인 창은 hide 되지만 이 컴포넌트는 계속 마운트돼 녹음/자막이 이어진다.
       그래서 여기선 아무것도 그리지 않는다. -->
{:else}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center"
    transition:fade={{ duration: 150 }}
    onmousedown={phase === 'idle' || phase === 'done' || phase === 'error' || phase === 'recording' ? close : undefined}
  >
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <div
      class="relative mx-4 w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-950"
      transition:scale={{ start: 0.97, duration: 180 }}
      onmousedown={(e) => e.stopPropagation()}
    >
      <div class="flex items-center justify-between px-6 pt-5 pb-1">
        <h2 class="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#fafafa]">회의 녹음</h2>
        {#if phase === 'recording'}
          <button
            class="rounded-lg bg-black/[0.06] dark:bg-white/[0.08] px-2 py-1 text-[11px] opacity-70 transition-all active:scale-[0.98] border-none cursor-pointer"
            onclick={minimize}
          >
            최소화
          </button>
        {/if}
      </div>

      <div class="flex-1 overflow-y-auto px-6 pb-6">
        {#if phase === 'idle'}
          <!-- 시작: 녹음 버튼이 주인공. 제목은 선택. -->
          <div class="flex flex-col items-center pt-6 pb-2">
            <input
              type="text"
              bind:value={title}
              placeholder="회의 제목 (선택)"
              class="w-full text-center py-1.5 text-[15px] font-medium text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-25 placeholder:font-normal outline-none bg-transparent border-none"
            />
            <button
              class="mt-8 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg ring-8 ring-red-500/10 transition-all hover:ring-red-500/20 active:scale-[0.96] border-none cursor-pointer"
              onclick={startRecording}
              aria-label="녹음 시작"
            >
              <span class="w-5 h-5 rounded-full bg-white"></span>
            </button>
            <p class="mt-4 text-[12px] font-medium text-[#1d1d1f] dark:text-[#fafafa]">녹음 시작</p>
            <p class="mt-1 text-[11px] opacity-40 text-center">내 마이크 + 시스템 오디오를 함께 녹음합니다.</p>
          </div>
        {:else if phase === 'recording'}
          <!-- 녹음 중: 실시간 자막이 화면 중심. -->
          <div class="flex flex-col">
            <div class="flex items-center justify-center gap-2 pt-2 pb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span class="text-xl font-mono tabular-nums text-[#1d1d1f] dark:text-[#fafafa]">{formatTime(elapsedSec)}</span>
            </div>
            <div
              bind:this={transcriptEl}
              class="w-full h-56 overflow-y-auto whitespace-pre-wrap text-[13px] leading-relaxed text-[#1d1d1f]/80 dark:text-[#fafafa]/80 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl p-4"
            >
              {#if transcript.length === 0}
                <span class="opacity-40">말하는 내용이 곧 여기 받아쓰기로 표시돼요…</span>
              {:else}
                {transcript.join(' ')}
              {/if}
            </div>
            <button
              class="w-full mt-4 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-[0.98] border-none cursor-pointer"
              onclick={stopToOptions}
            >
              녹음 정지
            </button>
          </div>
        {:else if phase === 'options'}
          <!-- 정리 옵션: 정지 직후, 정리(업로드) 전에 공유/저장 설정을 받는다. -->
          <div class="flex flex-col gap-4 pt-1">
            <p class="text-[11px] opacity-40">정리를 시작하기 전에 제목과 공유 방법을 확인하세요.</p>

            <div>
              <label for="mr-title" class="block text-[12px] font-medium text-[#1d1d1f] dark:text-[#fafafa] mb-1.5">제목</label>
              <input
                id="mr-title"
                type="text"
                bind:value={title}
                placeholder={defaultTitle()}
                class="w-full py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-30 outline-none bg-black/[0.04] dark:bg-white/[0.06] border-none rounded-xl px-3"
              />
            </div>

            {#if transcript.length > 0}
              <div>
                <p class="text-[11px] opacity-40 mb-1.5">미리보기 자막 · 최종 요약은 정리 후 다시 생성돼요</p>
                <div class="max-h-28 overflow-y-auto whitespace-pre-wrap text-[12px] leading-relaxed opacity-60 bg-black/[0.03] dark:bg-white/[0.04] rounded-xl p-3">
                  {transcript.join(' ')}
                </div>
              </div>
            {/if}

            <label class="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={saveAudio}
                class="mt-0.5 w-4 h-4 accent-gray-900 dark:accent-white cursor-pointer"
              />
              <span>
                <span class="block text-[12px] font-medium text-[#1d1d1f] dark:text-[#fafafa]">음성 원본도 저장</span>
                <span class="block text-[11px] opacity-40 mt-0.5">체크하면 회의 원음이 그대로 남습니다.</span>
              </span>
            </label>

            <div>
              <label for="mr-emails" class="block text-[12px] font-medium text-[#1d1d1f] dark:text-[#fafafa] mb-1.5">이메일로 보내기</label>
              <input
                id="mr-emails"
                type="text"
                bind:value={emails}
                placeholder="a@x.com, b@y.com (쉼표로 구분)"
                class="w-full py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-30 outline-none bg-black/[0.04] dark:bg-white/[0.06] border-none rounded-xl px-3"
              />
            </div>

            <div>
              <label for="mr-slack" class="block text-[12px] font-medium text-[#1d1d1f] dark:text-[#fafafa] mb-1.5">슬랙 채널로 공유</label>
              <input
                id="mr-slack"
                type="text"
                bind:value={slackChannel}
                placeholder="#채널명 (비우면 본인 DM으로만)"
                class="w-full py-2 text-[13px] text-[#1d1d1f] dark:text-[#fafafa] placeholder:opacity-30 outline-none bg-black/[0.04] dark:bg-white/[0.06] border-none rounded-xl px-3"
              />
            </div>

            <div class="flex gap-2 pt-1">
              <button
                class="flex-1 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] px-4 py-2.5 text-sm opacity-70 transition-all active:scale-[0.98] border-none cursor-pointer"
                onclick={close}
              >
                취소
              </button>
              <button
                class="flex-[2] rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 transition-all active:scale-[0.98] border-none cursor-pointer"
                onclick={startUpload}
              >
                정리 시작
              </button>
            </div>
          </div>
        {:else if phase === 'uploading'}
          <div class="flex flex-col items-center gap-3 py-10">
            <span
              class="w-6 h-6 rounded-full border-2 border-black/10 dark:border-white/10 border-t-black/60 dark:border-t-white/60 animate-spin inline-block"
            ></span>
            <p class="text-[13px] font-medium text-[#1d1d1f] dark:text-[#fafafa]">AI가 회의를 정리하고 있어요</p>
            <p class="text-[11px] opacity-40">전사하고 요약하는 중… 몇 분 걸릴 수 있어요.</p>
          </div>
        {:else if phase === 'done'}
          <div class="flex flex-col pt-1">
            <div class="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-[13px] font-medium">정리가 끝났어요</span>
            </div>

            {#if result?.summary}
              <div class="mt-3 max-h-72 overflow-y-auto bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl px-4 py-3 text-[#1d1d1f] dark:text-[#fafafa]">
                {#each parsed as line}
                  {#if line.kind === 'space'}
                    <div class="h-2"></div>
                  {:else if line.kind === 'h'}
                    <h3 class="mt-3 first:mt-0 mb-1 text-[13px] font-semibold">{@render inline(line.text)}</h3>
                  {:else if line.kind === 'li'}
                    <div class="flex gap-2 text-[12px] leading-relaxed opacity-80">
                      <span class="opacity-40 select-none">•</span>
                      <span>{@render inline(line.text)}</span>
                    </div>
                  {:else}
                    <p class="text-[12px] leading-relaxed opacity-80">{@render inline(line.text)}</p>
                  {/if}
                {/each}
              </div>
            {/if}

            {#if shareStatus.length > 0}
              <div class="mt-3 flex flex-col gap-1.5">
                {#each shareStatus as label}
                  <div class="flex items-center gap-1.5 text-[12px] opacity-70">
                    <svg class="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[#1d1d1f] dark:text-[#fafafa]">{label}</span>
                  </div>
                {/each}
              </div>
            {/if}

            <button
              class="w-full mt-4 rounded-xl bg-black/[0.06] dark:bg-white/[0.08] px-4 py-2 text-sm opacity-70 transition-all active:scale-[0.98] border-none cursor-pointer"
              onclick={close}
            >
              닫기
            </button>
          </div>
        {:else if phase === 'error'}
          <div class="pt-1">
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
  </div>
{/if}
