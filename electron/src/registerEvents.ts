import events from '../../util/events'
import { ipcMain, WebContents } from 'electron'

let lastSender: WebContents | null = null
const payloadSentBySelf: Record<string, unknown> = {}

ipcMain.on('node', (ipcEvent, { name, payload }) => {
  lastSender = ipcEvent.sender
  payloadSentBySelf[name] = payload
  // @ts-ignore
  events[name].dispatch(payload)
})

for (const [name, event] of Object.entries(events)) {
  event.sub(payload => {
    if (payloadSentBySelf[name] === payload) return
    lastSender?.send('browser', { name, payload })
  })
}
