<template>
  <v-container class="mx-auto pa-0">
    <v-card
      flat
      class="elevation-1 justify-center align-center mx-auto"
      height="30vh"
    >
      <div v-if="value[0] === undefined">
        <v-row>
          <v-col align="center">
            <v-progress-circular
              :size="50"
              :width="7"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row class="pl-2 pr-4">
          <v-col cols="7" class="titletext">
            {{ portfolio.title }}
          </v-col>
          <v-col cols="5" align="end" class="grey--text">
            <NuxtLink
              style="text-decoration: none; color: inherit"
              to="/portfolio"
            >
              See All
            </NuxtLink>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col class="mt-2" align="center"> Balance </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row class="">
          <v-col cols="3"></v-col>
          <v-col align="" class="holding"> {{ portfolio.holding }}$ </v-col>
          <v-col
            class="pt-5 change"
            justify="center"
            :class="
              ((portfolio.balance / portfolio.holding) * 100).toFixed(2)
                ? 'positive'
                : 'negative'
            "
          >
            ({{ ((portfolio.balance / portfolio.holding) * 100).toFixed(2) }} %)
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row class="px-6">
          <v-sparkline
            :value="value"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>
        </v-row>
        <v-row>
          <v-col align="center" class="mr-4">
            <v-icon color="green">mdi-chevron-up</v-icon> Best
          </v-col>
          <v-col align="center" class="mr-4">
            <v-icon color="red">mdi-chevron-down</v-icon> Worst
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">{{ portfolio.bestCrypto }}</v-col>
          <v-col align="center">{{ portfolio.worstCrypto }}</v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['#082640', '#082640', '#082640'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#16c784', 'orange', '#ea3c46'],
]
export default {
  name: 'PortfolioResume',
  data() {
    return {
      portfolio: '',
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }
  },
  async mounted() {
    const portId = this.$auth.user.portfolio[0]._id
    const chartData = await this.$axios.$get(
      `/api/user/portfolio/${portId}/chart`
    )
    const portfolio = await this.$axios.$get(`/api/user/portfolio/${portId}`)

    this.portfolio = portfolio
    this.value = chartData.map((elem) => (elem = elem.total))
  },
}
</script>

<style lang="scss" scoped>
.test1 {
  background-color: red;
}
.test2 {
  background-color: blue;
}
.test3 {
  background-color: green;
}
.test4 {
  background-color: yellow;
}
.holding {
  font-size: 1.4rem;
}
.change {
  font-weight: bold;
}
.positive {
  color: #16c784;
}
.negative {
  color: #ea3c46;
}
</style>
