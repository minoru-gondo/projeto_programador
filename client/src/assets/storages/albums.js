import restAlbums from '../webservice/albums';

export default {
  namespaced: true,
  state: {
    albums: [],
    total: 0
  },
  getters: {
    getAlbums(state, getters, rootState) {
      return state.albums;
    },
    getAlbumById(state, getters, rootState) {
      return (albumId) => {
        return state.albums.find((a) => a._id === albumId);
      };
    },
    getTotalAlbums(state, getters, rootState) {
      return state.total;
    },
  },
  mutations: {
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setTotalAlbums(state, total) {
      state.total = total;
    },
    addAlbum(state, album) {
      state.albums.push(album);
    },
    editAlbum(state, album) {
      let idx = state.albums.findIndex((a) => a._id === album._id);
      if(idx != -1)
        state.albums[idx] = album;
    },
  },
  actions: {
    async loadAlbumsWithFilter(ctx, data) {
      await restAlbums.getWithFilter(data).then((response) => {
        ctx.commit('setAlbums', response.albums);
        ctx.commit('setTotalAlbums', response.total);
        return response;
      });
    },
    async addAlbum(ctx, data) {
      await restAlbums.post(data).then((response) => {
        if(response && response._id) {
          ctx.commit('addAlbum', response);
        }
        else
          throw new Error('');
        }).catch((error) => {
          throw new Error('Não foi possível adicionar o usuário, entre em contato com o suporte.');
      });
    },
    async editAlbum(ctx, data) {
      await restAlbums.put(data).then((response) => {
        if(response && response._id) {
          ctx.commit('editAlbum', response);
        }
        else
          throw new Error('');
        }).catch((error) => {
          throw new Error('Não foi possível alterar o usuário, entre em contato com o suporte.');
      });
    },
  },
}