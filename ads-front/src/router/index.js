import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

const routes = [
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: () => import('/src/components/dashboard/Dashboard.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/tik/perf/campaign',
  //   name: 'Campaign',
  //   component: () => import('/src/components/campaign/Campaign.vue'),
  // },
  {
    path: '/tik/perf',
    name: 'CampaignDetail',
    component: () => import('/src/components/campaign/detail/CampaignDetail.vue'),
    meta: { requiresAuth: true }
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
  { 
    path: '/advertiser/login', 
    name: 'advertiser.login', 
    component: () => import('/src/components/advertiser/login/LoginView.vue'),
  },
  { 
    path: '/advertiser/register', 
    name: 'advertiser.register', 
    component: () => import('/src/components/advertiser/register/RegisterView.vue'),
  },
  {
    path: '/advertiser/dashboard',
    name: 'advertiser.dashboard',
    component: () => import('/src/components/advertiser/dashboard/DashboardView.vue'),
    meta: { requiresAdvertiserAuth: true }
  },
  { 
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import('/src/components/not_found/NotFoundView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const store = useStore()

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // await store.dispatch('loadUser')
    if (!localStorage.token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresAdvertiserAuth)) {
    if(!localStorage.advertiserToken) {
      next({name: 'advertiser.login'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
