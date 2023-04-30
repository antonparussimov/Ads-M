export default {
  getCampaignDetail(state, payload) {
    state.campaignDetail.campaignHistory = payload
  },

  getCampaigns(state, payload) {
    state.campaignList = payload
  },

  updateSelectedColumn(state, payload) {
    state.campaignDetail.selectedColumns = payload
  }
}