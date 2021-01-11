<template>
  <div>
    <v-form ref="areaForm">
      <v-row>
        <v-col cols="9" offset="2">
          <v-text-field
            outlined
            v-model.trim="basearea"
            class="text-darken-3 mt-3 text-right"
            :rules="rules"
            ml="5"
            type="number"
            clearable
            hide-details="auto"
            hint="Please input positive numbers only"
            placeholder="0"
            @blur="getArea"
            @keyup.enter="getArea" 
          >
            <template v-slot:label>
              <b>Please input basement area</b>
            </template>
          </v-text-field></v-col
        >
        <v-col cols="1"> </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "BaseArea",
  data() {
    return {
      basearea: undefined,
      rules: [
        (value) => (value && RegExp("^[0-9]+$").test(value)) || "Positive number only",
      ],
    };
  },

  methods: {
    getArea() {      
      this.basearea = (!!this.basearea &&  !isNaN(this.basearea)) ? this.basearea : 0;
      if (this.basearea<0) this.basearea = 0;
      this.$emit("getValue", this.basearea);
    },
  },
};
</script>
