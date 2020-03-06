import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ReactiveSearch from '@appbaseio/reactivesearch-vue';
import BootstrapVue from 'bootstrap-vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueResource from 'vue-resource';
import { routes } from './routes';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ReactiveSearch);
Vue.use(VueResource);

library.add(faArrowCircleUp);
library.add(faEdit);

Vue.component("font-awesome-icon", FontAwesomeIcon);

const router = new VueRouter({
  routes,
  mode: 'history'
});

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
