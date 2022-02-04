import { mapValues, uniqueId } from 'lodash'
import { IpcBody, ipcDefinition } from '../util/ipcDefinition'

const stack: Record<string, (..._: unknown[]) => void> = {}

const ipc: {
  [key in keyof typeof ipcDefinition]: {request: typeof ipcDefinition[key]}
} = mapValues(ipcDefinition, (_: unknown, name: string) => ({
  request: (...payload: any[]): Promise<any> => {
    const id = uniqueId()
    // @ts-ignore
    // eslint-disable-next-line no-undef
    ipcRenderer.send('node', { name, id, payload })
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'))
        Reflect.deleteProperty(stack, id)
      }, 60000)
      stack[id] = (...args: unknown[]) => {
        // @ts-ignore
        resolve(...args)
        clearTimeout(timeoutId)
        Reflect.deleteProperty(stack, id)
      }
    })
  }
}))

// @ts-ignore
// eslint-disable-next-line no-undef
ipcRenderer.on('browser', (_, { name, id, payload }: IpcBody) => {
  if (!stack[id]) { throw new Error(`Assertion error: request id ${id} does not exist in request stack; returning ${name} with payload ${JSON.stringify(payload)}`) }
  stack[id](payload)
})

export default ipc
