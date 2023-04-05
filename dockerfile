# Installs Node.js image
FROM node:19-alpine3.16

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json"]

# Copies everything in the src directory to WORKDIR/src
COPY . .

# Installs all packages
RUN npm install

# Runs the dev npm script to build & start the server
CMD npm start



