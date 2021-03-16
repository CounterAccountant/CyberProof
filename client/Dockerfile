FROM ubuntu:latest
FROM nginx:latest

WORKDIR /usr/src/app

ARG API_URL=${API_URL}

COPY client/build ./build
COPY .env ./build/.env
RUN rm -v /etc/nginx/nginx.conf
ADD client/nginx.conf /etc/nginx/nginx.conf
EXPOSE ${CLIENT_PORT}
