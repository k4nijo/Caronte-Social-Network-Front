<template>
  <v-container>
    <v-row>
      <v-col>
        <PortfolioResume class="glue1" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
