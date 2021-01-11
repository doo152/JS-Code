<template>
  <v-card class="card">
    <router-view></router-view>

        <div class="pa-2">
          <v-btn block to='/'>Back to Home</v-btn>
        </div>
      <!-- </template> -->
  </v-card>
</template>

<script>
export default {
  name: "blogs",
};
</script>
<style scoped>
.card {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.bottom-nav {
  position: absolute;
  height: 100%;

  bottom:530 px;

}
</style>
