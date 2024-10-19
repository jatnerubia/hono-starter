
#
# DEVELOPMENT
#

FROM node:18 as development
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

#
# PRODUCTION
#

FROM node:18 as production
WORKDIR /app
COPY package*.json .
COPY .env .env
RUN npm ci --only=production
COPY --from=development /app/dist ./dist
CMD ["node", "dist/src/index.js"]
