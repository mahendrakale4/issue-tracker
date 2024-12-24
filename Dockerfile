# Stage 1: Build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for Prisma to connect to the database
ENV DATABASE_URL="postgresql://Issue-tracker_owner:Mf5YyDRqz8ri@ep-tiny-hall-a5eirmwa.us-east-2.aws.neon.tech/Issue-tracker?sslmode=require"

# Run Prisma generate to ensure the client is created
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Set the default command to start the application
CMD ["npm", "start"]
