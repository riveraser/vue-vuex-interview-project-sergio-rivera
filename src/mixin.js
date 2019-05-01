/***
 * by Sergio Rivera
 * I aded some generic functions or DATA state because I was planing to use 2 differents Forms to
 * EDIT or CREATE a new reminder but I decided to use the same component...
 */

import moment from "moment";
export default {
  data: function() {
    return {
      colorOptions: [
        { text: "Primary", value: "primary" },
        { text: "Secondary", value: "secondary" },
        { text: "Accent", value: "accent" },
        { text: "Success", value: "success" },
        { text: "Info", value: "info" },
        { text: "Warning", value: "warning" },
        { text: "Error", value: "error" },
        { text: "Red", value: "red" },
        { text: "Pink", value: "pink" },
        { text: "Purple", value: "purple" },
        { text: "Deep Purple", value: "deep-purple" },
        { text: "Indigo", value: "indigo" },
        { text: "Blue", value: "blue" },
        { text: "Light Blue", value: "light-blue" },
        { text: "Cyan", value: "cyan" },
        { text: "Teal", value: "teal" },
        { text: "Green", value: "green" },
        { text: "Light Green", value: "light-green" },
        { text: "Lime", value: "lime" },
        { text: "Yellow", value: "yellow" },
        { text: "Amber", value: "amber" },
        { text: "Orange", value: "orange" },
        { text: "Deep Orange", value: "deep-orange" },
        { text: "Brown", value: "brown" },
        { text: "Black", value: "black" }
      ]
    };
  },
  computed: {
    timeOptions() {
      let arrTimeOptions = [];
      let initTime = "0000";
      for (var i = 0; i < 2400; i += 50) {
        let timeOption = {
          text: moment(initTime, "HHmm")
            .format("h:mm a")
            .toUpperCase(),
          value: moment(initTime, "HHmm").format("HHmm")
        };
        arrTimeOptions.push(timeOption);
        //30 minutes
        initTime = moment(initTime, "HHmm").add(30, "m");
      }
      return arrTimeOptions;
    }
  },
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    cleanTextForTranslation: str => str.toLowerCase().replace(/ /g, "_"),
    idToTime: str => moment(str, "YYYYMMDD"),
    dateToid: str => moment(str, "YYYY-MM-DD").format("YYYYMMDD"),
    timeIdtoTime: str => moment(str, "HHmm").format("h:mm a"),
    currentTime() {
      return moment().format("HH:mm:ss");
    }
  }
};
