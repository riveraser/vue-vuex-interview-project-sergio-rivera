import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedDate: "",
    dateTaskObject: []
  },
  getters: {
    GET_DATE: state => {
      return state.selectedDate;
    },
    GET_DATETASK: state => {
      return state.dateTaskObject;
    }
  },
  mutations: {
    SET_DATE: (state, payload) => {
      state.selectedDate = payload;
    },
    SET_DATETASK: (state, payload) => {
      state.dateTaskObject.push(payload);
    },
    REMOVE_DATETASK: (state, payload) => {}
  },
  actions: {
    CHANGE_DATE: (context, payload) => {
      context.commit("SET_DATE", payload);
    }
  }
});
