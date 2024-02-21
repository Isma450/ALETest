import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import { pinia } from './stores';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(pinia)
  .use(router)
  .use(bootstrap)
  .mount('#app')
