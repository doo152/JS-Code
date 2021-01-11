<template>
<nav>
  <ul>
      <li><router-link to="/blog/addblog" exact>Post Blog</router-link></li>
      <li><router-link to="/blog/showblogs" exact> Show Blogs</router-link></li>
  </ul>
</nav>
</template>

<script>
export default {
    name: 'BlogHeader'
}
</script>

<style scoped>
ul {
    margin: 0;
    list-style-type: none;
    text-align: center;
}

ul li {
    display: inline-block;
    margin: 0 20px;
}

a {
    text-decoration: none;
    color: #fff;
    padding: 12px;
    border-radius: 5px;;
}
nav {
    background: crimson;
    padding: 30px 0;
    margin-bottom: 40px;
}

.router-link-active {
    background: rgba(255,255,255, 0.8);
    color: #444;
}
</style>