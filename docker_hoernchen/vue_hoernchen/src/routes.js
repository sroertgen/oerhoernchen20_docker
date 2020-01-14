import SearchApp from './components/SearchApp.vue';
import App from './App.vue';
import Login from './components/user/Login.vue';
import User from './components/user/User.vue';
import AddEntryPage from './components/metadata/AddEntryPage.vue';
import ViewStats from './components/metadata/ViewStats.vue';

export const routes = [
  { 
    path: '',
    component: SearchApp,
      
  },
  { path: '/login', component: Login},
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
  }
];