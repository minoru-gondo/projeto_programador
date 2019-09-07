<template>
	<div>
    <ul>
      <li>
        <span class="menuIcon" @click="toggleMenu()"></span>
      </li>
    </ul>
	</div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      let sidebar = document.getElementById('sidebar');
      let main = document.getElementById('main');
      if(sidebar.classList.contains('visible')) {
        sidebar.classList.remove('visible');
        main.style.marginLeft = '0%';
      }
      else {
        sidebar.classList.add('visible');
        main.style.marginLeft = '15%';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  height: 55px;
}

li .menuIcon {
  display: block;
  background-image: url("../../images/menu-icon.svg");
  background-size: contain;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  margin-left: 15px;
  margin-top: 15px;
  cursor: pointer;
}
</style>