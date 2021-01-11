<template>
  <ul class="todo-list">
    <todo-item v-for="(task,i) of tasks" :key="i" :i="i" @del="del">
      <template slot="task">{{task}}</template>
    </todo-item>
  </ul>
  
</template>
<script>
import todoItem from "./TodoItem"
export default {
  data(){
    return {
      tasks:['eat','sleep','play game']
    }
  },
  props: ['trans'],

  methods:{
    add(task){
      // console.log("trans: ", task);
      this.tasks.push(task);
    },
    del(i){
      this.tasks.splice(i,1);
    }
  },
  watch: {
    trans(newval) {
      this.add(newval);
      // console.log("todolist trans watch: ", newval, oldval);
    }
  },

  components:{
    todoItem
  }
}
</script>
<style scoped>
 .todo-list {
    list-style-type: none;
    display:contents;
 }
</style>
