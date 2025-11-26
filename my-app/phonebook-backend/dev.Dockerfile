FROM node:22-alpine

WORKDIR /usr/src/my-app/phonebook-backend

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]
