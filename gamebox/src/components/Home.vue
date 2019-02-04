<template>
  <section>
    <h1 class="home-title">여러가지 게임들을 즐기세요!</h1>

    <div class="home-description"></div>
    <div class="content">
      <ul class="game-list">
        <li>
          <router-link to="/wordchain" class="card wordchain">
            <div class="card-cover">
              <span class="card-text">끝말잇기</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/multiplication" class="card multiplication">
            <div class="card-cover">
              <span class="card-text">구구단</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/numberbaseball" class="card baseball">
            <div class="card-cover">
              <span class="card-text">숫자야구</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/ticktackto" class="card ticktackto">
            <div class="card-cover">
              <span class="card-text">틱택토</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/lotto" class="card lotto">
            <div class="card-cover">
              <span class="card-text">Lotto</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/rps" class="card rps">
            <div class="card-cover">
              <span class="card-text">가위바위보</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/minesweeper" class="card mine">
            <div class="card-cover">
              <span class="card-text">지뢰찾기</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/reaction" class="card reaction">
            <div class="card-cover">
              <span class="card-text">반응속도</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/cardpair" class="card cardpair">
            <div class="card-cover">
              <span class="card-text">카드 맞추기</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/jearthstone" class="card jearthstone">
            <div class="card-cover">
              <span class="card-text">자스스톤</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/game2048" class="card game2048">
            <div class="card-cover">
              <span class="card-text">2048게임</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  beforeCreate() {
    document.title = "gamebox";
  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
.game-list {
  width: 100%;
  padding: 0 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
}
.card {
  position: relative;
  display: inline-block;
  width: 167px;
  height: 200px;
  margin: 20px;
  overflow: hidden;
}
.card-cover {
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: top 0.5s;
}
.card:hover .card-cover {
  top: 0;
}
.card-text {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 5;
}
.wordchain {
  background: url("../assets/card/wordchain.jpg") 0 0;
}
.multiplication {
  background: url("../assets/card/mul.jpg") 0 0;
}
.baseball {
  background: url("../assets/card/baseball.jpg") 0 0;
}
.ticktackto {
  background: url("../assets/card/ticktackto.jpg") 0 0;
}
.lotto {
  background: url("../assets/card/lotto.jpg") 0 0;
}
.rps {
  background: url("../assets/RPS.png") 0 0;
}
.mine {
  background: url("../assets/card/mine.jpg");
  background-position: 50%;
}
.reaction {
  background: url("../assets/card/eye.png") 0 0;
}
.cardpair {
  background: url("../assets/card/pair.jpg") 0 0;
}
.jearthstone {
  background: url("../assets/card/jearthstone.jpg") 0 0;
}
.game2048 {
  background: url("../assets/card/2048.jpg") 0 0;
}
</style>
