/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2021-10-28 15:02:15
 * @LastEditors: 程
 * @LastEditTime: 2025-12-12 11:11:12
 */
import '../lang/index.js';
import { createApp } from 'vue';

//重置样式

import '../theme/reset.css';
import './index.css';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
//element
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/dark/css-vars.scss';
import './drckcss/index.css';
import * as ElIcons from '@element-plus/icons-vue';

//动画插件
import animated from 'animate.css';

// 自适应
import 'lib-flexible';

//i18n国际化
import i18n from '@/i18n/index';

import App from './App.vue';
import router from '../router/index';

//页面顶部title修改
router.beforeEach((to, from, next) => {
  //跳转新页面回到顶部;
  window.scrollTo(0, 0);
  //修改浏览器的title;
  if (to.meta.title) {
    document.title = 'CL' + ' - ' + to.meta.title;
  }
  next();
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component);
}

app.use(animated);
app.use(ElementPlus);
app.use(router);
app.use(i18n);

app.mount('#app');
