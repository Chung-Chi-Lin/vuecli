import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

// eslint-disable-next-line vue/multi-word-component-names
app.component('Form', Form);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
