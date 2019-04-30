import moment from "moment";
export default {
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    cleanTextForTranslation: str => str.toLowerCase().replace(/ /g, "_"),
    idToTime: str => moment(str, "YYYYMMDD")
  }
};
