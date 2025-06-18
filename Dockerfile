FROM node:20-alpine
WORKDIR /app

# copy *all* manifest files needed for the build layer
COPY package*.json tsconfig.json tsconfig.build.json ./

RUN apk add --no-cache python3 make g++ \
 && npm ci

COPY src ./src
RUN npm run build:api

RUN npm prune --production \
 && apk del python3 make g++

EXPOSE 3000
CMD ["node", "dist/server.js"]
