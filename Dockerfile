FROM node:20.12.0 AS builder
RUN corepack disable

RUN npm install -g yarn@4.1.1
RUN yarn --version && which yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set nodeLinker node-modules && \
    yarn install && \
    yarn cache clean

COPY . .

RUN yarn build

FROM node:20.12.0-alpine

RUN corepack disable && npm install -g yarn@4.1.1

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["yarn", "start"]