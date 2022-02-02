import events from '../util/events'

const payloadSentBySelf: Record<string, unknown> = {}

for (const [name, event] of Object.entries(events)) {
  event.sub((payload) => {
    payloadSentBySelf[name] = payload
    // @ts-ignore
    // eslint-disable-next-line no-undef
    ipcRenderer.send('node', { name, payload })
  })
}
// @ts-ignore
// eslint-disable-next-line no-undef
ipcRenderer.on('browser', (_, { name, payload }) => {
  if (payloadSentBySelf[name] === payload) return
  // @ts-ignore
  events[name].dispatch(payload)
})
