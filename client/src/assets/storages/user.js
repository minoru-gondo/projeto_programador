import restLogin from '../webservice/login';

let token = JSON.parse(localStorage.getItem('token'));

export default {
  namespaced: true,
  state: {
    authenticatedUser: token ? true : false,
  },
  getters: {
    authenticatedUser(state, getters, rootState) {
      return state.authenticatedUser;
    }
  },
  mutations: {
    setAuthenticatedUser(state, authenticatedUser) {
      state.authenticatedUser = authenticatedUser;
    },
    logout(state) {
      state.authenticatedUser = false;
      window.localStorage.setItem('token', null);
    }
  },
  actions: {
    async login(ctx, userData) {
      await restLogin.auth(userData).then((response) => {
        if(response) {
          ctx.commit('setAuthenticatedUser', response);
        }
        else
          throw new Error('Usuário inválido'); 
      });
    },
    async logout(ctx) {
      ctx.commit('logout');
    },
  },
}