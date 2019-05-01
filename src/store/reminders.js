import { stat } from "fs";

export default {
  namespaced: true,
  state: {
    reminders: [
      {
        dayId: "20190428",
        id: 20190428001245,
        color: "warning",
        message: "New time changed should reorde",
        start: "1730",
        end: "1830"
      },
      {
        dayId: "20190429",
        id: 20190429001200,
        color: "pink",
        message: "Hello world in pink",
        start: "1230",
        end: "1430"
      },
      {
        dayId: "20190501",
        id: 20190501125423,
        message: "My brand new reminder brown on",
        color: "brown",
        start: "1230",
        end: "1400"
      },
      {
        dayId: "20190501",
        id: 20190501130317,
        message: "Another new Reminder in orange",
        color: "deep-orange",
        start: "1000",
        end: "1100"
      }
    ]
  },
  getters: {
    GET: state => {
      return state.reminders;
    }
  },
  mutations: {
    /**Saving the changes */
    SAVE: (state, payload) => {
      let reminder = state.reminders.findIndex(
        reminder => reminder.id === payload.id
      );
      state.reminders[reminder] = payload;
    },
    NEW: (state, payload) => {
      state.reminders.push(payload);
    },
    DELETE: (state, payload) => {
      state.reminders = state.reminders.filter(obj => obj.id !== payload);
    }
  },
  actions: {}
};
