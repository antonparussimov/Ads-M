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
}