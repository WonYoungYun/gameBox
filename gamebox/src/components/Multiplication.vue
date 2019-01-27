<template>
  <div>
    <div>User Point : {{points}}</div>
    <div>{{firstNum}} X {{secondNum}}</div>
    <input type="text" v-model="answerNum" ref="answerNum" @keyup.enter="submitAnswer">
    <div class="ket-pad">
      <div>
        <button @click="getNum">7</button>
        <button @click="getNum">8</button>
        <button @click="getNum">9</button>
      </div>
      <div>
        <button @click="getNum">4</button>
        <button @click="getNum">5</button>
        <button @click="getNum">6</button>
      </div>
      <div>
        <button @click="getNum">1</button>
        <button @click="getNum">2</button>
        <button @click="getNum">3</button>
      </div>
      <div>
        <button @click="getNum">0</button>
        <button type="submit" @click.prevent="submitAnswer">제출</button>
        <button type="reset" @click.prevent="resetAnswer">삭제</button>
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
      points: 0
    };
  },
  created() {
    this.setFirstMul();
    this.$nextTick(() => {
      this.$refs.answerNum.focus();
    });
  },

  methods: {
    getNum(e) {
      if (this.answerNum.length === 1 && this.answerNum === "0")
        this.answerNum = "";
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
      alert("정답!");
      this.increasePoints();
      this.answerNum = "";
      this.setFirstMul();
    },
    failMul() {
      alert("틀렸습니다.");
      this.decreasePoints();
      this.answerNum = "";
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

<style>
</style>
