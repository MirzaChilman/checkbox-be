FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy the tsconfig.json and package-lock.json files
COPY tsconfig*.json ./

# Install the project dependencies and PM2
RUN npm install
RUN npm install -g pm2

# Copy the Prisma schema file, NestJS source code, and process.yml
COPY prisma ./prisma
COPY src ./src
COPY process.yml ./process.yml

# Expose the ports for the NestJS app and Prisma Studio
EXPOSE 3000
EXPOSE 5555

# Start both NestJS app and Prisma Studio using PM2
CMD ["pm2-runtime", "process.yml"]
