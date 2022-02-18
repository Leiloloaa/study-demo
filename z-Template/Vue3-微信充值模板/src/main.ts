import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vant from "./utils/vant";
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import "@/utils/rem";
import "@/styles/style.less";
import "@/styles/reset.less";
const app = createApp(App)
import { Dialog } from 'vant';
// 挂载全局过滤器

// 全局引入样式
app
  .use(router)
  .use(store)
  .use(vant)
  .use(Dialog)
  .mount('#app')


