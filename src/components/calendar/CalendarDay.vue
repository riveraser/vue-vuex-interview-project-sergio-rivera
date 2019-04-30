<template>
  <li
    class="day-hover"
    @click.prevent="selectDay()"
    :class="{'current-day' : currentDate.isCurrentDay, 'selected-day' : currentDate.isSelected }"
  >
    <span class="number clear">{{currentDate.day}}</span>
     
     <div class="clear text-xs-center mt-2" v-if="dayTask" >
       <v-badge overlap>
      <template v-slot:badge>
        <span>{{dayTask}}</span>
      </template>

      <v-avatar
        color="purple red--after"
        size="36"
      >
        <v-icon dark>notifications</v-icon>
      </v-avatar>
    </v-badge>
    </div>

  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CalendarDay",
  data: function() {
    return {};
  },
  props: ["currentDate", "activities"],
  computed: {
    ...mapGetters('reminders', ["GET"]),
    dayTask(){
      let myDayTask = this.GET.filter( task => task.dayId === this.currentDate.id);
      //Try to return value
      try {
        return myDayTask.length ;  
      } catch (error) {
        return 0;  
      }
    }
  },
  methods: {
    selectDay() {
      this.$emit("select-date", this.currentDate.id);
    }
  }
};
</script>
<style lang="less" scoped >
.calendar {
  
  .clear{
    clear: both;
  }
  .current-day {
    background-color: darken(#22a8f1, 20%);
    color: #fff !important;
    font-weight: 600;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  }
  .selected-day {
    background-color: #22a8f1;
    color: #fff !important;
    font-weight: 600;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  }
  .day-hover {
    cursor: pointer;
    overflow: hidden;
    &:hover {
      background-color: fadeout(#22a8f1, 50%) !important;
    }
    p {
      margin: 0px;
      &.muted {
        opacity: 0.3;
      }
    }
  }
  
}
</style>