<template>
  <div>
    <h1>TickTackTo</h1>
    <button @click="clearBoard">치우기</button>
    <div class="game-board">
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
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.clickArea();
  },
  data() {
    return {
      player: "O",
      playerCheck: [],
      nextPlayer: "X",
      nextPlaterCheck: [],
      count: 0
    };
  },

  methods: {
    clickArea() {
      const area = document.getElementsByTagName("td");
      Array.from(area).forEach((el, idx) => {
        el.addEventListener("click", e => {
          const index = idx + 1;
          this.checkArea(e.target, index);
        });
      });
    },
    checkArea(el, idx) {
      if (el.textContent) {
        alert(`다른 곳에 놓아주세요, 현재는 ${this.player}의 차례입니다.`);
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
        return alert(`${msg} win!`);
      } else if (list.includes(1) && list.includes(4) && list.includes(7)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(1) && list.includes(5) && list.includes(9)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(2) && list.includes(5) && list.includes(8)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(3) && list.includes(6) && list.includes(9)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(3) && list.includes(5) && list.includes(7)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(4) && list.includes(5) && list.includes(6)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      } else if (list.includes(7) && list.includes(8) && list.includes(9)) {
        this.clearBoard();
        return alert(`${msg} win!`);
      }
      if (this.count === 9) {
        alert("비김!");
        this.clearBoard();
      }
    },
    clearBoard() {
      const area = document.getElementsByTagName("td");
      Array.from(area).forEach(el => {
        el.textContent = "";
      });
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
  width: 500px;
  height: 500px;
}
table {
  border: 1px solid black;
}
tr {
  border: 1px solid black;
}
td {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
</style>
