FROM node:18

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]
