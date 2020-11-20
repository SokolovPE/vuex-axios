import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import VueRouter from 'vue-router';

import { routes } from './routes';
import { store } from './store/store';

//* Fonts and icons
import '@/assets/argon-design-system-free/assets/css/argon-design-system.css';
import '@/assets/argon-design-system-free/assets/css/nucleo-icons.css';
//* Nucleo Icons
import '@/assets/argon-design-system-free/assets/css/nucleo-svg.css';
import '@/assets/argon-design-system-free/assets/css/font-awesome.css';

//* Scripts.
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        //* If position on page was saved by browser then scroll user back to that position.
        if (savedPosition) {
            return savedPosition;
        }
        //* If we have hash in url with element id, then navigate to that element.
        if (to.hash) {
            return {
                selector: to.hash //,
                // behavior: 'smooth' //* For a smooth scrolling.
            };
        }
        //* In all other cases scroll to top.
        return { x: 0, y: 0 };
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
