<template>
  <v-container>
    <v-card class="size mx-auto">
      <v-row class="size mx-auto" align="center">
        <v-col cols="7" class="pa-0 text-center titletext">
          {{ portData.title }}
        </v-col>
        <v-col cols="5" align="end">
          <v-btn small class="primary"> New Portfolio</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ml-10"> Description </v-col>
      </v-row>
      <v-row
        class="size mx-auto mb-2 text-center"
        justify="center"
        align="center"
      >
        <v-col class="contentext" cols="12">
          {{ portData.description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ml-10"> Overview </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="size mx-auto mb-0 mt-2 px-2 overview"
        justify="space-between"
      >
        <v-col cols="3" class="text-center pa-2 empha mt-2"
          ><div>Holdings</div>
          <div v-bind:class="[holdingDiff ? 'up' : 'down']">
            {{ portData.holding }} $
          </div>
        </v-col>
        <v-col cols="3" class="text-center pa-2 empha mt-2"
          ><div>Profit/Loss</div>
          <div v-bind:class="[profitDiff ? 'up' : 'down']">
            {{ portData.balance }} $
          </div>
        </v-col>
        <v-col cols="3" class="text-center pa-2 empha mt-2"
          ><div>Adquisition Cost</div>
          <div>{{ portData.adquisitionCost }} $</div></v-col
        >
      </v-row>
      <v-row justify="space-around" class="size mx-auto mt-0 mb-2 overview">
        <v-col cols="4" class="text-center empha my-2">
          <div>Best Crypto</div>
          <div>{{ portData.bestCrypto }}</div>
        </v-col>
        <v-col cols="4" class="text-center empha my-2 px-0">
          <div>Worst Crypto</div>
          <div>{{ portData.worstCrypto }}</div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="size mx-auto my-6">
        <v-tabs>
          <v-col>
            <v-tab to="/portfolio"> Open Positions </v-tab>
          </v-col>
          <v-col>
            <v-tab to="/portfolio/pie"> Wallet Balance </v-tab>
          </v-col>
        </v-tabs>
      </v-row>
      <v-row>
        <v-card flat class="mx-auto my-4 size">
          <NuxtChild />
        </v-card>
      </v-row>
      <v-row class="size mx-auto mt-6" justify="space-between">
        <v-col class="text-center"> Coin</v-col>
        <v-col class="text-center">Price</v-col>
        <v-col class="text-center">Total</v-col>
        <v-col class="text-center">P/L</v-col>
        <v-col class="text-center">Change</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-for="(item, i) in coins" :key="i" class="my-2">
        <v-col class="text-center"
          ><v-avatar size="25" color="grey" class="mr-2"
            ><img src="" alt="" /></v-avatar
          >{{ item.coin }}</v-col
        >
        <v-col class="text-center" v-bind:class="[priceDiff[i] ? 'up' : 'down']"
          >{{ item.actual }} $</v-col
        >
        <v-col class="text-center" v-bind:class="[totalDiff[i] ? 'up' : 'down']"
          >{{ item.total.toFixed(2) }} $</v-col
        >
        <v-col class="text-center" v-bind:class="[plDiff[i] ? 'up' : 'down']"
          >{{ item.pl }} $</v-col
        >
        <v-col
          class="text-center"
          v-bind:class="[item.change > 0 ? 'up' : 'down']"
        >
          {{ item.change }} %
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'portfolio',
  layout: 'main',
  data() {
    return {
      timer: '',
      portData: {},
      coins: [],
      holdingDiff: '',
      profitDiff: '',
      priceDiff: [],
      totalDiff: [],
      plDiff: [],
    }
  },
  async asyncData({ $auth, $axios }) {
    const portId = $auth.user.portfolio[0]._id
    const portfolio = await $axios.get(`/api/user/portfolio/${portId}`)

    return { portData: portfolio.data, coins: portfolio.data.coins }
  },
  beforeMount() {
    for (let i = 0; i < this.portData.coins.length; i++) {
      this.priceDiff.push('')
      this.totalDiff.push('')
      this.plDiff.push('')
    }

    this.timer = setInterval(() => {
      const portId = this.$auth.user.portfolio[0]._id

      this.$axios
        .get(`/api/user/portfolio/${portId}`)
        .then((res) => {
          this.holdingDiff =
            res.data.holding > this.portData.holding ? true : false
          this.profitDiff =
            res.data.profit > this.portData.holding ? true : false

          res.data.coins.forEach((elem, idx) => {
            this.priceDiff[idx] =
              elem.actual > this.portData.coins[idx].actual ? true : false
            this.totalDiff[idx] =
              elem.total > this.portData.coins[idx].total ? true : false
            this.plDiff[idx] =
              elem.pl > this.portData.coins[idx].pl ? true : false
          })

          this.portData = res.data
          this.coins = res.data.coins
          return
        })
        .catch((err) => console.log(err))
    }, 3600000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
.c1 {
  background-color: yellow;
}
.c2 {
  background-color: red;
}
.c3 {
  background-color: green;
}
.overview {
  background-color: rgb(250, 250, 250);
}
.empha {
  background-color: white;
  border-radius: 8px;
}
.up {
  color: #2e5902;
  font-weight: bold;
}
.down {
  color: #a62b1f;
  font-weight: bold;
}
</style>
