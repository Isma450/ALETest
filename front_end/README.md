# Project Overview

Welcome to the Frontend Vue.js Project! This repository showcases a modern, responsive Vue.js application tailored for a dynamic catalog viewing experience with authentication features.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Frontend folder, using Vuejs 3 with the Composition API, is designed to provide users with a seamless catalog browsing experience. It includes a login system, an interactive catalog view with search and filter capabilities, ordering logic for Date and name catalogs and pagination to navigate through items efficiently.

## Project Structure

Here's a brief overview of the project directory:

```plaintext
front_end/
├── node_modules/            # Node.js packages
├── public/                  # Static assets
│   └── data.json            # Sample data for local development
├── src/                     # Source files
│   ├── components/          # Vue components
│   │   ├── catalog/         # Catalog related components
│   │   └── common/          # Common components like header, search bar
│   │   └── login/          # Login related components
│   ├── views/               # Vue pages
│   ├── router/              # Vue-router for routing
│   ├── services/            # Services for handling API requests
│   └── stores/              # State management with Pinia
├── .env                     # Environment variables
├── README.md                # The file you are reading right now
├── index.html               # Entry point for the HTML
├── package.json             # Project metadata and dependencies
└── vite.config.js           # Configuration for Vite
```

![Project Structure](attachment://CleanShot 2024-02-21 at 09.43.33.png)

## Features

- **User Authentication**: Secure login functionality to authenticate users.
- **Catalog Browsing**: Users can view a list of items, complete with pagination.
- **Search and Filter**: Dynamic searching, ordering and filtering of catalog items based on user input.
- **Responsive Design**: Built with Bootstrap for a responsive layout that adapts to various screen sizes.

## Installation and Setup

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://your-repository-link.git
cd front_end
npm install
```

Copy `.env.example` to `.env` and fill in the required API endpoints and other configurations.

## Usage

To run the project locally:

```bash
npm run dev
```

Navigate to `http://localhost:8080` to view the application in your browser.

For production build:

```bash
npm run build
```

## Dependencies

- Vue.js 3 - Progressive JavaScript framework for building user interfaces.
- Vue Router - Official router for Vue.js.
- Pinia - State management library.
- Bootstrap 5 - Responsive, mobile-first front-end framework.
- Vite - Frontend tooling.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
