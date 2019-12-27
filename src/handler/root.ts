// import {
//   Request,
//   ResponseToolkit,
// }                     from '@hapi/hapi'
import { VERSION } from '../config'

import { WatchdogManager } from '../watchdog-manager'

export default function rootHandler (
  // request?: Request,
  // h: ResponseToolkit,
  // err?: Error,
) {
  let html: string

  // if (err) {
  //   return `${err}`
  // }

  const watchdogManager = WatchdogManager.instance()

  const record = watchdogManager.record()

  html = `
  Watchdog ICU v${VERSION} is under constructing...
  <br />
  <a href="https://github.com/huan/watchdog.icu/">README</a>
  <hr />
  ${record}
  `

  return html
}
