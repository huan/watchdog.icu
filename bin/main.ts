import {
  log,
}                     from '../src/config'
import { startWeb }   from '../src/start-web'

async function main () {
  log.verbose('main', 'main()')

  await Promise.all([
    startWeb(),
  ])

  let loop = true
  while (loop) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    loop = !!loop
  }

  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    process.exit(1)
  })
