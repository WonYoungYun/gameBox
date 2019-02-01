<template>
  <div>
    <h1>Lotto</h1>
    <button @click="selectNumber">숫자 뽑기</button>
    <button @click="clearBoard">초기화</button>
    <div v-if="isClickButton" class="board">
      <div class="wrap">
        <div class="log">
          <div v-for="(log,index) in logs" :key="index">
            <span class="ball" v-for="(item,idx) in log.numbers" :key="idx">{{item}}</span>
            <span>
              bonus:
              <span class="ball">{{log.plus}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lotto: [],
      bonus: 0,
      numbers: [],
      isClickButton: false,
      logs: []
    };
  },
  created() {
    this.inputNumber();
  },
  updated() {
    this.paintColor();
  },
  methods: {
    inputNumber() {
      const list = Array(45).fill();
      this.lotto = list.map((el, idx) => {
        return idx + 1;
      });
      //splice로 매번 this.lotto를 해체해버리기 떄문에 매번 새로 만들어야함
    },
    selectNumber() {
      const shuffle = [];
      while (this.lotto.length > 0) {
        let num = this.lotto.splice(
          Math.floor(Math.random() * this.lotto.length),
          1
        )[0];
        shuffle.push(num);
      }
      this.inputNumber();
      this.isClickButton = true;
      this.bonus = shuffle[shuffle.length - 1];
      this.numbers = shuffle.splice(0, 6).sort((p, c) => p - c);
      const lottoNum = { numbers: this.numbers, plus: this.bonus };
      this.logs.push(lottoNum);
    },
    paintColor() {
      const ball = document.querySelectorAll(".ball");
      Array.from(ball).forEach(el => {
        const ballNum = parseInt(el.innerText);
        if (ballNum <= 9) {
          el.style.backgroundColor = "red";
        } else if (ballNum > 9 && ballNum <= 18) {
          el.style.backgroundColor = "orange";
        } else if (ballNum > 18 && ballNum <= 27) {
          el.style.backgroundColor = "yellow";
        } else if (ballNum > 27 && ballNum <= 36) {
          el.style.backgroundColor = "blue";
        } else {
          el.style.backgroundColor = "green";
        }
      });
    },
    clearBoard() {
      this.numbers = [];
      this.logs = [];
    }
  }
};
</script>

<style scoped>
.board {
  margin: 10px;
}
.board .wrap {
  display: flex;
}

.ball {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  margin: 10px;
  font-size: 24px;
  font-weight: 700;
  border-radius: 50%;
  line-height: 1.6;
}
</style>
