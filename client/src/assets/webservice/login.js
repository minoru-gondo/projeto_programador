import Vue from 'vue';

export default {
  async auth(data) {
    return await Vue.axios.post('http://localhost:8000/autenticar', data)
      .then((response) => {
        let res = response.data;
        if(res.ok) {
          Vue.axios.defaults.headers.common['x-access-token'] = response.headers['x-access-token'];
          window.localStorage.setItem('token', JSON.stringify(response.headers['x-access-token']));
          return true
        }
      })
      .catch(error => {});
  }
};
