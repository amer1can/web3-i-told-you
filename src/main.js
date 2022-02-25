import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './media.css'
window.$ = window.jQuery = require('jquery');

createApp(App).use(store).mount('#app')
