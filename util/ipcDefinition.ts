const emptyMethod = (_: any) => Promise.resolve() as Promise<any>

export const ipcDefinition = {
  fetchHomePage: emptyMethod as () => Promise<string>
}

export type IpcBody = { name: keyof typeof ipcDefinition, id: string, payload: unknown[] }
