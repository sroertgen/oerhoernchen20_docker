import SearchApp from './components/SearchApp.vue';
import App from './App.vue';
import User from './components/user/User.vue';
import AddEntryPage from './components/metadata/AddEntryPage.vue';
import ViewStats from './components/metadata/ViewStats.vue';
import AddSitemap from './components/addSitemap/AddSitemap.vue';

export const routes = [
  {
    path: '',
    name: 'SearchApp',
    component: SearchApp,

  },
  { path: '/user', component: User, children: [

    ]
  },
  {
    path: '/addentry',
    name: 'AddEntryPage',
    component: AddEntryPage,
    props: true
  },
  {
    path: '/viewStats',
    name: 'ViewStats',
    component: ViewStats,
  },
  {
    path: '/addSitemap',
    name: 'AddSitemap',
    component: AddSitemap,
  }
];
