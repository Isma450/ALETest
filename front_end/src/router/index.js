import { createRouter, createWebHistory } from 'vue-router';
import CatalogView from '../views/CatalogView.vue'; // Import for the catalog page component.
import LoginView from '../views/LoginView.vue'; // Import for the login page component.

// Defines the routes for the application, each associated with a component.
const routes = [
  { path: '/login', component: LoginView }, // Route for the login page.
  { path: '/catalog', component: CatalogView }, // Route for the catalog page.
];

// Creates a Vue Router instance with a history mode and the defined routes.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Uses browser history API for clean URLs.
  routes,
});

export default router; // Exports the router instance for use in the main Vue application.

