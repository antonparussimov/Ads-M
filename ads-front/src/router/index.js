import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('/src/components/dashboard/Dashboard.vue'),
  },
  {
    path: '/tik/perf/campaign',
    name: 'Campaign',
    component: () => import('/src/components/campaign/Campaign.vue'),
  },
  {
    path: '/tik/perf/campaign/detail/:id',
    name: 'CampaignDetail',
    component: () => import('/src/components/campaign/detail/CampaignDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
