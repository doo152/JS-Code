<template>
<v-app>
  <div class="todo">
    <h1>Todo Tasks List</h1>
    <todo-add @add_task="addItem"></todo-add>
    <todo-list :trans="task">task</todo-list>
  </div></v-app>
</template>
<script>
import todoAdd from "./TodoAdd";
import todoList from "./TodoList";

export default {
  data() {
    return {
      task: ''
    }
  },
  components:{ todoAdd, todoList } ,
  methods: {
  addItem(task){
    this.task = task;
    // console.log("in Todo.vue, item added as: ", task);
  } 
  }
}
</script>
<style scoped>
.todo {
  width: 100%;
  height: 100%;

}
</style>
