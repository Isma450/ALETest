// Imports createPinia from the Pinia library and the useStore function from the local store file.
import { createPinia } from 'pinia';
import { useStore } from './useStore';

// Creates a new instance of Pinia.
const pinia = createPinia();

// Exports the Pinia instance and useStore function for use throughout the application.
export { pinia, useStore };

