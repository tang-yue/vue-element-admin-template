import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/layout',
          name: 'Layout',
          component: () => import('./views/Layout'),
          children: [
            {
              path: '/power', 
              name: 'Power',
              component: () => import('./views/Power') 
            },
            {
              path: '/control',
              name: 'Control',
              component: () => import('./views/Control')
            },
            {
              path: '/authority',
              name: 'Authority',
              component: () => import('./views/Authority')
            },
          ]
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('./views/Login')
        }
      ]
});