import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
// import VueResource from 'vue-resource';
Vue.config.productionTip = false;
// Vue.use(VueResource);

Vue.directive('rainbow', {//, binding, vnode
  bind: function(el) {
    el.style.color = '#' + Math.random().toString(16).slice(2,8);
  }
});

axios.defaults.baseURL = 'https://vuedata-89f16-default-rtdb.firebaseio.com';
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

// Vue.directive('theme',{
//   bind: function(el,binding) {
//     if(binding.value=='wide') {
//       el.style.maxWidth='800px';
//     }
//     else if(binding.value=='narrow') {
//       el.style.maxWidth = '560px';
//     }
//     if(binding.arg=="changebg") {
//       el.style.background="#ccdd77";
//       el.style.padding="20px";
//     }
//   }
// });

// Vue.filter('toUpper', function(value) {
//   if(!value) return '';
//   return value.toUpperCase();
// });

// Vue.filter('snippet', function(value) {
//   return value.slice(1, 50) + '...';
// })

// Vue.prototype.$http = axios;
