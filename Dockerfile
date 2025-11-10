FROM node:20.12.0 AS builder

RUN corepack enable && corepack prepare yarn@4.1.1 --activate
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules && \
    yarn install && \
    yarn cache clean

RUN mkdir -p /tmp/yarn-backup && cp -r .yarn/releases /tmp/yarn-backup/

COPY . .

RUN cp -r /tmp/yarn-backup/releases .yarn/ && rm -rf /tmp/yarn-backup

RUN yarn build

FROM node:20.12.0-alpine AS runner

RUN corepack enable && corepack prepare yarn@4.1.1 --activate
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p /tmp/yarn-backup && cp -r .yarn/releases /tmp/yarn-backup/

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/[!.]* ./  # 复制非隐藏文件（避免覆盖 .yarn/）
COPY --from=builder /app/.![!.]* ./ # 复制隐藏文件（除了 .yarn/）

RUN cp -r /tmp/yarn-backup/releases .yarn/ && rm -rf /tmp/yarn-backup

EXPOSE 3000

CMD ["yarn", "start"]