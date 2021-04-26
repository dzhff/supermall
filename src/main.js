// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import 'normalize.css/normalize.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
// import 'assets/js/bootstrap.js'
// import 'assets/css/bootstrap.css'

// 根路径
axios.defaults.baseURL="http://121.4.187.232:8080"

// 配置Vue原型（在任何组件中都可以用）
// Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(Router);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



