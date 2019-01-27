import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import WordChain from "../components/WordChain.vue";
import Multiplication from "../components/Multiplication.vue";
import NumberBaseball from "../components/NumberBaseball.vue";
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
      path: "*",
      component: Home
    }
  ]
});
