<template>
  <div id="jearthstone">
    <h2 class="game-title">JeathStone</h2>
    <div id="wrap">
      <div id="rival" class="area">
        <div id="rival-hand" class="hand">
          <div
            class="minion-card"
            v-for="card in hand.rivalHand"
            :key="card.id"
            @click="summonRivalMinion(card)"
          >
            <div class="minion-name">하수인</div>
            <div class="status cost">{{card.cost}}</div>
            <div class="status attack">{{card.att}}</div>
            <div class="status health">{{card.hp}}</div>
          </div>
        </div>
        <div class="hero-area">
          <div
            id="rival-hero"
            :class="{hero:true, turn:!myTurn}"
            @click="directAttack(rivalStatus.id)"
          >
            <span class="hero-id">{{rivalStatus.id}}</span>

            <div
              id="rival-hero-attack"
              class="status attack"
              v-if="rivalStatus.att>0"
            >{{rivalStatus.att}}</div>
            <div id="rival-hero-health" class="status health">{{rivalStatus.hp}}</div>
          </div>
          <div
            id="rival-cost"
            class="hero-cost"
          >마나 : {{rivalStatus.useCost}}/{{rivalStatus.fullCost}}</div>
        </div>
        <div id="rival-field" class="field">
          <div
            class="minion-card"
            :class="{selected:card.isSelected, attackPossible:attackPossible(card.isAttacked, card.isSleep)}"
            v-for="card in field.rivalField"
            :key="card.id"
            @click="selectMinionCard(card,myTurn)"
          >
            <div class="minion-name">하수인</div>
            <div class="status cost">{{card.cost}}</div>
            <div class="status attack">{{card.att}}</div>
            <div class="status health">{{card.hp}}</div>
          </div>
        </div>
      </div>
      <button id="turn-button" @click="changeTurn">턴 종료</button>
      <div>
        <span class="msg">{{msg}}</span>
      </div>
      <div id="my" class="area">
        <div id="my-field" class="field">
          <div
            class="minion-card"
            :class="{selected:card.isSelected, attackPossible:attackPossible(card.isAttacked, card.isSleep)}"
            v-for="card in field.myField"
            :key="card.id"
            @click="selectMinionCard(card, myTurn)"
          >
            <div class="minion-name">하수인</div>
            <div class="status cost">{{card.cost}}</div>
            <div class="status attack">{{card.att}}</div>
            <div class="status health">{{card.hp}}</div>
          </div>
        </div>
        <div class="hero-area">
          <div id="my-hero" :class="{hero:true, turn:myTurn}" @click="directAttack(myStatus.id)">
            <span class="hero-id">{{myStatus.id}}</span>
            <div id="my-hero-attack" class="status attack" v-if="myStatus.att>0">{{myStatus.att}}</div>
            <div id="my-hero-health" class="status health">{{myStatus.hp}}</div>
          </div>
          <div id="my-cost" class="hero-cost">마나 : {{myStatus.useCost}}/{{myStatus.fullCost}}</div>
        </div>
        <div id="my-hand" class="hand">
          <div
            class="minion-card"
            v-for="card in hand.myHand"
            :key="card.id"
            @click="summonMyMinion(card)"
          >
            <div class="minion-name">하수인</div>
            <div class="status cost">{{card.cost}}</div>
            <div class="status attack">{{card.att}}</div>
            <div class="status health">{{card.hp}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JearthStone from "./JearthStone";
export default {
  data() {
    return {
      hero: {
        myHero: {
          id: "me",
          hp: 20,
          att: 0,
          fullCost: 10,
          useCost: 10,
          draw: 5
        },
        rivalHero: {
          id: "rival",
          hp: 20,
          att: 0,
          fullCost: 10,
          useCost: 10,
          draw: 5
        }
      },
      hand: {
        myHand: [],
        rivalHand: []
      },
      field: {
        myField: [],
        rivalField: []
      },
      myTurn: true,
      selecting: false,
      battle: [],
      isGaming: false,
      msg: ""
    };
  },
  computed: {
    rivalStatus() {
      return {
        id: this.hero.rivalHero.id,
        hp: this.hero.rivalHero.hp,
        att: this.hero.rivalHero.att,
        fullCost: this.hero.rivalHero.fullCost,
        useCost: this.hero.rivalHero.useCost
      };
    },
    myStatus() {
      return {
        id: this.hero.myHero.id,
        hp: this.hero.myHero.hp,
        att: this.hero.myHero.att,
        fullCost: this.hero.myHero.fullCost,
        useCost: this.hero.myHero.useCost
      };
    }
  },
  created() {
    document.title = "JearthStone";
    this.setGame();
  },
  methods: {
    attackPossible(attacked, sleep) {
      return !attacked && !sleep;
    },
    setGame() {
      this.hand.myHand = JearthStone.myHand(this.hero.myHero.id);
      this.hand.rivalHand = JearthStone.rivalHand(this.hero.rivalHero.id);
      this.isGaming = true;
      this.msg = '"me"의 턴입니다.';
    },
    summonMyMinion(card) {
      if (!this.isGaming) return;
      if (!this.myTurn) return;
      this.summonMinion(card, this.myTurn);
    },
    summonRivalMinion(card) {
      if (!this.isGaming) return;
      if (this.myTurn) return;
      this.summonMinion(card, this.myTurn);
    },
    summonMinion(card, turn) {
      const hero = turn ? this.hero.myHero : this.hero.rivalHero;
      const field = turn ? this.field.myField : this.field.rivalField;
      if (field.length === 7) return (this.msg = "필드가 가득 찼습니다.");
      if (hero.useCost < card.cost) return (this.msg = "마나가 부족합니다.");
      hero.useCost -= card.cost;
      field.push(card);
      if (turn) {
        return (this.hand.myHand = this.hand.myHand.filter(
          el => el.id !== card.id
        ));
      } else
        return (this.hand.rivalHand = this.hand.rivalHand.filter(
          el => el.id !== card.id
        ));
    },
    changeTurn() {
      if (!this.isGaming) return;
      if (this.selecting) {
        alert("카드 선택을 취소하고 턴을 넘기세요");
        return;
      }
      this.myTurn = !this.myTurn;
      this.myTurn
        ? (this.msg = '"me"의 턴입니다.')
        : (this.msg = '"rival"의 턴입니다.');
      const hero = this.myTurn ? this.hero.myHero : this.hero.rivalHero;
      const hand = this.myTurn ? this.hand.myHand : this.hand.rivalHand;
      const field = this.myTurn ? this.field.rivalField : this.field.myField;
      const player = this.myTurn ? this.hero.myHero.id : this.hero.rivalHero.id;
      if (hand.length === 10) {
        this.msg = `${hero.id}의 핸드가 가득찼습니다!`;
      } else {
        hero.draw++;
        hand.push(JearthStone.drawCard(hero.draw, player));
      }
      //전턴에 카드를 냈다면 내필드의 카드를 공격할 수 있게 만들어준다.
      field.forEach(el => {
        el.isSleep = false;
        el.isAttacked = false;
      });

      return (hero.useCost = hero.fullCost);
    },
    selectMinionCard(card, turn) {
      if (!this.isGaming) return;
      //처음 클릭할 떄
      if (this.battle.length === 0) {
        //내 턴에 내필드를 클릭하는지 확인
        if (turn) {
          if (card.player !== this.hero.myHero.id)
            return (this.msg = "자신의 필드에 있는 하수인을 클릭하세요!");
        } else {
          if (card.player !== this.hero.rivalHero.id)
            return (this.msg = "자신의 필드에 있는 하수인을 클릭하세요!");
        }
        //이번 턴에 낸 카드를 클릭했을 때
        if (card.isSleep)
          return (this.msg = "이번 턴에 낸 카드는 공격할 수 없습니다.");
        //이미 공격한 카드를 클릭했을 때
        if (card.isAttacked) return (this.msg = "이미 공격했습니다!");
      }

      //선택한 카드를 다시 선택할 경우 원래 상태로 복귀
      if (card.isSelected) {
        card.isSelected = false;
        this.selecting = false;
        this.battle.pop();
        return;
      }
      this.battle.push(card);
      this.selecting = true;
      card.isSelected = true;
      if (this.battle.length === 2) {
        const first = this.battle[0];
        const second = this.battle[1];
        //내 필드의 내카드 중복선택 방지
        if (first.player === second.player) {
          card.isSelected = false;
          return (this.msg = "공격할 적의 하수인을 누르세요");
        }
        this.getBattle(first, second);
        this.battle.forEach(el => (el.isSelected = false));
        this.battle = [];
      }
    },
    getBattle(first, second) {
      first.isAttacked = true;
      this.selecting = false;
      first.hp -= second.att;
      second.hp -= first.att;

      this.field.myField = this.field.myField.filter(el => el.hp > 0);
      this.field.rivalField = this.field.rivalField.filter(el => el.hp > 0);
    },
    directAttack(id) {
      if (!this.isGaming) return;
      if (this.battle.length === 0) return;

      //내턴일경우
      if (this.myTurn) {
        if (this.hero.myHero.id === id)
          return (this.msg = "자신을 공격할 수 없습니다!");
        else {
          this.hero.rivalHero.hp -= this.battle[0].att;
          if (this.hero.rivalHero.hp <= 0) {
            this.isGaming = false;
            return (this.msg = '"me"가 승리했습니다!!');
          }
        }
      } else {
        if (this.hero.rivalHero.id === id) {
          return (this.msg = "자신을 공격할 수 없습니다!");
        } else {
          this.hero.myHero.hp -= this.battle[0].att;
          if (this.hero.myHero.hp <= 0) {
            this.isGaming = false;

            return (this.msg = '"rival"이 승리했습니다!!');
          }
        }
      }
      //공격이 완료되었을 떄
      this.battle[0].isAttacked = true;
      this.selecting = false;
      this.battle[0].isSelected = false;
      this.battle = [];
    }
  }
};
</script>

<style scoped>
#jearthstone {
  margin: 100px auto;
  padding: 70px 50px;
  width: 1200px;
  min-height: 600px;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;
}
#wrap {
  position: relative;
  display: flex;
  margin: 100px auto;
  width: 100%;
  min-width: 940px;
  max-width: 1200px;
  height: 900px;
  border: 1px solid black;
  background: linear-gradient(45deg, #e8e2c4, #ece6cc);
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;

  user-select: none;
  z-index: 0;
}
#turn-button {
  position: absolute;
  top: 425px;
  right: 50px;
  width: 100px;
  height: 50px;
  background-color: black;
  border: none;
  border-radius: 20px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 2.2;
  z-index: 3;
  cursor: pointer;
}
#turn-button:hover {
  background-color: #ccc;
  color: #333;
}
#turn-button:focus {
  outline: none;
}
.area {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  flex: 1;
}
.hand {
  position: absolute;
  width: 1200px;
  left: 50%;
  z-index: 9999;
}

