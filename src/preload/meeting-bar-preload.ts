import { ipcRenderer, contextBridge } from 'electron'

const api = {
  // Main process가 1초마다 경과시간/상태를 밀어준다.
  onUpdate: (callback: (data: { elapsed: number; phase: string }) => void): void => {
    ipcRenderer.on('meetingBar:data', (_event, data) => {
      callback(data)
    })
  },

  // "펼치기" → 메인 창 복귀
  expand: (): void => {
    ipcRenderer.invoke('meetingBar:expand')
  },

  // "종료" → 메인 렌더러에서 stopToOptions 실행
  stop: (): void => {
    ipcRenderer.invoke('meetingBar:stop')
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('meetingBarAPI', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.meetingBarAPI = api
}
