<template>
  <v-card class="lighten-2 mt-3 mx-auto" color="green lighten-4" hover>
    <v-row class="mx10">
      <div class="col-md-8 col-8 text-right">
        <strong>Total Demand Watts &#187;</strong>
      </div>
      <div class="mt-3 text-right text-warning">{{ totalDemandWatts }} W</div>
    </v-row>

    <v-row class="mx10">
      <div class="col-md-8 col-8 text-right">
        <strong>Total Demand Amps &#187;</strong>
      </div>
      <div class="mt-3 text-right text-warning" id="ampResults">{{ totalDemandWatts==0 ? '' : totalDemandAmps + ' A'}} </div>
    </v-row>

    <div v-if="($store.state.houseDemands/240) <= 200">
      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong>Minimum Service Amps:</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="sampReq" class="text-primary">{{ totalDemandWatts==0 ? '' : totalDemandAmps + ' A' }} </div>
        </div>
      </v-row>

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong class="text-light">
            Hot Conductor Size</strong>
            
          
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="hotReq" class="text-warning">
            Cu: {{ conductorSize('table2',temp) }}
            <br />
            Al: {{ conductorSize('table4',temp) }}
          </div>
        </div>
        <div id="radio" class="col-md-12 col-12 text-left flex-center">
              <v-radio-group v-model="temp" row dense>
                <v-radio label="60" value="60c" ></v-radio>
                <v-radio label="75" value="75c" ></v-radio>
                <v-radio label="90°C" value="90c"></v-radio>
              </v-radio-group>
              </div>
      </v-row>

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong>Meter Base Rating:</strong>
        </div>
        <div class="col-md-4 col-4 text-left text-primary">
          <div id="metReq" class="text-primary">{{ totalDemandWatts==0 ? '' : meterBase }}&nbsp;</div>
        </div>
      </v-row>

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong class="text-light">Main Fuse / Breaker:</strong>
        </div>
        <div class="col-md-4 col-4 text-left text-warning">
          <div id="ocdReq" class="text-warning">{{ totalDemandWatts==0 ? '' : ocProtection + ' A' }} &nbsp;</div>
        </div>
      </v-row>

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
              <v-tooltip top color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-home
        </v-icon>
      </template>
      <span> {{ groundingSize.hint }} </span>
    </v-tooltip>
          <strong>Service Grounding Conductor:</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="sgcReq" class="text-primary "> {{ totalDemandWatts==0 ? '' : 'Cu: ' + groundingSize.size.copper  }}</div>
          <div class="text-primary">  {{ totalDemandWatts==0 ? '' : 'Al: ' + groundingSize.size.al }} </div>
        </div>
      </v-row>

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong class="text-light">Service Bonding Jumper:</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="sgcReq" class="text-primary "> {{ totalDemandWatts==0 ? '' : 'Cu: AWG #' + bondingSize.copper }}</div>
          <div class="text-primary">  {{ totalDemandWatts==0 ? '' : 'Al: AWG #' + bondingSize.al }} </div>
        </div>
      </v-row>
