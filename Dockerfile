FROM node:18.18.2-alpine

WORKDIR /dream-match

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]