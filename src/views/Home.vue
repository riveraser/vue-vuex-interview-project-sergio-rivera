<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <h1 class="text-xs-left blue--text text--darken-2 font-weight-light">EVENTS CALENDAR</h1>
      </v-flex>
      <v-flex xs12 sm6>
        <calendar-grid></calendar-grid>
      </v-flex>
      <v-flex xs12 sm6>List here</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CalendarGrid from "@/components/calendar/CalendarGrid";

export default {
  name: "home",
  components: {
    CalendarGrid
  }
};
</script>
