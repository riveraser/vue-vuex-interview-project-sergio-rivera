<template>
  <v-card>
    <v-card-title class="blue white--text">
      <span class="headline">Reminders list</span>
      <v-spacer></v-spacer>
      <reminder-detail @reminder-saved="onchanged" :isNew="true"></reminder-detail>
    </v-card-title>
    <v-card-text>
      <v-list two-line v-if="dayTask.length">
        <transition-group name="list-complete" tag="span">
          <reminder-detail
            v-for="item in dayTask"
            :key="item.id"
            avatar
            class="list-complete-item"
            :reminder="item"
            @reminder-saved="onchanged"
            @reminder-delete="onBeforeDelete"
          ></reminder-detail>
        </transition-group>
      </v-list>
      <transition name="list-complete">
        <v-alert
          v-if="dayTask.length ==0"
          :value="true"
          type="warning"
          class="list-complete-item"
        >Reminders not found for this day.</v-alert>
      </transition>
    </v-card-text>

    <v-snackbar v-model="snackbar.show" :top="true" :timeout="8000" :color="snackbar.color">
      {{snackbar.message}}
      <v-btn v-if="!snackbar.isConfirmed" flat @click="snackbar.show = false">No</v-btn>
      <v-btn v-if="!snackbar.isConfirmed" color="error" @click="deleteReminder">Yes</v-btn>
      <v-btn v-if="snackbar.isConfirmed" flat @click="snackbar.show = false">Ok</v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
/***
 * by Sergio Rivera 2019-05-01
 */
import ReminderDetail from "@/components/reminder/ReminderDetail";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "ReminderDetails",
  components: { ReminderDetail },
  data: function() {
    return {
      currentDate: "",
      snackbar: {
        show: false,
        message: "Do you want to delete this Reminder?",
        color: "warning",
        isConfirmed: false,
        deleteId: 0
      }
    };
  },
  mounted() {
    this.currentDate = this.idToTime(this.$route.params.id);
  },
  computed: {
    ...mapState("reminders", ["reminders"]),
    dayTask() {
      let myDayTask = this.reminders.filter(
        task => task.dayId === this.$route.params.id
      );
      //Try to return value if we fail send a null list
      try {
        //But before returning we must sort the list by the Start Time
        //Early reminders should be at top of the list
        myDayTask.sort((a, b) =>
          a.start > b.start ? 1 : b.start > a.start ? -1 : 0
        );
        return myDayTask;
      } catch (error) {
        return null;
      }
    }
  },
  //Lets watch for the URL change
  watch: {
    $route(to, from) {
      this.CHANGE_DATE(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions(["CHANGE_DATE"]),
    ...mapMutations("reminders", ["DELETE"]),
    onchanged(data) {
      /*console.log("EMITING CHANGED:", data.id);
      console.log("EMITING CHANGED:", data.payload);*/
    },
    onBeforeDelete(deleteId) {
      this.snackbar.message = "Do you want to delete this Reminder?";
      this.snackbar.isConfirmed = false;
      this.snackbar.color = "warning";
      this.snackbar.show = true;
      this.snackbar.deleteId = deleteId;
    },

    deleteReminder() {
      this.snackbar.show = true;
      this.snackbar.message = "Reminder was deleted!";
      this.snackbar.isConfirmed = true;
      this.snackbar.color = "success";

      this.DELETE(this.snackbar.deleteId);

      this.snackbar.deleteId = 0;
    }
  }
};
</script>

<style  lang="less" >
.v-list {
  span.list-complete-item {
    display: block;
    margin-bottom: 5px;
  }
}
.v-list__tile__avatar {
  min-width: 10px !important;
  margin-left: -20px !important;
  margin-right: 10px !important;
  height: 100%;
  .v-avatar {
    border-radius: 0 !important;
    width: 20px !important;
    height: 100% !important;
    .v-icon {
      border-radius: 0 !important;
    }
  }
}
.list-complete-item {
  transition: all 0.35s;
  margin-bottom: 5px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px) scale(0.75);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
