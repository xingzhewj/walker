import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);

const menu = r => require.ensure([], () => r(require('../pages/menu/menuMain.vue')), 'menu');
const order =  r => require.ensure([], () => r(require('../pages/orderMenu/orderMain.vue')), 'order');
const upload = r => require.ensure([], () => r(require('../pages/upload/uploadMain.vue')), 'upload');

export default new Router(
    {
        base: '/walker',
        routes: [
            {
                path: '/',
                name: 'menu',
                component: menu
            },
            {
                path: '/menu',
                component: menu
            },
            {
                path: '/order',
                component: order
            },
            {
                path: '/upload',
                component: upload
            }
        ]
    }
);
