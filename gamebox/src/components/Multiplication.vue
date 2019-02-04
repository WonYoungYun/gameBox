<template>
  <div class="main-content">
    <h2 class="game-title">구구단</h2>
    <div class="game-area">
    <div class="game-status">
        <div class="msg">{{msg}}</div>
        <div class="points">당신의 점수 : {{points}}</div>
        <div class="mul-question">{{firstNum}} X {{secondNum}}</div>
    </div>
    <div class="calculator">
    <input type="text " v-model="answerNum" ref="answerNum" @keyup.enter="submitAnswer" class="input-num" disabled>
    <div class="key-pad">
      <div class="pad">
        <button @click="getNum">7</button>
        <button @click="getNum">8</button>
        <button @click="getNum">9</button>
      </div>
      <div class="pad">
        <button @click="getNum">4</button>
        <button @click="getNum">5</button>
        <button @click="getNum">6</button>
      </div>
      <div class="pad">
        <button @click="getNum">1</button>
        <button @click="getNum">2</button>
        <button @click="getNum">3</button>
      </div>
      <div class="pad">
        <button type="reset" @click.prevent="resetAnswer">&times;</button>
        <button @click="getNum">0</button>
        <button type="submit" @click.prevent="submitAnswer">&equals;</button>

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
      fisrtNum: 0,
      secondNum: 0,
      answerNum: "",
      points: 0,
      msg: ""
    };
  },
  created() {
    this.setFirstMul();
    document.title = "Multiplication";
  },
  mounted() {
    this.$refs.answerNum.focus();
  },

  methods: {
    getNum(e) {
      if (this.answerNum.length === 1 && this.answerNum === "0")
        this.resetAnswer();
      this.answerNum += e.target.innerText;
    },
    setFirstMul() {
      this.firstNum = this.setMul();
      this.secondNum = this.setMul();
    },
    setMul() {
      const mulNum = Math.ceil(Math.random() * 9);
      return mulNum;
    },
    submitAnswer() {
      const pAnswer = this.firstNum * this.secondNum;
      if (pAnswer === parseInt(this.answerNum)) this.correctMul();
      else this.failMul();
    },
    correctMul() {
      this.msg = "정답! +1점"
      this.increasePoints();
      this.resetAnswer();
      this.setFirstMul();
    },
    failMul() {
      this.msg = "틀렸습니다! -1점"
      this.decreasePoints();
      this.resetAnswer();
      this.setFirstMul();
    },
    resetAnswer() {
      this.answerNum = "";
    },
    increasePoints() {
      return (this.points += 1);
    },
    decreasePoints() {
      if (this.points === 0) return;
      return (this.points -= 1);
    }
  }
};
</script>

<style scoped>
.main-content {
  margin: 100px auto;
  padding: 70px 100px;
  width: 1000px;
  min-height: 600px;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;
}
.game-area{
  text-align: center;
}
.msg{
  height:50px;
  color: rgb(255, 0,0);
  font-size:24px;
  font-weight: 700;
}
.points{
  font-size: 22px;
}
.mul-question{
  font-size: 30px;
  font-weight: 700;
}
.calculator{
  display: inline-block;
  margin-top: 20px;
  width: 300px;
  height: 430px;
  border:2px solid #0000cd;
  background-color: #efefef;
}
.input-num{
  margin: 30px 0 20px 0;
  width: 100%;
  height: 50px;
  font-size:24px;
  font-weight: 700;
  border:none;
  outline:none;
  text-align: center;
}
.input-num:disabled{
  background-color:#fff;
  color:#333;
}
.key-pad{
  margin-top: 5px;
}

.pad button{
  margin: 1px 1px;
  width: 70px;
  height: 70px;
  font-size:2em;
  background-color:#fff;
  outline:none;
  border:none;
}
</style>
