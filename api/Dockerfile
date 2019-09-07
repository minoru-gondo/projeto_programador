FROM node:latest
MAINTAINER Minoru Gondo
RUN mkdir -p /var/www/projeto_programador_api
COPY . /var/www/projeto_programador_api
WORKDIR /var/www/projeto_programador_api
RUN npm install -g nodemon
RUN npm install
ENTRYPOINT [ "nodemon", "index.js"]
EXPOSE 8000