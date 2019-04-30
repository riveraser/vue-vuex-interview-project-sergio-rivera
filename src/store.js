import Vue from "vue";
import Vuex from "vuex";

import localForage from "localforage";
import VuexPersistence from 'vuex-persist'

import reminders from '@/store/reminders'

Vue.use(Vuex);


/*** We will persist the 'reminders' at local database  */
const vuexLocal = new VuexPersistence({
  storage: localForage,
  modules: ['reminders']
})

export default new Vuex.Store({
  state: {
    selectedDate: ""
  },
  getters: {
    GET_DATE: state => {
      return state.selectedDate;
    }
  },
  mutations: {
    SET_DATE: (state, payload) => {
      state.selectedDate = payload;
    }
  },
  actions: {
    CHANGE_DATE: (context, payload) => {
      context.commit("SET_DATE", payload);
    }
  },
  modules: {
    reminders
  },
  plugins: [vuexLocal.plugin]
});
