<template>
<v-app>
  <div id="app">
    <v-main>
    <headmenu></headmenu>
    </v-main>
    <router-view></router-view>
  </div>
</v-app>
</template>
<script>
import headmenu from './views/HeadMenu'
export default {
  components: {
    headmenu
  }
}
</script>
<style 
Layoutlang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
