import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookie from 'js-cookie';
import iView from 'iview/dist/iview.min';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI).use(iView);

new Vue({
  router,
  store,
  watch: {
    $route: 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!Cookie('staffUserId')) {
        this.$router.push('/fe-staff/login');
      }
    }
  },
  render: h => h(App),
}).$mount('#app')
