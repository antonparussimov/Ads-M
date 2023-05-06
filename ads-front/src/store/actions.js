import axios from 'axios'
import * as types from './types'

const proxy = 'http://localhost:5000/api'

export default {
  getCampaigns ({ commit }) {
    axios.post(`${proxy}/campaigns`)
      .then(res => {
        commit('getCampaigns', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getCampaigns ({ commit }) {
    axios.post(`${proxy}/campaigns`)
      .then(res => {
        commit('getCampaigns', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getCampaignDetail ({ commit }, payload) {
    commit('updateStartDate', payload.startDate)
    commit('updateEndDate', payload.endDate)
    axios.post(`${proxy}/campaigns/detail`, payload)
      .then(res => {
        commit('getCampaignDetail', res.data)
      })
      .catch(err=> {
        console.log(err)
      })
  },

  [types.ADD_NEW_PRESET] (context) {
    axios.post(`${proxy}/add_preset`, {
      presets: context.state.campaignAdd.campaigns.filter((item, index) => context.state.campaignAdd.selectedCampaigns.includes(index))
    })
      .then(res => {
        commit(types.ADD_NEW_PRESET, res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}