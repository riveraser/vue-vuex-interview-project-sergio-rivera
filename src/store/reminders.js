export default {
    namespaced: true,
    state:{
        reminders: [
        {
              dayId:"20190401",
              id: 201904010015,
              color: "warning",
              message: "Hello world"
        },
        {
              dayId:"20190410",
              id: 20190410001245,
              color: "warning",
              message: "Hello world"
        },
        {
              dayId:"20190410",
              id: 20190410001245,
              color: "warning",
              message: "Hello world"
        }
        ]
    },
    getters: {
        GET: state => {
            return state.reminders;
        }
    },
    mutations: {
       SET: (state, payload) => {
            state.dateTaskObject.push(payload);
       },
       REMOVE: (state, payload) => {
           
       }
    },
    actions: {

    }
  }