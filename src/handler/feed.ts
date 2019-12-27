import {
  Request,
  ResponseToolkit,
}                     from '@hapi/hapi'

import { WatchdogManager } from '../watchdog-manager'

export default function feedHandler (
  request: Request,
  h: ResponseToolkit,
  err?: Error,
) {
  if (err) {
    return `${err}`
  }

  const DEFAULT_TIMEOUT = 60
  const MAX_TIMEOUT = 600

  const s = request.query.timeout as string || '0'
  let timeout = parseInt(s)

  if (timeout <= 0) {
    timeout = DEFAULT_TIMEOUT
  }

  if (timeout > MAX_TIMEOUT) {
    timeout = MAX_TIMEOUT
  }

  const url = request.params.url

  const watchdogManager = WatchdogManager.instance()
  watchdogManager.feed(url, timeout)

  const record = watchdogManager.record()

  const html = `
  feed url: ${url}
  <br />
  timeout: ${timeout} ${typeof timeout}
  <hr />
  ${record}
  `

  return h.response(html)
}
