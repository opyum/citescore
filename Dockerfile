FROM node:20-alpine
WORKDIR /app

# install deps first (better layer caching)
COPY package.json ./
RUN npm install --omit=dev

# app + static landing
COPY . .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
