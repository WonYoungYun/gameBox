<template>
  <div class="main-content">
    <h2 class="game-title">카드 짝맞추기</h2>
    <span class="my-click-count">Count: {{myClickCount}}</span>
    <div class="game-setting">
      <button class="setting-button" @click="clickSetting">설정</button>
      <div class="settings" :class="{active: isClickSetting}">
        <div>
          <input type="radio" id="easy" value="easy" v-model="level" :checked="level">
          <label for="easy">쉬움</label>
        </div>
        <div>
          <input type="radio" id="normal" value="normal" v-model="level">
          <label for="normal">중간</label>
        </div>
        <div>
          <input type="radio" id="hard" value="hard" v-model="level">
          <label for="hard">어려움</label>
        </div>
        <button @click="gameStart" :disabled="isSettingBoard" class="start-button">시작</button>
      </div>
    </div>

    <div id="wrap">
      <div id="play-board">
        <div
          :class="{card:true, flipped:card.isFlipped}"
          @click="flipCard(card)"
          v-for="card in cards"
          :key="card.id"
        >
          <div class="card-inner">
            <div class="card-front">{{card.content}}</div>
            <div class="card-back"></div>
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
      levelDic: {
        easy: {
          width: 3,
          height: 4
        },
        normal: {
          width: 4,
          height: 4
        },
        hard: {
          width: 5,
          height: 6
        }
      },
      cards: [],
      board: {
        width: 0,
        height: 0,
        size: 0
      },
      value: [],
      isStartGame: false,
      isSettingBoard: false,
      userCheckCount: 0,
      clickedCard: [],
      correct: 0,
      openAllCard: null,
      myClickCount: 0,
      level: "easy",
      isClickSetting: false
    };
  },
  created() {
    document.title = "Card Game";
  },

  methods: {
    gameStart() {
      this.isClickSetting = false;
      if (this.isStartGame) {
        this.cards = [];
        this.value = [];
        this.myClickCount = 0;
        this.correct = 0;
        this.isStartGame = false;
      }
      this.settingBoard();

      this.isStartGame = true;
    },
    settingBoard() {
      this.isSettingBoard = true;
      this.board.width = this.levelDic[this.level].width;
      this.board.height = this.levelDic[this.level].height;
      this.board.size = this.board.width * this.board.height;

      const board = document.getElementById("play-board");
      const boardWidthNum =
        this.board.width >= this.board.height
          ? this.board.width
          : this.board.height;
      board.style.width = boardWidthNum * 120 + "px";

      for (let j = 1; j <= this.board.size / 2; j++) {
        this.value.push(j);
        this.value.push(j);
      }
      for (let k = 0; k < this.value.length > 0; k++) {
        this.value = this.value.concat(
          this.value.splice(Math.floor(Math.random() * this.value.length), 1)
        );
      }
      for (let i = 0; i < this.board.size; i++) {
        this.cards.push({ id: i, content: this.value[i], isFlipped: true });
      }
      this.cards.forEach((card, index) => {
        this.openAllCard = setTimeout(() => {
          card.isFlipped = false;
        }, 1000 + 100 * index);
      });
      this.cards.forEach(card => {
        this.openAllCard = setTimeout(() => {
          card.isFlipped = true;
          this.isSettingBoard = false;
        }, 2200 + 500 * this.board.width);
      });
    },
    flipCard(card) {
      if (this.isSettingBoard) return;
      if (this.isStartGame) {
        if (card.isFlipped) card.isFlipped = false;
        else return;
      }

      if (this.clickedCard.includes(card)) return;
      this.clickedCard.push(card);
      if (this.clickedCard.length === 2) {
        const firstCard = this.clickedCard[0];
        const secondCard = this.clickedCard[1];
        this.myClickCount++;
        if (firstCard.content === secondCard.content) {
          this.correct++;
        } else {
          this.isSettingBoard = true;
          this.openAllCard = setTimeout(() => {
            this.cards[firstCard.id].isFlipped = true;
            this.cards[secondCard.id].isFlipped = true;
            this.isSettingBoard = false;
          }, 800);
        }
        this.clickedCard = [];
      }
      if (this.correct === this.board.size / 2) {
        this.openAllCard = setTimeout(() => {
          alert(`승리! ${this.myClickCount}번 만에 성공했습니다!`);
        }, 500);
      }
    },
    clickSetting() {
      this.isClickSetting
        ? (this.isClickSetting = false)
        : (this.isClickSetting = true);
    }
  },

  beforeDestroy() {
    clearTimeout(this.openAllCard);
  }
};
</script>

<style scoped>
.main-content {
  position: relative;
}
button {
  cursor: pointer;
}
input[type="radio"] {
  display: none;
}

.my-click-count {
  display: block;
  margin: 30px 0;
  font-size: 24px;
}

.game-setting {
  position: absolute;
  top: 13%;
  right: 10%;
  z-index: 9999;
}
.game-setting input:checked ~ label {
  color: #fff;
}
.setting-button {
  position: relative;
  width: 100px;
  height: 40px;
  font-size: 24px;
  background-color: #2196f3;
  color: #fff;
}
.settings {
  background: #ccc;
  transform-origin: top;
  transform: perspective(1000px) rotateX(-90deg);
  transition: 0.5s;
}
.settings.active {
  transform: perspective(1000px) rotateX(0deg);
}
.settings label {
  display: block;
  padding: 5px;
  text-align: center;
  background: #262626;
  color: #aaa;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.4s;
}
.settings label:hover {
  background-color: #0d7ad0;
}
.start-button {
  width: 100%;
  font-size: 18px;
  font-weight: 700;
}
#wrap {
  position: relative;
  width: 100%;
  height: 800px;
  background: linear-gradient(-45deg, #4baf4b, #64cd3c);
  border: 1px solid black;
}
#play-board {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.card {
  display: inline-block;
  margin: 20px 20px;
  width: 80px;
  height: 100px;
  user-select: none;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  border: 2px solid black;
  font-size: 24px;
  font-weight: 700;
  line-height: 3.5;
  background-color: #fff;
}
.card.flipped .card-inner {
  transform: rotateY(180deg);
}
.card-back {
  background: url("../assets/cardGame/card.jpg");
}
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
</style>
