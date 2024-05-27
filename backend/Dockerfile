FROM node:18-alpine

WORKDIR /concert_app

COPY /src /concert_app/src
COPY package.json /concert_app/

EXPOSE 5555

RUN npm install
CMD ["npm", "run", "dev"]