FROM node:13 as build
WORKDIR /app/apps/app
COPY ./apps/app/package.json ./package.json
RUN npm install
COPY . ../../
WORKDIR /app
RUN npm i
WORKDIR /app/apps/app
RUN npm run build

FROM nginx:1.13
COPY --from=build /app/apps/app/build /usr/share/nginx/html
COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80