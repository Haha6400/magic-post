import './assets/main.css'
// import './axios.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import VueApexCharts from "vue3-apexcharts";


const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)

app.use(createPinia())
app.use(VueApexCharts);
app.use(router)
app.use(vuetify)

app.mount('#app')
