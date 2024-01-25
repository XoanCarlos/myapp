import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'   

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

createApp(App).use(router).mount('#app')
