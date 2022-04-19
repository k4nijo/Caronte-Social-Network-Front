<template>
  <v-container class="mt-10">
    <v-card class="size mx-auto">
      <v-row class="size mx-auto">
        <v-col cols="7" class="titletext">
          {{ portData.title }}
        </v-col>
        <!-- <v-col cols="5" align="center">
          <v-btn small class="secondary"> New Portfolio</v-btn>
        </v-col> -->
      </v-row>
      <v-row class="size mx-auto">
        <v-col class="contentext mx-0" cols="12">
          {{ portData.description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ml-2"><strong>Overview</strong> </v-col>
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
      <v-row>
        <v-col align="center" v-show="!inCollapse"
          ><v-btn small class="" @click="collapse"
            >Collapse<v-icon class="iconsize">mdi-arrow-collapse</v-icon></v-btn
          ></v-col
        >
        <v-col align="center" v-show="inCollapse"
          ><v-btn small class="" @click="expand"
            >Expand<v-icon class="iconsize">mdi-arrow-expand</v-icon></v-btn
          ></v-col
        >
        <v-col align="center">
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="secondary"
                v-bind="attrs"
                v-on="on"
                @click="openDialog"
                >Add Coin</v-btn
              >
            </template>
            <v-card>
              <v-container>
                <v-row class="primary">
                  <v-col cols="12"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" class="mt-4">Coin </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="pickCoin"
                      v-model="pickedCoin"
                      label="Select"
                      solo
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="4"></v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" class="mt-7">Amount:</v-col>
                  <v-col cols="4">
                    <v-text-field v-model="amount"></v-text-field
                  ></v-col>
                  <v-col cols="2" align="center" class="mt-7">Price:</v-col>
                  <v-col cols="4"
                    ><v-text-field
                      v-model="price"
                      placeholder="$"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" class="mt-7">Date:</v-col>
                  <v-col>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        min="1950-01-01"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2" class="mt-7" align="center">Time:</v-col>
                  <v-col>
                    <v-menu
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="hour"
                          readonly
                          placeholder="Time"
                          v-bind="attrs"
                          v-on="on"
                          clearable
                        ></v-text-field>
                      </template>
                      <v-time-picker v-model="hour" use-seconds></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col></v-col>
                  <v-col align="center" cols="2">
                    <v-btn
                      @click="addCoin"
                      :disabled="!isDisabled"
                      class="primary"
                      >Add</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
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
          ><v-avatar size="25" color="white" class="mr-2"
            ><img :src="item.image" alt="" /></v-avatar
          >{{ item.coin }}</v-col
        >
        <v-col class="text-center" v-bind:class="[priceDiff[i] ? 'up' : 'down']"
          >{{ item.actual }} $</v-col
        >
        <v-col class="text-center" v-bind:class="[totalDiff[i] ? 'up' : 'down']"
          >{{ item.total.toFixed(2) }} $</v-col
        >
        <v-col class="text-center" v-bind:class="[plDiff[i] ? 'up' : 'down']"
          >{{ item.pl.toFixed(2) }} $</v-col
        >
        <v-col
          class="text-center"
          v-bind:class="[item.change > 0 ? 'up' : 'down']"
        >
          {{ item.change.toFixed(2) }} %
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'

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
      inCollapse: false,
      pickCoin: ['BTC', 'ETH', 'ADA'],
      pickedCoin: '',
      amount: '',
      price: '',
      dialog: false,
      date: '',
      hour: '',
    }
  },
  computed: {
    calcDate() {
      const date = moment(`${this.date}T${this.hour}.000Z`).unix()
      return date
    },
    isDisabled() {
      return (
        this.coin !== '' &&
        this.price !== '' &&
        this.amount !== '' &&
        this.date !== '' &&
        this.hour !== ''
      )
    },
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    async addCoin() {
      const numAmount = Number(this.amount)
      const numPrice = Number(this.price)

      const newCoin = await this.$axios.post(
        `/api/user/portfolio/${this.portData._id}/coin`,
        {
          coin: this.pickedCoin,
          amount: numAmount,
          price: numPrice,
          date: this.calcDate,
        }
      )

      this.coins.push(newCoin.data.coins[newCoin.data.coins.length - 1])
      this.dialog = false
      this.amount = ''
      this.price = ''
      this.date = ''
      this.hour = ''
      this.pickedCoin = ''
    },
    collapse() {
      const collapse = this.coins.reduce((p, c) => {
        const index = p.findIndex((elem) => elem.coin === c.coin)
        if (index !== -1) {
          p[index].total = p[index].total + c.total
          p[index].pl = p[index].pl + c.pl
          p[index].change =
            (p[index].pl / (p[index].totalInit + c.totalInit)) * 100
        } else {
          p.push(c)
        }
        return p
      }, [])

      this.coins = collapse
      this.inCollapse = true
    },
    expand() {
      this.coins = this.portData.coins
      this.inCollapse = false
    },
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
    console.log('hola', process.env.time)
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
    }, process.env.time)
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
.titletext {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
.overview {
  background-color: rgb(250, 250, 250);
}
.empha {
  background-color: white;
  border-radius: 8px;
}
.up {
  color: #16c784;
  font-weight: bold;
}
.down {
  color: #ea3c46;
  font-weight: bold;
}
.iconsize {
  font-size: 0.9rem;
}
</style>
