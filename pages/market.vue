<template>
  <v-container class="size pa-0 mx-auto">
    <v-card>
      <v-row>
        <v-col cols="2" class="titletext text-center"> Chart View </v-col>
        <v-col cols="10"></v-col>
      </v-row>
      <v-row class="mx-0 pa-0 height mb-10">
        <v-col cols="12" class="pa-0 height">
          <VueTradingView :options="options" />
        </v-col>
      </v-row>
      <v-row class="mx-0 px-0 titletext">
        <v-col cols="12"> Market Values </v-col>
      </v-row>
      <v-row class="mx-0 px-0">
        <v-col cols="6" class=""
          ><v-icon color="green">mdi-finance</v-icon> Biggest Gainers
        </v-col>
        <v-col cols="6" class="">
          <v-icon color="red">mdi-fire</v-icon>Trending</v-col
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import VueTradingView from 'vue-trading-view'

export default {
  name: 'market',
  layout: 'main',
  data() {
    return {
      options: {
        symbol: 'BTCUSD',
        theme: 'light',
        hide_side_toolbar: false,
        autosize: false,
        height: 400,
      },
    }
  },
  components: {
    VueTradingView,
  },
}
</script>

<style lang="scss" scoped>
.c1 {
  background-color: aqua;
}
.c2 {
  background-color: red;
}
.size {
  max-width: 800px;
}
.height {
  height: 400px;
}
</style>
