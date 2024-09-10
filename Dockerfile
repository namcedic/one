# Base stage
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .

# Build stage
FROM base as build
RUN yarn build

# Final stage (can be used for production, staging, or development)
FROM node:20-alpine as final
WORKDIR /app
COPY --from=build /app ./

# Default command (for production)
CMD ["node", "dist/main.js"]
#CMD ["wait-for-it", "db:5437", "--", "node", "dist/main.js"]
