import { createApp } from 'vue'
import './style.css'
import router from './plugins/vue-router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'remixicon/fonts/remixicon.css'
import pinia from './plugins/pinia/index';
import i18n from './plugins/vue-i18n/index'
createApp(App).use(ElementPlus).use(router).use(pinia).use(i18n).mount('#app')
