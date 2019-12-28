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

  const DEFAULT_TIMER = 60
  const MAX_TIMER = 600

  const s = request.query.timer as string || '0'
  let timer = parseInt(s)

  if (timer <= 0) {
    timer = DEFAULT_TIMER
  }

  if (timer > MAX_TIMER) {
    timer = MAX_TIMER
  }

  const url = request.params.url

  const watchdogManager = WatchdogManager.instance()
  watchdogManager.feed(url, timer)

  const record = watchdogManager.record()

  const html = `
  feed url: ${url}
  <br />
  timer: ${timer} ${typeof timer}
  <hr />
  ${record}
  `

  return h.response(html)
}
