<template>
  <v-card color="success" class="add-blog">
      <blog-header />
      <h2>Add Blog </h2>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy"  v-if="!submitted"> 
           <v-text-field
            v-model="blog.title"
            label="Blog Title"
            required        
           ></v-text-field>
            <v-textarea
            v-model="blog.content"
            color="purple"
            light
            solo
            label="Blog Content"
            required        
           ></v-textarea>
         

          <div class="checkboxes">
              <v-row justify="space-around">
                  <v-checkbox v-model="blog.categories" label="Vue"  value="Vue" class="mx-2"></v-checkbox>
                  <v-checkbox v-model="blog.categories" label="Node" value="Node"  class="mx-2"></v-checkbox>
                  <v-checkbox v-model="blog.categories" label="React" value="React"  class="mx-2"></v-checkbox>
                  <v-checkbox v-model="blog.categories" label="Angular"  value="Angular" class="mx-2"></v-checkbox>
              </v-row>
                <v-row align="center">
                    <v-select
                    :items="authors" 
                    v-model="blog.author"
                    dense
                    solo
                    label="Author"
                    class="px-10">
                    </v-select>
                </v-row>           
              <v-btn @click.prevent="post"  color="primary" small :disabled=!blog.title >Post Blog</v-btn>
          </div>
      </v-form>
    
      <div v-if="submitted"><h3>
        {{ message }}
        </h3></div>
        <hr style="height: 10px; background-color: #ccc; border: 1px solid red; width: 80%; display: inline-flex; ">
      <div class="preview">
          <h3>Blog overview</h3>
          <p> Blog title:   {{ blog.title}}  </p>
          <p>blog content</p>
          <p> {{ blog.content }} </p>
          <ul>
              <li v-for="(cat,i) in blog.categories" :key="i">
                  {{ cat }}
              </li>
          </ul>
          <p>Author: {{ blog.author }}</p>
      </div>
  </v-card>
</template>

<script>
import BlogHeader from './BlogHeader.vue';
import axios from 'axios';
export default {
  components: { BlogHeader },
    name: 'add-blog',
    data() {
        return {
            blog:{
                title:"",
                content: "",
                categories: []
            },
            message: '', 
            authors: ["Tom", "Jerry", "Bob"],
            submitted: false,
            lazy: false,
            valid: false
        }
    },
    methods: {
        post: function() {

            // const data = {
            //     title: this.blog.title,
            //     body: this.blog.content,
            //     userId: 1
            // };            
            
            // use $http from Vue-Resource 
            // this.$http.post("https://vuedata-89f16-default-rtdb.firebaseio.com/posts.json", this.blog)
            // .then(function(res){
            //     console.log(res);
            //     this.submitted = true;   
            //     setTimeout(() => {
            //        this.$router.push('/showblogs')
            //     }, 3000);              
            // });

            // use axios
           axios.post("https://vuedata-89f16-default-rtdb.firebaseio.com/posts.json", this.blog)
           .then(() => {
                // console.log('post success!' + response);
                this.message = 'Your blog successfully postted! waiting for auto redirect...'
                this.submitted = true; 
                 setTimeout(() => {
                    this.$router.push('/blog/showblogs')
                    }, 3000); 
            }).catch(error => {
                console.log('post failed' + error);
            });

            //use fetch: 
            // fetch('https://jsonplaceholder.typicode.com/posts', {
            //     method: 'POST',
            //     data
            // }).then(function(response) {
            //     console.log('success===', response.json());
            // }).then(function(result) {
            //     console.log( "result...",result)
            // })
        }
    }
}
</script>

<style>

</style>