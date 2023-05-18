import { createStore, createLogger } from 'vuex'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  campaignList: [],
  campaignDetail: {
    id: null,
    startDate: null,
    endDate: null,
    selectedColumns: ['date', 'cost', 'costPerResult', 'cpc', 'impressions', 'ctr', 'clicks', 'resultRate', 'result', 'cpa', 'cvr', 'conversions', 'reach', 'costPer1000People', 'frequency'],
    campaignHistory: [],
    chartData: [],
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
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
