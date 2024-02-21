# Backend Service

## Overview

Backend Service is a Node.js application focused on handling authentication and authorization of requests within a backend system. This service is designed to provide secure access control to various resources, ensuring that only authenticated and authorized requests are processed.

## Features

- **Authentication**: Offers a secure login mechanism using JWT tokens.
- **Authorization**: Middlewares to verify the authenticity and validity of tokens for protected routes.
- **Security**: Implements Helmet.js for setting various HTTP headers to protect the app from well-known web vulnerabilities.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow requests from specific origins, enhancing security and control.
- **Environment Variables**: Utilizes environment variables for configuration, making the app flexible and secure for different deployment scenarios.

## Getting Started

### Prerequisites

- Node.js (v18.14 or newer)
- A valid JWT secret for signing tokens (can be generated using `utils/generateJWTsecret.js`)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/backend-service.git
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Set up the environment variables by creating a `config.env` file with the following content:
   ```env
   PORT=3000
   EMAIL=admin@example.com
   PASSWORD=P4sswOrd|23!
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=3600s
   ```
4. Generate a new JWT secret (optional):

   ```sh
   node src/utils/generateJWTsecret.js
   ```

   Make sure to replace `your_jwt_secret` in your `config.env` with the generated secret.

5. Start the server:
   ```sh
   npm start
   ```

### Running Tests

To execute the automated test suite, run:

```sh
npm test
```

## API Documentation

### Endpoints

- `POST /api/v1/users/login`: Authenticates the user and returns a JWT token.
- `GET /api/v1/users/catalog-items`: Retrieves catalog items from an external service, requiring a valid JWT token for access.

### Usage

To authenticate, send a `POST` request to `/api/v1/users/login` with `email` and `password` fields. Upon successful authentication, use the returned JWT token as a bearer token in the `Authorization` header for subsequent requests to protected endpoints.

## Project Structure

```
backend_service
├── node_modules
├── src
│   ├── __tests__
│   │   └── user.test.js
│   ├── controller
│   │   ├── auth.controller.js
│   │   └── catalog.controller.js
│   ├── routes
│   │   ├── api.js
│   │   └── user.router.js
│   └── utils
│       └── generateJWTsecret.js
├── app.js
├── server.js
├── config.env
├── package-lock.json
└── package.json
```

## Scripts

- `test`: Runs the Jest test suite to ensure the functionality of the API endpoints.
- `test-watch`: Runs Jest in watch mode for development purposes.
- `watch`: Uses Nodemon to restart the server automatically upon file changes.
- `start`: Launches the server with the specified environment variables.

## Dependencies

- `express`: The core framework for handling HTTP requests and middleware.
- `axios`: Used for making HTTP requests to external services.
- `cors`: Middleware for enabling CORS with various options.
- `crypto`: Provides cryptographic functionality to generate secrets.
- `dotenv`: Loads environment variables from `.env` files.
- `helmet`: Helps secure Express apps by setting various HTTP headers.
- `jsonwebtoken`: Implements JSON Web Tokens to securely transmit information.

## Testing

The project includes a suite of tests using Jest and Supertest to validate the functionality of authentication and data retrieval operations.

## Contact

- Developer: ismail Bouloukt
- Email: boulouktcontact@gmail.com
- Project Link: https://github.com/Isma450/ALETest

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [JWT](https://jwt.io/)
