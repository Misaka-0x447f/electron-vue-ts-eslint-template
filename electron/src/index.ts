import got from 'got'

(async () => {
  console.log((await got.get('https://misaka.org')).body)
})()
