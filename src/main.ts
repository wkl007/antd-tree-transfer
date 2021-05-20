import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupAntd } from '@/configs/antd'
import '@/configs/registerServiceWorker'

const app = createApp(App)

setupRouter(app) // vue-router
setupAntd(app) // antd

app.mount('#app')
