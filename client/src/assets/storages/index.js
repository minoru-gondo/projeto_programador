import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import albums from './albums'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    albums
  }
})
