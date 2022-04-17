<template>
  <v-container class="size pa-0 mx-auto mt-10">
    <v-card>
      <v-row class="primary mx-0">
        <v-col cols="2" class="titletext text-center white--text">
          Chart View
        </v-col>
        <v-col cols="10"></v-col>
      </v-row>
      <v-card class="elevation-1 mt-4">
        <v-row>
          <v-col align="center"
            ><v-btn icon @click="tradingBTC"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="BTC" /></v-btn
          ></v-col>
          <v-col align="center">
            <v-btn icon @click="tradingETH"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                alt="ETH"
            /></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn icon @click="tradingDOGE"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
                alt="DOGE"
            /></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn icon @click="tradingTRX"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
                alt="TRX"
            /></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn icon @click="tradingADA"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                alt="ADA"
            /></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn icon @click="tradingXRP"
              ><img
                width="35px"
                height="35px"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
                alt="XRP"
            /></v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="mx-0 pa-0 height mb-10">
        <v-col cols="12" class="pa-0 height mt-4">
          <VueTradingView :options="options[i]" :key="i" />
        </v-col>
      </v-row>

      <v-row class="mx-0 px-0 titletext subr">
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
      <v-row>
        <v-col>
          <v-card>
            <v-row v-for="(coin, i) in gainers" :key="i">
              <v-col cols="2" align="center"
                ><v-avatar class="" size="40">
                  <img
                    :src="`https://cryptocompare.com${coin.CoinInfo.ImageUrl}`"
                    alt=""
                  /> </v-avatar
              ></v-col>
              <v-col cols="3">{{ coin.CoinInfo.FullName }}</v-col>
              <v-col align="center">{{ coin.DISPLAY.USD.PRICE }}</v-col>
              <v-col
                class="textSize"
                align="center"
                :class="
                  parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR) >= 0
                    ? 'positive'
                    : 'negative'
                "
              >
                {{
                  parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR * 100).toFixed(2)
                }}
                %
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-row v-for="(coin, i) in trending" :key="i">
              <v-col align="center" cols="2"
                ><v-avatar class="" size="40">
                  <img
                    :src="`https://cryptocompare.com${coin.CoinInfo.ImageUrl}`"
                    alt=""
                  /> </v-avatar
              ></v-col>
              <v-col cols="3">{{ coin.CoinInfo.FullName }}</v-col>
              <v-col cols="4" align="center">{{
                coin.DISPLAY.USD.PRICE
              }}</v-col>
              <v-col
                class="textSize"
                align="center"
                :class="
                  parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR) >= 0
                    ? 'positive'
                    : 'negative'
                "
              >
                {{
                  parseFloat(coin.DISPLAY.USD.CHANGEPCTHOUR * 100).toFixed(2)
                }}
                %
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/vue-trading-view'

export default {
  name: 'market',
  layout: 'main',
  data() {
    return {
      options: [
        {
          symbol: 'BTCUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
        {
          symbol: 'ETHUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
        {
          symbol: 'ADAUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
        {
          symbol: 'XRPUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
        {
          symbol: 'DOGEUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
        {
          symbol: 'TRXUSD',
          theme: 'light',
          hide_side_toolbar: false,
          autosize: false,
          height: 400,
        },
      ],
      i: 0,
      gainers: [],
      trending: [],
    }
  },
  components: {
    VueTradingView,
  },
  methods: {
    tradingBTC() {
      this.i = 0
    },
    tradingETH() {
      this.i = 1
    },
    tradingADA() {
      this.i = 2
    },
    tradingXRP() {
      this.i = 3
    },
    tradingDOGE() {
      this.i = 4
    },
    tradingTRX() {
      this.i = 5
    },
  },
  async asyncData({ $axios }) {
    const list = await $axios.get('/api/data/topList')

    return { gainers: list.data.slice(0, 8), trending: list.data.slice(8, 16) }
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
.positive {
  color: #16c784;
}
.negative {
  color: #ea3c46;
}
.subr {
  border-bottom: 2px solid #082640;
}
</style>
