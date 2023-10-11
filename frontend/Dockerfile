# Use an official Node.js runtime as a parent image
FROM node:16 AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if applicable) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Vite app will run on (usually 3000 by default)
EXPOSE 3000

# Define the command to start your Vite application
CMD ["npm", "run", "start"]