# Define the base image for the first stage
FROM node:lts-buster AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port (not mandatory)
# EXPOSE 3000

CMD ["npm", "run","build"]
# Command to start the application
CMD ["npm", "run", "start"]

# Define a second stage
FROM development AS dev-envs

# Install additional tools or perform setup here
RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# Install Docker tools (cli, buildx, compose) if needed
# COPY --from=gloursdocker/docker / /

# Command for the second stage
# CMD [ "npm", "start" ]
