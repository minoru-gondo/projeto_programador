<template>
  <div>
    <navbar />
    <div class="container">
      <div class="home">Bem vindo ao Sistema do Projeto Programador</div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
export default {
  components: {
    Navbar
  }, 
  methods: {
    openCursos() {
      this.$router.push('/cursos/');
    },
    openMatriculas() {
      this.$router.push('/matriculas/');
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    padding: 20px 0px 0px 20px;
    text-align: center;
    font-size: 4vw;
  }
</style>