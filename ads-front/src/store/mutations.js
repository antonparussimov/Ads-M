import * as types from './types'

export default {
  getCampaignDetail(state, payload) {
    state.campaignDetail.campaignHistory = payload.campaignHistory
    state.campaignDetail.chartData = payload.chartData
  },

  getCampaigns(state, payload) {
    state.campaignList = payload
  },

  updateSelectedColumn(state, payload) {
    state.campaignDetail.selectedColumns = payload
  },

  updateStartDate(state, payload) {
    state.campaignDetail.startDate = payload
  },

  updateEndDate(state, payload) {
    state.campaignDetail.endDate = payload
  },

  [types.CREATE_NEW_CAMPAIGN](state, payload) {
    state.campaignAdd.campaigns = [...state.campaignAdd.campaigns, payload]
  },

  [types.CHANGE_NEW_CAMPAIGN_ATTR] (state, payload) {
    state.campaignAdd.campaigns[payload.index][payload.key] = payload.value
  },

  [types.ChANGE_NEW_SELECTABLE] (state, payload) {
    state.campaignAdd.selectedCampaigns = payload
  },

  [types.REVERSE_PRESET_SELECTABLE] (state) {
    state.campaignAdd.showPresetSelectable = !state.campaignAdd.showPresetSelectable
  },

  [types.ADD_NEW_PRESET] (state, payload) {
    state.campaignAdd.presets = [...state.campaignAdd.presets, payload]
  },

  [types.CHANGE_NEW_CAMPAIGN_TITLE] (state, payload) {
    state.campaignAdd.campaigns[payload.index].title = payload.title
  },

  [types.GET_PRESETS] (state, payload) {
    state.compaignAdd.presets = payload
  }
}