// import { createStore } from "vuex";
// import state from './state';
// import mutation from './mutation'
// import action fro./actionsion';
// import getter from './getter'

// const store = createStore({
//     state,
//     mutation,
//     action,
//     getter
// })

// export default store

// import Vue from 'vue'
// import Vuex from 'vuex'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'
// import state  from './state'

// Vue.use(Vuex)

// export function createStore () {
//   return new Vuex.Store({
//     state,
//     actions,
//     mutations,
//     getters
//   })
// }

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});