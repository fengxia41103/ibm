# build environment
FROM node:14.17-alpine3.11 as builder

# Set up code destination
RUN mkdir /code
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH
COPY package.json /code/package.json

# Install app dependencies
RUN yarn install
RUN yarn upgrade

# Copy app code to host
COPY . /code

# Start the app
RUN node server
