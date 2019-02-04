<template>
  <div>
    <div
      id="screen"
      @click="startGame"
      :class="{waiting:screenStatus.isWating, ready:screenStatus.isReady, now:screenStatus.isNow}"
    >
      <span>{{screenStatus.msg}}</span>
      <p v-if="gameCheck">재시작 하려면 화면을 누르세요</p>
    </div>
    <p v-if="avgTime">당신의 평균 반응속도: {{avgTime}} 초</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenStatus: {
        isReady: false,
        isNow: false,
        isWaiting: true,
        msg: "클릭하여 시작"
      },
      startTime: null,
      checkTime: null,
      score: 0,
      log: [],
      isStart: false
    };
  },
  computed: {
    gameCheck() {
      return this.isStart && this.screenStatus.isWaiting;
    },
    avgTime() {
      if (!this.log.length) return;
      const avg =
        this.log.reduce((sum, el) => {
          return sum + el;
        }, 0) / this.log.length || 1;
      return avg.toFixed(3);
    }
  },
  created(){
        document.title = "Reaction";
  },
  methods: {
    startGame() {
      const screen = this.screenStatus;
      this.isStart = true;
      if (screen.isWaiting) {
        screen.isWaiting = false;
        screen.isReady = true;
        screen.msg = "녹색이 되면 클릭하세요!";
        this.checkTime = setTimeout(() => {
          this.startTime = new Date();
          screen.isReady = false;
          screen.isNow = true;
          screen.msg = "클릭!";
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (screen.isReady) {
        if (!this.startTime) {
          clearTimeout(this.checkTime);
          screen.isNow = false;
          screen.isReady = false;
          screen.isWaiting = true;
          screen.msg = `너무 빨리 누르셨습니다.`;
          return;
        }
        screen.isReady = false;
        screen.isNow = true;
        screen.msg = "클릭!";
      } else if (screen.isNow) {
        const endTime = new Date();
        screen.isNow = false;
        screen.isWaiting = true;
        this.score = (endTime - this.startTime) / 1000;
        this.startTime = null;
        this.log.push(this.score);
        screen.msg = `${this.score}초 `;
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.checkTime);
  }
};
</script>

<style scoped>
#screen {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  text-align: center;
  line-height: 5;
}
.waiting {
  background-color: aqua;
}
.ready {
  background-color: red;
}
.now {
  background-color: green;
}
</style>
