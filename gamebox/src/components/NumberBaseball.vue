<template>
  <div>
    <div>
      <input
        type="text"
        v-model="answerNumber"
        ref="answerNumber"
        @keyup.enter="submitNumber"
        maxlength="4"
      >
      <button @click="submitNumber">제출</button>
      <div v-if="viewLog">
        <div
          v-for="(log,index) in logs"
          :key="index"
        >{{index+1}} 번째 당신의 숫자 : {{log.number}} Strike: {{log.strike}} Ball: {{log.ball}}</div>
      </div>
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
      viewLog: false,
      count: 0
    };
  },
  created() {
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
        return alert("4자리 수를 입력하세요");
      }
      const aNumber = this.cNumber.join("");
      if (aNumber === this.answerNumber) {
        alert("정답입니다!");
        return this.clearGame("all");
      } else {
        return this.checkNum(aNumber);
      }
    },
    checkNum(aNum) {
      this.count++;
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
        alert(`게임 종료! 당신의 패배! 정답은 ${aNum}`);
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
      }
      this.answerNumber = "";
      this.strike = 0;
      this.ball = 0;

      this.makeNumber();
    }
  }
};
</script>

<style>
</style>
