import { ipcRenderer, contextBridge } from 'electron'

const api = {
  toggle: (): Promise<{
    expanded: boolean
    url: string | null
    connectionId: string | null
    connectionName: string | null
  }> => {
    return ipcRenderer.invoke('widget:toggle')
  },
  getPosition: (): Promise<{ x: number; y: number }> => ipcRenderer.invoke('widget:getPosition'),
  setPosition: (x: number, y: number): void => {
    ipcRenderer.send('widget:setPosition', x, y)
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
