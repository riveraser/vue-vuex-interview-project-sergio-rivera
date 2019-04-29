import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixins from "./mixin";

require("./plugins");

Vue.config.productionTip = false;

Vue.mixin(mixins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
