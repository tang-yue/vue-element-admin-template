import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import Cookie from 'js-cookie';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
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
