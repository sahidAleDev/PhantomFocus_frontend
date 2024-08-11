import './assets/main.css'
import '@vuepic/vue-datepicker/dist/main.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AlertNotification from '@/components/AlertNotification.vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(createPinia())
app.component('VueDatePicker', VueDatePicker)
app.use(router)
app.component('AlertNotification', AlertNotification)

app.mount('#app')
