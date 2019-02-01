<template>
  <div>
    <h1>2048Game</h1>
    <div>
      <table id="table" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
        <tr v-for="(line,index) in table" :key="index">
          <td v-for="item in line" :key="item.id">{{item.content}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: [],
      sideTable: [[], [], [], []],
      isDragStart: false,
      isDragging: false,
      mousePos: {
        startPos: [],
        endPos: [],
        direction: ""
      },
      isStartGame: false,
      count: 0,
      make2048: false
    };
  },
  created() {
    this.setTable();
  },
  methods: {
    setTable() {
      const arr = [];
      const createArr = function() {
        [1, 2, 3, 4].forEach((_, rowIdx) => {
          let row = [];
          arr.push(row);
          [1, 2, 3, 4].forEach((_, idx) => {
            row.push({
              id: idx + rowIdx * 4,
              content: null
            });
          });
        });
      };
      createArr();
      this.table = arr;
      this.randomCreate();
      this.isStartGame = true;
    },
    randomCreate() {
      const rNum = Math.floor(Math.random() * 16);
      const row = Math.floor(rNum / 4);
      const col = Math.floor(rNum % 4);

      if (this.table[row][col].content) return this.randomCreate();
      return (this.table[row][col].content = 2);
    },
    mouseDown(e) {
      if (!this.isStartGame) return;
      this.isDragStart = true;
      this.mousePos.startPos = [e.clientX, e.clientY];
    },
    mouseMove() {
      if (this.isDragStart) {
        this.isDragging = true;
      }
    },
    mouseUp(e) {
      this.mousePos.endPos = [e.clientX, e.clientY];
      if (this.isDragging) {
        this.calPos();
      }
      this.isDragStart = false;
      this.isDragging = false;
      if (!this.mousePos.direction) return;
      switch (this.mousePos.direction) {
        case "right": {
          this.table.forEach((el, index) => {
            el.forEach(el2 => {
              if (el2.content) {
                if (
                  this.sideTable[index][0] &&
                  this.sideTable[index][0] === el2.content
                )
                  this.sideTable[index][0] *= 2;
                else this.sideTable[index].unshift(el2.content);
              }
            });
          });
          [1, 2, 3, 4].forEach((_, i) => {
            [1, 2, 3, 4].forEach((_, j) => {
              this.table[i][3 - j].content = this.sideTable[i][j] || "";
            });
          });
          this.sideTable = [[], [], [], []];
          break;
        }
        case "left": {
          this.table.forEach((el, index) => {
            el.forEach(el2 => {
              if (el2.content) {
                if (
                  this.sideTable[index][this.sideTable[index].length - 1] &&
                  this.sideTable[index][this.sideTable[index].length - 1] ===
                    el2.content
                ) {
                  this.sideTable[index][this.sideTable[index].length - 1] *= 2;
                } else {
                  this.sideTable[index].push(el2.content);
                }
              }
            });
          });
          [1, 2, 3, 4].forEach((_, i) => {
            [1, 2, 3, 4].forEach((_, j) => {
              this.table[i][j].content = this.sideTable[i][j] || "";
            });
          });
          this.sideTable = [[], [], [], []];
          break;
        }
        case "up": {
          this.table.forEach(el => {
            el.forEach((el2, idx) => {
              if (el2.content) {
                if (
                  this.sideTable[idx][this.sideTable[idx].length - 1] &&
                  this.sideTable[idx][this.sideTable[idx].length - 1] ===
                    el2.content
                ) {
                  this.sideTable[idx][this.sideTable[idx].length - 1] *= 2;
                } else {
                  this.sideTable[idx].push(el2.content);
                }
              }
            });
          });
          [1, 2, 3, 4].forEach((_, i) => {
            [1, 2, 3, 4].forEach((_, j) => {
              this.table[j][i].content = this.sideTable[i][j] || "";
            });
          });
          this.sideTable = [[], [], [], []];
          break;
        }
        case "down": {
          this.table.forEach(el => {
            el.forEach((el2, idx) => {
              if (el2.content) {
                if (
                  this.sideTable[idx][0] &&
                  this.sideTable[idx][0] === el2.content
                ) {
                  this.sideTable[idx][0] *= 2;
                } else {
                  this.sideTable[idx].unshift(el2.content);
                }
              }
            });
          });
          [1, 2, 3, 4].forEach((_, i) => {
            [1, 2, 3, 4].forEach((_, j) => {
              this.table[3 - j][i].content = this.sideTable[i][j] || "";
            });
          });
          this.sideTable = [[], [], [], []];
          break;
        }
      }
      this.randomCreate();
      this.mousePos.direction = "";
      this.gameCheck();
    },
    gameCheck() {
      this.table.forEach(el => {
        el.forEach(el2 => {
          if (el2.content) {
            this.count++;
          }
          if (el2.content === 2048) {
            this.make2048 = true;
          }
        });
      });
      if (this.make2048) {
        this.isStartGame = false;
        return alert("2048만들었다!");
      }
      if (this.count === 16) {
        this.isStartGame = false;
        return alert("게임 끝");
      }
      this.count = 0;
    },
    calPos() {
      const posX = this.mousePos.endPos[0] - this.mousePos.startPos[0];
      const posY = this.mousePos.endPos[1] - this.mousePos.startPos[1];
      const pNum = Math.abs(posX) > Math.abs(posY) ? posX : posY;

      if (pNum === posX) {
        if (posX > 0) this.mousePos.direction = "right";
        else this.mousePos.direction = "left";
      } else {
        if (posY > 0) this.mousePos.direction = "down";
        else this.mousePos.direction = "up";
      }
      //cNum이 0보다 작으면 밑이나 오른쪽으로 스와이프 한것
    }
  }
};
</script>

<style scoped>
#table {
  margin: 0 auto;
  width: 500px;
  height: 500px;

  border-collapse: collapse;
  user-select: none;
}
td {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  text-align: center;
}
</style>

