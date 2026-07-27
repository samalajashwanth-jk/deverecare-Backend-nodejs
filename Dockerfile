# FROM node:alpine3.24
FROM node:18-alpine3 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node","server.js"]