<!-- for future use
      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right">
          <strong>Service Conduit Size (threaded, rigid metal):</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="conReq" class="text-primary">&nbsp;</div>
        </div>
      </v-row> -->

      <v-row class="mx10">
        <div class="col-md-8 col-8 text-right text-light">
          <strong>Service Panel Size (minimum):</strong>
        </div>
        <div class="col-md-4 col-4 text-left">
          <div id="panReq" class="text-warning"> {{ branchCircuits }} </div>
        </div>
      </v-row>
    </div>
    <div v-else>
      <v-row class="mx10">
        <div class="col-md-2 col-1"></div>
        <div class="col-md-8 col-10">
          <v-alert
            border="top"
            color="red lighten-2"
            dark
          >Load calculation beyond residential limit of 200A, please consult your electrician.</v-alert>
        </div>
        <div class="col-md-2 col-1"></div>
      </v-row>
    </div>
    <v-spacer></v-spacer>
        <v-row>
      <v-col cols="6" sm2 lg1 xl1 class="py-10"> <v-btn depressed color="primary" @click="clearData">Clear Data</v-btn></v-col>
      <v-col cols="6" sm2 lg1 xl1 class="py-10"> <v-btn depressed to="/home">Back</v-btn></v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      temp: '75c',
      // Grounding conductor size according to rule 10-114 of CEC2018 page 110
      groundingSize: { 
        size: {copper: "AWG #6 ", al: "AWG #4 "}, 
        hint: "Rule: 10-114, permitedd to be 1) insulated or bare & 2) sized smaller but not smaller than the current-carrying conductor(s) of the system being grounded."
      },
      table13: {
        name: "table13",
        description:
          "Rating or setting of overcurrent devices protecting conductors*",
        rules: "(See Rules 14-104 and 28-204.)",
        cols: 2,
        ocAmp: [
          15,
          20,
          25,
          30,
          35,
          40,
          45,
          50,
          60,
          70,
          80,
          90,
          100,
          110,
          125,
          150,
          175,
          200,
          225,
          250,
          300,
          300,
          350,
          350,
          400,
          450,
          500,
          600,
          600,
          600,
        ],
        ampConductor: [
          "0–15",
          "16–20",
          "21–25",
          "26–30",
          "31–35",
          "36–40",
          "41–45",
          "46–50",
          "51–60",
          "61–70",
          "71–80",
          "81–90",
          "91–100",
          "101–110",
          "111–125",
          "126–150",
          "151–175",
          "176–200",
          "201–225",
          "226–250",
          "251–275",
          "276–300",
          "301–325",
          "326–350",
          "351–400",
          "401–450",
          "451–500",
          "501–525",
          "526–550",
          "551–600",
        ],
        star_notes:
          "*For general use where not otherwise specifically provided for.",
      },

      table16: {
        name: 'table16',
        description: 'Minimum size of field-installed system bonding jumpers and bonding conductors (See Rule 10-614.)',
        ampereRating: { 
          description: [
            'Ampere rating or setting of overcurrent device protecting conductor(s), equipment, etc.',
            'Allowable ampacity of largest ungrounded conductor or group of conductors.',
            'Not exceeding'
            ],
          value: [
            20, 30, 60, 100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000
          ]
          },
        bondingJunperSize: {
          description: 'Minimum size of system bonding jumper and bonding conductor',
          catagoey: {
              target: { 
                wire: [
                  { 
                    name: 'Copper, AWG or kcmil', 
                    value: [14, 12, 10, 8, 6, 4, 3, 2, 1, 0, 0, 0, 0, 250, 350, 400, 500, 700, 800]
                  },
                  {
                    name: 'Aluminum, AWG or kcmil', 
                    value: [12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 250, 350, 400, 500, 600, 800, 1000, 1250]
                  }
                ],
                bus: [
                  { 
                    name: 'Copper, mm2', 
                    value: [2, 3.5, 5.5, 8.5, 10.5, 21, 26.5, 33.5, 42.5, 53.5, 67.5, 84, 107, 127.5, 177.5, 203, 253.5, 355, 405.5]
                    },
                  {
                    name: 'Aluminum, mm2', 
                    value: [3.5, 5.5, 8.5, 10.5, 21, 26.5, 33.5, 42.5, 53.5, 67.5, 84, 127, 177.5, 203, 253.5, 355, 405.5, 507, 633.5]
                    }
                  ]
          }
        }
      }
    }
  }
  },

  computed: {
    ...mapGetters(["getLeastAmp", "getLeastAwg", "getFeederAwg"]),
    ...mapState(["houseDemands"]),

    // total amp demand in amps
    totalDemandWatts() {
      // console.log("this.houseDemands: ", this.houseDemands);
      return this.houseDemands;
    },
    totalDemandAmps() {
      var amp = parseFloat((this.totalDemandWatts / 240).toFixed(2));
      if (amp > 200)
        alert(
          "Load is beyond residential design limits of 200A, please check your input"
        );
      return amp;
    },

    // Meterbase selection
    meterBase: function () {
      if (this.totalDemandAmps <= 100) {
        return "100 A";
      } else if (this.totalDemandAmps <= 200) {
        return "200 A";
      } else {
        return " Upgrade to commercial grade recommended.";
      }
    },

    getFeederSize: function () {
      return this.table39.ov_rating_amp.find((a) => a >= this.totalDemandAmps);
    },
   

    //Over current protection selection for copper wire 75C
    ocProtection: function () {
      return this.table13.ocAmp.find((a) => a >= this.totalDemandAmps);
    },

    // Bonding jumper size as table 16 
    bondingSize: function() {
      var index = this.table16.ampereRating.value.findIndex(v => v >= this.totalDemandAmps);
      // console.log('table16 amp rating index: ', index);
      let size = {copper: this.table16.bondingJunperSize.catagoey.target.wire[0].value[index],
                   al: this.table16.bondingJunperSize.catagoey.target.wire[1].value[index]};
      // console.log("Bonding jumper size: ", size);
      return size;
    },

    // get number of branch circuit positions inside the panel. Rule: 8-108 page 101 CEC2018
    branchCircuits: function() {
      if (this.totalDemandAmps == 0) return ''
      if (this.totalDemandAmps <= 60) {
        return 16;
      } else if (this.totalDemandAmps <= 100) {
        return 24;
      } else if (this.totalDemandAmps <= 125 ) {
        return 30;
      } else if (this.totalDemandAmps <= 200) {
        return 40;
      }
      return ''
    }
  },
  methods: {
    clearData() {
     this.$emit('clearInput');
    //  console.log('clear input insturction is out');
    },

    // get the hot conductore size from table 2 or table 4 @ 60, 75 or 90 celsius degree. 
     conductorSize(table, temp) {
      var size;
      if (this.totalDemandAmps === 0) {
        size = undefined;
      } else {
        size = this.getLeastAwg(table, temp);
      }
      if (size === "14§" || size === "12§" || size === "10§")
        size = parseInt(size);
      if (parseInt(size) >= 250) {
        size = size + " Kcmil";
      } else {
        size = isNaN(size) ? "" : size;
        size = (size === "" ? "" : "AWG #") + size;
      }
      return size;
    },
  }
};
</script>

<style scopped>
/* .flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  }

#radio .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0 0px;
}  

.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 12px 2px 12px 12px;
}

.container {
    padding: 2px 2px 2px 2px;
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