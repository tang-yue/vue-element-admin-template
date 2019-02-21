import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/fe-staff',
        name: 'Layout',
        component: () => import('./views/Layout'),
        children: [
          {
            path: '/fe-staff/power', 
            name: 'Power',
            component: () => import('./views/Power') 
          },
          {
            path: '/fe-staff/control',
            name: 'Control',
            component: () => import('./views/Control')
          },
          {
            path: '/fe-staff/authority',
            name: 'Authority',
            component: () => import('./views/Authority')
          },
        ]
      },
      {
        path: '/fe-staff/login',
        name: 'Login',
        component: () => import('./views/Login')
      }
    ]
});
