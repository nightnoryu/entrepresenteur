### Build ###

FROM node:16 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

### Server setup ###

FROM nginx:1.21.5

COPY --from=build /app/build /usr/share/nginx/html

COPY ~conf/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ~conf/nginx/nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
