import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import './assets/index.css'
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(router).use(store).use(vuetify).use(VueApexCharts).mount('#app')