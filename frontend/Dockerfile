FROM node:16-alpine3.11
WORKDIR /node
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install --network-timeout 1000000
COPY . .
CMD ["yarn", "start"]