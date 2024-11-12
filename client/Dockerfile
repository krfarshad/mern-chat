FROM node:18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port for Next.js
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run" , "dev"]