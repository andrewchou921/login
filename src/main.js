import './assets/main.css';
// 引入 Bootstrap 的 CSS 文件
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-vue-ui-kit/css/mdb.min.css';
// 引入 Bootstrap 的 JavaScript 文件
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
