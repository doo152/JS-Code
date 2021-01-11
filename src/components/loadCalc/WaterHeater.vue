<template>
  <v-card class="beige lighten-2 mx-auto" color="blue lighten-4" hover min-height="266px">
    <v-row class="mx10">
      <v-card-title class="mx-auto"
        >4: Electric Water Heater Loads
      </v-card-title>
      <v-card-subtitle class="text--secondary">
        Note: Only those electric
        <span class="text-decoration-underline">tankless</span> water heaters or
        electric water heaters for
        <span class="text-decoration-underline"
          >steamers, swimming pools, hot tubs, or spas</span
        >
        should apply
      </v-card-subtitle>
      <v-container>
        <v-checkbox
          label="Water heater accoding to above definition"
          v-model="hasWaterHeater"
          @change="waterHeaterCalc"
        >
        </v-checkbox>

        <v-row v-if="hasWaterHeater">
          <v-col cols="9" offset="2">
            <v-text-field
              outlined
              v-model.trim="waterHtr"
              class="text-darken-3 mt-3 text-right"
              :rules="rules"
              ml="5"
              type="number"
              clearable
              hide-details="auto"
              hint="Please input numbers only"
              placeholder="0"
              @blur="waterHeaterCalc"
              @keyup.enter="waterHeaterCalc"
            >
              <template v-slot:label>
                <b>Electric Water Heater Loads(KW):</b>
              </template>
            </v-text-field></v-col
          >
          <v-col cols="1"> </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row v-if="hasWaterHeater">
      <v-col cols="9">
        <v-card-text readonly class="ml10">
          Total Loads for Electric Water Heater &#187;
        </v-card-text>
      </v-col>
      <v-col cols="3">
        <v-card-text filled> {{ totalWaterHeater }} W </v-card-text>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
export default {
  name: "WaterHeater",
  data: function () {
    return {
      hasWaterHeater: false,
      hasMoreWaterHeater: false,
      waterHtr: undefined,
      totalWaterHeater: 0,
      rules: [
        (value) => (value && RegExp("^[0-9]+.*$").test(value)) || "Positive number only",
      ],
    };
  },
  props: ['clear_data'],
  watch: {
      clear_data(newval, oldval) {
      // console.log('cleardata is newval', newval, oldval);
     if(newval !== oldval){
        this.hasWaterHeater = false,
        this.waterHtr = undefined
     }
    },
    totalWaterHeater(newval, oldval) {
      if (newval != oldval) this.$emit("get-value", newval, oldval);
    },
  },

  methods: {
    waterHeaterCalc() {
      if (!this.hasWaterHeater || isNaN(Number(this.waterHtr)) || Number(this.waterHtr)<0 ) {
        this.totalWaterHeater = 0;
        this.waterHtr = undefined;
      } else this.totalWaterHeater = 1000 * Number(this.waterHtr);
    },
  },
};
</script>
<style scoped>
/* 
#radio .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0 0px;
}   */
/* 
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 12px 12px 12px 12px;
}

.container {
    padding: 2px 2px 2px 12px;
}

.v-messages {
    min-height: 5px;
}

.v-text-field input {
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 5px 8px 5px;
} */
</style>
