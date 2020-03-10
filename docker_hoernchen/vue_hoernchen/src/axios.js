import axios from 'axios';
import store from './store';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000'
});

export default {
  apiClient,
  auth: {
    login(payload) {
      const path = '/auth';
      return apiClient.post(path, payload);
    },
    register(payload) {
      const path = '/register';
      return apiClient.post(path,payload);
    },
  },
  user: {
    fetchUser() {
      const headers = {
        'Authorization': 'JWT ' + store.state.accessToken
      };
      return apiClient.get('/user/' + store.state.userId,
      {headers: headers});
    }
  },
  likes: {
    getLikes() {
      const path = "/likes/";
      const headers = {
        'Authorization': 'JWT ' + store.state.accessToken
      };
      return apiClient.get(path + store.state.userId, {headers: headers});
    },
    addLike(item_url) {
      const path = "/like";
      const headers = {
        'Authorization': 'JWT ' + store.state.accessToken
      };
      const payload = {
        'user_id': store.state.userId,
        'resource_id': item_url
      };
      return apiClient.post(path, payload, {headers: headers});
    },
    deleteLike(item_url) {
      const headers = {
        'Authorization': 'JWT ' + store.state.accessToken
      };
      const path = "/like";
      const payload = {
        'user_id': store.state.userId,
        'resource_id': item_url
      };
      return apiClient.delete(path, {data: payload, headers});
    }
  }
  };