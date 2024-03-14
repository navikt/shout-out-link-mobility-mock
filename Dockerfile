FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]