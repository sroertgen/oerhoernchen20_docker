import Vue from 'vue';
import App from './App.vue';
import ReactiveSearch from '@appbaseio/reactivesearch-vue';
import BootstrapVue from 'bootstrap-vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueResource from 'vue-resource';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(ReactiveSearch);
Vue.use(VueResource);

library.add(faArrowCircleUp);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  el: '#app',
  render: h => h(App)
});
