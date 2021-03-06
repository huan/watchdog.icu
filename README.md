# watchdog.icu

[![Build Status](https://travis-ci.com/huan/watchdog.icu.svg?branch=master)](https://travis-ci.com/huan/watchdog.icu)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Watchdog ICU for your Cloud Service

## What is Watchdog.ICU

> Watchdog: ​a person or group of people whose job is to check that companies are not doing anything illegal or ignoring people’s rights  
> &mdash; [Oxford Dict](https://www.oxfordlearnersdictionaries.com/definition/english/watchdog)

> A watchdog timer (sometimes called a computer operating properly or COP timer, or simply a watchdog) is an electronic timer that is used to detect and recover from computer malfunctions.  
> &mdash; [Watchdog timer, Wikipedia](https://en.wikipedia.org/wiki/Watchdog_timer)

The watchdog is used to monitor if a system is running. It is supposed to automatically recover hanged systems due to unrecoverable software errors.

The Watchdog.ICU is useful for systems that are mission critical and need the ability to recover themselves without human intervention. For example, a chatbot service deployed on the cloud servers that need automatic service reset capabilities.

The Watchdog.ICU can reset the system if serious problems are detected. There needs to be a service that tells the Watchdog.ICU the system is working fine. If the service stops doing that, the webhook URL is called.

Watchdog.ICU functionality on the isolated cloud against your infrastructure, it sets up a timer that times out after a predetermined period. The watchdog software then periodically refreshes the Watchdog.ICU timer. If the software stops refreshing, then after the predetermined period, the timer performs a Webhook URL call.

## How to Use

```shell
export RESET_URL='https://requestbin.com/r/enfw6dc7yyntj'
export FEED_URL="https://watchdog.icu/feed/$RESET_URL?timeout=60"
export CANCEL_URL="https://watchdog.icu/cancel/$RESET_URL"

# start watchdog
curl $FEED_URL

# cancel watchdog
curl $CANCEL_URL
```

1. After you visited the above `FEED_URL` for the first time, the `RESET_URL` will be called from the Watchdog.ICU in 60 seconds.
1. To prevent the `RESET_URL` to be called, you have to keep visiting the `FEED_URL` again no more than 60 seconds.
1. To cancel the watchdog, call `CANCEL_URL`

## Resources

- [How do Express and hapi compare to each other?](https://stackoverflow.com/a/30532321/1123955)
- [A modern request bin to inspect HTTP events](https://requestbin.com)

## History

### master

### v0.1 (Nov 23, 2020)

1. Renew `watchdog.icu` one more year for $8 on NameCheap.com
1. Dockerized with node.js v14

### v0.0.1 (27 Dec 2019)

Registered the domain watchdog.icu, for using to monitor the heartbeat of chatbots that I created.

## Author

[Huan](https://github.com/huan) [(李卓桓)](http://linkedin.com/in/zixia) <zixia@zixia.net>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackoverflow.com/users/flair/1123955.png)](https://stackoverflow.com/users/1123955/huan)

## Copyright & License

- Code & Docs © 2019-now Huan LI (李卓桓) <zixia@zixia.net>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
