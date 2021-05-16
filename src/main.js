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
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import 'assets/js/bootstrap.js'
// import 'assets/css/bootstrap.css'

// 根路径
axios.defaults.baseURL="http://121.4.187.232:8080"
// axios.defaults.timeout = 8000

// 配置Vue原型（在任何组件中都可以用）
// Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(Router);
Vue.use(ElementUI);

import {Loading} from 'element-ui'

// let loading;
// const CancelToken = axios.CancelToken;
// // 防止重复请求
// let removePending = (config) => {
//     for (let k in store.state['axiosPromiseCancel']) {
//         if (store.state['axiosPromiseCancel'][k].u === config.url + '&' + config.method) { //当前请求在数组中存在时执行函数体
//             store.state['axiosPromiseCancel'][k].f(); //执行取消操作
//             store.state['axiosPromiseCancel'].splice(k, 1); //把这条记录从数组中移除
//         }
//     }
// };
 
// axios.interceptors.request.use(
//     config=>{
//         //只针对get方式进行序列化
//         if (config.method === 'get') {
//             config.paramsSerializer = function(params) {
//                 return qs.stringify(params, { arrayFormat: 'repeat' })
//             }
//         }
//         if (config.method !== 'post') {
//             // 这个是 取消重点
//             removePending(config);
//             config.cancelToken = new CancelToken((cancel) => {
//                 store.state['axiosPromiseCancel'].push({ u: config.url + '&' + config.method, f: cancel });
//             });
//         }
//         showFullScreenLoading()
//         return config;
//     }
// );
 
// axios.interceptors.response.use(
//     res => {
//         if (res.config.method !== 'post') {
//             removePending(res.config);
//         }
//         tryHideFullScreenLoading()
//         return Promise.resolve(res);
//     },
//     error => {
//         endLoading()
//         if (axios.isCancel(error)) {
//             // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
//             return new Promise(() => {});
//         } else {
//             let msg = '';
//             let msgCh = '';
//             if (error && error.response) {
//                 switch (error.response.status) {
//                     case 404:
//                         msg = 'Request error, the resource was not found';
//                         msgCh = '请求错误,未找到该资源';
//                         break;
//                     case 500:
//                         msg = 'Server Error';
//                         msgCh = '服务器错误';
//                         break;
//                     case 504:
//                         msg = 'Gateway Timeout';
//                         msgCh = '网关超时';
//                         break;
//                     default:
//                         msg = error.response.data.msg;
//                         msgCh = error.response.data.msgCh;
//                 }
 
//                 if (window.$Vue.$i18n.locale === "en") {
//                     msgCh = msg;
//                 }
 
//                 Message({
//                     message: msgCh,
//                     type: 'error',
//                     duration: 5 * 1000,
//                     showClose : true
//                 });
//                 return Promise.reject();
//             }
//         }
//     }
// );
 
//开始 加载loading
let startLoading=()=>{
  loading = Loading.service({
    lock: true,
    text: window.$Vue.$t('common.loading'),//加载动画的文字
    background: 'rgba(0, 0, 0, 0.7)'//加载动画的背景
  })
}
//结束 取消loading加载
let endLoading=()=>{
  loading.close()
}
 
//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
 
let needLoadingRequestCount = 0 //声明一个变量
 
let showFullScreenLoading=()=> {
  if (needLoadingRequestCount === 0) { //当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ //全局变量值++
}
 
let tryHideFullScreenLoading=()=> {
  if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {  //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}
 




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// let loading;
// //内存中正在请求的数量
// let loadingNum=0;

// function startLoading() {    
// 	if(loadingNum==0){
// 		loading = Loading.service({
// 		  lock: true,
// 		  text: '拼命加载中...',
// 		  background:'rgba(255,255,255,0.5)',
// 		})
// 	}
// 	//请求数量加1
// 	loadingNum++;
// }
// function endLoading() {
//     //请求数量减1
// 	loadingNum--
// 	if(loadingNum<=0){
// 		loading.close()
// 	}
// }
 
//请求数据拦截器
// axios.interceptors.request.use(request => {
//   startLoading();
//   return request
// }, err => {
//   return Promise.reject(err);
// });
 
 
//接收响应拦截器
// axios.interceptors.response.use(response => {
//   endLoading();
//   return response
// }, err => {
//   endLoading();
//   if (err && err.response) {
//     switch (err.response.status) {
//       case 400: err.message = '请求错误(400)'; break;
//       case 401: this.$router.push('/login'); break;
//       case 403: err.message = '拒绝访问(403)'; break;
//       case 404: err.message = '请求出错(404)'; break;
//       case 408: err.message = '请求超时(408)'; break;
//       case 500: err.message = '服务器错误(500)'; break;
//       case 501: err.message = '服务未实现(501)'; break;
//       case 502: err.message = '网络错误(502)'; break;
//       case 503: err.message = '服务不可用(503)'; break;
//       case 504: err.message = '网络超时(504)'; break;
//       case 505: err.message = 'HTTP版本不受支持(505)'; break;
//       default: err.message = `连接出错(${err.response.status})!`;
//     }
//   } else {
//     err.message = '连接服务器失败!'
//   }
//   message.error(err.message);
//   return Promise.reject(err);
// });

