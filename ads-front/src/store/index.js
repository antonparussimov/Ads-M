import { createStore, createLogger } from 'vuex'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'
import auth from "./modules/auth";

const state = {
  campaignList: [],
  campaignDetail: {
    id: 7128276846151483393,
    startDate: '2022-01-01',
    endDate: '2022-01-01',
    selectedColumns: ['date', 'cost', 'costPerResult', 'cpc', 'impressions', 'ctr', 'clicks', 'resultRate', 'result', 'cpa', 'cvr', 'conversions', 'reach', 'costPer1000People', 'frequency'],
    campaignHistory: [],
    chartData: [],
    filterNames: [],
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
    auth
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})
