<template>
  <div class="main-content">
    <h2 class="game-title">TickTackTo</h2>
    <div class="game-board">
      <div class="game-message" >
      <span >{{message}}</span>
      </div>
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
          <button @click="clearBoard" class="clear-button">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: "O",
      playerCheck: [],
      nextPlayer: "X",
      isStartGame: false,
      nextPlaterCheck: [],
      count: 0,
      message: ''
    };
  },
  mounted(){
    this.clickArea();

  },
  methods: {
    clickArea() {
    this.isStartGame = true;
      this.message = "";
      const area = document.getElementsByTagName("td");
      Array.from(area).forEach((el, idx) => {
        el.addEventListener("click", e => {
          const index = idx + 1;

          this.checkArea(e.target, index);
        });
      });
    },
    checkArea(el, idx) {
      if(!this.isStartGame) return
      if (el.textContent) {
        this.message = `다른 곳에 놓아주세요, 현재는 ${this.player}의 차례입니다.`;
        return;
      }
      el.textContent = this.player;
      if (this.player === this.nextPlayer) {
        this.player = "O";
        this.nextPlaterCheck.push(idx);
        this.increaseCount();
        this.checkBoard(this.nextPlaterCheck, "X");
      } else {
        this.player = "X";
        this.playerCheck.push(idx);
        this.increaseCount();
        this.checkBoard(this.playerCheck, "O");
      }
    },
    increaseCount() {
      this.count += 1;
    },
    checkBoard(list, msg) {
      if (list.includes(1) && list.includes(2) && list.includes(3)) {
        this.isStartGame = false;
        return  this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(1) && list.includes(4) && list.includes(7)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(1) && list.includes(5) && list.includes(9)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(2) && list.includes(5) && list.includes(8)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(3) && list.includes(6) && list.includes(9)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(3) && list.includes(5) && list.includes(7)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(4) && list.includes(5) && list.includes(6)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      } else if (list.includes(7) && list.includes(8) && list.includes(9)) {
                this.isStartGame = false;
        return this.message = `${msg} 가 이겼습니다!`;
      }
      if (this.count === 9) {
        this.message = "비겼습니다!"
      }
    },
    clearBoard() {

      const area = document.getElementsByTagName("td");
      Array.from(area).forEach(el => {
        el.textContent = "";
      });
      this.isStartGame = true;
      this.message = "";
      this.player = "O";
      this.playerCheck = [];
      this.nextPlaterCheck = [];
      this.count = 0;
    }
  }
};
</script>

<style scoped>
.game-board {
  position: relative;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  text-align: center;
}
.game-message{
  margin-bottom:30px;
  padding:0;
  height: 50px;
  font-size:1.3em;
  font-weight: 700;
  color: rgb(255, 0, 0)
}
table {
    margin:0 auto;
  border-collapse: collapse;
}
td {
  width: 100px;
  height: 100px;
  border: 3px solid black;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
.clear-button{
  position: absolute;
  top:-25%;
  right:20%;
  width: 50px;
  height: 50px;
  font-size:2.8em;
    color:#eee;
  background-color: #333;
  border-radius: 50%;
  outline:none;
  border:none;
  cursor: pointer;

  transition: all .4s;
}
.clear-button:hover{
  color:#333;
  background-color: #eee;
  opacity: 1;
}
</style>
