import Hapi, {
  ServerRoute,
}                 from '@hapi/hapi'

import {
  log,
  PORT,
}             from './config'

import rootHandler from './handler/root'
import feedHandler from './handler/feed'
import cancelHandler from './handler/cancel'

export async function startWeb (): Promise<void> {
  log.verbose('startWeb', 'startWeb()')

  const server =  new Hapi.Server({
    port: PORT,
  })

  const rootRoute: ServerRoute = {
    handler: rootHandler,
    method : 'GET',
    path   : '/',
  }

  const feedRoute: ServerRoute = {
    handler: feedHandler,
    method : 'GET',
    path   : '/feed/{url*}',
  }
  const cancelRoute: ServerRoute = {
    handler: cancelHandler,
    method : 'GET',
    path   : '/cancel/{url*}',
  }

  const routeList = [
    rootRoute,
    feedRoute,
    cancelRoute,
  ]
  server.route(routeList)

  await server.start()
  log.info('startWeb', 'startWeb() listening to http://localhost:%d', PORT)
}
