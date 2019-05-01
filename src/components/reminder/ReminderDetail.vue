<template>
  <span>
    <v-list-tile avatar @click v-if="!isNew">
      <v-list-tile-avatar>
        <v-icon :class="reminder.color">reminders</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-sub-title>{{ timeIdtoTime(reminder.start) }} - {{ timeIdtoTime(reminder.end) }}</v-list-tile-sub-title>
        <v-list-tile-title>{{ reminder.message}}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn icon ripple @click="$emit('reminder-delete',reminder.id )">
          <v-icon color="grey">delete</v-icon>
        </v-btn>
        <v-btn icon ripple @click="openForm">
          <v-icon color="grey">create</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>

    <v-btn dark fab color="pink" small v-if="isNew" @click="openForm">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="isNew">Create new reminder</span>
          <span class="headline" v-else>Edit reminder</span>
        </v-card-title>
        <v-card-text>
          <v-snackbar v-model="alert" color="error">
            Errors found!
            <v-btn dark flat @click="alert = false">Close</v-btn>
          </v-snackbar>

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Message"
                  v-model="reminderCopy.message"
                  data-vv-name="message"
                  data-vv-as="Message"
                  v-validate="'required|max:30'"
                  :error-messages="errors.collect('message')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select v-model="reminderCopy.color" :items="colorOptions" label="Color"></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  v-model="showDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedDate"
                      label="Date (Year-Month-Day format)"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="selectedDate" @input="showDate = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="timeOptions"
                  label="From"
                  v-model="reminderCopy.start"
                  ref="afterTarget"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="timeOptions"
                  label="To"
                  v-model="reminderCopy.end"
                  data-vv-name="endTime"
                  data-vv-as="Ending Time"
                  v-validate="'isBigger:afterTarget'"
                  :error-messages="errors.collect('endTime')"
                  ref="beforeTarget"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 class="grey lighten-5">
                <v-sheet :color="reminderCopy.color" class="mt-1 mb-1 float-left"></v-sheet>
                <v-sheet class="mt-1 mb-1 float-right">
                  <p>{{timeIdtoTime(reminderCopy.start)}} - {{timeIdtoTime(reminderCopy.end)}}</p>
                  <div>{{reminderCopy.message}}</div>
                </v-sheet>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="clearFormAndErrors">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveReminder">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
/***
 * by Sergio Rivera
 *
 * Desc:
 * I am going to use the same component to MODIFY a reminder or to create a NEW REMINDER
 * by passing a boolean isNew
 */
import { mapGetters, mapMutations } from "vuex";
import { constants } from "fs";
import { setTimeout } from "timers";
export default {
  name: "ReminderDetail",
  props: ["reminder", "isNew"],
  data: function() {
    return {
      dialog: false,
      reminderCopy: {},
      alert: false,
      selectedDate: "",
      showDate: false
    };
  },
  mounted() {
    //We must work on a copy If the user decides to cancel the edition
    this.reminderCopy = Object.assign({}, this.reminder);

    if (this.isNew) {
      this.selectedDate = this.idToTime(this.$route.params.id).format(
        "YYYY-MM-DD"
      );
    } else {
      this.selectedDate = this.idToTime(this.reminderCopy.dayId).format(
        "YYYY-MM-DD"
      );
    }
  },
  methods: {
    ...mapMutations("reminders", ["SAVE", "NEW"]),
    generateNewId(arrCurrentTime) {
      let idDate = this.dateToid(this.selectedDate);
      return parseInt(`${idDate}${arrCurrentTime.join("")}`);
    },
    openForm() {
      /**
       * We must set the initial values if its a new Reminder
       */
      this.selectedDate = this.idToTime(this.$route.params.id).format(
        "YYYY-MM-DD"
      );

      if (this.isNew) {
        let arrCurrentTime = this.currentTime().split(":");
        let currentTime =
          arrCurrentTime[0].padStart(2, "0") +
          (arrCurrentTime[1] >= 30 ? "30" : "00");
        this.reminderCopy = {
          dayId: this.$route.params.id,
          id: this.generateNewId(arrCurrentTime),
          message: "",
          color: "primary",
          start: currentTime,
          end: currentTime
        };
      } else {
        this.reminderCopy = Object.assign({}, this.reminder);
      }

      this.dialog = true;
    },
    async saveReminder() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          // do stuff if not valid.
          this.alert = true;
        } else {
          this.reminderCopy.dayId = this.dateToid(this.selectedDate);

          if (this.isNew) {
            //We must update the new ID before saving, this will help eliminate duplicates
            let arrCurrentTime = this.currentTime().split(":");
            this.reminderCopy.id = this.generateNewId(arrCurrentTime);
            this.NEW(this.reminderCopy);
          } else {
            this.SAVE(this.reminderCopy);
            this.reminder.color = this.reminderCopy.color;
            this.reminder.message = this.reminderCopy.message;
            this.reminder.start = this.reminderCopy.start;
            this.reminder.end = this.reminderCopy.end;
            this.reminder.dayId = this.reminderCopy.dayId;
          }

          this.clearFormAndErrors();
        }
      });
    },
    clearForm() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    clearErrors() {
      this.$validator.reset();
    },
    clearFormAndErrors() {
      this.clearForm();
      this.clearErrors();
      this.dialog = false;
    }
  }
};
</script>

<style lang="less" >
.float-left {
  float: left;
  min-width: 20px;
  height: 70px;
}
.float-right {
  float: right;
  min-width: calc(100% - 30px);
  height: 70px;
  text-align: left;

  > p {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
  }
  > div {
    font-size: 16px;
  }
}
</style>
