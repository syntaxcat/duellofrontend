import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import mainBoard from '../views/main-board.vue'
import welcomePage from '../views/welcome-page.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/board',
      name: 'board',
      component: mainBoard
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcomePage
    },

  ]
})

export default router
