<template>
  <div>
    <navbar />
    <div class="container">
      <div class="wrapper">
        <span class="title">Alterar Usuário</span>
        <div class="form">
          <div class="row">
            <div class="fieldName">
              <div class="tituloCampo">Nome do usuário</div>
              <input 
                type="text" 
                ref="nome"
                class="inputText" 
                placeholder="" />
            </div>
            <div class="fieldUsername">
              <div class="tituloCampo">Username</div>
              <input 
                type="text" 
                ref="username"
                class="inputText" 
                placeholder="" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <span class="button btnBack" @click="voltar()">Cancelar</span>
          <span class="button btnSave" @click="salvar()">Salvar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
export default {
  data() {
    return {
      cursoId: null
    };
  },
  components: {
    Navbar
  },
  data() {
    return {
      _id: null
    };
  },
  mounted() {
    this._id = this.$route.params._id;
    let currentUser = this.$store.getters["albums/getAlbumById"](this._id);

    if(currentUser && currentUser._id) {
      this.$refs.nome.value = currentUser.nome;
      this.$refs.username.value = currentUser.username;
    }
    else {
      this.voltar();
      alert('Usuário não encontrado, verifique se está na lista.');
    }
  },
  methods: {
    voltar() {
      this.$router.push('/albums/');
    },
    salvar() {
      let self = this;
      let data = {
        _id: self._id,
        nome: self.$refs.nome.value,
        username: self.$refs.username.value
      }

      if(!data.nome)
        return alert('Campo do nome está em branco, favor preencher!');
      else if(!data.username)
        return alert('Username está em branco, favor preencher!');

      self.$store.dispatch("albums/editAlbum", data)
      .then(() => {
        self.$router.push('/albums/');
        alert('Usuário alterado com sucesso!');
      })
      .catch(e => {
        alert('Não foi possível alterar o usuário, entre em contato com o suporte.');
      });
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
    font-size: 1.3rem;
  }
  .form {
    margin: 5px 0px;
    padding: 20px;
    display: block;
    background: #f1f1f1;
    border-radius: 5px;
  }
  .row {
    display: flex;
    flex-flow: row nowrap;
    padding: 0 15px;
  }
  .fieldName {
    flex-grow: 3;
  }
  .fieldUsername {
    flex-grow: 1;
    padding-left: 20px;
  }
  .tituloCampo {
    margin-bottom: 0.3em;
    margin-left: 0.2em;
    white-space: nowrap;
    width: 100%;
  }
  .inputText {
    border-radius: 5px;
    border: 1px solid #4C4D6E;
    padding: 8px 5px 8px 5px;
    color: #2f3847;
    width: 100%;
    position: relative;
    display: block;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-content: space-around;
  }
  .button {
    padding: 5px 10px 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
  }
  .btnSave {
    background: #5a6268;
    color: #fff;
  }
</style>