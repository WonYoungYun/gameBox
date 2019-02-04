<template>
  <div>
    <h1>MineSweeper</h1>
    <div>
      <div>
        <input type="radio" id="easy" value="easy" v-model="levelCheck">
        <label for="easy">쉬움</label>
        <input type="radio" id="normal" value="normal" v-model="levelCheck">
        <label for="normal">중간</label>
        <input type="radio" id="hard" value="hard" v-model="levelCheck">
        <label for="hard">어려움</label>
        <input type="radio" id="custom" value="custom" v-model="levelCheck">
        <label for="custom">내가만들기</label>
      </div>
      <div v-if="!isSelectCustom">
        <label for="custom_height">세로크기&nbsp;</label>
        <input
          type="number"
          id="custom_height"
          value="custom_height"
          v-model="level.custom.height"
          maxlength="2"
          autocomplete="off"
        >
        <label for="custom_width">가로크기&nbsp;</label>
        <input
          type="number"
          id="custom_width"
          value="custom_width"
          v-model="level.custom.width"
          maxlength="2"
          autocomplete="off"
        >
        <label for="custom_mines">지뢰의 수&nbsp;</label>
        <input
          type="number"
          id="custom_mines"
          value="custom_mines"
          v-model="level.custom.mines"
          maxlength="2"
          autocomplete="off"
        >
      </div>
      <button @click="startGame" :disabled="invalidButton" v-if="!isStart">start</button>
      <button @click="reset" :disabled="invalidButton" v-else>reset</button>
      <div>
        <table id="board">
          <tbody>
            <tr v-for="(line,index) in board" :key="index">
              <td
                v-for="(item, lIdx) in line"
                :key="lIdx"
                @contextmenu.prevent="setFlag"
                @click="checkArea"
                :class="{opened: item.done, question: item.question, exclamation: item.exclamation}"
              >{{item.id}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="gameOver">{{msg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: {
        easy: {
          width: 9,
          height: 9,
          mines: 10
        },
        normal: {
          width: 16,
          height: 16,
          mines: 40
        },
        hard: {
          width: 30,
          height: 16,
          mines: 80
        },
        custom: {
          width: 3,
          height: 3,
          mines: 2
        }
      },
      levelCheck: "",
      board: [],
      minePos: [],
      isStart: false,
      isCheckCustom: false,
      gameOver: false,
      size: 0,
      msg: "",
      open: 0
    };
  },
  computed: {
    invalidButton() {
      const level = this.levelCheck.trim();
      if (!level) return true;
      if (level === "custom") {
        const custom = this.level.custom;
        if (custom.height <= 0 || custom.width <= 0 || custom.mines <= 0)
          return true;
        if (custom.height * custom.width < custom.mines) return true;
      }
      return false;
    },
    isSelectCustom() {
      if (this.levelCheck !== "custom") return true;
      return false;
    }
  },

  methods: {
    startGame() {
      this.isStart = true;
      const check = this.levelCheck;
      const board = this.board;
      if (check === "custom") {
        const custom = this.level.custom;
        custom.width = parseInt(custom.width);
        custom.height = parseInt(custom.height);
        if (custom.width > 30) {
          this.isStart = false;
          return alert("가로의 크기를 줄여주세요!");
        }
        if (custom.height > 16) {
          this.isStart = false;
          return alert("세로의 크기를 줄여주세요!");
        }
        custom.mines = parseInt(custom.mines);
      }
      return this.setBoard(board, check);
    },
    setBoard(board, check) {
      const height = this.level[check].height;
      const width = this.level[check].width;
      const mines = this.level[check].mines;
      this.size = height * width - mines;
      for (let i = 0; i < height; i++) {
        const arr = [];
        board.push(arr);
        for (let j = 0; j < width; j++) {
          arr.push({
            id: "",
            done: false,
            question: false,
            exclamation: false,
            mine: ""
          });
        }
      }
      this.minePlanting(height, width, mines);
    },
    minePlanting(height, width, mines) {
      const minePlantingNum = height * width - mines;
      const mineArr = Array(height * width)
        .fill()
        .map((el, index) => {
          return index + 1;
        });
      while (mineArr.length > minePlantingNum) {
        let num = mineArr.splice(
          Math.floor(Math.random() * mineArr.length),
          1
        )[0];
        this.minePos.push(num);
      }
      for (let k = 0; k < this.minePos.length; k++) {
        let hor = Math.floor(this.minePos[k] / width);
        let ver = (this.minePos[k] % width) - 1;
        ver < 0
          ? (this.board[hor - 1][width - 1].mine = "X")
          : (this.board[hor][ver].mine = "X");

        //지뢰 위치에 X를 그려줌 지뢰위치정보는 minePos가 가지고 있다.
      }
    },
    checkArea(e) {
      const parentTr = e.currentTarget.parentNode;
      const parentBody = parentTr.parentNode;
      const fHor = Array.from(parentTr.children).indexOf(e.currentTarget);
      const fVer = Array.from(parentBody.children).indexOf(parentTr);
      const target = this.board[fVer][fHor];
      let nearCheck = [
        { width: fVer, height: fHor - 1 },
        { width: fVer, height: fHor + 1 }
      ];

      if (this.gameOver) return;
      if (target.done) return;

      if (target.mine === "X") {
        target.done = true;
        this.gameOver = true;
        this.msg = "실패 ㅠㅠ";
        return (target.id = "펑");
      }

      if (e.target.textContent !== "") return;
      target.done = true;
      this.open++;

      if (this.board[fVer - 1]) {
        nearCheck = nearCheck.concat([
          { width: fVer - 1, height: fHor },
          { width: fVer - 1, height: fHor + 1 },
          { width: fVer - 1, height: fHor - 1 }
        ]);
      }
      if (this.board[fVer + 1]) {
        nearCheck = nearCheck.concat([
          { width: fVer + 1, height: fHor },
          { width: fVer + 1, height: fHor - 1 },
          { width: fVer + 1, height: fHor + 1 }
        ]);
      }

      if (fHor === 0) {
        nearCheck = nearCheck.filter(e => e.height >= fHor);
      }
      if (fHor === parentTr.children.length - 1) {
        nearCheck = nearCheck.filter(e => e.height <= fHor);
      }

      target.id = nearCheck.filter(
        e => this.board[e.width][e.height].mine === "X"
      ).length;
      if (this.open === this.size) {
        this.gameOver = true;
        this.msg = "성공!!";
        return;
      }

      if (target.id === 0) {
        target.id = "";
        nearCheck.forEach(e => {
          parentBody.children[e.width].children[e.height].click();
        });
      }
      //몇번째 블럭? 블럭의 8방향위치에 대한 몇번쨰, 그 몇번째들에 minepos숫자가 몇개 포함되어 있는가?
      //배열 만들고 그 배열만큼 forEach돌려서 count
    },

    setFlag(e) {
      const parentTr = e.currentTarget.parentNode;
      const parentBody = parentTr.parentNode;
      const fHor = Array.from(parentTr.children).indexOf(e.currentTarget);
      const fVer = Array.from(parentBody.children).indexOf(parentTr);
      const target = this.board[fVer][fHor];
      let flag = "";

      if (this.gameOver) return;
      if (target.done) return;

      if (target.id === "") {
        flag = "!";
        target.exclamation = true;
      } else if (target.id === "!") {
        flag = "?";
        target.exclamation = false;
        target.question = true;
      } else if (target.id === "?") {
        flag = "";
        target.exclamation = false;
        target.question = false;
      }
      target.id = flag;
      //Vue는 배열의 내부 값 변화를 인지하지 못한다. 그래서 splice를 사용하여 배열의 값변화를 알려줘야한다.
    },
    reset() {
      this.board = [];
      this.minePos = [];
      this.gameOver = false;
      this.open = 0;
      this.startGame();
    }
  }
};
</script>

<style scoped>

#board {
  margin-top: 10px;
  border-collapse: collapse;
}
td {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
}

tbody td {
  background-color: #ccc;
  color: #ccc;
}
.question {
  background-color: red;
}
.exclamation {
  background-color: blue;
}
.opened {
  background-color: #fff;
  color: #000;
}
</style>

