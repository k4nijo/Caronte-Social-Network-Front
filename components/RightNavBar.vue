<template>
  <v-container>
    <v-row>
      <v-col
        v-show="$route.name !== 'portfolio' && $route.name !== 'portfolio-pie'"
      >
        <PortfolioResume class="glue1" />
      </v-col>
      <v-col
        v-show="$route.name === 'portfolio' || $route.name === 'portfolio-pie'"
      >
        <News class="glue1" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-show="$route.name === 'explore' || $route.name === 'explore-users'"
      >
        <RankingUsers class="glue2" />
      </v-col>
      <v-col v-show="$route.name === 'market'">
        <News class="glue2" />
      </v-col>
      <v-col
        v-show="
          $route.name !== 'explore' &&
          $route.name !== 'explore-users' &&
          $route.name !== 'market'
        "
      >
        <MarketResume class="glue2" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ConversationsResume class="glue3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RightNavBar',
}
</script>

<style lang="scss" scoped>
.glue1 {
  position: fixed;
  top: 3vh;
  max-width: 400px;
}
.glue2 {
  position: fixed;
  top: 36vh;
  max-width: 400px;
}
.glue3 {
  position: fixed;
  top: 69vh;
  max-width: 400px;
}
</style>
