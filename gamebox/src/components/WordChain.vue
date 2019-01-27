<template>
  <div>
    <div>{{firstWord}}</div>
    <input type="text" v-model="answerWord" @keyup.enter="onSubmitWord" ref="answerWord">
    <button @click.prevent="onReset">Reset</button>
    <p v-if="isfailWord" class="wrong-answer">{{answerFail}}</p>
    <div v-for="(word,index) in wordLog" :key="index">{{word}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstWord: "",
      answerWord: "",
      words: ["바람", "불꽃", "바다", "나비"],
      isfailWord: false,
      answerFail: "",
      wordLog: []
    };
  },
  created() {
    this.randomFirstWord();
    // const sample = prompt(this.firstWord);
    document.title = "WordChain";
    this.$nextTick(() => {
      this.$refs.answerWord.focus();
    });
  },
  computed: {
    correctWord() {
      if (this.firstWord[this.firstWord.length - 1] === this.answerWord[0])
        return this.changeFirstWord();
      else {
        return this.wrongAnswer("틀림");
      }
    }
  },
  methods: {
    randomFirstWord() {
      const num = Math.floor(Math.random() * 3);
      this.firstWord = this.words[num];
    },

    onSubmitWord() {
      this.answerWord = this.answerWord.trim();
      if (!this.answerWord) return;
      if (this.wordLog.includes(this.answerWord))
        return this.wrongAnswer("이미 있습니다");
      if (this.answerWord.length === 1)
        return this.wrongAnswer("한글자는 너무하지 않음?");
      this.correctWord;
    },
    wrongAnswer(msg) {
      this.answerFail = msg;
      this.isfailWord = true;
      this.answerWord = "";
    },

    changeFirstWord() {
      this.firstWord = this.answerWord;
      this.wordLog.push(this.answerWord);
      this.isfailWord = false;
      this.answerWord = "";
    },
    onReset() {
      this.wordLog = [];
      if (this.isfailWord) this.isfailWord = false;
      this.randomFirstWord();
      this.answerWord = "";
    }
  }
};
</script>

<style scoped>
.wrong-answer {
  color: rgb(255, 0, 0);
}
</style>
