FROM node:18-alpine

WORKDIR /concert_app/

COPY public/ /concert_app/public
COPY src/ /concert_app/src
COPY package.json /concert_app/

RUN npm install
CMD ["npm", "start"]