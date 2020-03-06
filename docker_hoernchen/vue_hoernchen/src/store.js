import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    user: null,
    message: "",
    auth: null
  },
  mutations: {
    authUser (state, userData) {
      state.accessToken = userData.accessToken;
      state.userId = userData.userId;
    },
    storeUser (state, user) {
      state.user = user;
    },
    message (state, message) {
      state.message = message;
    },
    setAuth (state, authenticated) {
      state.auth = authenticated;
    }
  },
  actions: {
    register ({commit}, authData) {
      const path = 'http://localhost:5000/register';
      axios.post(path, authData)
        .then((res) => {
          console.log("User registriert!");
          console.log(res);
          commit('authUser', {
            accessToken: res.data.accessToken,
            userId: res.data.user_id
          });
        })
        .catch(error => {
          console.error(error);
        });
      },
    login ({commit}, authData) {
      const path = 'http://localhost:5000/auth';
      // return is necessary for promise function
      return axios.post(path, authData)
        .then(res => {
          console.log(res);
          commit('authUser', {
            accessToken: res.data.access_token,
            userId: res.data.user_id
          });
          commit('message', 'success' );
          commit('setAuth', true);
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 401) {
            commit('message', 'unauthorized');
          }
        });
    },
    fetchUser({commit, state}) {
      if (!state.accessToken) {
        return;
      }
      const headers = {
        'Authorization': 'JWT ' + state.accessToken
      };
      axios.get('http://localhost:5000/user/' + this.state.userId,
      {headers: headers})
      .then(res => {
        console.log(res);
        commit('storeUser', res.data.user);
      })
      .catch(error => console.error(error));
    },
  },
  getters: {
    user (state) {
      return state.user;
    },
    isAuthenticated (state) {
      return state.accessToken !== null;
    }
  }
});
