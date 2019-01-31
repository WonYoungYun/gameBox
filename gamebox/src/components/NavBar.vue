<template>
  <div id="navbar">
    <router-link to="/">Home&nbsp;</router-link>|
    <router-link to="/wordchain">끝말잇기&nbsp;</router-link>|
    <router-link to="/multiplication">구구단&nbsp;</router-link>|
    <router-link to="/numberbaseball">숫자야구&nbsp;</router-link>|
    <router-link to="/ticktackto">틱택토&nbsp;</router-link>|
    <router-link to="/lotto">로또&nbsp;</router-link>|
    <router-link to="/rps">가위바위보&nbsp;</router-link>|
    <router-link to="/minesweeper">지뢰찾기&nbsp;</router-link>|
    <router-link to="/reaction">반응속도 테스트&nbsp;</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#navbar {
  width: 100%;
  height: 60px;
  background-color: yellow;
  padding: 15px;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  font-size: 1.1em;
}
</style>
