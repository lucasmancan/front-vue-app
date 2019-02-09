import App from './App.vue'
import Vue from 'vue'
import Router from 'vue-router'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/vue-material.css'


Vue.use(Router);
Vue.use(VueMaterial);

Vue.config.productionTip = false

new Vue({
  el: '#app', 
  router,
  render: h => h(App)
})



