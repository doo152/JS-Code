<template>
  <v-card class="beige lighten-2 mx-auto" color="cyan lighten-4" hover min-height="266px">
    <v-row class="mx10">
      <v-card-title class="mx-auto">6: Other Loads in excess of 1.5 Kw</v-card-title>

      <v-container>
        <v-row>
          <v-col cols="9" offset="2">
            <v-text-field
              outlined
              v-model.trim="otherLoads"
              class="text-darken-3 mt-3 text-right"
              :rules="rules"
              ml="5"
              type="number"
              clearable
              hide-details="auto"
              hint="Please input numbers only"
              placeholder="0Kw"
              @blur="updateLoads"
              @keyup.enter="updateLoads"
            >
              <template v-slot:label>
                <b>Any other loads in excess of 1.5 Kw:</b>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card-text readonly class="ml10 text-right">Revised Total Other Loads &#187;</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-text filled>{{ totalOtherLoads }} W</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "OtherLoads",
  props: ['hasaRange','clear_data' ],
  data: function () {
    return {
      // hasRange: this.hasaRange,
      otherLoads: undefined,
      totalOtherLoads: 0,
      rules: [
        (value) =>
          (value && RegExp("^[0-9]+.*$").test(value)) || "Positive number only",
      ],
    };
  },

  watch: {
      clear_data(newval, oldval) {
      // console.log('cleardata is newval', newval, oldval);
     if(newval !== oldval){
        this.otherLoads = undefined;

     }
    },
    totalOtherLoads(newval, oldval) {
      if (newval != oldval) this.$emit("get-value", isNaN(newval) ? 0 : newval, oldval);
    },
    hasaRange() {
      // console.log("status changed.");
      this.updateLoads();
    },
  },

  methods: {
    updateLoads() {
      //  console.log("other loads has range? ", this.hasaRange);
      if (this.otherLoads < 0) {
        this.otherLoads = undefined;
      }
      var temp = (this.otherLoads)==='undefined' ? 0 : 1000*Number(this.otherLoads);
      if (!this.hasaRange) {        
        this.totalOtherLoads =
          temp > 6000
            ? 6000 + (temp - 6000) * 0.25
            : temp;
      } else {
        this.totalOtherLoads = 0.25 * temp;
        //console.log("total: ", this.totalOtherLoads);
      }
    },
  },
};
</script>
