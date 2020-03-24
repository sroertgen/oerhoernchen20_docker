import Vue from 'vue';
import Vuex from 'vuex';
import apiClient from './axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    user: null,
    message: "",
    auth: null,
    liked_resources: []
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
    },
    clearAuthData (state) {
      state.accessToken = null;
      state.userId = null;
      state.auth = null;
      state.message = "logout";
      state.liked_resources = [];
    },
    setLikedResources (state, liked_resources) {
      state.liked_resources = [];
      liked_resources.forEach(element => {
        console.log(element.resource_id);
        state.liked_resources.push(element.resource_id);
      });
    },
  },
  actions: {
    register ({commit}, authData) {
      apiClient.auth.register(authData)
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
      // return is necessary for promise function
      return apiClient.auth.login(authData)
        .then(res => {
          console.log(res);
          commit('authUser', {
            accessToken: res.data.access_token,
            userId: res.data.user_id
          });
          commit('message', 'success' );
          commit('setAuth', true);
          this.dispatch('getLikes');
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 401) {
            commit('message', 'unauthorized');
          }
        });
    },
    logout ({commit}) {
      return commit('clearAuthData');
    },
    fetchUser({commit, state}) {
      if (!state.accessToken) {
        return;
      }
      apiClient.user.fetchUser()
      .then(res => {
        console.log(res);
        commit('storeUser', res.data.user);
      })
      .catch(error => console.error(error));
    },
    getLikes({commit, state}) {
      if (!state.accessToken) {
        return;
      }
      apiClient.likes.getLikes()
      .then(res => {
        console.log(res);
        commit('setLikedResources', res.data.liked_resources);
      })
      .catch(error => {
        console.error(error);
      });
    },
    addLike({commit, state}, item_url) {
      if (!state.accessToken) {
        return;
      }
      apiClient.likes.addLike(item_url)
        .then(res => {
          console.log(res);
          this.dispatch('getLikes');
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteLike({commit, state}, item_url) {
      if (!state.accessToken) {
        return;
      }
      apiClient.likes.deleteLike(item_url)
        .then(res => {
          console.log(res);
          this.dispatch('getLikes');
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  getters: {
    user (state) {
      return state.user;
    },
    liked_resources (state) {
      return state.liked_resources;
    },
    isAuthenticated (state) {
      return state.accessToken !== null;
    }
  }
});
