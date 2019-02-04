<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar
  },
  created() {
    window.addEventListener(
      "keydown",
      function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
        }
      },
      false
    );
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f1f4f8;
}
ul {
  list-style: none;
  margin: 0;
}

h2 {
  margin: 0;
  padding: 0;
}
.game-title{
  font-size:2.2em;
  letter-spacing: .3em;
}


</style>
