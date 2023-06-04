import { createStore, createLogger } from 'vuex'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'
import auth from './modules/auth'

const state = {
  campaignList: [],
  campaignDetail: {
    id: 7128276846151483393,
    startDate: '2022-07-01',
    endDate: '2022-12-01',
    selectedColumns: [
      'date',
      'campaignName',
      'groupName',
      'adName',
      'cost',
      'costPerResult',
      'cpc',
      'impressions',
      'ctr',
      'clicks',
      'resultRate',
      'result',
      'cpa',
      'cvr',
      'conversions',
      // 'reach',
      'cpm',
      // 'frequency',
      'tag1',
    ],
    campaignHistory: [],
    chartData: [],
    filterCampaignNames: new Set(),
    filterGroupNames: new Set(),
  },
  campaignAdd: {
    campaigns: [],
    presets: [],
    selectedCampaigns: [],
    showPresetSelectable: false,
  },
  campaignGettingFlag: false,
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
