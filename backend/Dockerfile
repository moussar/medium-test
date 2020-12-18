FROM node:11-alpine as builder

# Create working app directory
RUN mkdir -p /usr/src/app

# Set working app directory
WORKDIR /usr/src/app

# install build-base & python recuired by bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# Copy both package.json AND package-lock.json
COPY package*.json ./
RUN npm install -g typescript
RUN npm rebuild bcrypt --build-from-source
RUN npm install

# Install production dependencies
#RUN  npm set progress false && npm install

# Bundle app source
COPY . .

# Build Application
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "run", "prod"]
