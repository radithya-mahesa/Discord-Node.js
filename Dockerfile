FROM node:20.5-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run register

CMD ["node", "index.js"]