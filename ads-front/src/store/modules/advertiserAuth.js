import axios from "axios";
import setAuthToken from "../../utils/setAdvertiserAuthToken";
import * as types from '../types'
import { useRouter } from "vue-router";

const proxy = types.PROXY_URL

const state = {
  advertiser: null,
  Auth: false,
  loading: false,
  error: null,
  token: localStorage.getItem("advertiserToken"),
  users: [],
  allowUsers: [],
};

const getters = {
  AdvertiserErrors: state => state.error,
  Advertiser: state => state.advertiser,
  AdvertiserId: state => state.advertiser.advertiserId
};

const actions = {
  async registerAdvertiser({ dispatch, commit }, advertiser) {
    commit('loadingTrue')
    axios
      .post(
        `${proxy}/advertiser/advertiser`,
        advertiser,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("advertiserToken", res.data.token);
        commit('loadingFalse')
        commit("advertiserAdded", res.data.token);
        dispatch("loadAdvertiser");
      })
      .catch(err => {
        commit('loadingFalse')
        commit("Alert", err.response.data.msg);
      })
  },

  LoginAdvertiser({ dispatch, commit }, advertiser) {
    commit('loadingTrue')
    axios
      .post(
        `${proxy}/advertiser/auth`,
        advertiser,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("advertiserToken", res.data.token);
        commit('loadingFalse')
        commit("loggedIN", res.data.token);
        dispatch("loadAdvertiser");
      })
      .catch(err => {
        commit('loadingFalse')
        commit("Alert", err.response.data.msg);
      })
  },

  async loadAdvertiser({ commit }) {
    if (localStorage.advertiserToken) {
      setAuthToken(localStorage.advertiserToken);
    }

    axios
      .get(`${proxy}/advertiser/auth`)
      .then(res => {
        
        commit("setAdvertiser", res.data);
      })
      .catch(err => {
        commit("Alert", err.msg);
      })
  },

  setAlert({ commit }, error) {
    commit("Alert", error);
  },

  updateAdvertiserInfo({ commit }, payload) {
    axios
      .post(`${proxy}/advertiser/auth/update_info`, payload)
      .then(res => {
        commit('setAdvertiser', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getUsers({ commit }) {
    axios
      .get(`${proxy}/advertiser/auth/get_users`)
      .then(res => {
        commit('setUsers', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getAllowUsers({ commit }) {
    axios
      .get(`${proxy}/advertiser/auth/get_allow_users`)
      .then(res => {
        commit('setAllowUsers', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  setAllowUsers({state, commit}, allowUsers) {
    const payload = {
      allowUsers
    }
    axios
      .post(`${proxy}/advertiser/auth/set_allow_users`, payload)
      .then(res => {
        commit('setAllowUsers', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
};

const mutations = {
  advertiserAdded: (state, token) => {
    state.token = token;
  },
  loggedIN: (state, token) => {
    state.token = token;
  },
  setAdvertiser: (state, advertiser) => {
    state.Auth = true
    state.advertiser = advertiser
  },
  Logout: state => {
    localStorage.removeItem("advertiserToken");
    state.Auth = false
    state.advertiser = {}
    state.token = null
  },
  Alert: (state, error) => {
    localStorage.removeItem("advertiserToken");
    state.error = error;
    state.Auth = false;
    state.advertiser = {};
    setTimeout(
      function() {
        state.error = null;
      }.bind(this),
      5000
    );
  },
  loadingTrue: state => {
    state.loading = true
  },
  loadingFalse: state => {
    state.loading = false
  },
  ClearAlert: state => (state.error = null),
  setUsers: (state, users) => {
    state.users = users
  },
  setAllowUsers: (state, allowUsers) => {
    if(allowUsers.length) {
      state.allowUsers = allowUsers.map(user => parseInt(user.id))
    } else {
      state.allowUsers = []
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
