<template>
   <v-card >
        <v-card-title class="blue white--text">
          <span class="headline">Reminders list</span>

          <v-spacer></v-spacer>
            <v-btn
              dark
              fab
              color="pink"
              small
            >
              <v-icon>add</v-icon>
            </v-btn>
         
        </v-card-title>
        <v-card-text>
          <v-calendar
          color="primary"
          type="day"
          :start="start"
          :end="end"
        >
          <template v-slot:dayHeader="{ present }">
            <template
              v-if="present"
              class="text-xs-center"
            >
              Today
            </template>
          </template>

          <template v-slot:interval="{ hour }">
            <div
              class="text-xs-center"
            >
              {{ hour }} o'clock
            </div>
          </template>
        </v-calendar>

        </v-card-text>
      </v-card>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "ReminderDetails",
    data: function() {
        return {
           start: '2019-01-01',
           end: '2019-01-01',
        };
    },
    mounted(){
        let currentDate = this.idToTime(this.$route.params.id);

        this.start = currentDate.format("YYYY-MM-DD");
        this.end = this.start;
    },
    //Lets watch for the URL change
    watch:{
        $route (to, from){
           let currentDate = this.idToTime(this.$route.params.id);
           this.start = currentDate.format("YYYY-MM-DD");
           this.end = this.start;

           this.CHANGE_DATE( this.$route.params.id );
        }
    },
    methods: {
        ...mapActions(["CHANGE_DATE"]),
    }
}
</script>

<style>

</style>
