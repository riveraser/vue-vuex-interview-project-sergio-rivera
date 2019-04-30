<template>
  <li
    class="day-hover"
    @click.prevent="selectDay()"
    :class="{'current-day' : currentDate.isCurrentDay, 'selected-day' : currentDate.isSelected }"
  >
    <span class="number">{{currentDate.day}}</span>
    <p class="secondary--text text--lighten-4 muted">{{currentDate.isSelected}}</p>
  </li>
</template>

<script>
export default {
  name: "CalendarDay",
  data: function() {
    return {};
  },
  props: ["currentDate", "activities"],
  methods: {
    selectDay() {
      this.$emit("select-date", this.currentDate.id);
    }
  }
};
</script>
<style lang="less">
.calendar {
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