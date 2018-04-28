FROM node:9.11

RUN mkdir /app

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .env .env
COPY src src

RUN npm install \
  && npm run build

CMD npm start
