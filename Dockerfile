# Use the official Node.js image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server for serving the production build
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev" ]

