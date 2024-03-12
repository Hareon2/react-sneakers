FROM node:20-alpine3.18
WORKDIR /data
RUN npm install -g json-server
COPY ./data/db.json ./
EXPOSE 8000
CMD ["json-server", "--watch", "db.json", "--port", "8000"]
