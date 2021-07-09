import { createApp } from 'vue';
// 匯入 vee-validate 相關規則
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import rules, { required, email, min } from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from 'mitt';
import dayjs from 'dayjs';
import 'bootstrap'; // 參考 Yiren 的說法
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import router from './router';

const emitter = mitt();

// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

// 全部加入
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

setLocale('zh_TW');

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.config.globalProperties.$dayjs = dayjs;

// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
// emitter
app.config.globalProperties.emitter = emitter;

app.mount('#app');
