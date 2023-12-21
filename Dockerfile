FROM node:18

WORKDIR /node-app
# COPY package.json .
COPY /node-app .
RUN npm install

CMD npm run dev

