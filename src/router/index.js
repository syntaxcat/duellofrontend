import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import mainBoard from '../views/main-board.vue'

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

  ]
})

export default router
