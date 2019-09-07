FROM node:latest
MAINTAINER Minoru Gondo
RUN mkdir -p /var/www/projeto_programador_client
COPY . /var/www/projeto_programador_client
WORKDIR /var/www/projeto_programador_client
RUN npm install
ENTRYPOINT [ "npm", "run", "dev"]
EXPOSE 8080