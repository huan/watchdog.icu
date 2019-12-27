import {
  Request,
  ResponseToolkit,
}                     from '@hapi/hapi'

import { WatchdogManager } from '../watchdog-manager'

export default function cancelHandler (
  request: Request,
  h: ResponseToolkit,
  err?: Error,
) {
  if (err) {
    return `${err}`
  }

  const url = request.params.url

  const record = watchdogManager.record()

  const html = `
  cancel url: ${url}
  <br />
  <hr />
  ${record}
  `

  const watchdogManager = WatchdogManager.instance()
  watchdogManager.cancel(url)

  return h.response(html)
}
