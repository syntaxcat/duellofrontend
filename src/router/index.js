import { createRouter, createWebHashHistory } from "vue-router";
import homePage from "../views/home-page.vue";
import mainBoard from "../views/main-board.vue";
import welcomePage from "../views/welcome-page.vue";
import loginApp from "../views/login-app.vue";
import taskDetails from "../components/task-details.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/welcome",
      name: "welcome",
      component: welcomePage,
    },
    {
      path: "/login",
      name: "login",
      component: loginApp,
    },
    {
      path: "/",
      name: "home",
      component: homePage,
    },
    {
      path: "/board/:boardId",
      name: "board",
      component: mainBoard,
    },
    {
      path: "/task-details",
      name: "task-details",
      component: taskDetails,
    },
  ],
});

export default router;
