FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "serve"]