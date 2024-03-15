FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]