import {createApp} from 'vue';
import routes from './router/routes';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap";
import "/src/assets/styles/scss/variables.css";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import store from './store';
import {createI18n} from "vue-i18n";

const router = createRouter({
    history: createWebHistory(),
    routes
});

const i18n = createI18n({
    locale: 'sr',
    messages: {
        sr: require('./locales/sr.json'),
        en: require('./locales/en.json'),
    },
});

const app = createApp(App).use(i18n);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user !== null) {
            next();
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

app.use(router).use(store);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
