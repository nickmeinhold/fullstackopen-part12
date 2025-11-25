# Stage 1: Install dependencies
FROM node:20 AS deps

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Stage 2: Run tests
FROM deps AS test-stage

RUN npm test

# Stage 3: Build the application
FROM deps AS build-stage

# This COPY command forces Docker to run the test-stage (otherwise Docker would skip it as unused).
# Since both test-stage and build-stage inherit from deps, they have identical code,
# but this ensures tests must pass before the build proceeds.
COPY --from=test-stage /usr/src/app /usr/src/app

RUN npm run build

# Stage 4: Production stage with nginx
FROM nginx:1.25-alpine

ENV VITE_BACKEND_URL=localhost:3000
# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html