#rival-hand {
  bottom: 100%;
  transform: translate(-50%, 100%);
}
#my-hand {
  top: 100%;
  transform: translate(-50%, -100%);
}
.hero-area {
  display: flex;
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.hero {
  position: relative;
  border: 1px solid green;
  border-radius: 30% 30% 0 0;
  line-height: 5;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.hero-id {
  position: absolute;
  top: -10%;
  left: -70%;
  font-size: 24px;
  font-weight: 700;
}
#my-hero {
  background: url("../assets/jearthstone/me.jpg") 0 0;
}
#rival-hero {
  background: url("../assets/jearthstone/rival.png") 0 0;
}
.turn {
  border: 3px solid lightgreen;
  box-shadow: 0 0 1em 1em lightgreen;
}
#my-hero {
  margin-bottom: 150px;
}
#rival-hero {
  margin-top: 150px;
}
.hero-cost {
  position: absolute;
  right: 10%;
  font-size: 24px;
  font-weight: 700;
}
#my-cost {
  bottom: 80%;
}
#rival-cost {
  top: 80%;
}
.field {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -10px;
  font-size: 24px;
  border-radius: 50%;
  font-weight: 700;
  line-height: 1.2;
}
.cost {
  top: -10px;
  left: -10px;
  background-color: blue;
  color: #fff;
}
.attack {
  left: -10px;
  background-color: yellow;
}
.health {
  right: -10px;
  background-color: red;
}
.minion-card {
  position: relative;
  display: inline-block;
  margin: 0 20px;
  width: 100px;
  height: 130px;
  border: 1px solid black;
  background-color: brown;
  line-height: 4;
  transition: all 0.3s;
  cursor: pointer;
}
.minion-name {
  font-size: 24px;
  font-weight: 700;
}
.selected {
  background-color: burlywood;
  transform: scale(1.2);
}
.attackPossible {
  background-color: greenyellow;
}
#my-hand .minion-card,
#rival-hand .minion-card {
  margin: 10px 0;
  transition: transform 0.3s;
  transform: scale(0.7);
}

#my-hand .minion-card:hover,
#rival-hand .minion-card:hover {
  transform: scale(1.2);
}

.msg {
  font-size: 30px;
  font-weight: 700;
}
</style>
