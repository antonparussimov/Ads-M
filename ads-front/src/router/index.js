import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('/src/components/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tik/perf/campaign',
    name: 'Campaign',
    component: () => import('/src/components/campaign/Campaign.vue'),
  },
  {
    path: '/tik/perf',
    name: 'CampaignDetail',
    component: () => import('/src/components/campaign/detail/CampaignDetail.vue'),
  },
  {
    path: '/tik/perf/campaign/add',
    name: 'CampaignAdd',
    component: () => import('/src/components/campaign_add/CampaignAddView.vue'),
  },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('/src/components/login/LoginView.vue'),
  },
  { 
    path: '/register', 
    name: 'register', 
    component: () => import('/src/components/register/RegisterView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
