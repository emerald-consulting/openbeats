FROM node:lts-alpine as build

RUN mkdir /app

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

COPY .next ./.next
COPY public ./.public
COPY . .

# ---------------

FROM node:lts-alpine

ENV NODE_ENV production
ENV API_PORT 3001

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/next.config.js .
COPY --from=build /app/.env.local .
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

RUN yarn install

EXPOSE 3000
EXPOSE 3001

CMD yarn start
