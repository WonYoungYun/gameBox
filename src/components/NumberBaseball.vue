<template>
  <div class="main-content">
      <h2 class="game-title">숫자 야구</h2>
      <div class="game-board">
      <div class="msg-area"><span class="msg">{{msg}}</span></div>
      <fieldset class="baseball-input">
      <input
        type="text"
        v-model="answerNumber"
        ref="answerNumber"
        @keyup.enter="submitNumber"
        maxlength="4"
      >
      <button @click="submitNumber">&#9918;</button>

      </fieldset>
      <div v-if="viewLog" class="baseball-log">
        <div
          v-for="(log,index) in logs"
          :key="index"
        >{{index+1}}번째 공 : {{log.number}} Strike: {{log.strike}} Ball: {{log.ball}}</div>
      </div>
      <button @click="clearGame(all)" class="clear-button">Reset</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cNumber: [],
      strike: 0,
      ball: 0,
      answerNumber: "",
      logs: [],
      all: "all",
      viewLog: false,
      isOverlap: false,
      count: 0,
      msg: "컴퓨터가 숫자를 정했습니다."
    };
  },
  created() {
        document.title = "Baseball";
    this.makeNumber();
  },
  mounted() {
    this.$refs.answerNumber.focus();
  },
  methods: {
    makeNumber() {
      if (this.cNumber.length === 4) return;
      else {
        const num = Math.ceil(Math.random() * 9);
        if (!this.cNumber.includes(num)) this.cNumber.push(num);

        return this.makeNumber();
      }
    },
    submitNumber() {
      if (this.answerNumber.length < 4) {
        this.answerNumber = "";
        return this.msg = "4자리 수를 입력하세요";
      }
      const set = new Set(this.answerNumber)
      if(set.size < 4) this.isOverlap = true;

      if(this.isOverlap) {
        this.isOverlap = false;
        this.answerNumber = ""
        return this.msg = "숫자가 중복됩니다!"
      }

      const aNumber = this.cNumber.join("");
      if (aNumber === this.answerNumber) {
        this.msg = "정답입니다!";
        return this.clearGame(this.all);
      } else {

        return this.checkNum(aNumber);
      }
    },
    checkNum(aNum) {
      this.count++;
              this.msg = `남은 횟수: ${10 - this.count}번`
      const uNumber = this.answerNumber.split("");
      uNumber.forEach((element, index) => {
        const uNum = parseInt(element);
        const uIdx = index;
        this.cNumber.forEach((el, index) => {
          if (el === uNum && uIdx === index) this.strike++;
          else if (el === uNum) this.ball++;
        });
      });
      this.logs.push({
        number: this.answerNumber,
        strike: this.strike,
        ball: this.ball
      });
      if (this.count === 10) {
        this.msg = `게임 종료! 당신의 패배! 정답은 ${aNum}`;
        return this.clearGame("all");
      }
      this.viewLog = true;
      this.clearGame("");
    },
    clearGame(stage) {
      if (stage === "all") {
        this.count = 0;
        this.logs = [];
        this.viewLog = false;
        this.cNumber = [];
        this.msg = "컴퓨터가 공을 던졌습니다!"
      }
      this.answerNumber = "";
      this.strike = 0;
      this.ball = 0;

      this.makeNumber();
    }
  }
};
</script>

<style scoped>
button{
  border:none;
  outline:none;
  background:none;
}
.game-board{
  margin-top: 40px;
  text-align: center;
}
.msg-area{
  margin-bottom:30px;
}
.msg{
  margin-left:20px;
  font-size:1.6em;
  font-weight: 700;
}

.baseball-input{
  margin: 0 auto;
  margin-bottom: 40px;
  width: 200px;
  height: 40px;
  border:2px solid #32cd32;
}
.baseball-input::after{
  content: '';
  clear: both;
}
.baseball-input input{
  float: left;
  margin-top:3px;
  width:140px;
  font-size:2em;
  text-align: center;
  border:none;
  outline:none;
}
.baseball-input button{
  float: right;
  font-size: 1.8em;
  cursor: pointer;
}
.baseball-log{
  font-size:1.5em;
  color:#333;

}
.clear-button{
  width:80px;
  font-size:1em;
  font-weight: 700;
  background-color: rgba(255, 0, 0, .5);
  border-radius: 25px;
  color: #333;
  cursor: pointer;
}
</style>
