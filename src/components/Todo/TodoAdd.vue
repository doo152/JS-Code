<template>
  <v-card>
    <v-container>
      <!-- <v-layout row> -->
        <v-row  sm6 lg4 xs12 >
          <v-text-field label="Add New Task:" clearable outlined v-model="task"></v-text-field>
        </v-row>
        <v-row  sm6 lg4 xs12 style="margin-bottom: 8px;">
          <v-btn @click="add" color="primary" style="margin: auto;">+</v-btn>
        </v-row>
      <!-- </v-layout> -->
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      task: "",
    };
  },
  methods: {
    add() {
      this.$emit("add_task", this.task);
      this.task = "";
    },
  },
};
</script>
<style scoped>
.outline {
  border: "1px solid black";
}
.todo-add {
  background: orange;
}
</style>
