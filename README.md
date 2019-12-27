# watchdog.icu

[![Build Status](https://travis-ci.com/huan/watchdog.icu.svg?branch=master)](https://travis-ci.com/huan/watchdog.icu)
[![Greenkeeper badge](https://badges.greenkeeper.io/huan/watchdog.icu.svg)](https://greenkeeper.io/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Watchdog ICU for your Cloud Service

## How to Use

```shell
export CALLBACK_URL='https://requestbin.com/r/enfw6dc7yyntj'
export FEED_URL="https://watchdog.icu/feed/$CALLBACK_URL?timeout=60"
export CANCEL_URL="https://watchdog.icu/cancel/$CALLBACK_URL"
curl $FEED_URL
```

1. After you visted the above `FEED_URL` for the first time, the `CALLBACK_URL` will be called from the Watchdog.ICU in 60 seconds.
1. To prevent the `CALLBACK_URL` to be called, you have to keep visiting the `FEED_URL` again no more than 60 seconds.
1. To cancel the watchdog, call `CALCEN_URL`

## Why Use Hapi

- [How do Express and hapi compare to each other?](https://stackoverflow.com/a/30532321/1123955)

## History

### master

### v0.0.1 (27 Dec 2019)

Registered the domain watchdog.icu, for using to monitor the heartbeat of chatbots that I created.

## Author

[Huan](https://github.com/huan) [(李卓桓)](http://linkedin.com/in/zixia) <zixia@zixia.net>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackoverflow.com/users/flair/1123955.png)](https://stackoverflow.com/users/1123955/huan)

## Copyright & License

- Code & Docs © 2019-now Huan LI (李卓桓) <zixia@zixia.net>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
