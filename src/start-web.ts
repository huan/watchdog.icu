import Hapi from '@hapi/hapi'

import {
  log,
  PORT,
  VERSION,
}             from './config'

export async function startWeb (): Promise<void> {
  log.verbose('startWeb', 'startWeb()')

  const server =  new Hapi.Server({
    port: PORT,
  })

  const handler = async () => {
    let html

    html = `Watchdog ICU v${VERSION} is under constructing...`

    return html
  }

  server.route({
    handler,
    method : 'GET',
    path   : '/',
  })

  await server.start()
  log.info('startWeb', 'startWeb() listening to http://localhost:%d', PORT)
}
