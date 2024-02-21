# Project Overview

full-stack Vue.js and Node.js application designed to showcase a dynamic product catalog with robust backend services for product management and user authentication. This project is structured into three main components: the Catalog Service, Frontend Vue.js Project, and Backend Service. Each component is designed to operate both independently and together as part of an integrated system.

# Table of Contents

Project Overview
Quick Start
Project Structure
Installation and Setup
Usage
API Documentation
Contributing
Contact
Acknowledgements

# Project Overview

- The ALETest application consists of three key parts:

- Catalog Service: A Node.js backend service designed for managing an extensive product catalog. It features Express.js for routing, MongoDB for data storage, and provides RESTful API endpoints for product management.

- Frontend Vue.js Project: A modern, responsive frontend built with Vue.js 3, showcasing a catalog viewing experience with authentication features. It supports user login, catalog browsing, and utilizes the Composition API for reactive components.

- Backend Service: Focuses on authentication and authorization, ensuring secure access to application resources. It uses JWT for token-based authentication and implements security best practices.

# Quick Start

- Clone the repository:

```bash
git clone https://github.com/Isma450/ALETest.git
```

- Install dependencies for all services:

```sh
npm run install
```

- Start all services: This will start the Catalog Service, Backend Service, and the Frontend application concurrently.

```sh
npm run watch
```

# Project Structure

The application is divided into three main directories, each representing a core component of the full-stack application:

```ALETest/
├── catalog_service/ # Node.js Catalog Service
├── front_end/ # Vue.js Frontend Application
└── backend_service/ # Node.js Backend Service
```

# Installation and Setup

- Prerequisites
  Node.js (v18.14 or newer)
  MongoDB (v6 or newer for Catalog Service)
  A web browser for viewing the Frontend application

# Installation Steps

- Refer to the README.md file in each project directory for detailed installation and setup instructions:
  Catalog Service README
  Frontend Vue.js Project README
  Backend Service README

## Usage

After installation, you can use the system as follows:

- Access the Frontend application at http://localhost:8080 for catalog browsing and user authentication.
- Utilize the RESTful API endpoints provided by the Catalog Service for product management at port http://localhost:4000.
- The Backend Service handles user authentication requests and protects routes requiring authorization at port http://localhost:3000.

## API Documentation

- Postman Documentation: https://documenter.getpostman.com/view/25539234/2sA2rAxgYf
- Detailed API documentation is available within the README.md files of the Catalog Service and Backend Service directories, covering available endpoints, request methods, and usage examples.

## Contact

For any inquiries or contributions, please contact:

- Developer: Ismail Bouloukt
- Email: contact.bouloukt@gmail.com
- Project Link: https://github.com/Isma450/ALETest

## Acknowledgements

Special thanks to the following technologies and resources that made this project possible:

- Node.js
- Vue.js
- Express.js
- MongoDB
- JWT
- Mongoose
- Jest
- Vite
- Bootstrap

```

```
