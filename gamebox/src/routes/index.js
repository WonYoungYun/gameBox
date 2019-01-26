import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import WordChain from "../components/WordChain.vue";
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
      path: "*",
      component: Home
    }
  ]
});
