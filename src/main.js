import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import Cookie from 'js-cookie';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  watch: {
    "$route": "checkLogin"
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
        if(Cookie('staffUserId')) {
        } else {
            this.$router.push('/fe-staff/login');
        }
    }
  },
  render: h => h(App),
}).$mount('#app')
