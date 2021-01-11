<template>
  <v-card>
    <v-container>
      <v-list-item class="todo-item">
        <v-row justify="space-around">
        <!-- style="text-align: justify;"> -->
          <v-col sm="6" lg="4" cols="8">
            {{i+1}} -
            <slot name="task"></slot>
          </v-col>
          <v-col sm="6" lg="4" cols="4">
            <v-btn @click="del" color="primary" depressed>x</v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: ["i", "task"],
  methods: {
    del() {
      if (confirm(`Are you sure to delete task #${this.i + 1}？`))
        this.$emit( "del", this.i);
    },
  },
};
</script>
<style scoped>
.todo-item:hover {
  background-color: lightBlue;
}
</style>


