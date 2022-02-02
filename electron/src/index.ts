import got from 'got'
import events from '../../util/events'
import './registerEvents'

(async () => {
  events.browserReady.sub(async () => {
    const body = (await got.get('https://misaka.org')).body
    events.requestComplete.dispatch(body)
  })
})()
