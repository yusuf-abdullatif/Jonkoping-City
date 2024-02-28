FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "DB_HOST=172.17.0.1 node ./index.js"]
