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

  getCampaignDetail ({ state, commit }, payload) {
    commit('updateStartDate', payload[0])
    commit('updateEndDate', payload[1])
    const payload1 = {
      id: state.campaignDetail.id,
      startDate: payload[0],
      endDate: payload[1]
    }
    axios.post(`${proxy}/campaigns/detail`, payload1)
      .then(res => {
        commit('getCampaignDetail', res.data)
      })
      .catch(err=> {
        console.log(err)
      })
  },

  [types.ADD_NEW_PRESET] (context) {
    axios.post(`${proxy}/presets/add_preset`, {
      presets: context.state.campaignAdd.campaigns.filter((item, index) => context.state.campaignAdd.selectedCampaigns.includes(index))
    })
      .then(res => {
        context.commit(types.ADD_NEW_PRESET, res.data)
      })
      .catch(err => {
        console.log(err)
      });
  },

  [types.GET_PRESETS] ({commit}) {
    axios.get(`${proxy}/presets`)
      .then(res => {
        commit(types.GET_PRESETS, res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  [types.GET_CAPAIGN_FROM_TIKTOK] ({commit, dispatch}) {
    commit(types.GET_CAPAIGN_FROM_TIKTOK)
    // context.state.campaignGettingFlag = true
    axios.get(`${proxy}/campaigns/get_campaign_from_tiktok`)
      .then(res => {
        commit(types.GETED_CAPAIGN_FROM_TIKTOK)
        dispatch('getCampaigns')
        // context.state.campaignGettingFlag = false
      })
      .catch(err => {
        commit(types.GETED_CAPAIGN_FROM_TIKTOK)
        // context.state.campaignGettingFlag = false
        console.log(err)
      })
  },

  [types.ADD_CAMPAIGN_TO_TIKTOK] ({state, commit}) {
    axios.post(`${proxy}/campaigns/add_campaign_to_tiktok`, {
      campaigns: state.campaignAdd.campaigns
    })
      .then(res => {
        commit(types.ADD_CAMPAIGN_TO_TIKTOK)
      })
      .catch(err => {
        console.log(err)
      })
  },
}