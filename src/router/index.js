import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      keepAlive: true
    },
    component: Home
  },
  {
    path: '/explain',
    name: 'Explain',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/explain/explain.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/record/record.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/signin/signin.vue')
  },
  {
    path: '/luckyDraw',
    name: 'LuckyDraw',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/luckyDraw/luckyDraw.vue')
  },
  {
    path: '/walk',
    name: 'Walk',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/walk/walk.vue')
  },
  {
    path: '/invite',
    name: 'Invite',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/invite/invite.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/feedback/feedback.vue')
  },
  {
    path: '/exchange',
    name: 'Exchange',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/exchange/exchange.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
