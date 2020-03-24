import axios from 'axios';
import store from './store';

// TODO this should be stored in store
var ip = location.host;
if (ip == 'localhost:8080') {
  ip = 'localhost';
}
var url = "http://" + ip + "/flask";

const apiClient = axios.create({
  baseURL: url
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
      return apiClient.post(path, payload);
    },
  },
  user: {
    fetchUser() {
      const headers = {
        'Authorization': 'Bearer ' + store.state.accessToken
      };
      return apiClient.get('/user/' + store.state.userId,
      {headers: headers});
    }
  },
  likes: {
    getLikes() {
      const path = "/likes/";
      const headers = {
        'Authorization': 'Bearer ' + store.state.accessToken
      };
      return apiClient.get(path + store.state.userId, {headers: headers});
    },
    addLike(item_url) {
      const path = "/like";
      const headers = {
        'Authorization': 'Bearer ' + store.state.accessToken
      };
      const payload = {
        'user_id': store.state.userId,
        'resource_id': item_url
      };
      return apiClient.post(path, payload, {headers: headers});
    },
    deleteLike(item_url) {
      const headers = {
        'Authorization': 'Bearer ' + store.state.accessToken
      };
      const path = "/like";
      const payload = {
        'user_id': store.state.userId,
        'resource_id': item_url
      };
      return apiClient.delete(path, {data: payload, headers});
    }
  },
  vocabs: {
    getVocab(name) {
      const path = '/vocab/' + name;
      return apiClient.get(path);
    },
  },
  gsheets: {
      getGsheet() {
        const path = '/gsheets';
        return apiClient.get(path);
      }
  },
  sitemaps: {
    getSitemaps() {
      const path = '/sitemaps';
      return apiClient.get(path);
    }
  },
  sitemap: {
    postSitemap(payload) {
      const path = '/sitemap/' + payload.name;
      return apiClient.post(path, payload);
    },
    deleteSitemap(payload) {
      const path = '/sitemap/' + payload.name;
      return apiClient.delete(path);
    },
    updateSitemap(payload) {
      const path = '/sitemap/' + payload.name;
      return apiClient.put(path, payload);
    }
  }
};