<template>
  <div id="jeathStone">
    <h1>
      <a href="/jearthstone">JeathStone</a>
    </h1>
    <div id="wrap">
      <div id="rival" class="area">
        <div id="rival-deck" class="deck">상대 덱</div>
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
          <div id="rival-hero" class="hero" @click="directAttack(rivalStatus.id)">
            {{rivalStatus.id}}
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
            :class="{selected:card.isSelected}"
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
      <button id="turn-button" @click="changeTurn">turn Button</button>
      <div>
        <span v-if="myTurn">"me"의 턴입니다</span>
        <span v-else>"rival" 턴입니다.</span>
      </div>
      <div id="my" class="area">
        <div id="my-field" class="field">
          <div
            class="minion-card"
            :class="{selected:card.isSelected}"
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
          <div id="my-hero" class="hero" @click="directAttack(myStatus.id)">
            {{myStatus.id}}
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
        <div id="my-deck" class="deck">내 덱</div>
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
          hp: 30,
          att: 0,
          fullCost: 10,
          useCost: 10,
          draw: 5
        },
        rivalHero: {
          id: "rival",
          hp: 30,
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
      isGaming: false
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
    this.setGame();
  },
  methods: {
    setGame() {
      this.hand.myHand = JearthStone.myHand("me");
      this.hand.rivalHand = JearthStone.rivalHand("rival");
      this.isGaming = true;
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
      if (field.length === 7) return alert("필드가 가득 찼습니다.");
      if (hero.useCost < card.cost) return;
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
      const hero = this.myTurn ? this.hero.myHero : this.hero.rivalHero;
      const hand = this.myTurn ? this.hand.myHand : this.hand.rivalHand;
      const field = this.myTurn ? this.field.rivalField : this.field.myField;
      const player = this.myTurn ? "me" : "rival";
      if (hand.length === 10) {
        alert(`${hero.id}의 핸드가 가득찼습니다!`);
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
          if (card.player !== "me")
            return alert("자신의 필드에 있는 하수인을 클릭하세요!");
        } else {
          if (card.player !== "rival")
            return alert("자신의 필드에 있는 하수인을 클릭하세요!");
        }
        //이번 턴에 낸 카드를 클릭했을 때
        if (card.isSleep)
          return alert("이번 턴에 낸 카드는 공격할 수 없습니다.");
        //이미 공격한 카드를 클릭했을 때
        if (card.isAttacked) return alert("이미 공격했습니다!");
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
          return alert("공격할 적의 하수인을 누르세요");
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
          return alert("내가 나를 공격하는 바보가 존재한다?");
        else {
          this.hero.rivalHero.hp -= this.battle[0].att;
          if (this.hero.rivalHero.hp <= 0) {
            this.isGaming = false;
            return alert("me의 승리!");
          }
        }
      } else {
        if (this.hero.rivalHero.id === id) {
          return alert("스스로를 공격하는 바보가 있다?");
        } else {
          this.hero.myHero.hp -= this.battle[0].att;
          if (this.hero.myHero.hp <= 0) {
            this.isGaming = false;

            return alert("rival의 승리!");
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
a {
  text-decoration: none;
  color: #333;
}
#wrap {
  position: relative;
  margin: 100px auto;
  width: 1600px;
  height: 900px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  text-align: center;

  user-select: none;
  z-index: 0;
}
#turn-button {
  position: absolute;
  top: 425px;
  right: 150px;
  width: 100px;
  height: 50px;
  background-color: black;
  color: #fff;
  line-height: 2.7;
  z-index: 3;
}
.area {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  flex: 1;
}
#rival-deck {
  top: 30%;
}
#my-deck {
  bottom: 30%;
}
.deck {
  position: absolute;
  right: 20px;
}
.hand {
  position: absolute;
  width: 1200px;
  left: 50%;
  z-index: 9999;
}

#rival-hand {
  bottom: 100%;
  transform: translate(-50%, 90%);
}
#my-hand {
  top: 100%;
  transform: translate(-50%, -90%);
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
#my-hero {
  margin-bottom: 150px;
}
#rival-hero {
  margin-top: 150px;
}
.hero-cost {
  position: absolute;
  right: 10%;
}
#my-cost {
  bottom: 10%;
}
#rival-cost {
  top: 10%;
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
  height: 150px;
  border: 1px solid black;
  background-color: brown;
  line-height: 6;
  transition: all 0.3s;
  cursor: pointer;
}

.selected {
  background-color: burlywood;
  transform: scale(1.2);
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
</style>
