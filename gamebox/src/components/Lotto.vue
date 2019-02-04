<template>
  <div class="main-content">
    <h2 class="game-title">Lotto</h2>
    <div class="button-area">
    <button @click="selectNumber" class="select-button">숫자 뽑기</button>
    <button @click="clearBoard" class="reset-button">&times;</button>
    </div>
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
.button-area{
  margin-top:30px;
  text-align: center;
}
.button-area button{
    outline:none;
  border:none;
  cursor:pointer;
}
.select-button{
  position: relative;
  width:180px;
  height:60px;
  color:#fff;
  font-size:24px;
  font-weight: 700;
  box-sizing: border-box;

    background: linear-gradient(90deg, #08d0eb, #f441a5, #ffeb3b, #06aa87);
      border-radius: 40px  0 0 40px;
  background-size:400%;

}
.select-button:hover{
  animation: animate 8s linear infinite;

}
@keyframes animate {
  0%{
    background-position: 0;
  }
  100%{
    background-position: 400%;
  }
}

.reset-button{
    width:60px;
    height:60px;
      font-size:1.85em;
      font-weight: 700;
      background-color:#333;
      color:#eee;
      border-radius: 0 40px 40px 0;
}
.reset-button:hover{
  background-color: #eee;
  color:#333;
}
.board {
  margin: 10px;
}
.board .wrap {
  display: flex;
  justify-content: center;
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
