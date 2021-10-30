FROM node:16-alpine3.11
WORKDIR /node
COPY ./package.json .
RUN yarn install --network-timeout 1000000
COPY . /node/
EXPOSE 8080
CMD ["yarn", "start"]