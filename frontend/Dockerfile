# Use the official Python runtime image
FROM node:24

# Set the working directory inside the container
WORKDIR /app
COPY package*.json .

RUN npm install

# Copy the react project to the container
COPY . .

# Run Django’s development server
CMD ["npm", "run", "dev"]
