# Catalog Service

## Overview

The Catalog Service is a Node.js backend application designed to manage an extensive product catalog with robust querying capabilities. It provides RESTful API endpoints for listing products with various filters, adding new products, and deleting existing products from the database.

## Features

- **Express.js Framework**: Utilizes Express.js for handling HTTP requests and structuring the application with middleware and routing.
- **MongoDB Database**: Integrates with MongoDB, a NoSQL database, to store and retrieve product information.
- **RESTful API Endpoints**: Offers endpoints for fetching all products with pagination, sorting, and time-based filtering, as well as adding and removing products.
- **Automated Testing**: Includes a suite of automated tests using Jest and Supertest to ensure the reliability and performance of the API endpoints.
- **PM2 Process Manager**: Leverages PM2 for running the application in a cluster mode to improve performance and reliability.
- **Environment Variables**: Configures the application using environment variables for database connections and server configuration.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (v4 or newer)
- PM2 (v5 or newer)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/catalog-service.git
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Set up the environment variables by creating a `.env` file with the following content:
   ```env
   PORT=4000
   DB_URI=mongodb://localhost:27017/catalog
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Running Tests

To run the automated test suite, execute:

```sh
npm test
```

## API Documentation

### Endpoints

- `GET /api/v1/products`: Retrieve a list of products with optional query parameters for pagination (`page`, `limit`), sorting (`sortBy`, `sortOrder`), searching (`searchText`), and time-based filters (`timeFilterName`).
- `POST /api/v1/products`: Add a new product to the catalog.
- `DELETE /api/v1/products/:id`: Remove a product from the catalog by its ID.

### Query Parameters

- `page`: The page number for pagination.
- `limit`: The number of items per page.
- `sortBy`: The field name to sort by.
- `sortOrder`: The order of sorting, either `asc` for ascending or `desc` for descending.
- `searchText`: A string to search for in product names.
- `timeFilterName`: A predefined filter name to filter products by time, such as `YESTERDAY`, `LAST_HOUR`, or `LAST_WEEK`.

## Project Structure

The application follows a standard MVC-like structure, with separation of concerns for models, views, and controllers, enhancing maintainability and scalability.

```
catalog_service
├── node_modules
├── src
│   ├── __tests__
│   │   └── catalog.test.js
│   ├── controllers
│   │   └── catalog.controller.js
│   ├── models
│   │   ├── catalog.model.js
│   │   └── catalog.mongo.js
│   ├── routes
│   │   ├── api.js
│   │   └── catalog.router.js
│   └── services
│       ├── mongo.js
│       └── query.js
├── app.js
├── server.js
├── database.env
├── package-lock.json
└── package.json
```

## Project Setup

Below is the file and directory structure of the project with a brief explanation of each part:

- `__tests__`: Contains automated tests to ensure API functionality.
- `controllers`: Holds the logic for handling requests and responses.
- `models`: Contains schema definitions for MongoDB and database interaction logic.
- `routes`: Manages API endpoints and routes them to the corresponding controllers.
- `services`: Includes service logic, particularly related to querying the database.
- `app.js`: The Express application setup with middlewares and routes.
- `server.js`: The entry point to the application, responsible for starting the server and connecting to the database.
- `database.env`: Stores configuration for the database connection.
- `package.json`: Defines the project dependencies and scripts for running the application.

## Scripts

The `package.json` file includes the following scripts:

- `test`: Runs the Jest test suite.
- `test-watch`: Runs Jest in watch mode.
- `watch`: Uses Nodemon to automatically restart the server on code changes.
- `start`: Starts the server on the specified port using Nodemon.
- `cluster`: Launches the server in cluster mode with PM2 for load balancing.

## Dependencies

This project is built using various dependencies to manage tasks, run a server, connect to the database, and perform testing:

- `express`: Web framework for creating the HTTP server and handling middleware.
- `mongoose`: ODM library for interacting with MongoDB.
- `cors`: Middleware to enable CORS.
- `dotenv`: Loads environment variables from `.env` file.
- `pm2`: Production process manager for Node.js applications.
- `jest`: Testing framework.
- `nodemon`: Utility that monitors for any changes in the source and automatically restarts the server.
- `supertest`: HTTP assertion library for testing API endpoints.

## Testing

The application comes with a set of unit tests that ensure each API endpoint operates correctly. The tests cover various scenarios including success and error responses.

## Contribution

Contributions to the project are welcome. Please ensure that any pull requests include tests that cover the new functionality or bug fixes.

## Contact

- Developer: [Your Name]
- Email: [Your Email]
- Project Link: [GitHub Repository Link]

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)
