## Project Setup and Authentication Guide

This document provides detailed instructions on setting up the project and explains the authentication mechanism used.

## Prerequisites

Before setting up the project, ensure the following are installed on your system:

Node.js (latest LTS version recommended)

npm or yarn (package managers)

A database (MongoDB, PostgreSQL, or MySQL)

# Installation

1. Clone the Repository
   Clone the project repository to your local machine:

git clone <repository_url>
cd <project_directory> 2. Install Dependencies
Install the required dependencies using npm or yarn:

npm install
or

yarn install 3. Set Up Environment Variables
Create a .env file in the root directory of the project. Add the necessary environment variables as specified in the .env.example file. For example:

PORT=8080
DB_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret_key

4. Start the Development Server
   Run the development server using the following command:

npm run dev
or
yarn dev

## Authentication Flow

A user registers an account by providing their details.

The user logs in using their credentials (email and password).

The server verifies the credentials and issues a JSON Web Token (JWT).

The user accesses protected routes by including the JWT in the request headers.

# Technologies Used

JWT (JSON Web Token): For generating and verifying tokens.

bcrypt: For securely hashing passwords.

Express Middleware: For protecting routes and validating tokens.

## API Endpoints

1. Register
   Endpoint: POST /api/auth/register

# Payload:

{
"username": "example",
"email": "user@example.com",
"password": "securepassword"
}

# Response:

{
"message": "User registered successfully",
"user": {
"id": "123",
"username": "example"
}
}

2. Login
   Endpoint: POST /api/auth/login

# Payload:

{
"email": "user@example.com",
"password": "securepassword"
}

# Response:

{
"token": "your_jwt_token",
"user": {
"id": "123",
"username": "example"
}
}

3. Protected Route Example
   Endpoint: GET /api/protected

# Headers:

{
"Authorization": "Bearer your_jwt_token"
}

# Response:

{
"message": "Access granted to protected resource"
}

# Additional Notes

Ensure the database is running and accessible before starting the server.

Use secure and unique values for environment variables like JWT_SECRET.

For production, use a process manager like PM2 to run the server.

This guide should help you set up the project and understand the authentication flow.
