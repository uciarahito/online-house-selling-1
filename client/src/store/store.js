import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './modules/actions'
import * as mutations from './modules/mutations'
import * as getters from './modules/getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: [],
    signIn: [],
    dataHouses: [],
    marker: {
      lat: -6.2372963,
      lng: 106.7904324
    }
  },
  getters: getters.Getters,
  mutations: mutations.Mutations,
  actions: actions.Actions
})