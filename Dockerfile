FROM node:8

#Create app directory
WORKDIR /app

#Install app dependencies
#A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app
COPY package-lock.json /app


RUN npm install
#if you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 80
EXPOSE 4000

#Start server

CMD ["npm", "start"]

