import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    _houseDemands: 0,
    get houseDemands() {
      return this._houseDemands;
    },
    set houseDemands(value) {
      this._houseDemands = value;
    },
    tables: [
      {
        name:"table2",
        description:"Allowable ampacities for not more than three insulated copper conductors, rated not more than 5000 V and unshielded, in raceway or cable (based on an ambient temperature of 30 °C*)<br>(See Rules 4-004, 8-104, 12-3034, 26-142, 42-008, and 42-016 and Tables 5A, 5C, 19, 39, and D3.)",
        cols: 5,
        degree: [
          {
            temp: "60c",
            amps:["15",  "20",  "30",  "40",  "55",  "70",  "85",  "95",  "110",  "125",  "145",  "165",  "195",  "215",  "240",  "260",  "280",  "320",  "350",  "385",  "400",  "410",  "435",  "455",  "495",  "525",  "545",  "555"]
          },
          {
            temp:"75c",
            amps:["20",  "25",  "35",  "50",  "65",  "85",  "100",  "115",  "130",  "150",  "175",  "200",  "230",  "255",  "285",  "310",  "335",  "380",  "420",  "460",  "475",  "490",  "520",  "545",  "590",  "625",  "650",  "665"]
          },
      
          { 
            temp: "90c",
            amps:["25",  "30",  "40",  "55",  "75",  "95",  "115",  "130",  "145",  "170",  "195",  "225",  "260",  "290",  "320",  "350",  "380",  "430",  "475",  "520",  "535",  "555",  "585",  "615",  "665",  "705",  "735",  "750"]
          },
          {
            temp:"110c",
            amps:["25",  "30",  "45",  "65",  "80",  "105",  "125",  "145",  "165",  "190",  "220",  "255",  "290",  "320",  "360",  "390",  "425",  "480",  "530",  "580",  "600",  "620",  "655",  "690",  "745",  "790",  "820",  "840"]
          },
          {
            temp: "125c",
            amps:["30",  "35",  "45",  "65",  "90",  "115",  "135",  "155",  "175",  "200",  "235",  "270",  "310",  "345",  "385",  "420",  "450",  "510",  "565",  "620",  "640",  "660",  "700",  "735",  "—",  "—",  "—",  "—"]
          },
          {
            temp: "200c",
            amps: ["35",  "40",  "60",  "80",  "110",  "140",  "165",  "190",  "215",  "245",  "290",  "330",  "380",  "—",  "—", "—", "—",  "—",  "—",  "—",  "—",  "—",  "—",  "—",  "—",  "—",  "—",  "—"]
          } 
        ], 
        awg_size:["14§",  "12§",  "10§",  "8",  "6",  "4",  "3",  "2",  "1",  "0",  "00",  "000",  "0000",  "250",  "300",  "350",  "400",  "500",  "600",  "700",  "750",  "800",  "900",  "1000",  "1250",  "1500",  "1750",  "2000"],
       
        col1_title:"Size, AWG or kcmil",
        col2_title:"Allowable ampacity†,††, 60 °C‡",
        col3_title:"Allowable ampacity†,††, 75 °C‡",
        col4_title:"Allowable ampacity†,††, 90 °C‡**",
        col5_title:"Allowable ampacity†,††, 110 °C‡ See Note",
        col6_title:"Allowable ampacity†,††, 125 °C‡ See Note",
        col7_title:"Allowable ampacity†,††, 200 °C‡ See Note",
        notes:"These ampacities apply to bare conductors or under special circumstances where the use of insulated conductors having this temperature rating is acceptable.",
        star_notes:[
            "* See Table 5A for the correction factors to be applied to the values in Columns 2 to 7 for ambient temperatures over 30 °C.",
            "** For mineral-insulated cables, these ratings are based on the use of 90 °C insulation on the emerging conductors and for sealing. Where a deviation has been allowed in accordance with Rule 2-030, mineral-insulated cable may be used at a higher temperature without a decrease in the allowable ampacity, provided that the insulation, sealing material, and any jacketing material are suitable for the higher temperature."
          ],
        other_notes:[
            "† The ampacity of aluminum-sheathed cable is based on the type of insulation used on the copper conductors.",
            "‡ These are maximum allowable conductor temperatures for one, two, or three insulated conductors run in a raceway, or two or three insulated conductors run in a cable, and may be used in determining the ampacity of other conductor types listed in Table 19, which are so run, as follows: From Table 19 determine the maximum allowable conductor insulation temperature for that particular type, then from this Table determine the ampacity under the column of corresponding temperature rating.",
            "§ See Rule 14-104 2).","** For mineral-insulated cables, these ratings are based on the use of 90 °C insulation on the emerging conductors and for sealing. Where a deviation has been allowed in accordance with Rule 2-030, mineral-insulated cable may be used at a higher temperature without a decrease in the allowable ampacity, provided that the insulation, sealing material, and any jacketing material are suitable for the higher temperature.",
            "†† See Table 5C for the correction factors to be applied to the values in Columns 2 to 7 where there are more than three insulated conductors in a run of raceway or cable."
          ]
      },

      {
        name: "table4",
        description: "Allowable ampacities for not more than three insulated aluminum conductors, rated not more than 5000 V and unshielded, in raceway or cable (based on an ambient temperature of 30 °C*)<br>(See Rules 4-004, 8-104, 26-142, 42-008, and 42-016 and Tables 5A and 5C.)",
        cols: 7,
        col1_title: "Size, AWG or kcmil",
        col2_title: "Allowable ampacity†,§, 60 °C‡",
        col3_title: "Allowable ampacity†,§, 75 °C‡",
        col4_title: "Allowable ampacity†,§, 90 °C‡**",
        col5_title: "Allowable ampacity†,§, 110 °C‡ See Note",
        col6_title: "Allowable ampacity†,§, 125 °C‡ See Note",
        col7_title: "Allowable ampacity†,§, 200 °C‡ See Note",
        awg_size: ["12**",  "10**",  "8",  "6",  "4",  "3",  "2",  "1",  "0",  "00",  "000",  "0000",  "250",  "300",  "350",  "400",  "500",  "600",  "700",  "750",  "800",  "900",  "1000",  "1250",  "1500",  "1750",  "2000"],
        degree: [
          {
            temp:"60c",
            amps: ["15", "25", "35", "40", "55", "65", "75", "85", "100", "115", "130", "150", "170", "195", "210", "225", "260", "285", "315", "320", "330", "355", "375", "405", "435", "455", "470"]
          },
          {
            temp: "75c",
            amps: ["20", "30", "40", "50", "65", "75", "90", "100", "120", "135", "155", "180", "205", "230", "250", "270", "310", "340", "375", "385", "395", "425", "445", "485", "520", "545", "560"]
          },
          {
            temp: "90c",
            amps: ["25", "35", "45", "55", "75", "85", "100", "115", "135", "150", "175", "205", "230", "260", "280", "305", "350", "385", "425", "435", "445", "480", "500", "545", "585", "615", "630"]
          },
          {
            temp: "110c",
            amps: ["25", "40", "50", "65", "80", "95", "115", "125", "150", "170", "195", "225", "260", "290", "315", "340", "390", "430", "475", "485", "500", "535", "560", "615", "655", "690", "710"]
          },
          {
            temp: "125c",
            amps: ["25", "40", "55", "70", "90", "100", "120", "135", "160", "180", "210", "245", "275", "310", "335", "365", "420", "460", "505", "520", "535", "575", "600", "—","—","—","—"]
          },
          {
            temp: "200c",
            amps: ["35", "50", "65", "80", "105", "125", "150", "165", "195", "220", "255", "295", "—","—","—","—","—","—","—","—","—","—","—","—","—","—","—"]
          }
        ],
        notes: "These ampacities apply to bare conductors or under special circumstances where the use of insulated conductors having this temperature rating is acceptable.",
        star_notes: [
            "* See Table 5A for the correction factors to be applied to the values in Columns 2 to 7 for ambient temperatures over 30 °C.",
            "** See Rule 14-104 2)."
        ],
        other_notes: [
            "† The ampacity of aluminum-sheathed cable is based on the type of insulation used on the copper conductors.",
            "‡ These are maximum allowable conductor temperatures for one, two, or three insulated conductors run in a raceway, or two or three insulated conductors run in a cable, and may be used in determining the ampacity of other conductor types listed in Table 19, which are so run, as follows: From Table 19 determine the maximum allowable conductor insulation temperature for that particular type, then from this Table determine the ampacity under the column of corresponding temperature rating.",
            "§ See Table 5C for the correction factors to be applied to the values in Columns 2 to 7 where there are more than three insulated conductors in a run of raceway or cable."
        ]
      },  

      {
        name: "table39",
        description: "Overcurrent device rating, A",
        cols: 5,
        col1_title: "Ampacity of largest service conductor or equivalent for multiple conductors, A",
        col2_title: "Copper [See Note 2)], For calculated loads up to, A*",
        col3_title: "Copper [See Note 2)], Conductor size, AWG or kcmil",
        col4_title: "Aluminum [See Note 3)], For calculated loads up to, A*",
        col5_title: "Aluminum [See Note 3)], Conductor size, AWG or kcmil",
        ov_rating_amp:[60,100,125,200,225,400],
        copper_loads_amp:[60,89,121,184,210,352],
        copper_conductor_size:[6,4,2,"2/0","3/0",400],
        al_loads_amp:[53,95,125,189,215,357],
        al_conductor_size:[6,2,"0","0000","250","600"],
        notes:[
          ["1) This Table applies only to conductors sized for loads calculated in accordance with Rules 8-200 1) a), 8-200 2), or 8-202 1)."],
          ["2) If the calculated load exceeds the limit shown in this Table, the next larger size insulated conductor or cable shall be used."]
        ],
        star_note: "* These ampacities are the ampacities given in Tables 2 and 4 for 75 °C, increased by 5%."
      },

      {
        name: "table40",
        description: "External tapered threads for rigid metal conduit<br> (See Rule 12-1006.)",
        cols: 4,
        col1_title: "Trade size of conduit",
        col2_title: "Number of threads per 25.4 mm",
        col3_title: "Length of thread, Minimum, mm",
        col4_title: "Length of thread, Maximum, mm",
        trade_size:["16","21","27","35","41","53","63","78","91","103","129","155"],
        threads_per_inch:[14,14,11.5,11.5,11.5,11.5,8,8,8,8,8,8],
        thread_length:[
          [16.3,16.5,20.6,21.3,21.8,22.6,33.5,34.5,36.3,37.6,40.4,43.2],
          [19.8,20.1,24.9,25.7,26.2,26.9,39.9,41.4,42.7,43.9,46.7,49.5]
        ]
      },

      {
        name: "table41",
        description: "Minimum size of bonding jumper for service raceways <br>(See Rules 10-614 and70-126.)",
        cols: 3,
        col1_title: "Ampacity of largest service conductor or equivalent for multiple conductors, A",
        col2_title: "Size of bonding jumper: Copper wire, AWG",
        col3_title: "Size of bonding jumper: Aluminum wire, AWG",
        conductor_amp:[100,200,400,600,800,1000,1200],
        bonding_jumper_size_copper:[8,6,4,2,"0","00","000"],
        bonding_jumper_size_aluminum:[6,4,2,"0","00","000","0000"]
      }    
    ]
  },
  getters: {
    
    getLeastAmp: function(state) {
      // console.log('demands: ', state.houseDemands, typeof state.houseDemands);
      return state.houseDemands / 240; 
    },

    getTable: (state) => (table, temperature) => {
      let ampTable = state.tables.find(item => item.name===table).degree.find(t => t.temp === temperature).amps;
      let awgTable = state.tables.find(item => item.name===table).awg_size;
      // console.log('amptbale: ', ampTable);
      // console.log('awgtbale: ', awgTable);

      return { ampTable, awgTable }
    },
    
    getLeastAwg: (state, getters) => (table, temperature) => {
    //getLeastAwg: (state, getters, ) => {
      // console.log('state: ', state);
      // console.log('getters): ', getters);
      // console.log('table: ', table); // 'table2'
      // console.log('temp: ', temperature); //'75c'
      // console.log('getleastamp: ', getters.getLeastAmp); //100
      // console.log("table  from input: ", getters.getTable(table, temperature));
      // 1.05 times applied according to table39 or CEC rule 4-004 22.
      var index = getters.getTable(table, temperature).ampTable.findIndex(a => (a * 1.05) > getters.getLeastAmp );
      // console.log('index===',index);
      let result = getters.getTable(table,temperature).awgTable[index];
      // console.log('result awg: ', result);
      return result;
    },

    getFeederAwg: (state) => (amp) => {
      var table39 = state.tables.find(item => item.name==='table39');
      // console.log('table39 from getters: ', table39);
      return table39.find(a => a.copper_loads_amp > amp);
    }
  },
  
  mutations: {
    // setDemands (state, payload) {
    //   state.houseDemands += payload.demands;
    // },
    setDemands (state,demand) {
      state.houseDemands += demand;
      // console.log("mutate houseDemand set to: ", state.houseDemands, ", new value was ", demand);
    },
  },
  actions: {
    setDemands ({commit}) {
      commit('setDemands');
      // console.log("called action setdemand")
    }
  }
});
