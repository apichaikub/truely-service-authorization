FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g nodemon
RUN npm i

COPY . .

CMD npm run start:prd