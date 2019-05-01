<template>
  <v-container>
    <h1>About page: Vuejs calendar test</h1>
    <h2>
      By Sergio Rivera
      <a href="mailto:sergi.erm@gmail.com" target="_blank">sergi.erm@gmail.com</a>
    </h2>
    <p>I am adding some screenshots for the App so you can see what I have done for the test:</p>
    <p>
      I did use Vuetify to style my layout and design:
      <a
        href="https://vuetifyjs.com/"
        target="_blank"
      >https://vuetifyjs.com/</a>
    </p>
    <v-card class="mx-auto elevation-2 image mb-3" v-for="(item, index) in images" :key="index">
      <v-img :aspect-ratio="16/9" :src="item.img"></v-img>
      <v-card-title>
        <div>
          <span class="headline">{{item.title}}</span>
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template> 
<script>
export default {
  data: function() {
    return {
      images: [
        { img: "img/calendar01.png", title: "Current date (default view)" },
        { img: "img/calendar02.png", title: "Changing month" },
        { img: "img/calendar03new.png", title: "Creating a new Reminder" },
        {
          img: "img/calendar04modify.png",
          title: "Same Form but to modify the Reminder"
        },
        {
          img: "img/calendar05confirm.png",
          title: "Confirm before deleting a Reminder"
        }
      ]
    };
  }
};
</script>

<style>
.image {
  max-width: 600px;
}
</style>
