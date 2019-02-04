<template>
  <div class="main-content">
    <h2 class="game-title">끝말잇기</h2>

    <div class="word-give">
    이전 단어 : <span>{{firstWord}}</span>
        <button @click="onReset" class="resetButton">&times;</button>
    </div>
    <div class="msg">
        <span v-if="isfailWord" class="wrong-answer">{{answerFail}}</span>
    </div>
      <fieldset class="inputField">
    <input type="text" v-model="answerWord" @keyup.enter="onSubmitWord" ref="answerWord">
    <button @click="onSubmitWord" class="submitButton">입력
    </button>
    </fieldset>
    <div class="word-log">
          <div v-for="(word,index) in wordLog" :key="index">{{word}}</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      firstWord: "",
      answerWord: "",
      words: ["바람", "강아지", "고양이", "거북선", "바다", "나비"],
      isfailWord: false,
      answerFail: "",
      wordLog: []
    };
  },
  created() {
    this.randomFirstWord();

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
        return this.wrongAnswer("전의 단어와 이어지지 않습니다.");
      }
    }
  },
  methods: {
    randomFirstWord() {
      const num = Math.floor(Math.random() * 3);
      this.firstWord = this.words[num];
    },

    onSubmitWord() {
      const pattern =  /([^가-힣\x20])/i;
      this.answerWord = this.answerWord.trim();
      if (!this.answerWord) return;

      if(pattern.test(this.answerWord))
        return this.wrongAnswer("정확한 단어를 넣어주세요!")

      if (this.answerWord.length === 1)
        return this.wrongAnswer("한글자는 안됩니다!");

      if (this.wordLog.includes(this.answerWord))
        return this.wrongAnswer("이미 있습니다!");

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
      if(!confirm('초기화 하시겠습니까?')) return;
      this.wordLog = [];
      if (this.isfailWord) this.isfailWord = false;
      this.randomFirstWord();
      this.answerWord = "";
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
}
.word-give{
  margin-top: 30px;
  text-align: center;
  font-size:1.8em;
}
.wrong-answer{
  font-size:1.6em;
  font-weight: 700;
  line-height: 2;
  color: rgb(255, 0, 0);
}
.msg{
  height: 60px;
  text-align: center;
}
.inputField{
  margin: 0 auto;
  padding: 0;
  border-radius: 25px;
  width: 350px;
    background-color:#f8f8f8;

}
input[type=text]{
  width:280px;
  height: 40px;
  font-size:18px;
  font-weight: 700;
  padding: 0 30px;
  border-radius: 25px 0 0 25px;
  box-sizing: border-box;
  background:none;
  border:none;
  outline:none;
}
.inputField:hover{
  background-color:#efefef;
}
button{
  border:none;
    background:none;
  outline:none;
  cursor: pointer;
}
.submitButton{
  font-size:1em;
  height: 30px;
}
.resetButton{
  margin:0;
  margin-left:20px;
  font-size:1.2em;
  padding: 0;
color: rgb(255, 0, 0);
}
.word-log{
  margin-top:30px;
  text-align: center;
  font-size:1.2em;
  line-height: 2;
  column-count: 3;
}
</style>
