FROM node:12.18.1
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
# RUN mongo --eval "db.createCollection(\"fortune\")" ;
CMD ["node", "app"]