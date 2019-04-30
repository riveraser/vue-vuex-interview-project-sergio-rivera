<template>
  <nav>
    <v-toolbar app flat dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>MyVUE</span>
        <span class="font-weight-light">&nbsp; CALENDAR</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat color="gray">
        <span>Sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <!--v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn-->
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" class="indigo">
      <v-list dark>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  name: "Navigation",
  data: () => ({
    drawer: false,
    links: [
      { icon: "dashboard", text: "Home", route: "/home" },
      { icon: "question_answer", text: "About", route: "/about" }
    ]
  })
};
</script>

<style>
.logo {
  max-width: 160px;
}
</style>