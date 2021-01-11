<template>
  <div class="singleblog">
       <blog-header />
      <h3> {{ blog.title }} </h3>  
      <p>Author: {{ blog.author }} </p>
      <p>Categories:    
      <ul>
          <li v-for="(cat, i) in blog.categories" :key="i">
            {{ cat}}
          </li>
      </ul> 
      </p>  
      <hr style="margin: 20px;">
      <article class="article"> {{ blog.content }} </article>
        <button @click="delSingleBlog" class="primary btn"> Delete </button>
        <router-link :to="'/blog/editBlog/'+id">
        <button class="success btn"> Edit </button>
        </router-link>
 

  </div>
</template>

<script>
import axios from 'axios';
import BlogHeader from './BlogHeader';

export default {
    components: { BlogHeader },
    name: 'single-blog',
    data() {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created() {
        // use Vue-Resource
        // this.$http.get('https://vuedata-89f16-default-rtdb.firebaseio.com/posts/' + this.id + '.json')
        // .then(function(data) {
                // console.log('single: ',data);
                // this.blog = data.body;
                // console.log('blog: ',this.blog);
            // })
        this.getSingleBlog();
    },
    methods: {
       
        delSingleBlog () {
         // use Vue-Resource    
            // this.$http.delete('https://vuedata-89f16-default-rtdb.firebaseio.com/posts/' + this.id + '.json')
            // .then(() => {
            //     this.$router.push({path: '/showblogs'});
            //     // console.log(response);
            // })
        
        // use axios
            axios.delete('/posts/' + this.id + '.json')
            .then(() => {  
                this.$router.push({path: '/blog/showblogs'});
            })
        },

        getSingleBlog() {
            //use axios to request single blog data
            axios.get('/posts/' + this.id + '.json')
            .then((res) => {
                return res.data;
            })
            .then(data => {
                this.blog = data;
            }).catch(error => {
                console.log(error);
                alert("error: ", error);
            })
        }
    }
}
</script>

<style scoped>
.singleblog {
    max-width: 960px;
    margin: 5px 15px;
    padding: 15px 30px;
    background:#eee;
    border: 1px dotted #333;
}

.article {
    border: 1px dotted black;
}

.btn {
    padding: 5px;
    margin: 10px;
    width: 100px;
    color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 3px black;
}

ul {
    list-style-type: none;
    display: inline;
    margin: 0;
    padding: 0;
}
ul li {
    display: inline;
    margin: 0;
}
p {
    display: inline-block;
    margin: 0 20px;
}
</style>