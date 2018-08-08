FROM node:latest
RUN mkdir -p /app

WORKDIR /app
EXPOSE 3000

COPY package.json ./package.json

RUN npm install --quiet

COPY /src ./src
COPY .babelrc ./.babelrc

RUN npm run build
RUN npm prune --production

CMD [ "npm", "start"]
