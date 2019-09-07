<template>
	<div id="sidebar">
		<ul>
			<li><span @click="openHome()">Home</span></li>
			<li><span @click="openUsers()">Usuários</span></li>
			<li><span @click="logout()">Sair</span></li>
		</ul>
	</div>
</template>

<script>
export default {
  methods: {
    openHome() {
      this.$router.push('/');
    },
    openUsers() {
      this.$router.push('/albums/');
    },
    logout() {
      let self = this;
      self.$store.dispatch('user/logout').then((res) => {
        self.$router.push('/login/');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidebar {
    height: 100%;
    width: 200px;
    background:#151718;
    position: fixed !important;
    z-index: 1;
    overflow-x: hidden;
    display: none;
    width: 15%;
    animation: animateleft 0.4s;
  }
  #sidebar.visible {
    display: block;
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
    width:100%;
    padding:10px;
    cursor: pointer;
  }

  @keyframes animateleft {
    0% {
        left: -200px;
        opacity: 0;
    }
    100% {
        left: 0;
        opacity: 1;
    }
  }
</style>