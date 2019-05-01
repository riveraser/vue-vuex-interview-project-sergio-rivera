<template>
  <v-jumbotron :gradient="gradient" dark class="calendar-container elevation-3">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <div class="calendar">
            <div class="calendar-header primary--text text--darken-2">
              <v-btn fab dark flat color="primary" @click="subtractMonth">
                <v-icon dark>chevron_left</v-icon>
              </v-btn>
              <h2 class="font-weight-light text-uppercase">{{monthName + ' - ' + year}}</h2>
              <v-btn fab dark flat color="primary" @click="addMonth">
                <v-icon dark>chevron_right</v-icon>
              </v-btn>
            </div>
            <ul class="calendar-weekdays secondary--text">
              <li v-for="day in dayLabels" :key="day" class="text-uppercase text-center">{{day}}</li>
            </ul>
            <ul class="calendar-dates">
              <li class="empty-day" v-for="(blank, index) in monthFirstDay" :key="100+index">&nbsp;</li>
              <CalendarDay
                v-for="(date, index) in daysObject"
                class="secondary--text text--lighten-4 fill-height"
                :key="index"
                :currentDate="date"
                @select-date="selectDate"
              ></CalendarDay>
              <li
                class="empty-day bottom"
                v-for="(blank, index) in monthLastDay"
                :class="{'first-child ': index == 0}"
                :key="50+index"
              >&nbsp;</li>
            </ul>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>
<script>
import moment from "moment";
import CalendarDay from "./CalendarDay";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CalendarGrid",
  components: { CalendarDay },
  data: function() {
    return {
      today: moment(),
      dateMoment: moment(),
      gradient: "to top, #0288D1,  #22A8F1",
      dayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };
  },
  mounted() {
    //force current day selection
    let todayId = this.startYear + "" + this.startMonth + "" + this.startDate;
    this.selectDate(todayId);
  },
  computed: {
    ...mapGetters(["GET_DATE"]),
    daysObject() {
      let todayId = this.startYear + "" + this.startMonth + "" + this.startDate;
      //build the day object to pass to child component
      let objDays = [];
      for (var i = 1; i <= this.monthCountDays; i++) {
        let dayId = this.year + "" + this.month + "" + (i < 10 ? "0" + i : i);
        objDays.push({
          id: dayId,
          isCurrentDay: dayId == todayId ? true : false,
          isSelected: this.GET_DATE == dayId ? true : false,
          day: i,
          month: this.month,
          monthName: this.monthName,
          year: this.year
        });
      }

      return objDays;
    },
    year() {
      return this.dateMoment.format("Y");
    },
    month() {
      return this.dateMoment.format("MM");
    },
    monthName() {
      return this.dateMoment.format("MMMM");
    },
    monthCountDays() {
      return this.dateMoment.daysInMonth();
    },
    /** Will fetch the first day of the month so we can paint empty squares at the start*/
    monthFirstDay: function() {
      var firstDay = moment(this.dateMoment).subtract(this.day - 1, "days");
      return firstDay.weekday();
    },
    /** Will fetch the last day of the month so we can paint empty squares at the end of the month*/
    monthLastDay: function() {
      let howManyWeeks = (this.monthFirstDay + this.monthCountDays + 1) / 7;
      let totalDaysDisplayed = this.monthFirstDay + this.monthCountDays;

      //Must get residual month + 1 if needed
      if (!Number.isInteger(howManyWeeks)) {
        //If Modulo gives us 0 then the days fills the whole week
        if (totalDaysDisplayed % 7 == 0) {
          howManyWeeks = Math.floor(howManyWeeks);
        } else {
          //If not then we mus add a whole week
          howManyWeeks = Math.floor(howManyWeeks) + 1;
        }
      }
      let totalDaysToDisplay = howManyWeeks * 7; //Total squares that should be rendered
      return totalDaysToDisplay - totalDaysDisplayed;
    },
    day() {
      return this.dateMoment.format("DD");
    },
    dayName() {
      return this.dateMoment.format("dddd");
    },
    startDate() {
      return this.today.format("DD");
    },
    startMonth() {
      return this.today.format("MM");
    },
    startYear() {
      return this.today.format("Y");
    }
  },
  methods: {
    ...mapActions(["CHANGE_DATE"]),
    addMonth() {
      this.dateMoment = moment(this.dateMoment).add(1, "month");
    },
    subtractMonth() {
      this.dateMoment = moment(this.dateMoment).subtract(1, "month");
    },
    isCurrentDate(day) {
      return (
        parseInt(day) == parseInt(this.startDate) &&
        parseInt(this.month) == parseInt(this.startMonth) &&
        parseInt(this.year) == parseInt(this.startYear)
      );
    },
    selectDate(id) {
      this.daysObject.forEach(element => {
        element.isSelected = element.id == id ? true : false;
      });
      this.CHANGE_DATE(id);

      this.$router.push({
        name: "reminders-details",
        params: { id: id }
      });
    }
  }
};
</script>

<style lang="less">
.calendar-container {
  height: auto !important;
  .v-jumbotron__content {
    .container {
      margin: 0px;
      padding: 2px;
    }
  }
  .calendar {
    background-color: #fff;
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .calendar-weekdays {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      > li {
        flex-grow: 1;
      }
    }
    .calendar-dates {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      flex-wrap: wrap;
      border: 1px solid #22a8f1;
      border-top: none;
      border-left: none;

      > li {
        width: 14.28%;
        height: 80px;
        border: 1px solid #22a8f1;
        border-bottom: none;
        border-right: none;
        text-align: left;
        padding: 0px 2px;
      }

      .empty-day {
        background-color: #efefef;
        border: 1px solid #22a8f1;
        border-bottom: none;
        border-right: none;
        &.bottom {
          border-top: 1px solid #22a8f1;
        }
        &.bottom.first-child {
          border-left: 1px solid #22a8f1;
        }
      }
    }
  }
}
</style>
