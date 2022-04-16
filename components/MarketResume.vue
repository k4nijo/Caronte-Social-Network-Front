<template>
  <v-container class="mx-auto pa-0">
    <v-card class="elevation-1">
      <v-row>
        <v-col cols="6" class="ml-2 titletext"> Market Overview </v-col>
        <v-col cols="5" align="end" class="mt-2 grey--text">
          <NuxtLink style="text-decoration: none; color: inherit" to="/market">
            See All
          </NuxtLink>
        </v-col>
      </v-row>
      <v-row v-for="(coin, i) in topList" :key="i" class="mx-0" align="center">
        <v-col class="" cols="2">
          <v-avatar class="" size="40">
            <img
              :src="`https://cryptocompare.com${coin.CoinInfo.ImageUrl}`"
              alt=""
            />
          </v-avatar>
        </v-col>
        <v-col class="pl-0 textSize" cols="3">
          {{ coin.CoinInfo.FullName }}
        </v-col>
        <v-col class="textSize">
          {{ coin.DISPLAY.USD.PRICE }}
        </v-col>
        <v-col
          class="textSize"
          align="center"
          :class="
            parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR) >= 0
              ? 'positive'
              : 'negative'
          "
        >
          {{ parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR * 100).toFixed(2) }} %
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MarketResume',
  data() {
    return {
      topList: [],
    }
  },
  async fetch() {
    // const list = await this.$axios.$get('/api/data/topList')
    // this.topList = list.slice(0, 5)
  },
}
</script>

<style lang="scss" scoped>
.positive {
  color: #16c784;
}
.negative {
  color: #ea3c46;
}
.seeall {
  font-size: 16px;
  color: #757575;
}
.price {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
.textSize {
  font-size: 0.9rem;
  font-weight: 450;
}
// .test1 {
//   background-color: red;
// }
// .test2 {
//   background-color: blue;
// }
// .test3 {
//   background-color: green;
// }
// .test4 {
//   background-color: yellow;
// }
</style>
