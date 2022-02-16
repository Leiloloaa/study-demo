import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
import store from './store';
import 'nprogress/nprogress.css';

createApp(App).use(store).use(Element3).use(router).mount('#app');