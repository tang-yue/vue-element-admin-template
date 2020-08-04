import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router/index'
import store from './store'
import '@/styles/base.less'
import '@/styles/element-ui.less'
import '@/styles/iconfont.less'
import '@/styles/index.less' // global css
import './permission'
import './icons/index'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
