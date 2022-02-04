import { ipcMain } from 'electron'
import { IpcBody, ipcDefinition } from '../../util/ipcDefinition'

const handlers: {
  [key in keyof typeof ipcDefinition]?:
    (...payload: Parameters<typeof ipcDefinition[key]>) => ReturnType<typeof ipcDefinition[key]>
} = {}

ipcMain.on('node', async (ipcEvent, { name, payload, id }: IpcBody) => {
  if (!handlers[name]) { throw new Error(`Assertion Error: no handler for event ${name} available. Payload: ${JSON.stringify(payload)}`) }
  // @ts-ignore
  const res = await handlers[name]?.(...payload)
  ipcEvent.sender.send('browser', { name, id, payload: res })
})

export const addIpcHandler = <T extends keyof typeof ipcDefinition>(name: T, handler: typeof ipcDefinition[T]) => {
  handlers[name] = handler
}

export const removeIpcHandler = <T extends keyof typeof ipcDefinition>(name: T) => {
  delete handlers[name]
}
