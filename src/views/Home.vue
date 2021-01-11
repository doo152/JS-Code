<template>
  <v-card max-width="400" class="mx-auto" outlined>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">CEC-2018 Tables</v-card-title>

            <v-card-subtitle>The collection of tables from CEC2018 code book Part II</v-card-subtitle>

            <v-card-actions>
              <v-btn text to="/tables/table2">Enter</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="item.title"></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    v-if="item.artist === 'Ken Zhan'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>

                  <v-btn v-else class="ml-2 mt-5" outlined rounded small :to="item.src">Check it out</v-btn>
                </v-card-actions>
              </div>

              <!-- <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar> -->
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
    data() {
        return {
            items:[
                {
                    title: "Load Calculator",
                    color: "#cccc33",
                    artist: "Ken Zhang",
                    src: "/calcs"
                },
                   {
                    title: "Blogs",
                    color: "#952175",
                    artist: "Ken Zhang",
                    src: "/blog/showblogs"
                },
                   {
                    title: "Todo List",
                    color: "#1F7087",
                    artist: "Ken Zhang",
                    src: "/todo"
                },
            ]
                
            
        }
    }
};
</script>

<style>
</style>