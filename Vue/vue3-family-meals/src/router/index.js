import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';
// import { createRouter, createWebHashHistory } from './mini-router/index.js';
import Home from '../pages/home.vue';
import About from '../pages/about.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

console.log(router);
// progress bar
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    next();
    console.log(NProgress);
    console.log('我刚开始进入了');
});
router.afterEach(() => {
    // finish progress bar
    NProgress.done();
    console.log('我已经进入了');
});

export default router;