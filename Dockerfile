FROM node:20.12.0

RUN corepack enable && corepack prepare yarn@4.1.1 --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set nodeLinker node-modules && \
    yarn install --immutable && \
    yarn cache clean

COPY . .

RUN corepack prepare yarn@4.1.1 --activate && yarn --version

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]