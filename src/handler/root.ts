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
  // if (err) {
  //   return `${err}`
  // }

  const watchdogManager = WatchdogManager.instance()

  const record = watchdogManager.record()

  const html = `
  Watchdog ICU v${VERSION} is under constructing...
  <br />
  <a href="https://github.com/huan/watchdog.icu/">README</a>
  <br />
  <a href="https://dashboard.heroku.com/apps/watchdog-icu/logs">Logs</a>
  <br />

  <hr />
  ${record}
  `

  return html
}
