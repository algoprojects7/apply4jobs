FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY next.config.ts ./
RUN npm install
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]
