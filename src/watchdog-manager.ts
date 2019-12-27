import Watchdog from 'watchdog'
import FileBox from 'file-box'

import moment from 'moment'

import { log } from './config'

const RECORD_LIST = [] as string[]

export class WatchdogManager {

  private static singleton: WatchdogManager

  static instance () {
    if (!this.singleton) {
      this.singleton = new WatchdogManager()
    }
    return this.singleton
  }

  ////////////////////////////////////////////////

  private urlMap: Map<string, Watchdog>

  private constructor () {
    this.urlMap = new Map<string, Watchdog>()
  }

  public feed (
    url: string,
    seconds: number,
  ): void {
    log.verbose('WatchdogManager', 'feed(%s, %s)', url, seconds)

    let watchdog = this.urlMap.get(url)

    if (!watchdog) {  // create new watchdog for url
      log.verbose('WatchdogManager', 'feed(%s, %s) feed watchdog for the first time', url, seconds)

      watchdog = new Watchdog(seconds * 1000, url)
      watchdog.on('reset', async () => {
        log.verbose('WatchdogManager', 'feed(%s, %s) watchdog.on(reset) triggered', url, seconds)
        this.urlMap.delete(url)

        this.record(`reset ${url}`)

        await FileBox.fromUrl(url).toBase64()
      })

      this.record(`feed(${url}, ${seconds}) watchdog created`)

      this.urlMap.set(url, watchdog)
    }

    this.record(`feed(${seconds}) ${url}`)

    watchdog.feed({
      data: 'rubbish',
      timeout: seconds * 1000,
    })

  }

  public cancel (
    url: string,
  ): void {
    log.verbose('WatchdogManager', 'cancel(%s)', url)

    let watchdog = this.urlMap.get(url)

    if (watchdog) {
      watchdog.sleep()
      this.urlMap.delete(url)

      this.record(`cancel ${url}`)

    } else {
      log.verbose('WatchdogManager', 'cancel(%s) no watchdog founded', url)

      this.record(`cancel ${url} not found`)
    }
  }

  public record (text?: string): void | string {
    if (text) {
      const time = moment().format('MMM Do HH:mm')
      RECORD_LIST.push(`${time} ${text}`)
    } else {
      return RECORD_LIST.join('<br />')
    }
  }
}
