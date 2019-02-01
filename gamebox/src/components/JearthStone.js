const Card = function(id, player) {
  this.id = id;
  this.att = Math.ceil(Math.random() * 5);
  this.hp = Math.ceil(Math.random() * 5);
  this.cost = Math.ceil((this.att + this.hp) / 2);
  this.isSelected = false;
  this.isAttacked = false;
  this.player = player;
  this.isSleep = true;
};

const makeCards = function(id, player) {
  return new Card(id, player);
};

const createHand = function(player) {
  const hand = [];
  for (let i = 0; i < 5; i++) {
    hand.push(makeCards(i, player));
  }
  return hand;
};

export default {
  myHand: createHand,
  rivalHand: createHand,
  drawCard: makeCards
};
