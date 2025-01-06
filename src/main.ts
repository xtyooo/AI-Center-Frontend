import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import "./access";
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(ArcoVue)
app.mount('#app')
