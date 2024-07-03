import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(createPinia())
app.component('VueDatePicker', VueDatePicker)
app.use(router)

app.mount('#app')
