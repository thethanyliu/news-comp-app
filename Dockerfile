# specifies base images (os, os+runtime env)
FROM node:18.9.0-alpine
RUN addgroup app && adduser -S -G app app
USER app
# all following commands will be executed with the user app
WORKDIR /app
# all instructions after will be executed in the set workdir
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]