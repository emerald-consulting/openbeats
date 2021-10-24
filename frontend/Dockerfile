FROM node:alpine
WORKDIR /node
COPY ./package.json .
RUN yarn install --network-timeout 1000000
COPY . /node/
CMD ["yarn", "start"]