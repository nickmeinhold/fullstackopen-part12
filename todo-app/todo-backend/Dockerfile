FROM node:22-alpine

# Update packages to fix vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/todo-app/todo-backend

COPY --chown=node:node . .

RUN npm ci --only=production

ENV MONGO_URL=mongodb://mongo:27017/todo-app

ENV REDIS_URL=redis://redis:6379

USER node

CMD ["npm", "start"]
