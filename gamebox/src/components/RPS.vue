<template>
  <div class="main-content">
    <h2 class="game-title">가위 바위 보</h2>
    <div class="game-board">
      <div class="img-content">
    <div class="rscImg"></div>
    </div>
    <div class="user-content">
    <div class="message" v-html="msg"></div>
    <div class="button-area">
    <button @click="startGame" v-if="isClickRestart" class="reset-button">- 다시하기 -</button>
    <div v-else>
      <button @click="battle" class="rps-button">가위</button>
      <button @click="battle" class="rps-button">바위</button>
      <button @click="battle" class="rps-button">보</button>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
const MESSAGE = "컴퓨터와의 승부!";
export default {
  data() {
    return {
      playGame: null,
      boardPosition: "0",
      boardWidth: "250px",
      dic: {
        바위: "0",
        가위: "-250px",
        보: "-500px"
      },
      score: {
        바위: 1,
        가위: 0,
        보: -1
      },
      isClickRestart: false,
      msg: "",
    };
  },
  created() {
        document.title = "Rock Paper Scissors";
    this.startGame();
  },
  methods: {
    startGame() {
      this.msg = MESSAGE;
      this.isClickRestart = false;
      this.playGame = setInterval(() => {
        const gameBoard = document.querySelector(".rscImg");
        if (this.boardPosition === this.dic.바위) {
          this.boardPosition = this.dic.가위;
        } else if (this.boardPosition === this.dic.가위) {
          this.boardPosition = this.dic.보;
          this.boardWidth = "305px";
        } else if (this.boardPosition === this.dic.보) {
          this.boardPosition = this.dic.바위;
          this.boardWidth = "250px";
        }
        gameBoard.style.backgroundPosition = this.boardPosition;
        gameBoard.style.width = this.boardWidth;
      }, 100);
    },
    battle(e) {
      const myHand = e.target.textContent;
      const cpHand = this.getCPHand(this.boardPosition);
      return this.checkWin(myHand, cpHand);
    },
    getCPHand(bp) {
      return Object.entries(this.dic).find(item => {
        return item[1] === bp;
      })[0];
    },
    checkWin(a, b) {
      clearInterval(this.playGame);
      this.isClickRestart = true;
      const myScore = this.score[a];
      const cpScore = this.score[b];
      const logMessage = `컴퓨터는 ${b} 나는 ${a}`;
      if (myScore - cpScore === 0) {
        this.msg = "비겼습니다! <br/>"+ logMessage;
      } else if ([-1, 2].includes(myScore - cpScore)) {
        this.msg = "졌습니다! ㅠㅠ <br/>"+ logMessage;
      } else if ([1, -2].includes(myScore - cpScore)) {
        this.msg = "이겼습니다 ^^b <br/>" + logMessage;
;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.playGame);
  }
};
</script>

<style scoped>
.game-board{
  width: 700px;
  margin: 30px auto;
  display: flex;
}
.img-content{
  flex:1;
}
.rscImg {
  width: 250px;
  height: 340px;
  background: url("../assets/RPS.png") 0 0;
}
.user-content{
  flex:1 ;
  text-align: center;
}
.message{
  margin-top: 30px;
  font-size: 1.5em;
  font-weight: 500;
}
.button-area{
  margin-top:70px;
}
.reset-button{
  background: none;
  font-size: 1.3em;
  font-weight: 700;
  border-radius: 20px;
  height: 50px;
  width: 170px;
  color:#333;
  cursor: pointer;
  transition: all .2s;
}
.reset-button:hover{
  background-color: rgba(0,0,0, .5);
  color:#eee;
}
.rps-button{
  width: 60px;
  height: 60px;
  margin: 0 10px;
  border-radius: 50%;
  transition: opacity .3s;
  cursor: pointer;
  opacity: .5;
}
.rps-button:first-child{
  background-color: rgb(0,255,0)
}
.rps-button:nth-child(2){
  background-color: rgb(0,0,255)
}
.rps-button:nth-child(3){
  background-color: rgb(255,0,0)
}
.rps-button:hover{
  opacity: 1;
}
</style>
