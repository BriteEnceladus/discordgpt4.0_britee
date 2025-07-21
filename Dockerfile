# Use official Node.js LTS image
FROM node:18-alpine
WORKDIR /app

# Copy source
COPY package.json package-lock.json* ./
RUN npm install --production
COPY src ./src
COPY .env ./.env

CMD ["npm", "start"]