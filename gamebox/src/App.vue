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
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
