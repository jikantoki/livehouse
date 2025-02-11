import { createRouter, createWebHistory } from 'vue-router'
import indexPage from './views/indexPage.vue'
import playPage from './views/playPage.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage,
    },
    {
      path: '/play',
      name: 'play',
      component: playPage,
    },
  ],
})

export default router
