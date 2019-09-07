import Vue from 'vue';
import store from '../storages'

export default {
  async getWithFilter(data) {
    return await Vue.axios.get('http://localhost:8000/albums/page/' + data.page + '/term/' + data.term)
      .then((response) => {
        if(response) {
          return response.data;
        }
      })
      .catch((error) => {
        if(error) {
          let res = error.response;
          if(res && res.status === 401) {
            store.dispatch('user/logout');
          }
        }
      });
  },
  async post(data) {
    return await Vue.axios.post('http://localhost:8000/albums', data)
    .then((response) => {
      if(response) {
        return response.data;
      }
    })
    .catch((error) => {
      if(error) {
        let res = error.response;
        if(res && res.status === 401) {
          store.dispatch('user/logout');
        }
      }
    });
  },
  async put(data) {
    return await Vue.axios.put('http://localhost:8000/albums/' + data._id, data)
    .then((response) => {
      if(response) {
        return response.data;
      }
    })
    .catch((error) => {
      if(error) {
        let res = error.response;
        if(res && res.status === 401) {
          store.dispatch('user/logout');
        }
      }
    });
  },
};
