FROM node:17-alpine3.12
WORKDIR /node
COPY ./package.json .
RUN yarn install --network-timeout 1000000
COPY . /node/
CMD ["yarn", "start:debug"]