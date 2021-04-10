FROM node:14.1-alpine AS builder

WORKDIR /opt/web

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.19.9-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /opt/web/build /usr/share/nginx/html
