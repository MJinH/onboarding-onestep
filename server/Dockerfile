FROM node:alpine
# app folder
ENV CI=true
ENV WDS_SOCKET_PORT=0
WORKDIR /app
COPY ./server/package.json ./server/package-lock.json ./
RUN npm ci

# copy everything to app folder
COPY ./server .

# set up command to run with the image or container first starts up
CMD ["npm", "run", "start"]
