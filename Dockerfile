FROM node:14

RUN apt update \
  && apt install -y --no-install-recommends \
    git \
  && apt-get purge --auto-remove \
  && rm -rf /tmp/* /var/lib/apt/lists/*

ENV PORT 8080
EXPOSE $PORT

WORKDIR /watchdog.icu

COPY package.json .
RUN  npm install \
  && rm -fr /tmp/* ~/.npm
COPY . .

CMD [ "./node_modules/.bin/ts-node", "bin/main.ts" ]
