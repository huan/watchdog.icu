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

  const DEFAULT_TIMEOUT_SECONDS = 60
  const MAX_TIMEOUT_SECONDS     = 600

  const s = request.query.timeout as string || '0'
  let timeoutSeconds = parseInt(s)

  if (timeoutSeconds <= 0) {
    timeoutSeconds = DEFAULT_TIMEOUT_SECONDS
  }

  if (timeoutSeconds > MAX_TIMEOUT_SECONDS) {
    timeoutSeconds = MAX_TIMEOUT_SECONDS
  }

  const url = request.params.url

  const watchdogManager = WatchdogManager.instance()
  watchdogManager.feed(url, timeoutSeconds)

  const record = watchdogManager.record()

  const html = `
  feed url: ${url}
  <br />
  timeout: ${timeoutSeconds} ${typeof timeoutSeconds}
  <hr />
  ${record}
  `

  return h.response(html)
}
