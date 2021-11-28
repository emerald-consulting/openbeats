FROM node:latest
WORKDIR /node
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --network-timeout 1000000
COPY . /node/
CMD ["yarn", "dev"]