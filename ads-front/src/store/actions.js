import * as types from './types'
import axios from axios

export const increment = ({ commit }) => {
  commit('increment');
};

export const decrement = ({ commit }) => {
  commit('decrement');
};