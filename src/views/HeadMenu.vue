<template>
  <v-app-bar color="deep-purple accent-4" dark>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        <v-toolbar-title v-bind="attrs" v-on="on">Canadian Electrical Tools</v-toolbar-title>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.src">
          <v-list-item-title >{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeadMenu",
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { name: "Blogs", src: "/blog/showblogs" },
      { name: "Load Caculator", src: "/calcs" },
      { name: "CSS Animation", src: "/cssanimation" },
      { name: "Home", src: "/home" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
</style>