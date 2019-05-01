import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";

Vue.use(VeeValidate);

/*** Will use custom validators to check the Start Time and End Time */
Validator.extend(
  "isLess",
  (value, [otherValue]) => {
    return value < otherValue;
  },
  {
    hasTarget: true
  }
);

Validator.extend(
  "isBigger",
  (value, [otherValue]) => {
    return value > otherValue;
  },
  {
    hasTarget: true
  }
);
