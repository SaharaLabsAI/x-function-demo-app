FROM node:20.12.0 AS builder

RUN corepack enable && corepack prepare yarn@4.1.1 --activate

RUN yarn --version

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set nodeLinker node-modules && \
    yarn install --immutable && \
    yarn cache clean

COPY . .

RUN yarn build

FROM node:20.12.0-alpine

RUN corepack enable

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["yarn", "start"]