FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 
COPY . .
EXPOSE 5900
CMD ["npm", "start"]
