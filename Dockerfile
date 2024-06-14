FROM node:20
ARG BUILD_MODE=production
ADD package.json .
RUN npm install
ADD . .
RUN npx vite build --mode $BUILD_MODE

FROM alpine:3.18
RUN apk --update --no-cache add caddy
ADD Caddyfile /etc/caddy/Caddyfile
RUN addgroup web; adduser -D -G web web
WORKDIR /home/web
USER web
COPY public public
COPY --from=0 dist/ public/

CMD caddy run --config /etc/caddy/Caddyfile
