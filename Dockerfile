FROM node:gallium-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG NODE_PORT=3000
ENV NODE_PORT $NODE_PORT

RUN apk add --no-cache tini

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --production \
    && yarn cache clean

COPY src ./src

EXPOSE $NODE_PORT

USER nobody

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "./src/index.js" ]
