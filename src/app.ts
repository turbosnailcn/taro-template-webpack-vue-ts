import { createApp } from 'vue';
import { router } from "@/router";
import { createPinia } from "pinia";
import './app.css'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const pinia = createPinia();

App.use(pinia);
App.use(router);

export default App
