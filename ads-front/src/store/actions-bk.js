import axios from 'axios'

const proxy = 'http://localhost:5000/api'

export const getCampaigns = ({ commit }) => {
  axios.post(`${proxy}/campaigns`)
    .then(res => {
      commit('getCampaigns', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getCampaignDetail = ({ commit }, payload) => {
  commit('updateStartDate', payload.startDate)
  commit('updateEndDate', payload.endDate)
  axios.post(`${proxy}/campaigns/detail`, payload)
    .then(res => {
      commit('getCampaignDetail', res.data)
    })
    .catch(err=> {
      console.log(err)
    })
}

export const addPreset = (context) => {
  axios.post(`${proxy}/add_preset`, {
    presets: context.state.campaignAdd.campaigns.filter((item, index) => context.state.campaignAdd.selectedCampaigns.includes(index))
  })
    .then(res => {
      commit(types.ADD_NEW_PRESET)
    })
}