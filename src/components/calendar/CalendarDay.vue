<template>
  <li class="day-hover">
    <span class="number">{{currentDate}}</span>
    <p class="secondary--text text--lighten-4 muted">No activities</p>
  </li>
</template>

<script>
export default {
  name: "CalendarDay",
  data: function() {
    return {};
  },
  props: ["currentDate", "activities"]
};
</script>
<style lang="less">
.day-hover {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: #22a8f14d !important;
  }
  p {
    margin: 0px;
    &.muted {
      opacity: 0.3;
    }
  }
}
</style>
