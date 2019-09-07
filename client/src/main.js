import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import store from './assets/storages';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

let token = JSON.parse(localStorage.getItem('token'));

if(Vue.axios && token) {
  Vue.axios.defaults.headers.common['x-access-token'] = token;
}

const router = new VueRouter({ 
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
