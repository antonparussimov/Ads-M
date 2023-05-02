import axios from 'axios'

export const getCampaigns = ({ commit }) => {
  axios.post('http://localhost:5000/api/campaigns')
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
  axios.post('http://localhost:5000/api/campaigns/detail', payload)
    .then(res => {
      commit('getCampaignDetail', res.data)
    })
    .catch(err=> {
      console.log(err)
    })
}