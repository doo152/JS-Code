<template>

<v-container>
    <v-row>
      <v-card color="#33EECE" style="width: 100%; z-index=100;" class="ma-1">
        <v-card-title><div class="text-center">Electrical Load Calculator for</div></v-card-title>
        <v-card-subtitle class="text-h5">Residential Single Dwelling</v-card-subtitle>
      </v-card>
    </v-row>

    <v-row align="center" justify="space-around" dense>
      
      <v-col cols="12" sm="6" lg="4" class="mt-2 mb-1">
        <house-area @get-value="getAreavalue" :clear_data="cleardata"></house-area>
      </v-col>
     
      <v-col cols="12" sm="6" lg="4" class="ma-1">    
        <aircon-spaceheating :clear_data="cleardata" v-on:get-value="getAcHeater"></aircon-spaceheating>
        <v-spacer></v-spacer>
      </v-col>    
    
      <v-col cols="12" sm="6" lg="4" class="mt-4 mb-1"> 
        <elec-range  :clear_data="cleardata" @get-value="getRange"></elec-range>
      </v-col>

      <v-col cols="12" sm="6" lg="4" class="ma-1">
        <water-heater :clear_data="cleardata"  @get-value="getWaterHtr"></water-heater>
      </v-col>

      <v-col cols="12" sm="6" lg="4" class="ma-1">
        <ev-supply :clear_data="cleardata" @get-value="getEv"></ev-supply>
      </v-col>

      <v-col cols="12" sm="6" lg="4" class="ma-1">
        <other-loads :clear_data="cleardata" ref="changedcondition"  :hasaRange="this.hasRange" @get-value="getOther"
      ></other-loads>
      </v-col>

      <v-col   cols="12" sm="6" lg="4" class="mt-n1">
        <total-demand-amps @clearInput="clearAll"></total-demand-amps>
      </v-col>

    </v-row>
</v-container>

</template>
HomePage
<script>
import HouseArea from "@/components/loadCalc/HouseArea";
import AirconSpaceheating from "@/components/loadCalc/AirconSpaceheating";
import ElecRange from "@/components/loadCalc/ElecRange";
import WaterHeater from "@/components/loadCalc/WaterHeater";
import EvSupply from "@/components/loadCalc/EvSupply";
import OtherLoads from "@/components/loadCalc/OtherLoads";
import TotalDemandAmps from '@/components/loadCalc/TotalDemandAmps.vue';

import { mapActions } from 'vuex'

export default {
  name: "HouseDemand",
  data: function () {
    return {
      cleardata: '',
      houseArea: 0,
      areaLoad: 0,
      acHeater: 0,
      acSph: false,
      rangeWatt: 0,
      waterHtr: 0,
      evLoads: 0,
      otherLoads: 0,
      eFurnace: 0,
      evSupply: 0,
      totalLoads: 0,
      hasRange: false,
      // finalresult:0
    };

  },
  
  components: { 
    HouseArea, 
    AirconSpaceheating, 
    ElecRange, 
    WaterHeater, 
    EvSupply, 
    OtherLoads, 
    TotalDemandAmps 
  },
  
  computed: {

    finalresult: function() {
    var loads2 = (this.houseArea < 80) ? 14400 : 24000;
    // console.log("this.houseArea ",this.houseArea );

    var total = isNaN(this.totalLoads) ? 0 : this.totalLoads;
    var result = this.houseArea==0 ? 0 : Math.max(total, loads2);
    // console.log('final loads: ', result);
    return result;
    }
  },
  
  methods: {

    ...mapActions(['setDemands']),
    
    //receive values from sub component
    getEv(newvalue, oldvalue) {
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.evLoads = newvalue;
      // console.log("newEV: ", newvalue, "oldEv: ", oldvalue, " totalloads: ", this.totalLoads)
    },

    clearAll() {
      this.cleardata = new Date().getTime();
      // console.log('clear all received');
    },
     
    getWaterHtr(newvalue, oldvalue) {
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.waterHtr = newvalue;
      // console.log("newWaterHtr: ", newvalue, "old: ", oldvalue, " totalloads: ", this.totalLoads)
    },

    getAcHeater(newvalue, oldvalue) {
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.acHeater = newvalue;
      // console.log("new ACHeating: ", newvalue, "old: ", oldvalue, " totalloads: ", this.totalLoads)
    },

    //receive value from range section, check if a range is provided or not
    getRange(newvalue, oldvalue, rangemark) {
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.hasRange = rangemark;
      this.rangeWatt = newvalue;
      // console.log("newRange: ", newvalue, "main has range?", this.hasRange,  " rangemark: ", rangemark);
    },

    getAreavalue(newvalue, oldvalue, area) {
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.houseArea = area;
      this.areaLoad = newvalue;
      // console.log("new: ", newvalue, "main has area?", this.houseArea);
    },  

    getOther(newvalue, oldvalue) {
      if(isNaN(oldvalue)) oldvalue = 0;
      this.totalLoads -= oldvalue;
      this.totalLoads += newvalue;
      this.otherLoads = newvalue;
      // console.log("new OtherHtr: ", newvalue, "old: ", oldvalue, " totalloads: ", this.totalLoads)
    },

    // finalLoads: function() {
    // var loads2 = (this.houseArea < 80) ? 14400 : 24000;
    // this.totalLoads = this.totalLoads==='NaN' ? 0 : this.totalLoads;
    // this.finalresult = this.houseArea==0 ? 0 : Math.max(this.totalLoads, loads2);
    // console.log('final loads: ', this.finalresult);
    // return this.finalresult;
    // }
  },
  
  watch: {
    hasRange(newval, oldval) {
      this.$refs.changedcondition.updateLoads();
      console.log("new: ", newval,  " old: ", oldval)
    },

    finalresult(newval, oldval){
      // console.log('total loads====',newval-oldval);
      this.$store.commit('setDemands',(newval-oldval));
    }

  }  
}

</script>
<style>
  div .text-center {
    display:flex;
    justify-content: center;
    vertical-align: middle;
  }

.v-messages__message {
  padding: 0 15px;
}
</style>