FROM node:24.11.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.28-alpine
USER root
RUN apk add --no-cache jq && chown -R 101:101 /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chmod=755 deploy/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
USER 101
EXPOSE 8080
