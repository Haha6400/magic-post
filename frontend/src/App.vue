<template>
    <SideBar :key="$route.fullPath"/>
  
  <router-view />
</template>

<script setup>
import axios from "axios";
axios.defaults.headers.common.authorization = localStorage.getItem("token");
import SideBar from "@/components/SideBar.vue";

</script>
<style>
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  max-width: none;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  background-color: #FFE4B2;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: row;
}

.app {
  display: flex;
  flex-direction: row;
  align-items: center;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }

  }

}
</style>