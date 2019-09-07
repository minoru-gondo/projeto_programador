<template>
  <div>
    <b-form-input placeholder="Pesquisar usuário..." class="searchAlbum" ref="search" @input="searchAlbum($event)"></b-form-input>
    <div class="container-table">
      <b-table striped hover :items="items" :fields="fields" @row-clicked="rowClicked"></b-table>
    </div>
    <div class="d-flex justify-content-end">
    <b-pagination
      v-model="page"
      :total-rows="totalRows"
      per-page="15"
      first-text="Primeiro"
      prev-text="Anterior"
      next-text="Próximo"
      last-text="Último" />
    </div>
  </div>
</template>

<script>
let searchDispathTimeout;

export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    fields: {
      type: Array,
      default: []
    },
    totalRows: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      page: 0,
    }
  },
  watch: {
    page(newPage, oldPage) {
      let data = {
        page: newPage || 1,
        term: this.$refs.search.$el.value
      }
      this.$emit('pageClicked', data);
    }
  },
  methods: {
    rowClicked(item, index, button) {
      this.$emit('rowClicked', item);
    },
    searchAlbum(term) {
      let self = this;
      clearTimeout(searchDispathTimeout);
      searchDispathTimeout = setTimeout(() => {
        self.$emit('newSearch', term);
      }, 600);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-table {
  margin: 1em auto;
}
.searchAlbum {
  margin-top: 2em;
}
</style>