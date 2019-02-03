import App from './App.vue'
import Vue from 'vue'
import Router from 'vue-router'
import router from './router'

Vue.use(Router);

Vue.config.productionTip = false

new Vue({
  el: '#app', 
  router,
  render: h => h(App)
})



