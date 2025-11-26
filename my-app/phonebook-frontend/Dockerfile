# Stage 1: Install dependencies
FROM node:20 AS deps

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Stage 3: Build the application
FROM deps AS build-stage

RUN npm run build

# Stage 4: Production stage with nginx
FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html