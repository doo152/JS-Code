<template>
  <v-card class="mx-auto" color="red lighten-3" hover outlined min-height="266px">
    <v-row class="mx10">
      <v-card-title class="mx-auto">1: House Area Power Demand</v-card-title>
      <v-container>
        <v-radio-group v-model="picked" text-right row dense label="Please select unit of area">
          <v-radio value="m">
            <template v-slot:label>
              m
              <sup>2</sup>
            </template>
          </v-radio>
          <v-radio value="ft">
            <template v-slot:label>
              ft
              <sup>2</sup>
            </template>
          </v-radio>
        </v-radio-group>
        <v-checkbox label="Have a basement?" v-model="hasbasement"></v-checkbox>
      </v-container>
    </v-row>

    <v-row v-if="hasbasement">
      <v-col cols="9" offset="2">
        <v-text-field
          outlined
          :value="basearea" @change="v => basearea = v"
          class="text-darken-3 mt-3 text-right"
          :rules="rules"
          ml="5"
          type="number"
          clearable
          hide-details="auto"
          hint="Please input positive numbers only"
          placeholder="0"
          ref="input-bsmt"
          @blur="getArea"
          @keyup.enter="getArea"
        >
          <template v-slot:label>
            <b>Please input basement area</b>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row v-if="hasbasement">
      <v-col cols="8">
        <v-card-text readonly class="ml10 text-right">Revised Basement Area &#187;</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-text filled>
          {{ revisedBsmtArea }} m
          <sup>2</sup>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="9" offset="2">
        <v-text-field
          outlined
          :value="combined" @change="v => combined = v"
          class="text-darken-3 mt-3 text-right"
          :rules="rules"
          ml="5"
          type="number"
          clearable
          hide-details="auto"
          hint="Please input numbers only"
          placeholder="0"
          ref="input-floor"
          @blur="combinedArea"
          @keyup.enter="combinedArea"
        >
          
          <template v-slot:label>
            <b>Above Ground Floor Areas:</b>
            <!-- v-model.trim="combined" -->
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row>
      <v-col cols="9">
        <v-card-text readonly >Calculated Total Floor Area &#187;</v-card-text>
      </v-col>
      <v-col cols="3">
        <v-card-text>
          {{ totalFloorArea }} m
          <sup>2</sup>
        </v-card-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="9">
        <v-card-text readonly class="ml10">Watts Assigned To Total Area &#187;</v-card-text>
      </v-col>
      <v-col cols="3">
        <v-card-text filled>{{ areaLoads }} W </v-card-text>
      </v-col>
    </v-row>
    </v-card>
</template>

<script>
// import BaseArea from "@/components/BaseArea.vue";
// import { mapMutations, mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  name: "HouseArea",
  data: function () {
    return {
      picked: "m",
      hasbasement: false,
      rules: [
        (value) => (value && RegExp("^[0-9]+.*$").test(value)) || "Positive number only",
      ],
      basearea: undefined,
      combined: undefined,
    };
  },
  // components: { BaseArea },
  props: ['clear_data'],
  computed: {
    refdata: function() {
      // console.log("clear====", this.clear_data);
      return this.clear_data;
    },
    
    // calculate basement area, revisedBsmtArea is in m2
    revisedBsmtArea: function () {
      var temparea;
      if(typeof this.basearea=='undefined'){
        temparea = 0;
      }
      else {
        temparea = this.basearea; //getArea();
      }
      return this.picked === "m" && this.hasbasement
        ? temparea * 0.75
        : Math.round(0.75 * temparea * 0.0929 * 100) / 100;
    },

    // revisedCombinedAboveGroundArea is the combined area of above floor area in M2
    revisedCombinedAboveGroundArea: function () {
      return this.picked === "m"
        ? this.combinedArea()
        : Math.round(this.combinedArea() * 0.0929 * 100) / 100;
    },

    totalFloorArea: function () {
      return this.hasbasement
        ? Math.round(Number(this.revisedCombinedAboveGroundArea)) +
            (Number(this.revisedBsmtArea) * 100) / 100
        : Math.round(this.revisedCombinedAboveGroundArea * 100) / 100;
    },

    areaLoads: function () {
      if (this.totalFloorArea == 0) return 0;
      else
        return parseInt(this.totalFloorArea / 90) < 1
          ? 5000
          : 5000 + 1000 * parseInt(this.totalFloorArea / 90);
    },
  },

  watch: {
    clear_data(newval, oldval) {
      // console.log('cleardata is newval', newval, oldval);
     if(newval !== oldval){
        this.basearea = undefined;
        this.combined = undefined;
        this.hasbasement = false
     }
    },
    hasbasement(oldval, newval) {
      if (newval) this.basearea = 0;
    },
    // update total watts readings in the vuex store
    areaLoads(newval, oldval) {
      if (newval != oldval) {
        this.$emit("get-value", newval, oldval, this.totalFloorArea);
        // console.log("house area newval-oldval",newval-oldval);
        // this.$store.commit('setDemands',(newval-oldval));
        // console.log("store value updated: ", this.$store.state.houseDemands);
        // console.log("show refs in housearea: ", this.$refs)
      }
    },
  },

  methods: {
    //  ...mapActions(['setDemands']),
    
    // above ground floor area
    combinedArea() {
      if (this.combined < 0) {
        this.combined = 0;
      }
      return isNaN(this.combined) ? 0 : this.combined;
    },

    //receive basement area from BaseArea component
    getArea() {
      this.basearea =
        !!this.basearea && !isNaN(this.basearea) ? this.basearea : 0;
      if (this.basearea < 0) this.basearea = 0;
      return this.basearea;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.v-text-field label {
  font-size: 1em;
}


#radio .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0 0px;
}  

.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0 12px 0 10px;
}

.container {
    padding: 2px 2px 2px 12px;
}

.v-messages {
    min-height: 0;
}

.v-text-field input {
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 5px 8px 5px;
} */
</style>