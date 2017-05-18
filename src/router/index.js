import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);

const account = r => require.ensure([], () => r(require('../pages/account/accountMain.vue')), 'account');

export default new Router(
    {
        routes: [
            {
                path: '/',
                name: 'Hello',
                component: Hello
            },
            {
                path: '/account',
                component: account
            }
        ]
    }
);
