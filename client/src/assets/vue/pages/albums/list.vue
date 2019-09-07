<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <div class="d-flex justify-content-between">
          <span class="title">Usuários</span>
          <b-button @click="addUser()">Adicionar Usuário</b-button>
        </div>
        <pagination-table 
          :items="users" 
          :fields="['nome', 'username']" 
          :totalRows="totalAlbums" 
          @pageClicked="loadPage" 
          @rowClicked="editUser"
          @newSearch="filterUser" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
import PaginationTable from '../../components/paginationTable';
export default {
  components: {
    Navbar,
    PaginationTable
  },
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.getters["albums/getAlbums"];
    },
    totalAlbums() {
      return this.$store.getters["albums/getTotalAlbums"];
    },
  },
  methods: {
    editUser(user) {
      this.$router.push('/albums/' + user._id);
    },
    addUser() {
      this.$router.push('/albums/add');
    },
    loadPage(data) {
      this.$store.dispatch("albums/loadAlbumsWithFilter", data);
    },
    filterUser(term) {
      let data = {
        page: 1,
        term
      };
      this.$store.dispatch("albums/loadAlbumsWithFilter", data);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 20px 20px 20px 20px;
    overflow: hidden;
  }
  .title {
    align-self: flex-end;
    font-size: 1.3rem;
  }
  ul {
    margin:0px;
    padding:0px;
  }

  ul li {
    list-style:none;
  }

  ul li span {
    background:#1C1E1F;
    color:#ccc;
    border-bottom:1px solid #111;
    display:block;
    padding:10px;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 3px;
  }
  .btnAddUsuario {
    border: 1px solid #9c9c9c;
    padding: 6px;
    float: right;
    margin-top: -13px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #ccc;
  }
  .btnAddUsuario:active {
    background-color: #b1b0b0;
  }
</style>