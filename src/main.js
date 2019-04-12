import Vue from 'vue';
import App from './App.vue';

// import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://localhost:4000/');

import router from './router';

export const eventBus = new Vue();

var shared = new Vue({
  data: { 
    nickname: '',
    nickname2: '',
    chosnType: '',
    chosenType2: ''
  }
});

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$myGlobalVars', {
    get () { return shared }
  })
}
Vue.use(shared);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

