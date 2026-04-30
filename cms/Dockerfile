FROM node:20-alpine AS base
WORKDIR /opt/app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]