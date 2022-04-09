<template>
  <v-card class="mx-auto elevation-1 mb-10" width="80%" height="30vh">
    <div class="d-flex">
      <div class="title pt-4 ml-4">Market</div>
      <v-spacer></v-spacer>
      <div class="username seeall mr-4 mt-6">See All</div>
    </div>

    <div class="d-flex" v-for="(coin, i) in topList" :key="i">
      <v-avatar class="ml-4 mt-2 mb-1" size="45">
        <img
          :src="`https://cryptocompare.com${coin.CoinInfo.ImageUrl}`"
          alt=""
        />
      </v-avatar>

      <div class="price ml-10 mt-6">
        {{ `${coin.DISPLAY.USD.PRICE}` }}
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div
          class="price mr-16 mt-6"
          :class="
            parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR) > 0 ? 'hello' : 'goodby'
          "
          for=""
        >
          {{ parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR) }}
        </div>
      </div>
    </div>
  </v-card>
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
    this.topList = await this.$axios.$get('/api/data/topList')
  },
}
</script>

<style lang="scss" scoped>
.hello {
  color: #058042;
}
.goodby {
  color: #e90d0d;
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
</style>
