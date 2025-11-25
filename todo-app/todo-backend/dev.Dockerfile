FROM node:22-alpine

WORKDIR /usr/src/todo-app/todo-backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
