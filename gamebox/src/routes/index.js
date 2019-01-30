import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import WordChain from "../components/WordChain.vue";
import Multiplication from "../components/Multiplication.vue";
import NumberBaseball from "../components/NumberBaseball.vue";
import TickTackTo from "../components/TickTackTo.vue";
import Lotto from "../components/Lotto.vue";
import RPS from "../components/RPS.vue";
import MineSweeper from "../components/MineSweeper.vue";
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/wordchain",
      component: WordChain
    },
    {
      path: "/multiplication",
      component: Multiplication
    },
    {
      path: "/numberbaseball",
      component: NumberBaseball
    },
    {
      path: "/ticktackto",
      component: TickTackTo
    },
    {
      path: "/lotto",
      component: Lotto
    },
    {
      path: "/rps",
      component: RPS
    },
    {
      path: "/minesweeper",
      component: MineSweeper
    },
    {
      path: "*",
      component: Home
    }
  ]
});
