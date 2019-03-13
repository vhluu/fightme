import Vue from 'vue';
import App from './App.vue';
import { store } from './store';

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:5000/');

export const eventBus = new Vue();

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

