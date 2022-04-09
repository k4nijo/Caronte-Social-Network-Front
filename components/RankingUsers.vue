<template>
  <v-card class="mx-auto elevation-1 mb-10" width="80%" height="50vh">
    <div class="d-flex">
      <div class="title pt-4 ml-4">Ranking Users</div>
    </div>
    <div class></div>
  </v-card>
</template>

<script>
export default {
  name: 'RankingUsers',
  data() {
    return {
      rankingUsers: [],
    }
  },
  async fetch() {
    this.rankingUsers = await this.$axios.$get('/api/user')
  },
}
</script>

<style lang="scss" scoped></style>
