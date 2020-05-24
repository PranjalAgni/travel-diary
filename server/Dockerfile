FROM node:alpine

WORKDIR /usr/app

# Copy package.json
COPY ./package.json ./

# Install all the dependencies to run the server
RUN npm install

# Copy app code
COPY ./ ./

# expose port
EXPOSE 4040


CMD ["npm", "start"]