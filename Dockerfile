FROM node:26-slim AS build
WORKDIR /usr/local/wyrmhoard
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2.11.9-alpine
COPY --from=build /usr/local/wyrmhoard/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
