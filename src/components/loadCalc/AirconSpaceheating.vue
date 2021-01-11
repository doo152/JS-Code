<template>
  <v-card class="beige lighten-2" color="warning" hover min-height="266px" >
    <v-row class="mx10">
      <v-card-title class="mx-auto">2: Heating/AirCon Loads</v-card-title>
      <v-container>
        <v-checkbox label="Space Heating" v-model="hasspHeater"></v-checkbox>
        <v-checkbox label="Air Conditioner?" v-model="hasacLoads"></v-checkbox>
                <v-checkbox
          label="A/C and Space heating use simoutanesly?"
          v-model="hasAcSph"
          v-if="hasacLoads && hasspHeater"
        ></v-checkbox>

        <v-checkbox
          label="Any other heating facilities"
          v-model="hasOtherHeater"
          messages="electric thermal storage heating system,duct heater, or an electric furnace"
        ></v-checkbox>
        
        <v-row v-if="hasspHeater">
          <v-col cols="9" offset="2">
            <v-text-field
              outlined
              v-model.trim="spHeater"
              class="text-darken-3 mt-3 text-right"
              :rules="rules"
              ml="5"
              type="number"
              clearable
              hide-details="auto"
              hint="Please input numbers only"
              placeholder="0"
            >
              <template v-slot:label>
                <b>Space Heater Loads(KW):</b>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row v-if="hasacLoads">
          <v-col cols="9" offset="2">
            <v-text-field
              outlined
              v-model.trim="aircon"
              class="text-darken-3 mt-3 text-right"
              :rules="rules"
              ml="5"
              type="number"
              clearable
              hide-details="auto"
              hint="Please input numbers only"
              placeholder="0"
              @blur="acLoads()"
              @keyup.enter="acLoads()"
            >
              
              <template v-slot:label>
                <b>Air Conditioner Loads(KW):</b>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>

        <v-row v-if="hasOtherHeater">
          <v-col cols="9" offset="2">
            <v-text-field
              outlined
              v-model.trim="otherHeater"
              class="text-darken-3 mt-3 text-right"
              :rules="rules"
              ml="5"
              type="number"
              clearable
              hide-details="auto"
              hint="Please input numbers only"
              placeholder="0"
            >
              >
              <template v-slot:label>
                <b>Other heating facilities(KW):</b>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row v-if="hasacLoads||hasspHeater||hasOtherHeater">
      <v-col cols="8">
        <v-card-text readonly class="ml10 text-right">Total Loads(A/C | Heaters) &#187;</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-text filled>{{ heatingAcTotal }} W</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: "ACSpaceHeating",
  data: function () {
    return {
      aircon: undefined,
      spHeater: undefined,
      hasOtherHeater: false,
      otherHeater: undefined,
      hasspHeater: false,
      hasacLoads: false,
      hasAcSph: false,

      rules: [
        (value) =>
          (value && RegExp("^[0-9]+.*$").test(value)) || "Positive number only",
      ],
    };
  },
  props: ['clear_data'],
  computed: {
    // if Air conditioner and space heating work at the same time
    acSphTotal: function () {
      return this.hasAcSph
        ? this.acLoads() + this.totalSpHeating()
        : Math.max(this.acLoads(), this.totalSpHeating());
    },

    //if has other heating facilities
    heatingAcTotal: function () {
      if (typeof this.otherHeater == "undefined") {
        return 1000 * this.acSphTotal;
      }
      return (
        1000 *
        (this.acSphTotal +
          (Number(this.otherHeater) < 0 ? 0 : Number(this.otherHeater)))
      );
    },
  },

  watch: {
      clear_data(newval, oldval) {
      console.log('cleardata is newval', newval, oldval);
     if(newval !== oldval){
      this.aircon = undefined,
      this.spHeater = undefined,
      this.hasOtherHeater = false,
      this.otherHeater = undefined,
      this.hasspHeater = false,
      this.hasacLoads = false,
      this.hasAcSph = false
     }
    },
    hasacLoads(oldval, newval) {
      if (newval) this.aircon = undefined;
    },
    hasspHeater(oldval, newval) {
      if (newval) this.spHeater = undefined;
    },
    hasOtherHeater(oldval, newval) {
      if (newval) this.otherHeater = undefined;
    },
    heatingAcTotal(newval, oldval) {
      if (newval != oldval) this.$emit("get-value", newval, oldval);
    },
  },

  methods: {
    // check if aircon load value is negetive
    acLoads() {
      if (this.aircon < 0) {
        this.aircon = undefined;
      }
      return typeof this.aircon == "undefined" ? 0 : Number(this.aircon);
    },

    // Space heating value according to section 62
    totalSpHeating() {
      if (this.spHeater < 0) {
        this.spHeater = undefined;
      }
      if (typeof this.spHeater == "undefined") {
        return 0;
      }
      return Number(this.spHeater) <= 10
        ? Number(this.spHeater)
        : 10 + (Number(this.spHeater) - 10) * (0.75).toFixed(2);
    },
  },
};
</script>
<style scoped>
  /* .flexcard {
  display: flex;
  flex-direction: column;
}


#radio .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0 0px;
}  

.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 12px 2px 12px 12px;
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
