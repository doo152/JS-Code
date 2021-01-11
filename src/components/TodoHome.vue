<template>
  <div class="home">
    <todo></todo>
  </div>
</template>

<script>
import todo from "../components/Todo/Todo"
export default {
  name: 'home',
  components:{ todo }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
