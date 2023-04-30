import axios from 'axios'

export const getCampaigns = ({ commit }) => {
  console.log('payload');
  axios.post('http://localhost:5000/api/campaigns')
    .then(res => {
      commit('getCampaigns', res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getCampaignDetail = ({ commit }, payload) => {
  axios.post('http://localhost:5000/api/campaigns/detail', payload)
    .then(res => {
      commit('getCampaignDetail', res.data)
    })
    .catch(err=> {
      console.log(err)
    })
}