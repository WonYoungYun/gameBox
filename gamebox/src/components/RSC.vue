<template>
  <div>
    <div class="rscImg"></div>
    <div>{{msg}}</div>
    <button @click="startGame" v-if="isClickRestart">다시하기</button>
    <div v-else>
      <button @click="battle">가위</button>
      <button @click="battle">바위</button>
      <button @click="battle">보</button>
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
      msg: ""
    };
  },
  created() {
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
      const logMessage = `컴퓨터는 ${a} 나는 ${b}`;
      if (myScore - cpScore === 0) {
        this.msg = `비겼습니다! ${logMessage}`;
      } else if ([-1, 2].includes(myScore - cpScore)) {
        this.msg = `졌습니다 ㅜㅜ ${logMessage}`;
      } else if ([1, -2].includes(myScore - cpScore)) {
        this.msg = `이겼습니다 ^^ ${logMessage}`;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.playGame);
  }
};
</script>

<style scoped>
.rscImg {
  width: 250px;
  height: 340px;
  background: url("../assets/RSC.png") 0 0;
}
</style>
