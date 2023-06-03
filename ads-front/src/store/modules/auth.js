import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { useRouter } from 'vue-router'
import * as types from '../types'

const proxy = types.PROXY_URL

const state = {
  user: null,
  Auth: false,
  loading: false,
  error: null,
  token: localStorage.getItem("token")
};

const getters = {
  Errors: state => state.error,
  User: state => state.user
};

const actions = {
  async registerUser({ dispatch, commit }, user) {
    commit('loadingTrue')
    axios
      .post(
        `${proxy}/user`,
        user,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        commit('loadingFalse')
        commit("userAdded", res.data.token);
        dispatch("loadUser");
      })
      .catch(err => {
        commit('loadingFalse')
        commit("Alert", err.response.data.msg);
      })
  },

  LoginUser({ dispatch, commit }, user) {
    commit('loadingTrue')
    axios
      .post(
        `${proxy}/auth`,
        user,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        commit('loadingFalse')
        commit("loggedIN", res.data.token);
        dispatch("loadUser");
      })
      .catch(err => {
        commit('loadingFalse')
        commit("Alert", err.response.data.msg);
      })
  },

  async loadUser({ commit }) {
    const router = useRouter()
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    axios
      .get(`${proxy}/auth`)
      .then(res => {
        commit("setUser", res.data);
      })
      .catch(err => {
        commit("Alert", err.msg);
      })
  },

  setAlert({ commit }, error) {
    commit("Alert", error);
  }
};

const mutations = {
  userAdded: (state, token) => {
    state.token = token;
  },
  loggedIN: (state, token) => {
    state.token = token;
  },
  setUser: (state, user) => {
    state.Auth = true
    state.user = user
  },
  Logout: state => {
    localStorage.removeItem("token");
    state.Auth = false
    state.user = {}
    state.token = null
  },
  Alert: (state, error) => {
    localStorage.removeItem("token");
    state.error = error;
    state.Auth = false;
    state.user = {};
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
  ClearAlert: state => (state.error = null)
};

export default {
  state,
  getters,
  actions,
  mutations
};
