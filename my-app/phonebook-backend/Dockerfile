FROM node:22-alpine

# Update packages to fix vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/phonebook-app/phonebook-backend

COPY --chown=node:node . .

RUN npm ci --only=production

ENV MONGO_URL=mongodb://mongo:27017/phonebook-app

USER node

CMD ["npm", "start"]
