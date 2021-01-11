<template>
  <v-card color="success" class="add-blog">
      <blog-header />
      <h2>Edit Blog </h2>
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
              <v-btn @click.prevent="updateBlog"  color="primary" small :disabled=!blog.title >Update Blog</v-btn>
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
            message: '',
            id: this.$route.params.id,
            blog:{},            
            authors: ["Tom", "Jerry", "Bob"],
            submitted: false,
            lazy: false,
            valid: false
        }
    },
    created() {
        this.getBlog();
    },

    methods: {
        updateBlog() {
        //use Vue-Resource to request data
            // this.$http.put("https://vuedata-89f16-default-rtdb.firebaseio.com/posts/" + this.id + ".json", this.blog)
            // .then(function(){
            //     this.submitted = true;
            //     this.message = "Your blog successfully updated! Wait for redirect to show blogs...";
            //     setTimeout(() => {
            //        this.$router.push('/showblogs')
            //     }, 3000); 
            // })
        // use axios to update data
            axios.put('/posts/' + this.id + '.json', this.blog)
                .then(() => {
                    this.submitted = true;
                    this.message = "Your blog successfully updated! Wait for redirect to show blogs...";
                    setTimeout(() => {
                    this.$router.push('/blog/showblogs')
                    }, 3000); 
                })
        },

        getBlog: function() {

            // const data = {
            //     title: this.blog.title,
            //     body: this.blog.content,
            //     userId: 1
            // };            
            
            // use $http from Vue-Resource 
            // this.$http.get("https://vuedata-89f16-default-rtdb.firebaseio.com/posts/" + this.id + ".json")
            //     .then(function(data) {
                // console.log('Edit single: ',data);
                // this.blog = data.body;
                // console.log('blog body: ',this.blog);
            // })

            // use axios
            axios.get('/posts/' + this.id + ".json").then(response => {
                // console.log('get success!', response);
                return response.data 
            }).then((data) => {
                this.blog = data;
            }).catch(error => {
                console.log('post failed', error);
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