<template>
  <v-card class="card">
    <router-view></router-view>
    <v-list class="bottom-nav">

      <v-list-item v-for="item in items" :key="item.title" link :to="item.src"> 
        <!-- <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon> -->

        <v-list-item-content to="item.src">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      <!-- <template v-slot:append> -->
        <div class="pa-2">
          <v-btn block to='/'>Back to Home</v-btn>
        </div>
      <!-- </template> -->
  </v-card>
</template>

<script>
export default {
  name: "Tables",

  data: () => ({
    items: [
      { title: "Table2", icon: "mdi-view-dashboard", src: "/tables/table2" },
      { title: "Table4", icon: "mdi-view-dashboard", src: "/tables/table4" },
      { title: "table39", icon: "mdi-view-dashboard", src: "/tables/table39" },
      { title: "table41", icon: "mdi-view-dashboard", src: "/tables/notready" },
    ],
  }),
};
</script>
<style scoped>
 .card {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  
}

.bottom-nav {
width: 100%;
display: inline-flex;
align-items:center;
justify-items: center;
background: #eee;



} 
</style>
