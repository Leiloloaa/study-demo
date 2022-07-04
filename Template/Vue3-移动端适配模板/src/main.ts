import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vant from "./utils/vant";
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import "./utils/rem"
// import "../src/styles/style.less";
// import "../src/styles/reset.less";

// 全局引入样式
createApp(App)
    .use(router)
    .use(store)
    .use(vant)
    .mount('#app')
