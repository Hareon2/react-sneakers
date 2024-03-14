# Stage 1: сборка приложения
FROM node:20-alpine3.18 as build
WORKDIR /app
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install
COPY ./app ./
RUN npm run build
RUN npm test

# Nginx для статического раздачи собранного приложения
FROM nginx:1.21.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
