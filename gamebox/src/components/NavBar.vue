<template>
  <div id="navbar">
    <h1 class="navbar-home">
      <router-link to="/">Home&nbsp;</router-link>
    </h1>
    <ul class="navbar-list">
      <li class="list-button">
        <h2>게임모음 1</h2>
        <ul class="games-list">
          <li>
            <router-link to="/wordchain">끝말잇기&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/multiplication">구구단&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/numberbaseball">숫자야구&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/ticktackto">틱택토&nbsp;</router-link>
          </li>
        </ul>
      </li>
      <li class="list-button">
        <h2>게임모음 2</h2>
        <ul class="games-list">
          <li>
            <router-link to="/lotto">Lotto&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/rps">가위바위보&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/minesweeper">지뢰찾기&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/reaction">반응속도&nbsp;</router-link>
          </li>
        </ul>
      </li>
      <li class="list-button">
        <h2>게임모음 3</h2>
        <ul class="games-list">
          <li>
            <router-link to="/cardpair">카드 맞추기&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/jearthstone">자스스톤&nbsp;</router-link>
          </li>
          <li>
            <router-link to="/game2048">2048게임&nbsp;</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#navbar {
  display: flex;
  min-width: 800px;
  width: 100%;
  height: 60px;
  background-color: #50bcdf;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

.navbar-home {
  margin: 0;
  padding: 0;
}
.navbar-list {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.list-button {
  position: relative;
  display: inline-block;
  height: 100%;
  margin: 0 20px;
}
.list-button h2 {
  display: inline-block;
  height: 100%;
  cursor: default;
  transition: color 0.5s;
  line-height: 2.5;
}
.list-button h2:hover {
  color: #eee;
}
.list-button .games-list {
  position: absolute;
  background-color: #50bcdf;
  list-style: circle;
  color: #eee;
  top: 40%;
  left: -15%;
  width: 100%;
  height: 200px;
  opacity: 0;
  transition: all 0.3s;
}
.games-list li {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 700;
}

.list-button:hover .games-list {
  top: 100%;
  opacity: 1;
  z-index: 9999;
}

a {
  text-decoration: none;
  font-size: 1.1em;
  color: #eee;
  transition: color 0.4s;
}
a:hover {
  color: #333;
}
</style>
