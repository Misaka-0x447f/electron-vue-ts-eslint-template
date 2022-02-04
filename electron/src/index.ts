import got from 'got'
import { addIpcHandler } from './ipc';

(async () => {
  addIpcHandler('fetchHomePage', async () => (await got.get('https://misaka.org')).body)
})()
