import Vue from 'vue';
import App from './App.vue';

// import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://localhost:4000/');

import router from './router';

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

