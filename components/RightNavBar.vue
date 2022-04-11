<template>
  <v-navigation-drawer
    fixed
    right
    class="d-flex-colum justify-center glue"
    height="100%"
    width="20%"
  >
    <div class="d-flex-colum justify-space-around">
      <PortfolioResume />
      <MarketResume />
      <ConversationsResume />
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.glue {
  right: 300px;
}
</style>
