import { ipcRenderer, contextBridge } from 'electron'

const api = {
  toggle: (): Promise<{
    expanded: boolean
    url: string | null
    connectionId: string | null
    connectionName: string | null
  }> => {
    return ipcRenderer.invoke('widget:toggle')
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('widgetAPI', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.widgetAPI = api
}
