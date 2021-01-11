<template>
  <div class="show-blogs" v-theme:changebg="'narrow'">
      <blog-header />
    <h1>Most Recent 10 Blogs</h1>
    <input type="text" v-model="search" placeholder="Search" class="search"/>
    <div class="single-blog" v-for="(blog,i) in filteredBlogs" :key="i">
      <article>
        <router-link :to="'blog/'+blog.id">
            <h3 v-rainbow>{{ blog.title | toUpper }}</h3>
        </router-link>
      </article>
      <p>{{blog.content | snippet }}</p>
    </div>
  </div>
</template>

<script>
import BlogHeader from "./BlogHeader.vue";
import axios from 'axios';

export default {
  components: { BlogHeader },  
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: "",
    };
  },
  created() {
    // Solution 1: use vue-resource to request data from server
    // this.$http
    //   .get("https://vuedata-89f16-default-rtdb.firebaseio.com/posts.json")
    //   .then(function (data) {
    //     // console.log('firebase',data.json());
    //     return data.json();
    //   }).then(function(data){
    //      var blogsArray = [];
    //       for (let key in data) {
    //         //   console.log("key: ",key);
    //         //   console.log(data[key]);
    //         data[key].id = key;
    //         blogsArray.push(data[key]);
    //       }
    //     //   console.log(blogsArray);
    //       this.blogs = blogsArray;
    //   });

    // Solution 2: use axios to request data
    axios.get('/posts.json').then(response=>{
        return response.data;
    })
    .then(
      (data) => {
        console.log('success', data);
              var blogsArray = [];
          for (let key in data) {
            data[key].id = key;
            blogsArray.push(data[key]);
          }
          this.blogs = blogsArray;
      })    
    .catch(error=>{
        console.log('failed: ' + error);
    });
  },

  computed: {
    // search engine
    filteredBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      });
    },
  },

  // user-defined filters and directives practice
  filters: {
    toUpper: function (value) {
      if (!value) return "";
      return value.toUpperCase();
    },

    snippet(value) {
      return value.slice(0, 50) + "...";
    },
  },

  // Vue.directive('theme',{
  //   bind: function(el,binding) {
  //     if(binding.value=='wide') {
  //       el.style.maxWidth='800px';
  //     }
  //     else if(binding.value=='narrow') {
  //       el.style.maxWidth = '560px';
  //     }
  //     if(binding.arg=="changebg") {
  //       el.style.background="#ccdd77";
  //       el.style.padding="20px";
  //     }
  //   }
  // });

  directives: {
    theme: {
      bind: function (el, binding) {
        if (binding.value == "wide") {
          el.style.maxWidth = "800px";
        } else if (binding.value == "narrow") {
          el.style.maxWidth = "560px";
        }
        if (binding.arg == "changebg") {
          el.style.background = "#ccd";
        }
      },
    },
  },
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
  display: flex-box;
}

#show-blogs a {
    text-decoration: none;
    color: #444;
}

.single-blog {
  padding: 20px;
  margin: 20px 20px;
  box-sizing: border-box;
  background: rgb(238, 238, 238);
  justify-self: center;
  align-items: center;
  text-align: left;
}

.search {
    border: 1px solid green;
    border-radius: 5px;
    margin: 10px 10px 20px 20px;
    padding: 8px;
    box-sizing:border-box;
}

</style>