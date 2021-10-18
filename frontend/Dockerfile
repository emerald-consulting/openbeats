FROM node:alpine

WORKDIR /node

# Install dependencies
COPY ./package.json /node/
COPY ./yarn.lock /node/
RUN yarn install --network-timeout 1000000

COPY ./tsconfig.json /node/
COPY ./babel.config.js /node/
COPY ./.eslintrc /node/
COPY ./.eslintignore /node/