FROM node:9.11

RUN mkdir /app

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .env .env

RUN npm install
ADD src /app/src

CMD npm start
