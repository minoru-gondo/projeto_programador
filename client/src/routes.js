import Login from './assets/vue/pages/login.vue';
import Home from './assets/vue/pages/home.vue';
import AlbumsList from './assets/vue/pages/albums/list.vue';
import AlbumsAdd from './assets/vue/pages/albums/add.vue';
import AlbumsEdit from './assets/vue/pages/albums/edit.vue';
import store from './assets/storages';

const guard = async (to, from, next) => {
  let authenticatedUser = store.getters['user/authenticatedUser'];
  if (authenticatedUser) {
    return next();
  }
  else {
    next('/login');
  }
};

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        beforeEnter: guard,
    },
    {
        path: '/albums',
        component: AlbumsList,
        beforeEnter: guard,
    },
    {
        path: '/albums/add',
        component: AlbumsAdd,
        beforeEnter: guard,
    },
    {
        path: '/albums/:_id',
        component: AlbumsEdit,
        beforeEnter: guard,
    }
];